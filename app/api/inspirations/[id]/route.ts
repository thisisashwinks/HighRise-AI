import { NextRequest, NextResponse } from 'next/server';
import { getUploadById, deleteUpload } from '@/lib/upload/metadata';
import { trackUpstashCommand } from '@/lib/monitoring/usage';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const upload = await getUploadById(params.id);
    await trackUpstashCommand();

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
