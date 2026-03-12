import { NextRequest, NextResponse } from 'next/server';
import { requireEmployee } from '@/lib/usability/auth';
import {
  getTestById,
  createInvite,
  isTestOwner,
  isUsabilityConfigured,
} from '@/lib/usability/db';
import { generateSessionToken } from '@/lib/usability/invite';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const auth = await requireEmployee(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }
    if (!isUsabilityConfigured()) {
      return NextResponse.json({ error: 'Usability feature is not configured.' }, { status: 503 });
    }
    const body = await request.json();
    const { test_id, emails } = body as { test_id: string; emails: string[] };
    if (!test_id || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: 'Missing test_id or emails array.' }, { status: 400 });
    }
    if (!(await isTestOwner(test_id, auth.user.id))) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }
    const test = await getTestById(test_id);
    if (!test) {
      return NextResponse.json({ error: 'Test not found.' }, { status: 404 });
    }
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 14);
    const created: { invite: Awaited<ReturnType<typeof createInvite>>; link: string }[] = [];
    const origin = request.nextUrl.origin;
    for (const email of emails) {
      const trimmed = String(email).trim().toLowerCase();
      if (!trimmed) continue;
      const sessionToken = generateSessionToken();
      const invite = await createInvite({
        test_id,
        email: trimmed,
        session_token: sessionToken,
        expires_at: expiresAt.toISOString(),
      });
      const link = `${origin}/prototypes/t/${sessionToken}`;
      created.push({ invite, link });
      // Stub: in production send email with link. For now we return links in response.
      if (process.env.USABILITY_SEND_INVITE_EMAIL === 'true') {
        // TODO: integrate Resend/SendGrid to send email with link
      }
    }
    return NextResponse.json({
      success: true,
      invites: created.map((c) => ({ ...c.invite, link: c.link })),
    });
  } catch (error) {
    console.error('POST /api/usability/invites error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create invites' },
      { status: 500 }
    );
  }
}
