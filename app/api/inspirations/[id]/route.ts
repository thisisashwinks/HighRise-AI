import { NextRequest, NextResponse } from 'next/server';
import {
  isSupabaseStorageConfigured,
  getInspirationById,
  deleteInspirationSupabase,
} from '@/lib/upload/supabase-storage';
import { getFileUploadById } from '@/lib/upload/file-store';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    let upload = null;

    if (isSupabaseStorageConfigured()) {
      upload = await getInspirationById(id);
    } else {
      upload = await getFileUploadById(id);
    }

    if (!upload) {
      return NextResponse.json(
        { error: 'Upload not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      upload,
    });
  } catch (error: unknown) {
    console.error('Get upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch upload' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (isSupabaseStorageConfigured()) {
      await deleteInspirationSupabase(id);
    } else {
      return NextResponse.json(
        { error: 'Delete is only supported when Supabase is configured' },
        { status: 501 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: unknown) {
    console.error('Delete upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete upload' },
      { status: 500 }
    );
  }
}
