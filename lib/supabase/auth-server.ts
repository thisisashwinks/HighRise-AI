import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Get the authenticated user from a request (Authorization: Bearer <jwt>).
 * Returns null if no token or invalid.
 */
export async function getUserFromRequest(request: Request): Promise<{ id: string; email: string } | null> {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return null;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  return { id: user.id, email: user.email ?? '' };
}

export function isAuthConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey);
}
