import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseStorageConfigured, uploadFileToSupabase, generateUploadId } from '@/lib/upload/supabase-storage';

/**
 * Generic file upload (e.g. for inspirations). Uses Supabase Storage when configured.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!isSupabaseStorageConfigured()) {
      return NextResponse.json(
        { error: 'Upload is not configured. Set up Supabase (see docs/SUPABASE_SETUP.md).' },
        { status: 503 }
      );
    }

    const uploadId = generateUploadId();
    const { url } = await uploadFileToSupabase(file, uploadId);

    return NextResponse.json({
      success: true,
      url,
      publicId: uploadId,
    });
  } catch (error: unknown) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
