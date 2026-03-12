import { NextRequest, NextResponse } from 'next/server';
import { requireEmployee } from '@/lib/usability/auth';
import { getInvitesByTestId, isTestOwner, isUsabilityConfigured } from '@/lib/usability/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const auth = await requireEmployee(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }
    if (!isUsabilityConfigured()) {
      return NextResponse.json({ error: 'Usability feature is not configured.' }, { status: 503 });
    }
    const { testId } = await params;
    if (!(await isTestOwner(testId, auth.user.id))) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }
    const invites = await getInvitesByTestId(testId);
    return NextResponse.json({ success: true, invites });
  } catch (error) {
    console.error('GET /api/usability/tests/[testId]/invites error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch invites' },
      { status: 500 }
    );
  }
}
