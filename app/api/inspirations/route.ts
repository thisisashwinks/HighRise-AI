import { NextRequest, NextResponse } from 'next/server';
import {
  isSupabaseStorageConfigured,
  getAllInspirationsFromSupabase,
  seedInspirationsIfEmpty,
  uploadFileToSupabase,
  saveInspirationToSupabase,
  generateUploadId,
  checkUploadLimitSupabase,
  checkUploadLimitByAuthProfileId,
  getUserProfileFromSupabase,
  getAuthProfileByUserId,
} from '@/lib/upload/supabase-storage';
import { getUserFromRequest, isAuthConfigured } from '@/lib/supabase/auth-server';
import { isAllowedEmployeeEmail, ALLOWED_EMPLOYEE_EMAIL_SUFFIX } from '@/lib/constants';
import { getStaticSeedUploads } from '@/lib/upload/seed-data';
import { getFileUploads, addFileUpload } from '@/lib/upload/file-store';
import { calculateKarmaPoints } from '@/lib/karma/points';
import { UploadMetadata, MediaType } from '@/types/upload';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    const uploaderEmail = searchParams.get('uploader_email')?.trim() || null;

    let uploads: UploadMetadata[];
    let total: number;

    if (isSupabaseStorageConfigured()) {
      await seedInspirationsIfEmpty();
      let supabaseUploads = await getAllInspirationsFromSupabase();
      if (uploaderEmail) {
        supabaseUploads = supabaseUploads.filter((u) => u.uploaderEmail === uploaderEmail);
      }
      uploads = supabaseUploads.sort((a, b) => b.timestamp - a.timestamp);
      total = uploads.length;
      uploads = uploads.slice(offset, offset + limit);
    } else {
      const fileUploads = await getFileUploads();
      const staticSeed = getStaticSeedUploads();
      let all = [...fileUploads, ...staticSeed];
      if (uploaderEmail) {
        all = all.filter((u) => u.uploaderEmail === uploaderEmail);
      }
      uploads = all.sort((a, b) => b.timestamp - a.timestamp);
      total = uploads.length;
      uploads = uploads.slice(offset, offset + limit);
    }

    return NextResponse.json(
      { success: true, uploads, total },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  } catch (error: unknown) {
    console.error('Get inspirations error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch inspirations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const linkUrl = formData.get('linkUrl') as string | null;
    const product = formData.get('product') as string;
    const role = formData.get('role') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    // When auth is enabled, require signed-in user; name/email come from auth profile
    const authUser = isAuthConfigured() ? await getUserFromRequest(request) : null;
    let name: string;
    let email: string;
    let authProfileId: string | null = null;

    if (authUser) {
      const profile = await getAuthProfileByUserId(authUser.id);
      if (!profile) {
        return NextResponse.json(
          { error: 'Profile not found. Please complete sign-up and try again.' },
          { status: 400 }
        );
      }
      if (!isAllowedEmployeeEmail(profile.email)) {
        return NextResponse.json(
          { error: `Only HighLevel employee emails (${ALLOWED_EMPLOYEE_EMAIL_SUFFIX}) can upload.` },
          { status: 403 }
        );
      }
      name = profile.display_name || profile.username;
      email = profile.email;
      authProfileId = profile.id;

      if (isSupabaseStorageConfigured()) {
        const limitCheck = await checkUploadLimitByAuthProfileId(profile.id, 30);
        if (!limitCheck.allowed) {
          return NextResponse.json(
            { error: `Upload limit reached. You've uploaded ${limitCheck.count} times today. Maximum 30 uploads per day.` },
            { status: 429 }
          );
        }
      }
    } else {
      if (isAuthConfigured()) {
        return NextResponse.json(
          { error: 'Sign in required to upload. Please sign in and try again.' },
          { status: 401 }
        );
      }
      name = formData.get('name') as string;
      email = formData.get('email') as string;
      if (!name || !email || !product || !title) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }
      if (!isAllowedEmployeeEmail(email)) {
        return NextResponse.json(
          { error: `Email must be a HighLevel employee email (${ALLOWED_EMPLOYEE_EMAIL_SUFFIX})` },
          { status: 400 }
        );
      }
      if (isSupabaseStorageConfigured()) {
        const limitCheck = await checkUploadLimitSupabase(email, 30);
        if (!limitCheck.allowed) {
          return NextResponse.json(
            { error: `Upload limit reached. You've uploaded ${limitCheck.count} times today. Maximum 30 uploads per day.` },
            { status: 429 }
          );
        }
      }
    }

    if (!product || !title) {
      return NextResponse.json(
        { error: 'Missing required fields (product, title)' },
        { status: 400 }
      );
    }

    let mediaUrl = '';
    let mediaType: MediaType = 'image';
    let thumbnailUrl: string | undefined;
    const uploadId = generateUploadId();
    const timestamp = Date.now();

    if (file) {
      if (isSupabaseStorageConfigured()) {
        const uploadResult = await uploadFileToSupabase(file, uploadId);
        mediaUrl = uploadResult.url;
        if (file.type.startsWith('video/')) {
          mediaType = 'video';
          // Supabase Storage doesn't generate video thumbnails; leave undefined or add later
        } else if (file.type === 'image/gif') {
          mediaType = 'gif';
        } else {
          mediaType = 'image';
        }
      } else {
        const MAX_DATA_URL_SIZE = 500 * 1024;
        const isImage = file.type.startsWith('image/');
        if (!isImage || file.size > MAX_DATA_URL_SIZE) {
          return NextResponse.json(
            {
              error: isImage
                ? 'File upload is not configured. Set up Supabase (see docs/SUPABASE_SETUP.md). Use an image under 500KB or add a link in the URL field.'
                : 'File upload is not configured. Set up Supabase (see docs/SUPABASE_SETUP.md) or add a video link in the URL field.',
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

    let isFirstUpload = true;
    if (isSupabaseStorageConfigured()) {
      if (authProfileId) {
        const userProfile = await getUserProfileFromSupabase(email);
        isFirstUpload = !userProfile || userProfile.uploadCount === 0;
      } else {
        const userProfile = await getUserProfileFromSupabase(email);
        isFirstUpload = !userProfile || userProfile.uploadCount === 0;
      }
    }

    const uploadMetadata: Omit<UploadMetadata, 'karmaPoints'> = {
      id: uploadId,
      mediaType,
      mediaUrl,
      thumbnailUrl,
      linkUrl: linkUrl || undefined,
      uploaderName: name,
      uploaderEmail: email,
      product,
      role: role as UploadMetadata['role'],
      title,
      description,
      timestamp,
      status: 'approved',
      fileSize: file?.size,
      fileName: file?.name,
      mimeType: file?.type,
    };

    const karmaPoints = calculateKarmaPoints(uploadMetadata, isFirstUpload);
    const fullMetadata: UploadMetadata = { ...uploadMetadata, karmaPoints };

    if (isSupabaseStorageConfigured()) {
      await saveInspirationToSupabase(fullMetadata, authProfileId || undefined);
    } else {
      await addFileUpload(fullMetadata);
    }

    return NextResponse.json({
      success: true,
      uploadId,
      karmaPoints,
      upload: fullMetadata,
    });
  } catch (error: unknown) {
    console.error('Create inspiration error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create inspiration' },
      { status: 500 }
    );
  }
}
