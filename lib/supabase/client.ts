'use client';

import { createClient as createSupabaseClient, User, Session, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let browserClient: SupabaseClient | null = null;

/**
 * Browser Supabase client for auth (sign in, sign up, sign out, session).
 * Uses a singleton to avoid multiple clients competing for the same storage lock
 * (which can cause "Lock broken by another request with the 'steal' option").
 */
export function createClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  if (typeof window !== 'undefined' && browserClient) {
    return browserClient;
  }
  const client = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true },
  });
  if (typeof window !== 'undefined') {
    browserClient = client;
  }
  return client;
}

export type { User, Session };

export function isAuthConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey);
}
