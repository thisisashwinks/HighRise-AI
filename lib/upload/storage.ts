import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
 * Upload a file to Cloudinary
 */
export async function uploadFile(file: File): Promise<UploadResult> {
  // Check if Cloudinary is configured
  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment variables.');
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
  }

  // Validate file type
  const isValidImage = ALLOWED_IMAGE_TYPES.includes(file.type);
  const isValidVideo = ALLOWED_VIDEO_TYPES.includes(file.type);
  
  if (!isValidImage && !isValidVideo) {
    throw new Error('Invalid file type. Only images (JPEG, PNG, GIF, WebP) and videos (MP4, WebM, QuickTime) are allowed.');
  }

  // Convert file to buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Cloudinary
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'highrise-ai/inspirations',
        resource_type: isValidVideo ? 'video' : 'image',
        transformation: isValidImage ? [
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ] : undefined,
      },
      (error, result) => {
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
    );

    uploadStream.end(buffer);
  });
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
