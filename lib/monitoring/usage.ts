import { Redis } from '@upstash/redis';
import { UsageStats } from '@/types/upload';
import { v2 as cloudinary } from 'cloudinary';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Configure Cloudinary for usage checks
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Check Cloudinary usage
 */
async function checkCloudinaryUsage(): Promise<{ storage: number; bandwidth: number }> {
  try {
    // Cloudinary Admin API to get usage
    // Note: This requires admin API access. For free tier, we'll estimate based on stored files
    const resources = await cloudinary.search
      .expression('folder:highrise-ai/inspirations')
      .max_results(1000)
      .execute();

    // Estimate storage (rough calculation)
    // Free tier: 10GB = 10,000MB
    const estimatedStorageMB = (resources.total_count || 0) * 0.5; // Rough estimate: 0.5MB per file
    const storagePercent = Math.min(100, (estimatedStorageMB / 10000) * 100);

    // Bandwidth is harder to track without paid API, estimate conservatively
    const bandwidthPercent = Math.min(100, storagePercent * 1.5); // Estimate bandwidth usage

    return {
      storage: Math.round(storagePercent * 100) / 100,
      bandwidth: Math.round(bandwidthPercent * 100) / 100,
    };
  } catch (error) {
    console.error('Failed to check Cloudinary usage:', error);
    // Return safe defaults
    return { storage: 0, bandwidth: 0 };
  }
}

/**
 * Check Upstash Redis usage
 */
async function checkUpstashUsage(): Promise<{ storage: number; commands: number }> {
  try {
    // Get current month's command count from Redis
    const now = new Date();
    const monthKey = `usage:upstash:commands:${now.getFullYear()}-${now.getMonth()}`;
    const commandCount = (await redis.get(monthKey)) as number || 0;
    
    // Free tier: 500,000 commands/month
    const commandsPercent = Math.min(100, (commandCount / 500000) * 100);

    // Storage is harder to track exactly, estimate based on uploads
    const uploadKeys = await redis.keys('upload:*');
    const userKeys = await redis.keys('user:*');
    const estimatedStorageKB = (uploadKeys.length * 2) + (userKeys.length * 0.5); // Rough estimate
    const storagePercent = Math.min(100, (estimatedStorageKB / (256 * 1024)) * 100); // 256MB = 256*1024 KB

    return {
      storage: Math.round(storagePercent * 100) / 100,
      commands: Math.round(commandsPercent * 100) / 100,
    };
  } catch (error) {
    console.error('Failed to check Upstash usage:', error);
    return { storage: 0, commands: 0 };
  }
}

/**
 * Check Gemini API usage (daily)
 */
async function checkGeminiUsage(): Promise<{ requests: number }> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const key = `usage:gemini:requests:${today}`;
    const requestCount = (await redis.get(key)) as number || 0;
    
    // Free tier: 1,000 requests/day
    const requestsPercent = Math.min(100, (requestCount / 1000) * 100);

    return {
      requests: Math.round(requestsPercent * 100) / 100,
    };
  } catch (error) {
    console.error('Failed to check Gemini usage:', error);
    return { requests: 0 };
  }
}

/**
 * Get all usage stats
 */
export async function getUsageStats(): Promise<UsageStats> {
  const [cloudinary, upstash, gemini] = await Promise.all([
    checkCloudinaryUsage(),
    checkUpstashUsage(),
    checkGeminiUsage(),
  ]);

  return {
    cloudinary,
    upstash,
    gemini,
  };
}

/**
 * Track Gemini API request
 */
export async function trackGeminiRequest(): Promise<void> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const key = `usage:gemini:requests:${today}`;
    await redis.incr(key);
    await redis.expire(key, 86400); // Expire after 24 hours
  } catch (error) {
    console.error('Failed to track Gemini request:', error);
  }
}

/**
 * Track Upstash command
 */
export async function trackUpstashCommand(): Promise<void> {
  try {
    const now = new Date();
    const monthKey = `usage:upstash:commands:${now.getFullYear()}-${now.getMonth()}`;
    await redis.incr(monthKey);
    // Expire after 32 days (slightly longer than a month)
    await redis.expire(monthKey, 32 * 24 * 60 * 60);
  } catch (error) {
    console.error('Failed to track Upstash command:', error);
  }
}

/**
 * Save usage stats to Redis (for caching)
 */
export async function saveUsageStats(stats: UsageStats): Promise<void> {
  try {
    await redis.set('usage:stats', JSON.stringify(stats), { ex: 3600 }); // Cache for 1 hour
  } catch (error) {
    console.error('Failed to save usage stats:', error);
  }
}

/**
 * Get cached usage stats
 */
export async function getCachedUsageStats(): Promise<UsageStats | null> {
  try {
    const data = await redis.get('usage:stats');
    if (!data) return null;
    
    // Handle both string and object responses from Upstash Redis
    if (typeof data === 'string') {
      return JSON.parse(data) as UsageStats;
    } else {
      return data as UsageStats;
    }
  } catch (error) {
    console.error('Failed to get cached usage stats:', error);
    return null;
  }
}
