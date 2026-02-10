import { NextRequest, NextResponse } from 'next/server';
import { generateTitleFromMedia, generateDescriptionFromMedia, generateTitleFromLink } from '@/lib/upload/ai-generation';
import { trackGeminiRequest } from '@/lib/monitoring/usage';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const linkUrl = formData.get('linkUrl') as string | null;
    const type = formData.get('type') as string; // 'title' | 'description' | 'both'

    if (!file && !linkUrl) {
      return NextResponse.json(
        { error: 'Either file or linkUrl must be provided' },
        { status: 400 }
      );
    }

    let title: string | null = null;
    let description: string | null = null;

    if (file && (type === 'title' || type === 'both')) {
      await trackGeminiRequest();
      title = await generateTitleFromMedia(file);
    }

    if (file && (type === 'description' || type === 'both')) {
      await trackGeminiRequest();
      description = await generateDescriptionFromMedia(file);
    }

    if (linkUrl && (type === 'title' || type === 'both')) {
      await trackGeminiRequest();
      title = await generateTitleFromLink(linkUrl);
    }

    return NextResponse.json({
      success: true,
      title,
      description,
    });
  } catch (error: any) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: error.message || 'AI generation failed' },
      { status: 500 }
    );
  }
}
