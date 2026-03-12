-- ============================================================
-- Supabase Auth: auth_profiles + inspirations.auth_profile_id + karma triggers
-- Run this once in Supabase Dashboard → SQL Editor (after inspirations table exists).
-- ============================================================

-- Auth-linked profiles (one row per auth user; id = auth.users.id)
create table if not exists public.auth_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  display_name text not null,
  email text not null,
  product text not null default 'Others',
  role text not null default 'Other',
  total_karma int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.auth_profiles enable row level security;

drop policy if exists "Anyone can read auth_profiles" on public.auth_profiles;
create policy "Anyone can read auth_profiles"
  on public.auth_profiles for select to anon, authenticated using (true);

drop policy if exists "Users can update own auth_profile" on public.auth_profiles;
create policy "Users can update own auth_profile"
  on public.auth_profiles for update to authenticated using (auth.uid() = id);

-- Trigger: create auth_profile when a new user signs up
create or replace function public.handle_new_auth_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.auth_profiles (id, username, display_name, email, product, role, total_karma)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data->>'username'), ''), split_part(new.email, '@', 1)),
    coalesce(nullif(trim(new.raw_user_meta_data->>'display_name'), ''), coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))),
    new.email,
    'Others',
    'Other',
    0
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- Link inspirations to auth profile (optional column)
alter table public.inspirations
  add column if not exists auth_profile_id uuid references public.auth_profiles(id) on delete set null;

create index if not exists idx_inspirations_auth_profile_id on public.inspirations (auth_profile_id);

-- When an inspiration is inserted with auth_profile_id, add karma to that profile
create or replace function public.add_karma_to_auth_profile_on_insert()
returns trigger language plpgsql as $$
begin
  if NEW.auth_profile_id is not null then
    update public.auth_profiles
    set total_karma = total_karma + coalesce(NEW.karma_points, 0),
        updated_at = now()
    where id = NEW.auth_profile_id;
  end if;
  return NEW;
end;
$$;

drop trigger if exists after_insert_inspiration_add_auth_karma on public.inspirations;
create trigger after_insert_inspiration_add_auth_karma
  after insert on public.inspirations
  for each row execute function public.add_karma_to_auth_profile_on_insert();

-- When an inspiration is deleted, subtract karma
create or replace function public.subtract_karma_from_auth_profile_on_delete()
returns trigger language plpgsql as $$
begin
  if OLD.auth_profile_id is not null then
    update public.auth_profiles
    set total_karma = greatest(0, total_karma - coalesce(OLD.karma_points, 0)),
        updated_at = now()
    where id = OLD.auth_profile_id;
  end if;
  return OLD;
end;
$$;

drop trigger if exists after_delete_inspiration_subtract_auth_karma on public.inspirations;
create trigger after_delete_inspiration_subtract_auth_karma
  after delete on public.inspirations
  for each row execute function public.subtract_karma_from_auth_profile_on_delete();
