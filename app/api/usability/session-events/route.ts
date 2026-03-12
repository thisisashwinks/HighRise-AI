import { NextRequest, NextResponse } from 'next/server';
import {
  getInviteBySessionToken,
  getFeedbackSessionById,
  getInviteById,
  insertSessionEvents,
  isUsabilityConfigured,
} from '@/lib/usability/db';
import type { SessionEventBatch } from '@/types/usability';

const MAX_EVENTS_PER_REQUEST = 100;

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    if (!isUsabilityConfigured()) {
      return NextResponse.json({ error: 'Usability feature is not configured.' }, { status: 503 });
    }
    const body = (await request.json()) as SessionEventBatch;
    const { session_token, feedback_session_id, events } = body;
    if (!session_token || !feedback_session_id || !Array.isArray(events)) {
      return NextResponse.json({ error: 'Missing session_token, feedback_session_id, or events.' }, { status: 400 });
    }
    if (events.length > MAX_EVENTS_PER_REQUEST) {
      return NextResponse.json({ error: `Max ${MAX_EVENTS_PER_REQUEST} events per request.` }, { status: 400 });
    }
    const invite = await getInviteBySessionToken(session_token);
    if (!invite) {
      return NextResponse.json({ error: 'Invalid session token.' }, { status: 401 });
    }
    const feedbackSession = await getFeedbackSessionById(feedback_session_id);
    if (!feedbackSession || feedbackSession.invite_id !== invite.id) {
      return NextResponse.json({ error: 'Feedback session does not match invite.' }, { status: 403 });
    }
    const validEvents = events
      .filter(
        (e) =>
          e.event_type === 'mousemove' || e.event_type === 'click' || e.event_type === 'scroll'
      )
      .map((e) => ({
        event_type: e.event_type,
        x: e.x,
        y: e.y,
        timestamp_ms: Number(e.timestamp_ms),
        scroll_y: e.scroll_y,
      }));
    await insertSessionEvents(feedback_session_id, validEvents);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST /api/usability/session-events error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save events' },
      { status: 500 }
    );
  }
}
