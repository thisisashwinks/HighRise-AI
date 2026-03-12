import { NextRequest, NextResponse } from 'next/server';
import {
  getInviteBySessionToken,
  createFeedbackSession,
  updateInviteStatus,
  isUsabilityConfigured,
} from '@/lib/usability/db';

export const dynamic = 'force-dynamic';

/** POST { session_token, variant_index } — Start a feedback session for the current variant (e.g. when tester opens a variant). */
export async function POST(request: NextRequest) {
  try {
    if (!isUsabilityConfigured()) {
      return NextResponse.json({ error: 'Usability feature is not configured.' }, { status: 503 });
    }
    const body = await request.json();
    const { session_token, variant_index } = body as { session_token: string; variant_index: number };
    if (!session_token || typeof variant_index !== 'number') {
      return NextResponse.json({ error: 'Missing session_token or variant_index.' }, { status: 400 });
    }
    const invite = await getInviteBySessionToken(session_token);
    if (!invite) {
      return NextResponse.json({ error: 'Invalid session token.' }, { status: 401 });
    }
    const session = await createFeedbackSession({
      invite_id: invite.id,
      variant_index,
    });
    await updateInviteStatus(invite.id, 'started');
    return NextResponse.json({ success: true, feedback_session: session });
  } catch (error) {
    console.error('POST /api/usability/feedback-session error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to start session' },
      { status: 500 }
    );
  }
}
