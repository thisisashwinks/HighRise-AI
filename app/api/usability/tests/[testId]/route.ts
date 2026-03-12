import { NextRequest, NextResponse } from 'next/server';
import { requireEmployee } from '@/lib/usability/auth';
import { getTestById, updateTest, isTestOwner, isUsabilityConfigured } from '@/lib/usability/db';
import type { UsabilityVariant } from '@/types/usability';

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
    const test = await getTestById(testId);
    if (!test) {
      return NextResponse.json({ error: 'Test not found.' }, { status: 404 });
    }
    if (!(await isTestOwner(testId, auth.user.id))) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }
    return NextResponse.json({ success: true, test });
  } catch (error) {
    console.error('GET /api/usability/tests/[testId] error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch test' },
      { status: 500 }
    );
  }
}

export async function PATCH(
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
    const body = await request.json();
    const { title, description, variants, guided_flow } = body as {
      title?: string;
      description?: string;
      variants?: UsabilityVariant[];
      guided_flow?: Record<string, unknown>;
    };
    const test = await updateTest(testId, {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(variants !== undefined && { variants }),
      ...(guided_flow !== undefined && { guided_flow: guided_flow as unknown as Parameters<typeof updateTest>[1]['guided_flow'] }),
    });
    if (!test) {
      return NextResponse.json({ error: 'Test not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, test });
  } catch (error) {
    console.error('PATCH /api/usability/tests/[testId] error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update test' },
      { status: 500 }
    );
  }
}
