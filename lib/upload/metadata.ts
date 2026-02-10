import { Redis } from '@upstash/redis';
import { UploadMetadata, UserProfile, LeaderboardEntry } from '@/types/upload';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/**
 * Check if Redis is configured
 */
export function isRedisConfigured(): boolean {
  return !!(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

/**
 * Generate a unique ID for uploads
 */
export function generateUploadId(): string {
  return `upload_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Save upload metadata to Redis
 */
export async function saveUpload(metadata: UploadMetadata): Promise<void> {
  if (!isRedisConfigured()) {
    throw new Error('Redis is not configured. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in your environment variables.');
  }

  const uploadKey = `upload:${metadata.id}`;
  const userKey = `user:${metadata.uploaderEmail}`;
  
  // Save upload metadata
  await redis.set(uploadKey, JSON.stringify(metadata));
  
  // Add to uploads list (sorted by timestamp, newest first)
  await redis.zadd('uploads:list', {
    score: -metadata.timestamp, // Negative for descending order
    member: metadata.id
  });
  
  // Update user profile
  const existingUser = await getUserProfile(metadata.uploaderEmail);
  const updatedUser: UserProfile = {
    email: metadata.uploaderEmail,
    name: metadata.uploaderName,
    product: metadata.product,
    role: metadata.role,
    totalKarma: (existingUser?.totalKarma || 0) + metadata.karmaPoints,
    uploadCount: (existingUser?.uploadCount || 0) + 1,
    lastUploadTimestamp: metadata.timestamp,
  };
  
  await redis.set(userKey, JSON.stringify(updatedUser));
  
  // Update leaderboard (sorted set)
  await redis.zadd('leaderboard', {
    score: updatedUser.totalKarma,
    member: metadata.uploaderEmail
  });
}

/**
 * Get user's previous uploads
 */
export async function getUserUploads(email: string): Promise<UploadMetadata[]> {
  if (!isRedisConfigured()) {
    return [];
  }

  try {
    const pattern = `upload:*`;
    const keys = await redis.keys(pattern);
    
    const uploads: UploadMetadata[] = [];
    for (const key of keys) {
      const data = await redis.get(key);
      if (data) {
        // Handle both string and object responses from Upstash Redis
        let upload: UploadMetadata;
        if (typeof data === 'string') {
          upload = JSON.parse(data) as UploadMetadata;
        } else {
          upload = data as UploadMetadata;
        }
        if (upload.uploaderEmail === email) {
          uploads.push(upload);
        }
      }
    }
    
    return uploads.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error fetching user uploads:', error);
    return [];
  }
}

/**
 * Get all approved uploads
 */
export async function getAllUploads(limit: number = 100, offset: number = 0): Promise<UploadMetadata[]> {
  if (!isRedisConfigured()) {
    return [];
  }

  try {
    // Get upload IDs from sorted set
    const ids = await redis.zrange('uploads:list', offset, offset + limit - 1);
    
    // Fetch upload metadata
    const uploads: UploadMetadata[] = [];
    for (const id of ids) {
      const data = await redis.get(`upload:${id}`);
      if (data) {
        // Handle both string and object responses from Upstash Redis
        let upload: UploadMetadata;
        if (typeof data === 'string') {
          upload = JSON.parse(data) as UploadMetadata;
        } else {
          upload = data as UploadMetadata;
        }
        if (upload.status === 'approved' || upload.status === 'pending') {
          uploads.push(upload);
        }
      }
    }
    
    return uploads;
  } catch (error) {
    console.error('Error fetching uploads:', error);
    return [];
  }
}

/**
 * Get a single upload by ID
 */
export async function getUploadById(id: string): Promise<UploadMetadata | null> {
  if (!isRedisConfigured()) {
    return null;
  }

  try {
    const data = await redis.get(`upload:${id}`);
    if (!data) return null;
    
    // Handle both string and object responses from Upstash Redis
    if (typeof data === 'string') {
      return JSON.parse(data) as UploadMetadata;
    } else {
      return data as UploadMetadata;
    }
  } catch (error) {
    console.error('Error fetching upload by ID:', error);
    return null;
  }
}

/**
 * Get user profile
 */
export async function getUserProfile(email: string): Promise<UserProfile | null> {
  if (!isRedisConfigured()) {
    return null;
  }

  try {
    const data = await redis.get(`user:${email}`);
    if (!data) return null;
    
    // Handle both string and object responses from Upstash Redis
    if (typeof data === 'string') {
      return JSON.parse(data) as UserProfile;
    } else {
      return data as UserProfile;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

/**
 * Increment user karma points
 */
export async function incrementKarma(email: string, points: number): Promise<void> {
  const user = await getUserProfile(email);
  if (!user) return;
  
  const updatedUser: UserProfile = {
    ...user,
    totalKarma: user.totalKarma + points,
  };
  
  await redis.set(`user:${email}`, JSON.stringify(updatedUser));
  
  // Update leaderboard
  await redis.zadd('leaderboard', {
    score: updatedUser.totalKarma,
    member: email
  });
}

/**
 * Get leaderboard entries
 */
export async function getLeaderboard(limit: number = 50): Promise<LeaderboardEntry[]> {
  if (!isRedisConfigured()) {
    return [];
  }

  try {
    // Get top users from sorted set (descending order)
    const results = await redis.zrange('leaderboard', 0, limit - 1, { rev: true });
    
    const entries: LeaderboardEntry[] = [];
    let rank = 1;
    
    for (const email of results) {
      const user = await getUserProfile(email as string);
      if (user) {
        // Get karma from sorted set score
        const score = await redis.zscore('leaderboard', email as string);
        entries.push({
          rank: rank++,
          email: user.email,
          name: user.name,
          product: user.product,
          karmaPoints: score || user.totalKarma,
        });
      }
    }
    
    return entries;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

/**
 * Check if user has exceeded daily upload limit
 */
export async function checkUploadLimit(email: string, maxUploads: number = 30): Promise<{ allowed: boolean; count: number }> {
  const uploads = await getUserUploads(email);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = today.getTime();
  
  const todayUploads = uploads.filter(upload => upload.timestamp >= todayTimestamp);
  
  return {
    allowed: todayUploads.length < maxUploads,
    count: todayUploads.length,
  };
}

/**
 * Delete an upload
 */
export async function deleteUpload(id: string): Promise<void> {
  const upload = await getUploadById(id);
  if (!upload) return;

  // Remove from uploads list
  await redis.zrem('uploads:list', id);

  // Delete upload metadata
  await redis.del(`upload:${id}`);

  // Update user profile
  const user = await getUserProfile(upload.uploaderEmail);
  if (user) {
    const updatedUser: UserProfile = {
      ...user,
      uploadCount: Math.max(0, user.uploadCount - 1),
      totalKarma: Math.max(0, user.totalKarma - upload.karmaPoints),
    };
    await redis.set(`user:${upload.uploaderEmail}`, JSON.stringify(updatedUser));

    // Update leaderboard
    await redis.zadd('leaderboard', {
      score: updatedUser.totalKarma,
      member: upload.uploaderEmail
    });
  }
}

/**
 * Clear all uploads, user profiles, and leaderboard (for reseeding).
 */
export async function clearAllUploadsAndLeaderboard(): Promise<void> {
  if (!isRedisConfigured()) {
    throw new Error('Redis is not configured.');
  }

  const uploadKeys = await redis.keys('upload:*');
  for (const key of uploadKeys) {
    await redis.del(key);
  }

  const userKeys = await redis.keys('user:*');
  for (const key of userKeys) {
    await redis.del(key);
  }

  await redis.zremrangebyrank('uploads:list', 0, -1);
  await redis.zremrangebyrank('leaderboard', 0, -1);
}
