import type { NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/supabase/auth-server';
import { isAllowedEmployeeEmail } from '@/lib/constants';

export interface EmployeeUser {
  id: string;
  email: string;
}

/**
 * Require a signed-in HighLevel employee for prototype dashboard and test CRUD.
 * Returns { user } or null and caller should return 401.
 */
export async function requireEmployee(request: NextRequest): Promise<{ user: EmployeeUser } | null> {
  const user = await getUserFromRequest(request);
  if (!user) return null;
  if (!isAllowedEmployeeEmail(user.email)) return null;
  return { user: { id: user.id, email: user.email } };
}
