import { v2 as cloudinary } from 'cloudinary';
import { UploadMetadata } from '@/types/upload';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const INSPIRATIONS_FOLDER = 'highrise-ai/inspirations';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

export interface UploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format: string;
}

/** Context we store on each Cloudinary asset so we can list inspirations without Redis */
export interface InspirationContext {
  title: string;
  description: string;
  uploader_name: string;
  uploader_email: string;
  product: string;
  role: string;
  inspiration_id: string;
  timestamp: string;
  karma_points: string;
}

/**
 * Check if Cloudinary is configured
 */
export function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

/**
 * Upload a file to Cloudinary with optional context (for inspirations metadata when not using Redis).
 * Pass uniquePublicId to guarantee a new asset every time (prevents second upload overwriting the first).
 */
export async function uploadFile(file: File, context?: InspirationContext, uniquePublicId?: string): Promise<UploadResult> {
  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment variables.');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
  }

  const isValidImage = ALLOWED_IMAGE_TYPES.includes(file.type);
  const isValidVideo = ALLOWED_VIDEO_TYPES.includes(file.type);
  if (!isValidImage && !isValidVideo) {
    throw new Error('Invalid file type. Only images (JPEG, PNG, GIF, WebP) and videos (MP4, WebM, QuickTime) are allowed.');
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const options: Record<string, unknown> = {
    folder: INSPIRATIONS_FOLDER,
    resource_type: isValidVideo ? 'video' : 'image',
    transformation: isValidImage ? [{ quality: 'auto' }, { fetch_format: 'auto' }] : undefined,
  };
  if (uniquePublicId) {
    options.public_id = uniquePublicId;
  }
  if (context) {
    options.context = Object.fromEntries(
      Object.entries(context).map(([k, v]) => [k, String(v)])
    );
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      options,
      (error: Error | undefined, result: any) => {
        if (error) {
          reject(new Error(`Upload failed: ${error.message}`));
          return;
        }
        if (!result) {
          reject(new Error('Upload failed: No result returned'));
          return;
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
        });
      }
    ).end(buffer);
  });
}

const DEFAULT_KARMA = 20;

function resourceToMetadata(r: any): UploadMetadata {
  const custom = r.context?.custom ?? {};
  const createdAt = r.created_at ? new Date(r.created_at).getTime() : Date.now();
  const isVideo = (r.resource_type || 'image') === 'video';
  return {
    id: custom.inspiration_id || r.public_id,
    mediaType: isVideo ? 'video' : (r.format === 'gif' ? 'gif' : 'image'),
    mediaUrl: r.secure_url,
    thumbnailUrl: isVideo ? getVideoThumbnailUrl(r.public_id) : undefined,
    uploaderName: custom.uploader_name || 'Unknown',
    uploaderEmail: custom.uploader_email || '',
    product: custom.product || 'Others',
    role: (custom.role as any) || 'Other',
    title: custom.title || r.public_id?.split('/').pop() || 'Untitled',
    description: custom.description || '',
    timestamp: createdAt,
    karmaPoints: parseInt(custom.karma_points, 10) || DEFAULT_KARMA,
    status: 'approved' as const,
  };
}

/**
 * List all inspiration assets from Cloudinary (folder highrise-ai/inspirations).
 * Fetches all pages (next_cursor) so every upload is returned.
 */
export async function listInspirationsFromCloudinary(): Promise<UploadMetadata[]> {
  if (!isCloudinaryConfigured()) return [];

  const all: UploadMetadata[] = [];
  let cursor: string | undefined;
  const baseOptions = {
    type: 'upload' as const,
    prefix: INSPIRATIONS_FOLDER + '/',
    max_results: 500,
    resource_type: 'image' as const,
  };

  try {
    do {
      const result = await new Promise<{ resources?: any[]; next_cursor?: string }>((resolve, reject) => {
        const options = cursor ? { ...baseOptions, next_cursor: cursor } : baseOptions;
        cloudinary.api.resources(options, (err: Error | undefined, res: any) => {
          if (err) reject(err);
          else resolve(res || {});
        });
      });
      const resources = result?.resources ?? [];
      for (const r of resources) all.push(resourceToMetadata(r));
      cursor = result?.next_cursor;
    } while (cursor);
  } catch (e) {
    console.error('Cloudinary list images pagination error:', e);
  }

  all.sort((a, b) => b.timestamp - a.timestamp);
  return all;
}

/**
 * List video inspirations from the same folder (Cloudinary API is per resource_type). Fetches all pages.
 */
export async function listVideoInspirationsFromCloudinary(): Promise<UploadMetadata[]> {
  if (!isCloudinaryConfigured()) return [];

  const all: UploadMetadata[] = [];
  let cursor: string | undefined;
  const baseOptions = {
    type: 'upload' as const,
    prefix: INSPIRATIONS_FOLDER + '/',
    max_results: 500,
    resource_type: 'video' as const,
  };

  try {
    do {
      const result = await new Promise<{ resources?: any[]; next_cursor?: string }>((resolve, reject) => {
        const options = cursor ? { ...baseOptions, next_cursor: cursor } : baseOptions;
        cloudinary.api.resources(options, (err: Error | undefined, res: any) => {
          if (err) reject(err);
          else resolve(res || {});
        });
      });
      const resources = result?.resources ?? [];
      for (const r of resources) all.push(resourceToMetadata(r));
      cursor = result?.next_cursor;
    } while (cursor);
  } catch (e) {
    console.error('Cloudinary list videos pagination error:', e);
  }

  all.sort((a, b) => b.timestamp - a.timestamp);
  return all;
}

/**
 * Get all inspirations from Cloudinary (images + videos). Single source of truth without Redis.
 * On API errors we return whatever we got (or []) so the app still shows static seed.
 */
export async function getAllInspirationsFromCloudinary(): Promise<UploadMetadata[]> {
  let images: UploadMetadata[] = [];
  let videos: UploadMetadata[] = [];
  try {
    images = await listInspirationsFromCloudinary();
  } catch (e) {
    console.error('Cloudinary list images error:', e);
  }
  try {
    videos = await listVideoInspirationsFromCloudinary();
  } catch (e) {
    console.error('Cloudinary list videos error:', e);
  }
  const combined = [...images, ...videos].sort((a, b) => b.timestamp - a.timestamp);
  return combined;
}

/**
 * Delete a file from Cloudinary
 */
export async function deleteFile(publicId: string, resourceType: 'image' | 'video' = 'image'): Promise<void> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, { resource_type: resourceType }, (error, result) => {
      if (error) {
        reject(new Error(`Delete failed: ${error.message}`));
        return;
      }
      resolve();
    });
  });
}

/**
 * Generate a thumbnail URL for a video
 */
export function getVideoThumbnailUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    transformation: [
      { width: 800, height: 600, crop: 'fill' },
      { quality: 'auto' },
      { fetch_format: 'auto' }
    ]
  });
}

/**
 * Validate file before upload
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`
    };
  }

  const isValidImage = ALLOWED_IMAGE_TYPES.includes(file.type);
  const isValidVideo = ALLOWED_VIDEO_TYPES.includes(file.type);
  
  if (!isValidImage && !isValidVideo) {
    return {
      valid: false,
      error: 'Invalid file type. Only images (JPEG, PNG, GIF, WebP) and videos (MP4, WebM, QuickTime) are allowed.'
    };
  }

  return { valid: true };
}
