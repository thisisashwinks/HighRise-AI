import { getSupabaseServer, isSupabaseConfigured } from '@/lib/supabase/server';
import { UploadMetadata, UserProfile, LeaderboardEntry } from '@/types/upload';
import { getStaticSeedUploads } from '@/lib/upload/seed-data';

const BUCKET = 'inspirations';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
const DAILY_UPLOAD_LIMIT = 30;

export function isSupabaseStorageConfigured(): boolean {
  return isSupabaseConfigured();
}

/**
 * Generate a unique ID for an upload (same shape as before for compatibility).
 */
export function generateUploadId(): string {
  return `upload_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Upload a file to Supabase Storage and return the public URL.
 */
export async function uploadFileToSupabase(
  file: File,
  uploadId: string
): Promise<{ url: string; path: string }> {
  if (!isSupabaseStorageConfigured()) {
    throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
  }
  const isValidImage = ALLOWED_IMAGE_TYPES.includes(file.type);
  const isValidVideo = ALLOWED_VIDEO_TYPES.includes(file.type);
  if (!isValidImage && !isValidVideo) {
    throw new Error('Invalid file type. Only images (JPEG, PNG, GIF, WebP) and videos (MP4, WebM, QuickTime) are allowed.');
  }

  const ext = file.name.split('.').pop() || 'bin';
  const path = `${uploadId}.${ext}`;

  const supabase = getSupabaseServer();
  const arrayBuffer = await file.arrayBuffer();
  const { error } = await supabase.storage.from(BUCKET).upload(path, arrayBuffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: urlData.publicUrl, path };
}

type InspirationRow = {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string | null;
  link_url?: string | null;
  uploader_name: string;
  uploader_email: string;
  product: string;
  role: string;
  title: string;
  description: string;
  timestamp: number;
  karma_points: number;
  status: string;
  file_size?: number | null;
  file_name?: string | null;
  mime_type?: string | null;
  auth_profile_id?: string | null;
};

/**
 * Insert inspiration metadata into the inspirations table.
 */
export async function insertInspiration(row: InspirationRow): Promise<void> {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('inspirations').insert(row);
  if (error) throw new Error(`Failed to save inspiration: ${error.message}`);
}

/**
 * Map UploadMetadata to DB row shape.
 */
function metadataToRow(meta: UploadMetadata, authProfileId?: string | null): InspirationRow {
  return {
    id: meta.id,
    media_type: meta.mediaType,
    media_url: meta.mediaUrl,
    thumbnail_url: meta.thumbnailUrl ?? null,
    link_url: meta.linkUrl ?? null,
    uploader_name: meta.uploaderName,
    uploader_email: meta.uploaderEmail,
    product: meta.product,
    role: meta.role,
    title: meta.title,
    description: meta.description ?? '',
    timestamp: meta.timestamp,
    karma_points: meta.karmaPoints,
    status: meta.status,
    file_size: meta.fileSize ?? null,
    file_name: meta.fileName ?? null,
    mime_type: meta.mimeType ?? null,
    auth_profile_id: authProfileId ?? null,
  };
}

/**
 * Map DB row to UploadMetadata.
 */
function rowToMetadata(r: Record<string, unknown>): UploadMetadata {
  return {
    id: r.id as string,
    mediaType: (r.media_type as UploadMetadata['mediaType']) || 'image',
    mediaUrl: r.media_url as string,
    thumbnailUrl: r.thumbnail_url as string | undefined,
    linkUrl: r.link_url as string | undefined,
    uploaderName: r.uploader_name as string,
    uploaderEmail: r.uploader_email as string,
    product: r.product as string,
    role: (r.role as UploadMetadata['role']) || 'Other',
    title: r.title as string,
    description: r.description as string,
    timestamp: Number(r.timestamp),
    karmaPoints: Number(r.karma_points) || 0,
    status: (r.status as UploadMetadata['status']) || 'approved',
    fileSize: r.file_size as number | undefined,
    fileName: r.file_name as string | undefined,
    mimeType: r.mime_type as string | undefined,
  };
}

/**
 * If the inspirations table is empty, insert the 6 default seed cards.
 * Called automatically on first load so deployed apps show the seed data.
 */
export async function seedInspirationsIfEmpty(): Promise<void> {
  if (!isSupabaseStorageConfigured()) return;
  const existing = await getAllInspirationsFromSupabase();
  if (existing.length > 0) return;
  const seedUploads = getStaticSeedUploads();
  for (const meta of seedUploads) {
    await saveInspirationToSupabase(meta);
  }
}

/**
 * Get all inspirations from Supabase, sorted by timestamp desc.
 * Uses range to fetch all rows (Supabase/PostgREST can default to 1000; we request up to 10k).
 */
export async function getAllInspirationsFromSupabase(): Promise<UploadMetadata[]> {
  if (!isSupabaseStorageConfigured()) return [];

  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('inspirations')
    .select('*')
    .order('timestamp', { ascending: false })
    .range(0, 9999);

  if (error) {
    console.error('Supabase list inspirations error:', error);
    return [];
  }
  return (data || []).map((r) => rowToMetadata(r as Record<string, unknown>));
}

/**
 * Get a single inspiration by id.
 */
export async function getInspirationById(id: string): Promise<UploadMetadata | null> {
  if (!isSupabaseStorageConfigured()) return null;

  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from('inspirations').select('*').eq('id', id).single();

  if (error || !data) return null;
  return rowToMetadata(data as Record<string, unknown>);
}

/**
 * Get user profile (aggregate from inspirations rows for that email).
 */
export async function getUserProfileFromSupabase(email: string): Promise<UserProfile | null> {
  if (!isSupabaseStorageConfigured()) return null;

  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('inspirations')
    .select('uploader_name, uploader_email, product, role, karma_points, timestamp')
    .eq('uploader_email', email);

  if (error || !data || data.length === 0) return null;

  const totalKarma = data.reduce((sum: number, r: Record<string, unknown>) => sum + Number(r.karma_points || 0), 0);
  const last = data.sort((a: Record<string, unknown>, b: Record<string, unknown>) => Number(b.timestamp) - Number(a.timestamp))[0];
  return {
    email,
    name: (last?.uploader_name as string) || email,
    product: (last?.product as string) || 'Others',
    role: (last?.role as UserProfile['role']) || 'Other',
    totalKarma,
    uploadCount: data.length,
    lastUploadTimestamp: last ? Number(last.timestamp) : undefined,
  };
}

/**
 * Check daily upload limit for an email (count rows with timestamp >= start of today).
 */
export async function checkUploadLimitSupabase(
  email: string,
  maxUploads: number = DAILY_UPLOAD_LIMIT
): Promise<{ allowed: boolean; count: number }> {
  if (!isSupabaseStorageConfigured()) {
    return { allowed: true, count: 0 };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStart = today.getTime();

  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('inspirations')
    .select('id')
    .eq('uploader_email', email)
    .gte('timestamp', todayStart);

  if (error) return { allowed: true, count: 0 };
  const count = data?.length ?? 0;
  return { allowed: count < maxUploads, count };
}

/**
 * Check daily upload limit for an auth profile (count rows with auth_profile_id and timestamp >= start of today).
 */
export async function checkUploadLimitByAuthProfileId(
  authProfileId: string,
  maxUploads: number = DAILY_UPLOAD_LIMIT
): Promise<{ allowed: boolean; count: number }> {
  if (!isSupabaseStorageConfigured()) return { allowed: true, count: 0 };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStart = today.getTime();

  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('inspirations')
    .select('id')
    .eq('auth_profile_id', authProfileId)
    .gte('timestamp', todayStart);

  if (error) return { allowed: true, count: 0 };
  const count = data?.length ?? 0;
  return { allowed: count < maxUploads, count };
}

/** Auth profile row from auth_profiles table (id = auth.users.id). */
export type AuthProfile = {
  id: string;
  username: string;
  display_name: string;
  email: string;
  product: string;
  role: string;
  total_karma: number;
};

/**
 * Get auth profile by auth user id (from Supabase Auth).
 */
export async function getAuthProfileByUserId(userId: string): Promise<AuthProfile | null> {
  if (!isSupabaseStorageConfigured()) return null;

  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('auth_profiles')
    .select('id, username, display_name, email, product, role, total_karma')
    .eq('id', userId)
    .single();

  if (error || !data) return null;
  return {
    id: data.id as string,
    username: (data.username as string) || '',
    display_name: (data.display_name as string) || '',
    email: (data.email as string) || '',
    product: (data.product as string) || 'Others',
    role: (data.role as string) || 'Other',
    total_karma: Number(data.total_karma) || 0,
  };
}

/**
 * Leaderboard from auth_profiles table (synced by DB triggers when inspirations have auth_profile_id).
 * Use when auth is enabled; falls back to inspirations-based leaderboard if table missing or empty.
 */
export async function getLeaderboardFromAuthProfiles(limit: number = 50): Promise<LeaderboardEntry[]> {
  if (!isSupabaseStorageConfigured()) return [];

  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('auth_profiles')
    .select('username, display_name, email, product, total_karma')
    .order('total_karma', { ascending: false })
    .limit(limit);

  if (error) {
    return [];
  }

  return (data || []).map((r: Record<string, unknown>, i: number) => ({
    rank: i + 1,
    email: (r.email as string) || '',
    name: (r.display_name as string) || (r.username as string) || '',
    product: (r.product as string) || 'Others',
    karmaPoints: Number(r.total_karma) || 0,
  }));
}

/**
 * Delete an inspiration by id (row + optional storage object).
 * Storage path is stored in media_url; we can derive path from id if we stored as uploadId.ext.
 */
export async function deleteInspirationSupabase(id: string): Promise<void> {
  if (!isSupabaseStorageConfigured()) return;

  const supabase = getSupabaseServer();
  const { data: row } = await supabase.from('inspirations').select('media_url').eq('id', id).single();

  const { error: deleteRowError } = await supabase.from('inspirations').delete().eq('id', id);
  if (deleteRowError) throw new Error(`Failed to delete inspiration: ${deleteRowError.message}`);

  // If media_url is a Supabase storage URL, try to remove the object (optional; row is already deleted).
  if (row?.media_url && typeof row.media_url === 'string' && row.media_url.includes('/storage/v1/object/public/')) {
    const pathMatch = row.media_url.match(/\/inspirations\/(.+?)(?:\?|$)/);
    if (pathMatch) {
      await supabase.storage.from(BUCKET).remove([pathMatch[1]]);
    }
  }
}

/**
 * Clear all rows from inspirations table (for seed/reset). Does not delete storage objects.
 */
export async function clearAllInspirationsSupabase(): Promise<void> {
  if (!isSupabaseStorageConfigured()) throw new Error('Supabase is not configured.');
  const supabase = getSupabaseServer();
  // Delete all rows (timestamp >= 0 matches every row we store)
  const { error } = await supabase.from('inspirations').delete().gte('timestamp', 0);
  if (error) throw new Error(`Failed to clear inspirations: ${error.message}`);
}

/**
 * Save full upload metadata (insert row). Used by API after uploading file or for link-only.
 * When the user is authenticated, pass authProfileId so the DB trigger updates auth_profiles.total_karma.
 */
export async function saveInspirationToSupabase(
  metadata: UploadMetadata,
  authProfileId?: string | null
): Promise<void> {
  await insertInspiration(metadataToRow(metadata, authProfileId));
}

export function validateFileSupabase(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` };
  }
  const isValidImage = ALLOWED_IMAGE_TYPES.includes(file.type);
  const isValidVideo = ALLOWED_VIDEO_TYPES.includes(file.type);
  if (!isValidImage && !isValidVideo) {
    return {
      valid: false,
      error: 'Invalid file type. Only images (JPEG, PNG, GIF, WebP) and videos (MP4, WebM, QuickTime) are allowed.',
    };
  }
  return { valid: true };
}
