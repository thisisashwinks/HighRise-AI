# Supabase: Old profiles table (deprecated)

**Deprecated.** This migration created a separate `profiles` table and `inspirations.profile_id`. The app now uses a **single profile table**: `auth_profiles`, linked to `auth.users` (see [SUPABASE_AUTH_SETUP.md](./SUPABASE_AUTH_SETUP.md)).

If you already ran this migration and have both `profiles` and `auth_profiles`, run **`scripts/supabase-consolidate-single-profile.sql`** in the Supabase SQL Editor to remove the old `profiles` table and `profile_id` column. After that, only `auth_profiles` is used.

---

*The original migration SQL is kept below for reference only. Do not run it for new setups.*

<details>
<summary>Original migration (do not run for new setups)</summary>

```sql
-- Creates profiles table, profile_id on inspirations, and triggers.
-- Superseded by auth_profiles in SUPABASE_AUTH_SETUP.md.
create table if not exists public.profiles (...);
alter table public.inspirations add column if not exists profile_id ...;
-- etc.
```

</details>
