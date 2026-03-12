import { NextRequest, NextResponse } from 'next/server';
import {
  getInviteBySessionToken,
  getFeedbackSessionById,
  createComment,
  isUsabilityConfigured,
} from '@/lib/usability/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    if (!isUsabilityConfigured()) {
      return NextResponse.json({ error: 'Usability feature is not configured.' }, { status: 503 });
    }
    const body = await request.json();
    const {
      session_token,
      feedback_session_id,
      x,
      y,
      width,
      height,
      text,
    } = body as {
      session_token: string;
      feedback_session_id: string;
      x: number;
      y: number;
      width?: number;
      height?: number;
      text: string;
    };
    if (!session_token || !feedback_session_id || typeof x !== 'number' || typeof y !== 'number' || !text) {
      return NextResponse.json({ error: 'Missing session_token, feedback_session_id, x, y, or text.' }, { status: 400 });
    }
    const invite = await getInviteBySessionToken(session_token);
    if (!invite) {
      return NextResponse.json({ error: 'Invalid session token.' }, { status: 401 });
    }
    const feedbackSession = await getFeedbackSessionById(feedback_session_id);
    if (!feedbackSession || feedbackSession.invite_id !== invite.id) {
      return NextResponse.json({ error: 'Feedback session does not match invite.' }, { status: 403 });
    }
    const comment = await createComment({
      feedback_session_id,
      x,
      y,
      width: typeof width === 'number' ? width : 0,
      height: typeof height === 'number' ? height : 0,
      text: String(text).trim(),
    });
    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.error('POST /api/usability/comments error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save comment' },
      { status: 500 }
    );
  }
}
