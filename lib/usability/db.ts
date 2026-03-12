import { getSupabaseServer, isSupabaseConfigured } from '@/lib/supabase/server';
import type {
  UsabilityTest,
  UsabilityInvite,
  UsabilityFeedbackSession,
  UsabilitySessionEvent,
  UsabilityComment,
  GuidedFlow,
  UsabilityVariant,
} from '@/types/usability';

export function isUsabilityConfigured(): boolean {
  return isSupabaseConfigured();
}

function mapTest(row: Record<string, unknown>): UsabilityTest {
  return {
    id: row.id as string,
    owner_id: row.owner_id as string,
    title: row.title as string,
    description: (row.description as string) ?? null,
    audience: row.audience as 'employee' | 'customer',
    variants: (row.variants as UsabilityVariant[]) ?? [],
    guided_flow: (row.guided_flow as GuidedFlow) ?? { tasks: [], questions_pre: [], questions_post: [] },
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

function mapInvite(row: Record<string, unknown>): UsabilityInvite {
  return {
    id: row.id as string,
    test_id: row.test_id as string,
    email: row.email as string,
    session_token: row.session_token as string,
    status: row.status as 'pending' | 'started' | 'completed',
    created_at: row.created_at as string,
    expires_at: (row.expires_at as string) ?? null,
  };
}

function mapFeedbackSession(row: Record<string, unknown>): UsabilityFeedbackSession {
  return {
    id: row.id as string,
    invite_id: row.invite_id as string,
    variant_index: (row.variant_index as number) ?? 0,
    started_at: row.started_at as string,
    ended_at: (row.ended_at as string) ?? null,
    answers: (row.answers as Record<string, unknown>) ?? {},
  };
}

function mapSessionEvent(row: Record<string, unknown>): UsabilitySessionEvent {
  return {
    id: row.id as string,
    feedback_session_id: row.feedback_session_id as string,
    event_type: row.event_type as 'mousemove' | 'click' | 'scroll',
    x: (row.x as number) ?? null,
    y: (row.y as number) ?? null,
    timestamp_ms: row.timestamp_ms as number,
    scroll_y: (row.scroll_y as number) ?? null,
  };
}

function mapComment(row: Record<string, unknown>): UsabilityComment {
  return {
    id: row.id as string,
    feedback_session_id: row.feedback_session_id as string,
    x: row.x as number,
    y: row.y as number,
    width: (row.width as number) ?? 0,
    height: (row.height as number) ?? 0,
    text: row.text as string,
    created_at: row.created_at as string,
  };
}

export async function getTestsByOwner(ownerId: string): Promise<UsabilityTest[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('usability_tests')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch tests: ${error.message}`);
  return (data ?? []).map(mapTest);
}

export async function getTestById(testId: string): Promise<UsabilityTest | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from('usability_tests').select('*').eq('id', testId).single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch test: ${error.message}`);
  }
  return data ? mapTest(data) : null;
}

export async function createTest(insert: {
  owner_id: string;
  title: string;
  description?: string;
  audience: 'employee' | 'customer';
  variants: UsabilityVariant[];
  guided_flow?: GuidedFlow;
}): Promise<UsabilityTest> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('usability_tests')
    .insert({
      owner_id: insert.owner_id,
      title: insert.title,
      description: insert.description ?? null,
      audience: insert.audience,
      variants: insert.variants,
      guided_flow: insert.guided_flow ?? {},
      updated_at: new Date().toISOString(),
    })
    .select('*')
    .single();
  if (error) throw new Error(`Failed to create test: ${error.message}`);
  return mapTest(data);
}

export async function updateTest(
  testId: string,
  updates: Partial<{ title: string; description: string; variants: UsabilityVariant[]; guided_flow: GuidedFlow }>
): Promise<UsabilityTest | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('usability_tests')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', testId)
    .select('*')
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to update test: ${error.message}`);
  }
  return data ? mapTest(data) : null;
}

export async function getInviteBySessionToken(sessionToken: string): Promise<UsabilityInvite | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('usability_invites')
    .select('*')
    .eq('session_token', sessionToken)
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch invite: ${error.message}`);
  }
  return data ? mapInvite(data) : null;
}

export async function getInviteById(inviteId: string): Promise<UsabilityInvite | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('usability_invites')
    .select('*')
    .eq('id', inviteId)
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch invite: ${error.message}`);
  }
  return data ? mapInvite(data) : null;
}

export async function getFeedbackSessionById(sessionId: string): Promise<UsabilityFeedbackSession | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('usability_feedback_sessions')
    .select('*')
    .eq('id', sessionId)
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch feedback session: ${error.message}`);
  }
  return data ? mapFeedbackSession(data) : null;
}

