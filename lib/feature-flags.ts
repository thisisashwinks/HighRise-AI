import { FeatureFlags, UsageStats } from '@/types/upload';
import { getUsageStats, getCachedUsageStats, saveUsageStats } from './monitoring/usage';

/**
 * Get feature flags based on usage stats
 */
export async function getFeatureFlags(): Promise<FeatureFlags> {
  // Try to get cached stats first
  let usage = await getCachedUsageStats();
  
  // If no cache, fetch fresh stats
  if (!usage) {
    usage = await getUsageStats();
    await saveUsageStats(usage);
  }

  return {
    uploads: {
      enabled: usage.cloudinary.storage < 100 && usage.upstash.storage < 100,
      reason: usage.cloudinary.storage >= 100 
        ? 'Cloudinary storage limit exceeded' 
        : usage.upstash.storage >= 100 
        ? 'Redis storage limit exceeded'
        : undefined,
      message: usage.cloudinary.storage >= 100 || usage.upstash.storage >= 100
        ? 'Uploads are temporarily paused due to storage limits. Our team is aware and working on a solution. Check back soon!'
        : undefined,
    },
    aiGeneration: {
      enabled: usage.gemini.requests < 100,
      reason: usage.gemini.requests >= 100 ? 'Gemini API daily limit reached' : undefined,
      message: usage.gemini.requests >= 100
        ? 'AI suggestions are temporarily unavailable due to API limits. You can still upload with manual titles and descriptions.'
        : undefined,
    },
  };
}

/**
 * Check if a specific feature is enabled
 */
export async function isFeatureEnabled(feature: 'uploads' | 'aiGeneration'): Promise<boolean> {
  const flags = await getFeatureFlags();
  return flags[feature].enabled;
}

/**
 * Get feature status message
 */
export async function getFeatureMessage(feature: 'uploads' | 'aiGeneration'): Promise<string | undefined> {
  const flags = await getFeatureFlags();
  return flags[feature].message;
}
