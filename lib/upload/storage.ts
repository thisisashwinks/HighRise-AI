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
 */
export async function uploadFile(file: File, context?: InspirationContext): Promise<UploadResult> {
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

/**
 * List all inspiration assets from Cloudinary (folder highrise-ai/inspirations).
 * Uses stored context for metadata when present; otherwise uses public_id and defaults.
 * This is the single source of truth when Redis is not configured.
 */
export async function listInspirationsFromCloudinary(): Promise<UploadMetadata[]> {
  if (!isCloudinaryConfigured()) return [];

  return new Promise((resolve) => {
    const options = {
      type: 'upload',
      prefix: INSPIRATIONS_FOLDER + '/',
      max_results: 500,
      resource_type: 'image',
    };
    cloudinary.api.resources(options, (err: Error | undefined, result: { resources?: any[] }) => {
      if (err) {
        console.error('Cloudinary list error:', err);
        resolve([]);
        return;
      }
      const resources = result?.resources ?? [];
      const list: UploadMetadata[] = resources.map((r: any) => {
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
      });
      list.sort((a, b) => b.timestamp - a.timestamp);
      resolve(list);
    });
  });
}

/**
 * List video inspirations from the same folder (Cloudinary API is per resource_type).
 */
export async function listVideoInspirationsFromCloudinary(): Promise<UploadMetadata[]> {
  if (!isCloudinaryConfigured()) return [];

  return new Promise((resolve) => {
    const options = {
      type: 'upload',
      prefix: INSPIRATIONS_FOLDER + '/',
      max_results: 500,
      resource_type: 'video',
    };
    cloudinary.api.resources(options, (err: Error | undefined, result: { resources?: any[] }) => {
      if (err) {
        resolve([]);
        return;
      }
      const resources = result?.resources ?? [];
      const list: UploadMetadata[] = resources.map((r: any) => {
        const custom = r.context?.custom ?? {};
        const createdAt = r.created_at ? new Date(r.created_at).getTime() : Date.now();
        return {
          id: custom.inspiration_id || r.public_id,
          mediaType: 'video',
          mediaUrl: r.secure_url,
          thumbnailUrl: getVideoThumbnailUrl(r.public_id),
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
      });
      list.sort((a, b) => b.timestamp - a.timestamp);
      resolve(list);
    });
  });
}

/**
 * Get all inspirations from Cloudinary (images + videos). Single source of truth without Redis.
 */
export async function getAllInspirationsFromCloudinary(): Promise<UploadMetadata[]> {
  const [images, videos] = await Promise.all([
    listInspirationsFromCloudinary(),
    listVideoInspirationsFromCloudinary(),
  ]);
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
