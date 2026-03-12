import { NextRequest, NextResponse } from 'next/server';
import {
  getInviteBySessionToken,
  getFeedbackSessionById,
  endFeedbackSession,
  updateInviteStatus,
  isUsabilityConfigured,
} from '@/lib/usability/db';

export const dynamic = 'force-dynamic';

/** POST { session_token, feedback_session_id, answers? } — End a feedback session and optionally save post-survey answers. */
export async function POST(request: NextRequest) {
  try {
    if (!isUsabilityConfigured()) {
      return NextResponse.json({ error: 'Usability feature is not configured.' }, { status: 503 });
    }
    const body = await request.json();
    const { session_token, feedback_session_id, answers } = body as {
      session_token: string;
      feedback_session_id: string;
      answers?: Record<string, unknown>;
    };
    if (!session_token || !feedback_session_id) {
      return NextResponse.json({ error: 'Missing session_token or feedback_session_id.' }, { status: 400 });
    }
    const invite = await getInviteBySessionToken(session_token);
    if (!invite) {
      return NextResponse.json({ error: 'Invalid session token.' }, { status: 401 });
    }
    const feedbackSession = await getFeedbackSessionById(feedback_session_id);
    if (!feedbackSession || feedbackSession.invite_id !== invite.id) {
      return NextResponse.json({ error: 'Feedback session does not match invite.' }, { status: 403 });
    }
    await endFeedbackSession(feedback_session_id, answers);
    await updateInviteStatus(invite.id, 'completed');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST /api/usability/feedback-session/end error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to end session' },
      { status: 500 }
    );
  }
}
