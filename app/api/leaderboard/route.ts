import { NextRequest, NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/upload/metadata';
import { trackUpstashCommand } from '@/lib/monitoring/usage';
import { getStaticSeedLeaderboard } from '@/lib/upload/seed-data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');

    let entries = await getLeaderboard(limit);
    if (entries.length === 0) {
      entries = getStaticSeedLeaderboard();
    } else {
      await trackUpstashCommand();
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
