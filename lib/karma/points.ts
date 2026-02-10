import { UploadMetadata, MediaType } from '@/types/upload';

/**
 * Calculate karma points for an upload
 */
export function calculateKarmaPoints(
  upload: Omit<UploadMetadata, 'karmaPoints' | 'id' | 'timestamp' | 'status'>,
  isFirstUpload: boolean
): number {
  let points = 10; // Base points

  // First upload bonus
  if (isFirstUpload) {
    points += 5;
  }

  // Description bonus
  if (upload.description && upload.description.trim().length > 0) {
    points += 5;
  }

  // Media type bonuses
  if (upload.mediaType === 'video' || upload.mediaType === 'gif') {
    points += 10; // More effort for video/gif
  } else if (upload.mediaType === 'link') {
    points = 5; // Less effort for links, override base
  }

  return points;
}

/**
 * Get karma breakdown for display
 */
export function getKarmaBreakdown(
  upload: Omit<UploadMetadata, 'karmaPoints' | 'id' | 'timestamp' | 'status'>,
  isFirstUpload: boolean
): { base: number; bonuses: Array<{ reason: string; points: number }>; total: number } {
  const bonuses: Array<{ reason: string; points: number }> = [];
  let base = 10;

  if (isFirstUpload) {
    bonuses.push({ reason: 'First upload', points: 5 });
  }

  if (upload.description && upload.description.trim().length > 0) {
    bonuses.push({ reason: 'Includes description', points: 5 });
  }

  if (upload.mediaType === 'video' || upload.mediaType === 'gif') {
    bonuses.push({ reason: 'Video/GIF upload', points: 10 });
  } else if (upload.mediaType === 'link') {
    base = 5; // Links get lower base
  }

  const total = base + bonuses.reduce((sum, b) => sum + b.points, 0);

  return { base, bonuses, total };
}
