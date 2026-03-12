import { NextRequest, NextResponse } from 'next/server';
import { getInviteBySessionToken, getTestById, isUsabilityConfigured } from '@/lib/usability/db';

export const dynamic = 'force-dynamic';

/** GET ?token=... — Resolve session token to test + invite (public, for tester magic link). */
export async function GET(request: NextRequest) {
  try {
    if (!isUsabilityConfigured()) {
      return NextResponse.json({ error: 'Usability feature is not configured.' }, { status: 503 });
    }
    const token = request.nextUrl.searchParams.get('token');
    if (!token) {
      return NextResponse.json({ error: 'Missing token.' }, { status: 400 });
    }
    const invite = await getInviteBySessionToken(token);
    if (!invite) {
      return NextResponse.json({ error: 'Invalid or expired link.' }, { status: 404 });
    }
    if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Link has expired.' }, { status: 410 });
    }
    const test = await getTestById(invite.test_id);
    if (!test) {
      return NextResponse.json({ error: 'Test not found.' }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      invite: {
        id: invite.id,
        email: invite.email,
        status: invite.status,
      },
      test: {
        id: test.id,
        title: test.title,
        description: test.description,
        audience: test.audience,
        variants: test.variants,
        guided_flow: test.guided_flow,
      },
    });
  } catch (error) {
    console.error('GET /api/usability/session error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to resolve session' },
      { status: 500 }
    );
  }
}
