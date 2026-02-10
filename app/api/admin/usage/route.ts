import { NextRequest, NextResponse } from 'next/server';
import { getUsageStats } from '@/lib/monitoring/usage';
import { getFeatureFlags } from '@/lib/feature-flags';

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];

function isAdmin(email: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email) || email.endsWith('@gohighlevel.com'); // Allow all HighLevel emails for now
}

export async function GET(request: NextRequest) {
  try {
    // Simple email-based auth (check header or query param)
    const email = request.headers.get('x-user-email') || request.nextUrl.searchParams.get('email');
    
    if (!isAdmin(email)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [usage, flags] = await Promise.all([
      getUsageStats(),
      getFeatureFlags(),
    ]);

    return NextResponse.json({
      success: true,
      usage,
      flags,
    });
  } catch (error: any) {
    console.error('Get admin usage error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch usage stats' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const email = request.headers.get('x-user-email') || request.nextUrl.searchParams.get('email');
    
    if (!isAdmin(email)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // For now, feature flags are auto-managed based on usage
    // Manual toggle can be added later if needed
    
    return NextResponse.json({
      success: true,
      message: 'Feature flags are automatically managed based on usage',
    });
  } catch (error: any) {
    console.error('Toggle feature flags error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to toggle feature flags' },
      { status: 500 }
    );
  }
}
