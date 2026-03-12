# Supabase Auth: Sign up, profiles, and leaderboard

With auth enabled, users **sign up** with email, password, username, and display name. Each upload is tied to their **profile** (primary key = auth user id). The **leaderboard** reads from `auth_profiles` so it stays in sync.

**Employee emails:** Only **@gohighlevel.com** addresses can sign up and upload (validated at sign-up and on upload).

**Email confirmation:** Required **only when they sign up** (to avoid fake/dummy signups). After they confirm once, they can sign in without confirming again.

---

## 1. Enable Auth in Supabase

1. In the [Supabase Dashboard](https://supabase.com/dashboard), open your project.
2. Go to **Authentication** → **Providers** → **Email**: ensure Email is enabled.
3. **Enable "Confirm email"** so new users must click the confirmation link once after sign-up (not on every login).
4. Under **Authentication** → **URL Configuration**, set:
   - **Site URL**: `http://localhost:3000` (dev) or your production URL.
   - **Redirect URLs**: add `http://localhost:3000/**` and your production URL `https://your-domain.com/**`.

---

## 2. Anon key

Add your **anon public** key to `.env.local` (never commit this file):

```bash
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

You should already have `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

---

## 3. Run the Auth SQL migration

Run the migration **once** in Supabase **SQL Editor** (Dashboard → SQL Editor → New query). The `inspirations` table must already exist.

**Files to run (in order):**

1. **`scripts/supabase-auth-migration.sql`** — creates `auth_profiles`, `inspirations.auth_profile_id`, and karma triggers.
2. **`scripts/supabase-consolidate-single-profile.sql`** — removes the old `profiles` table and `inspirations.profile_id` so only `auth_profiles` is used.

Copy each file’s contents into the SQL Editor and click **Run**.

---

## 4. App behavior after setup

- **Sign up** (email must be **@gohighlevel.com**, password, username, display name) → user must confirm email once → trigger creates `auth_profiles` row.
- **Sign in** → no confirmation needed after the first time.
- **Upload** (when signed in) → API checks profile email is @gohighlevel.com, then inserts inspiration with `auth_profile_id`; trigger updates `auth_profiles.total_karma`.
- **Leaderboard** → read from `auth_profiles` (ordered by `total_karma`).
