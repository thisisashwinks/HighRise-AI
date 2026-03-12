import { UsageStats } from '@/types/upload';

// In-memory Gemini request count per day (resets on server restart; no Redis)
const geminiCountByDay = new Map<string, number>();
const GEMINI_DAILY_LIMIT = 1000;

function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Check Gemini API usage (daily)
 */
async function checkGeminiUsage(): Promise<{ requests: number }> {
  const key = getTodayKey();
  const count = geminiCountByDay.get(key) ?? 0;
  const requestsPercent = Math.min(100, (count / GEMINI_DAILY_LIMIT) * 100);
  return {
    requests: Math.round(requestsPercent * 100) / 100,
  };
}

/**
 * Get all usage stats (Gemini only; Cloudinary/Redis removed in favor of Supabase)
 */
export async function getUsageStats(): Promise<UsageStats> {
  const gemini = await checkGeminiUsage();
  return { gemini };
}

/**
 * Track Gemini API request (in-memory)
 */
export async function trackGeminiRequest(): Promise<void> {
  const key = getTodayKey();
  geminiCountByDay.set(key, (geminiCountByDay.get(key) ?? 0) + 1);
}

/**
 * Save usage stats (no-op; caching removed with Redis)
 */
export async function saveUsageStats(_stats: UsageStats): Promise<void> {
  // No-op: no Redis cache
}

/**
 * Get cached usage stats (returns null; call getUsageStats() for fresh data)
 */
export async function getCachedUsageStats(): Promise<UsageStats | null> {
  return null;
}
