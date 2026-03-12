import { FeatureFlags, UsageStats } from '@/types/upload';
import { getUsageStats, getCachedUsageStats, saveUsageStats } from './monitoring/usage';
import { isSupabaseStorageConfigured } from '@/lib/upload/supabase-storage';

/**
 * Get feature flags. Uploads enabled when Supabase is configured.
 */
export async function getFeatureFlags(): Promise<FeatureFlags> {
  let usage: UsageStats | null = await getCachedUsageStats();
  if (!usage) {
    usage = await getUsageStats();
    await saveUsageStats(usage);
  }

  const uploadsEnabled = isSupabaseStorageConfigured();

  return {
    uploads: {
      enabled: uploadsEnabled,
      reason: !uploadsEnabled
        ? 'Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (see docs/SUPABASE_SETUP.md).'
        : undefined,
      message: !uploadsEnabled
        ? 'Uploads are unavailable until Supabase is configured. See docs/SUPABASE_SETUP.md.'
        : undefined,
    },
    aiGeneration: {
      enabled: usage.gemini.requests < 100,
      reason: usage.gemini.requests >= 100 ? 'Gemini API daily limit reached' : undefined,
      message:
        usage.gemini.requests >= 100
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
