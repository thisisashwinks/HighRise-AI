-- ============================================================
-- Consolidate to a single profile table (auth_profiles only)
-- Run this in Supabase SQL Editor AFTER scripts/supabase-auth-migration.sql.
-- This removes the old "profiles" table and inspirations.profile_id so only
-- auth_profiles (linked to auth.users) is used.
-- ============================================================

-- 1. Drop old triggers that update the "profiles" table
drop trigger if exists before_insert_inspiration_set_profile on public.inspirations;
drop trigger if exists after_insert_inspiration_add_karma on public.inspirations;
drop trigger if exists after_delete_inspiration_subtract_karma on public.inspirations;

-- 2. Drop old trigger functions (optional; keeps schema clean)
drop function if exists public.set_inspiration_profile_id();
drop function if exists public.add_karma_to_profile_on_insert();
drop function if exists public.subtract_karma_from_profile_on_delete();

-- 3. Remove profile_id column from inspirations (we only use auth_profile_id now)
alter table public.inspirations
  drop column if exists profile_id;

-- 4. Drop the old profiles table
drop table if exists public.profiles;
