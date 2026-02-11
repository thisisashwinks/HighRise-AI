import { NextRequest, NextResponse } from 'next/server';
import { getUploadById, deleteUpload, isRedisConfigured } from '@/lib/upload/metadata';
import { trackUpstashCommand } from '@/lib/monitoring/usage';
import { getFileUploadById } from '@/lib/upload/file-store';
import { getAllInspirationsFromCloudinary, isCloudinaryConfigured } from '@/lib/upload/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    let upload = null;
    if (isRedisConfigured()) {
      upload = await getUploadById(id);
      if (upload) await trackUpstashCommand();
    } else if (isCloudinaryConfigured()) {
      const all = await getAllInspirationsFromCloudinary();
      upload = all.find(u => u.id === id) ?? null;
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
  } catch (error: any) {
    console.error('Get upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch upload' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add admin authentication check
    await deleteUpload(params.id);
    await trackUpstashCommand();

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error('Delete upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete upload' },
      { status: 500 }
    );
  }
}
