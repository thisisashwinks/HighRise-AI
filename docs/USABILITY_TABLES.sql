-- Usability testing feature: tables for prototypes, tests, invites, sessions, events, comments.
-- Run this in Supabase SQL Editor (or via migration) after SUPABASE_SETUP.md and auth are in place.

-- Tests: one per "usability test" created by an employee (owner_id = auth.users.id).
create table if not exists public.usability_tests (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  audience text not null check (audience in ('employee', 'customer')),
  variants jsonb not null default '[]',
  guided_flow jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_usability_tests_owner on public.usability_tests (owner_id);
create index if not exists idx_usability_tests_created on public.usability_tests (created_at desc);

-- Invites: one per email invited to a test; session_token used in magic link.
create table if not exists public.usability_invites (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references public.usability_tests(id) on delete cascade,
  email text not null,
  session_token text not null unique,
  status text not null default 'pending' check (status in ('pending', 'started', 'completed')),
  created_at timestamptz default now(),
  expires_at timestamptz
);

create index if not exists idx_usability_invites_test on public.usability_invites (test_id);
create unique index if not exists idx_usability_invites_session_token on public.usability_invites (session_token);

-- Feedback sessions: one per "visit" to a variant (tester can have multiple if switching variants).
create table if not exists public.usability_feedback_sessions (
  id uuid primary key default gen_random_uuid(),
  invite_id uuid not null references public.usability_invites(id) on delete cascade,
  variant_index int not null default 0,
  started_at timestamptz default now(),
  ended_at timestamptz,
  answers jsonb default '{}'
);

create index if not exists idx_usability_feedback_sessions_invite on public.usability_feedback_sessions (invite_id);

-- Session events: mousemove, click, scroll for replay (Hotjar-style).
create table if not exists public.usability_session_events (
  id uuid primary key default gen_random_uuid(),
  feedback_session_id uuid not null references public.usability_feedback_sessions(id) on delete cascade,
  event_type text not null check (event_type in ('mousemove', 'click', 'scroll')),
  x double precision,
  y double precision,
  timestamp_ms bigint not null,
  scroll_y double precision,
  created_at timestamptz default now()
);

create index if not exists idx_usability_session_events_feedback on public.usability_session_events (feedback_session_id);

-- Comments: pin or region on prototype.
create table if not exists public.usability_comments (
  id uuid primary key default gen_random_uuid(),
  feedback_session_id uuid not null references public.usability_feedback_sessions(id) on delete cascade,
  x double precision not null,
  y double precision not null,
  width double precision not null default 0,
  height double precision not null default 0,
  text text not null,
  created_at timestamptz default now()
);

create index if not exists idx_usability_comments_feedback on public.usability_comments (feedback_session_id);

-- RLS: service_role has full access; anon can only read/write via API using session_token or owner checks.
alter table public.usability_tests enable row level security;
alter table public.usability_invites enable row level security;
alter table public.usability_feedback_sessions enable row level security;
alter table public.usability_session_events enable row level security;
alter table public.usability_comments enable row level security;

create policy "Service role full access usability_tests"
  on public.usability_tests for all to service_role using (true) with check (true);
create policy "Service role full access usability_invites"
  on public.usability_invites for all to service_role using (true) with check (true);
create policy "Service role full access usability_feedback_sessions"
  on public.usability_feedback_sessions for all to service_role using (true) with check (true);
create policy "Service role full access usability_session_events"
  on public.usability_session_events for all to service_role using (true) with check (true);
create policy "Service role full access usability_comments"
  on public.usability_comments for all to service_role using (true) with check (true);
