import { NextRequest, NextResponse } from 'next/server';
import { requireEmployee } from '@/lib/usability/auth';
import {
  getCommentsByFeedbackSessionId,
  getFeedbackSessionById,
  getInviteById,
  getTestById,
  isUsabilityConfigured,
} from '@/lib/usability/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string; sessionId: string }> }
) {
  try {
    const auth = await requireEmployee(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }
    if (!isUsabilityConfigured()) {
      return NextResponse.json({ error: 'Usability feature is not configured.' }, { status: 503 });
    }
    const { testId, sessionId } = await params;
    const test = await getTestById(testId);
    if (!test || test.owner_id !== auth.user.id) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }
    const feedbackSession = await getFeedbackSessionById(sessionId);
    if (!feedbackSession) {
      return NextResponse.json({ error: 'Session not found.' }, { status: 404 });
    }
    const invite = await getInviteById(feedbackSession.invite_id);
    if (!invite || invite.test_id !== testId) {
      return NextResponse.json({ error: 'Session does not belong to this test.' }, { status: 403 });
    }
    const comments = await getCommentsByFeedbackSessionId(sessionId);
    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error('GET .../comments error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}
