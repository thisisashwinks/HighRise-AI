import { NextRequest, NextResponse } from 'next/server';
import { getLeaderboard, isRedisConfigured } from '@/lib/upload/metadata';
import { trackUpstashCommand } from '@/lib/monitoring/usage';
import { getStaticSeedLeaderboard } from '@/lib/upload/seed-data';
import { getMergedLeaderboardFromFile } from '@/lib/upload/file-store';
import { getAllInspirationsFromCloudinary, isCloudinaryConfigured } from '@/lib/upload/storage';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');

    let entries: { rank: number; email: string; name: string; product: string; karmaPoints: number }[];
    if (isRedisConfigured()) {
      entries = await getLeaderboard(limit);
      if (entries.length > 0) await trackUpstashCommand();
    } else if (isCloudinaryConfigured()) {
      const staticEntries = getStaticSeedLeaderboard();
      const cloud = await getAllInspirationsFromCloudinary();
      const byEmail = new Map<string, { name: string; product: string; karma: number }>();
      for (const e of staticEntries) {
        byEmail.set(e.email, { name: e.name, product: e.product, karma: e.karmaPoints });
      }
      for (const u of cloud) {
        const existing = byEmail.get(u.uploaderEmail);
        if (existing) existing.karma += u.karmaPoints;
        else byEmail.set(u.uploaderEmail, { name: u.uploaderName, product: u.product, karma: u.karmaPoints });
      }
      entries = Array.from(byEmail.entries())
        .map(([email, d]) => ({ rank: 0, email, name: d.name, product: d.product, karmaPoints: d.karma }))
        .sort((a, b) => b.karmaPoints - a.karmaPoints)
        .slice(0, limit)
        .map((e, i) => ({ ...e, rank: i + 1 }));
    } else {
      const staticEntries = getStaticSeedLeaderboard();
      entries = await getMergedLeaderboardFromFile(staticEntries, limit);
    }

    if (entries.length === 0) {
      entries = getStaticSeedLeaderboard();
    }

    return NextResponse.json({
      success: true,
      entries,
    });
  } catch (error: any) {
    console.error('Get leaderboard error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
