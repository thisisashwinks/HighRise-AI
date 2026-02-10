import { NextRequest, NextResponse } from 'next/server';
import { getUsageStats, saveUsageStats } from '@/lib/monitoring/usage';
import { getFeatureFlags } from '@/lib/feature-flags';

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.VERCEL_CRON_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Check usage and update stats
    const usage = await getUsageStats();
    await saveUsageStats(usage);

    // Get feature flags (they're calculated from usage)
    const flags = await getFeatureFlags();

    // TODO: Send admin notifications if limits are exceeded
    // For now, just log
    if (usage.cloudinary.storage >= 90 || usage.upstash.storage >= 90) {
      console.warn('Storage limits approaching:', usage);
    }

    return NextResponse.json({
      success: true,
      usage,
      flags,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Cron check usage error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check usage' },
      { status: 500 }
    );
  }
}
