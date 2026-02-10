import { NextRequest, NextResponse } from 'next/server';
import {
  clearAllUploadsAndLeaderboard,
  saveUpload,
  generateUploadId,
  isRedisConfigured,
} from '@/lib/upload/metadata';
import { calculateKarmaPoints } from '@/lib/karma/points';
import { SEED_AUTHOR_NAME, SEED_AUTHOR_EMAIL, SEED_INSPIRATIONS, productFromTitle } from '@/lib/upload/seed-data';
import { UploadMetadata } from '@/types/upload';

export const dynamic = 'force-dynamic';

const SEED_ROLE = 'Design' as const;

/**
 * POST /api/inspirations/seed
 * Clears existing inspirations and leaderboard, then seeds the 6 example
 * inspirations from public/examples/inspirations with author "Ashwin K S".
 * Optional: protect with INSPIRATIONS_SEED_SECRET (Bearer token or ?secret=).
 */
export async function POST(request: NextRequest) {
  try {
    const secret = process.env.INSPIRATIONS_SEED_SECRET;
    if (secret) {
      const authHeader = request.headers.get('authorization');
      const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
      const querySecret = request.nextUrl.searchParams.get('secret');
      if (bearer !== secret && querySecret !== secret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    if (!isRedisConfigured()) {
      return NextResponse.json(
        { error: 'Redis is not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.' },
        { status: 503 }
      );
    }

    await clearAllUploadsAndLeaderboard();

    const base = Math.floor(Date.now() / 1000) * 1000;
    for (let i = 0; i < SEED_INSPIRATIONS.length; i++) {
      const item = SEED_INSPIRATIONS[i];
      const isFirstUpload = i === 0;
      const metadataWithoutKarma: Omit<UploadMetadata, 'karmaPoints'> = {
        id: generateUploadId(),
        mediaType: 'image',
        mediaUrl: `/examples/inspirations/${encodeURIComponent(item.imageFile)}`,
        uploaderName: SEED_AUTHOR_NAME,
        uploaderEmail: SEED_AUTHOR_EMAIL,
        product: productFromTitle(item.title),
        role: SEED_ROLE,
        title: item.title,
        description: item.description,
        timestamp: base + i,
        status: 'approved',
      };
      const karmaPoints = calculateKarmaPoints(metadataWithoutKarma, isFirstUpload);
      const metadata: UploadMetadata = {
        ...metadataWithoutKarma,
        karmaPoints,
      };
      await saveUpload(metadata);
    }

    return NextResponse.json({
      success: true,
      message: 'Cleared existing content and seeded 6 inspirations with leaderboard entry for Ashwin K S.',
      count: SEED_INSPIRATIONS.length,
    });
  } catch (error: unknown) {
    console.error('Seed inspirations error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Seed failed' },
      { status: 500 }
    );
  }
}
