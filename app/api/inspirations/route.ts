import { NextRequest, NextResponse } from 'next/server';
import { uploadFile, getVideoThumbnailUrl, isCloudinaryConfigured } from '@/lib/upload/storage';
import { saveUpload, getAllUploads, checkUploadLimit, generateUploadId, isRedisConfigured } from '@/lib/upload/metadata';
import { calculateKarmaPoints } from '@/lib/karma/points';
import { getUserProfile } from '@/lib/upload/metadata';
import { trackUpstashCommand } from '@/lib/monitoring/usage';
import { getStaticSeedUploads } from '@/lib/upload/seed-data';
import { getFileUploads, addFileUpload } from '@/lib/upload/file-store';
import { UploadMetadata, MediaType } from '@/types/upload';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    let uploads: UploadMetadata[];
    let total: number;
    if (isRedisConfigured()) {
      uploads = await getAllUploads(limit, offset);
      if (uploads.length > 0) {
        await trackUpstashCommand();
      }
      if (uploads.length === 0) {
        const staticSeed = getStaticSeedUploads();
        total = staticSeed.length;
        uploads = staticSeed.slice(offset, offset + limit);
      } else {
        total = uploads.length;
      }
    } else {
      const fileUploads = await getFileUploads();
      const staticSeed = getStaticSeedUploads();
      uploads = [...fileUploads, ...staticSeed].sort((a, b) => b.timestamp - a.timestamp);
      total = uploads.length;
      uploads = uploads.slice(offset, offset + limit);
    }

    return NextResponse.json({
      success: true,
      uploads,
      total,
    });
  } catch (error: any) {
    console.error('Get inspirations error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch inspirations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const linkUrl = formData.get('linkUrl') as string | null;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const product = formData.get('product') as string;
    const role = formData.get('role') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    // Validate required fields
    if (!name || !email || !product || !title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email domain
    if (!email.endsWith('@gohighlevel.com')) {
      return NextResponse.json(
        { error: 'Email must be a HighLevel email (@gohighlevel.com)' },
        { status: 400 }
      );
    }

    // Check upload limit only when Redis is configured (otherwise no persistent count)
    if (isRedisConfigured()) {
      const limitCheck = await checkUploadLimit(email, 30);
      if (!limitCheck.allowed) {
        return NextResponse.json(
          { error: `Upload limit reached. You've uploaded ${limitCheck.count} times today. Maximum 30 uploads per day.` },
          { status: 429 }
        );
      }
    }

    // Determine media type and URL
    let mediaUrl = '';
    let mediaType: MediaType = 'image';
    let thumbnailUrl: string | undefined;
    let publicId: string | undefined;

    if (file) {
      if (isCloudinaryConfigured()) {
        // Upload file to Cloudinary
        const uploadResult = await uploadFile(file);
        mediaUrl = uploadResult.url;
        publicId = uploadResult.publicId;

        if (file.type.startsWith('video/')) {
          mediaType = 'video';
          thumbnailUrl = getVideoThumbnailUrl(publicId);
        } else if (file.type === 'image/gif') {
          mediaType = 'gif';
        } else {
          mediaType = 'image';
        }
      } else {
        // Fallback when Cloudinary is not configured: store small images as data URL
        const MAX_DATA_URL_SIZE = 500 * 1024; // 500KB
        const isImage = file.type.startsWith('image/');
        if (!isImage || file.size > MAX_DATA_URL_SIZE) {
          return NextResponse.json(
            {
              error: isImage
                ? 'File upload is not configured. Use an image under 500KB, or add an image link in the URL field instead.'
                : 'File upload is not configured. Video uploads need Cloudinary. You can add a video link in the URL field instead.',
            },
            { status: 503 }
          );
        }
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        mediaUrl = `data:${file.type};base64,${base64}`;
        mediaType = file.type === 'image/gif' ? 'gif' : 'image';
      }
    } else if (linkUrl) {
      mediaUrl = linkUrl;
      mediaType = 'link';
    } else {
      return NextResponse.json(
        { error: 'Either file or linkUrl must be provided' },
        { status: 400 }
      );
    }

    // First-upload bonus only when Redis is configured (we have history)
    let isFirstUpload = true;
    if (isRedisConfigured()) {
      const userProfile = await getUserProfile(email);
      isFirstUpload = !userProfile || userProfile.uploadCount === 0;
    }

    // Create upload metadata
    const uploadId = generateUploadId();
    const timestamp = Date.now();

    const uploadMetadata: Omit<UploadMetadata, 'karmaPoints'> = {
      id: uploadId,
      mediaType,
      mediaUrl,
      thumbnailUrl,
      linkUrl: linkUrl || undefined,
      uploaderName: name,
      uploaderEmail: email,
      product,
      role: role as any,
      title,
      description,
      timestamp,
      status: 'approved', // Auto-approve for MVP
      fileSize: file?.size,
      fileName: file?.name,
      mimeType: file?.type,
    };

    // Calculate karma points
    const karmaPoints = calculateKarmaPoints(uploadMetadata, isFirstUpload);

    const fullMetadata: UploadMetadata = {
      ...uploadMetadata,
      karmaPoints,
    };

    if (isRedisConfigured()) {
      await saveUpload(fullMetadata);
      await trackUpstashCommand();
    } else {
      await addFileUpload(fullMetadata);
    }

    return NextResponse.json({
      success: true,
      uploadId,
      karmaPoints,
      upload: fullMetadata,
    });
  } catch (error: any) {
    console.error('Create inspiration error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create inspiration' },
      { status: 500 }
    );
  }
}
