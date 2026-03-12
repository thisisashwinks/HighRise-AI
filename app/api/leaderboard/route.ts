import { NextRequest, NextResponse } from 'next/server';
import {
  getAllInspirationsFromSupabase,
  getLeaderboardFromAuthProfiles,
  isSupabaseStorageConfigured,
} from '@/lib/upload/supabase-storage';
import { getStaticSeedLeaderboard } from '@/lib/upload/seed-data';
import { getMergedLeaderboardFromFile } from '@/lib/upload/file-store';

export const dynamic = 'force-dynamic';

/** Build leaderboard from the same inspirations list as the grid — single source of truth. */
function buildLeaderboardFromInspirations(
  inspirations: Array<{ uploaderEmail: string; uploaderName: string; product: string; karmaPoints: number }>,
  limit: number
): { rank: number; email: string; name: string; product: string; karmaPoints: number }[] {
  const byKey = new Map<string, { email: string; name: string; product: string; karma: number }>();
  for (const row of inspirations) {
    const email = String(row.uploaderEmail ?? '').trim().toLowerCase();
    const name = String(row.uploaderName ?? '').trim() || email || 'Unknown';
    const key = email || `name:${name.toLowerCase()}`;
    const karma = Number(row.karmaPoints) || 0;
    const existing = byKey.get(key);
    if (existing) {
      existing.karma += karma;
    } else {
      byKey.set(key, {
        email: email || '',
        name,
        product: row.product || 'Others',
        karma,
      });
    }
  }
  return Array.from(byKey.values())
    .sort((a, b) => b.karma - a.karma)
    .slice(0, limit)
    .map((e, i) => ({
      rank: i + 1,
      email: e.email,
      name: e.name,
      product: e.product,
      karmaPoints: e.karma,
    }));
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');

    let entries: { rank: number; email: string; name: string; product: string; karmaPoints: number }[];

    if (isSupabaseStorageConfigured()) {
      // Prefer auth_profiles (synced by DB triggers) when we have auth users; else use inspirations
      const authEntries = await getLeaderboardFromAuthProfiles(limit);
      if (authEntries.length > 0) {
        entries = authEntries;
      } else {
        const all = await getAllInspirationsFromSupabase();
        entries = buildLeaderboardFromInspirations(all, limit);
      }
    } else {
      const staticEntries = getStaticSeedLeaderboard();
      entries = await getMergedLeaderboardFromFile(staticEntries, limit);
    }

    if (entries.length === 0) {
      entries = getStaticSeedLeaderboard();
    }

    return NextResponse.json(
      { success: true, entries },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  } catch (error: unknown) {
    console.error('Get leaderboard error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
