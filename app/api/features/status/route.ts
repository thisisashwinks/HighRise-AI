import { NextRequest, NextResponse } from 'next/server';
import { getFeatureFlags } from '@/lib/feature-flags';
import { getUsageStats } from '@/lib/monitoring/usage';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const [flags, usage] = await Promise.all([
      getFeatureFlags(),
      getUsageStats(),
    ]);

    return NextResponse.json({
      success: true,
      flags,
      usage,
    });
  } catch (error: any) {
    console.error('Get feature status error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch feature status' },
      { status: 500 }
    );
  }
}
