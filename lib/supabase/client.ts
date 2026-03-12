'use client';

import { createClient as createSupabaseClient, User, Session } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Browser Supabase client for auth (sign in, sign up, sign out, session).
 * Uses anon key; session is persisted in localStorage.
 */
export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true },
  });
}

export type { User, Session };

export function isAuthConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey);
}
