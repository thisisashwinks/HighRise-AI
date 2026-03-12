import { NextRequest, NextResponse } from 'next/server';
import { requireEmployee } from '@/lib/usability/auth';
import { getTestsByOwner, createTest, isUsabilityConfigured } from '@/lib/usability/db';
import type { UsabilityVariant } from '@/types/usability';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const auth = await requireEmployee(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized. Sign in with a HighLevel email.' }, { status: 401 });
    }
    if (!isUsabilityConfigured()) {
      return NextResponse.json({ error: 'Usability feature is not configured.' }, { status: 503 });
    }
    const tests = await getTestsByOwner(auth.user.id);
    return NextResponse.json({ success: true, tests });
  } catch (error) {
    console.error('GET /api/usability/tests error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch tests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireEmployee(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized. Sign in with a HighLevel email.' }, { status: 401 });
    }
    if (!isUsabilityConfigured()) {
      return NextResponse.json({ error: 'Usability feature is not configured.' }, { status: 503 });
    }
    const body = await request.json();
    const { title, description, audience, variants, guided_flow } = body as {
      title: string;
      description?: string;
      audience: 'employee' | 'customer';
      variants: UsabilityVariant[];
      guided_flow?: Record<string, unknown>;
    };
    if (!title || !audience || !Array.isArray(variants)) {
      return NextResponse.json({ error: 'Missing title, audience, or variants.' }, { status: 400 });
    }
    if (audience === 'customer' && variants.length !== 1) {
      return NextResponse.json({ error: 'Customer tests must have exactly one variant.' }, { status: 400 });
    }
    if (audience === 'employee' && (variants.length < 1 || variants.length > 10)) {
      return NextResponse.json({ error: 'Employee tests must have 1–10 variants.' }, { status: 400 });
    }
    const test = await createTest({
      owner_id: auth.user.id,
      title,
      description: description ?? undefined,
      audience,
      variants,
      guided_flow: guided_flow as Parameters<typeof createTest>[0]['guided_flow'],
    });
    return NextResponse.json({ success: true, test });
  } catch (error) {
    console.error('POST /api/usability/tests error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create test' },
      { status: 500 }
    );
  }
}