export async function getInvitesByTestId(testId: string): Promise<UsabilityInvite[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('usability_invites')
    .select('*')
    .eq('test_id', testId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch invites: ${error.message}`);
  return (data ?? []).map(mapInvite);
}

export async function createInvite(insert: {
  test_id: string;
  email: string;
  session_token: string;
  expires_at?: string | null;
}): Promise<UsabilityInvite> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('usability_invites')
    .insert(insert)
    .select('*')
    .single();
  if (error) throw new Error(`Failed to create invite: ${error.message}`);
  return mapInvite(data);
}

export async function updateInviteStatus(
  inviteId: string,
  status: 'pending' | 'started' | 'completed'
): Promise<void> {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('usability_invites').update({ status }).eq('id', inviteId);
  if (error) throw new Error(`Failed to update invite: ${error.message}`);
}

export async function createFeedbackSession(insert: {
  invite_id: string;
  variant_index: number;
}): Promise<UsabilityFeedbackSession> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('usability_feedback_sessions')
    .insert(insert)
    .select('*')
    .single();
  if (error) throw new Error(`Failed to create feedback session: ${error.message}`);
  return mapFeedbackSession(data);
}

export async function getFeedbackSessionsByInviteId(inviteId: string): Promise<UsabilityFeedbackSession[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('usability_feedback_sessions')
    .select('*')
    .eq('invite_id', inviteId)
    .order('started_at', { ascending: true });
  if (error) throw new Error(`Failed to fetch feedback sessions: ${error.message}`);
  return (data ?? []).map(mapFeedbackSession);
}

export async function getFeedbackSessionsByTestId(testId: string): Promise<
  (UsabilityFeedbackSession & { invite_email: string; invite_status: string })[]
> {
  const supabase = getSupabaseServer();
  const { data: inviteRows } = await supabase.from('usability_invites').select('id, email, status').eq('test_id', testId);
  const inviteIds = (inviteRows ?? []).map((r) => r.id);
  if (inviteIds.length === 0) return [];
  const { data: sessionRows, error } = await supabase
    .from('usability_feedback_sessions')
    .select('*')
    .in('invite_id', inviteIds)
    .order('started_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch feedback sessions: ${error.message}`);
  const inviteMap = new Map((inviteRows ?? []).map((r) => [r.id, r]));
  return (sessionRows ?? []).map((s) => ({
    ...mapFeedbackSession(s),
    invite_email: inviteMap.get(s.invite_id)?.email ?? '',
    invite_status: inviteMap.get(s.invite_id)?.status ?? 'pending',
  }));
}

export async function endFeedbackSession(sessionId: string, answers?: Record<string, unknown>): Promise<void> {
  const supabase = getSupabaseServer();
  const update: Record<string, unknown> = { ended_at: new Date().toISOString() };
  if (answers) update.answers = answers;
  const { error } = await supabase.from('usability_feedback_sessions').update(update).eq('id', sessionId);
  if (error) throw new Error(`Failed to end session: ${error.message}`);
}

export async function updateFeedbackSessionAnswers(sessionId: string, answers: Record<string, unknown>): Promise<void> {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('usability_feedback_sessions').update({ answers }).eq('id', sessionId);
  if (error) throw new Error(`Failed to update answers: ${error.message}`);
}

export async function insertSessionEvents(
  feedbackSessionId: string,
  events: Array<{ event_type: string; x?: number; y?: number; timestamp_ms: number; scroll_y?: number }>
): Promise<void> {
  if (events.length === 0) return;
  const supabase = getSupabaseServer();
  const rows = events.map((e) => ({
    feedback_session_id: feedbackSessionId,
    event_type: e.event_type,
    x: e.x ?? null,
    y: e.y ?? null,
    timestamp_ms: e.timestamp_ms,
    scroll_y: e.scroll_y ?? null,
  }));
  const { error } = await supabase.from('usability_session_events').insert(rows);
  if (error) throw new Error(`Failed to insert events: ${error.message}`);
}

export async function getSessionEvents(feedbackSessionId: string): Promise<UsabilitySessionEvent[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('usability_session_events')
    .select('*')
    .eq('feedback_session_id', feedbackSessionId)
    .order('timestamp_ms', { ascending: true });
  if (error) throw new Error(`Failed to fetch events: ${error.message}`);
  return (data ?? []).map(mapSessionEvent);
}

export async function createComment(insert: {
  feedback_session_id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}): Promise<UsabilityComment> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from('usability_comments').insert(insert).select('*').single();
  if (error) throw new Error(`Failed to create comment: ${error.message}`);
  return mapComment(data);
}

export async function getCommentsByFeedbackSessionId(feedbackSessionId: string): Promise<UsabilityComment[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('usability_comments')
    .select('*')
    .eq('feedback_session_id', feedbackSessionId)
    .order('created_at', { ascending: true });
  if (error) throw new Error(`Failed to fetch comments: ${error.message}`);
  return (data ?? []).map(mapComment);
}

export async function isTestOwner(testId: string, userId: string): Promise<boolean> {
  const test = await getTestById(testId);
  return test?.owner_id === userId;
}
