# Supabase Setup for Inspiration Uploads & Leaderboard

Inspiration uploads and the leaderboard use **Supabase only** (no Cloudinary, no Redis). This guide walks you through giving the app access to Supabase.

---

## Step 1: Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in (or create an account).
2. Click **New project**.
3. Choose your **Organization** and set:
   - **Name**: e.g. `highrise-ai` (or any name).
   - **Database password**: create a strong password and **save it somewhere safe**.
   - **Region**: pick one close to your users.
4. Click **Create new project** and wait until the project is ready.

---

## Step 2: Get your API keys and URL

1. In the Supabase dashboard, open your project.
2. Go to **Settings** (gear icon in the left sidebar) → **API**.
3. Copy and save:
   - **Project URL** (e.g. `https://xxxxx.supabase.co`) → you’ll use this as `NEXT_PUBLIC_SUPABASE_URL`.
   - **anon public** key → optional for client-side; not required for the current server-only flow.
   - **service_role** key (under “Project API keys”) → you’ll use this as `SUPABASE_SERVICE_ROLE_KEY`.  
     **Important:** Never expose the service_role key in the browser or in public repos. Use it only in server-side code (e.g. API routes).

---

## Step 3: Create the Storage bucket (for uploaded files)

1. In the left sidebar, go to **Storage**.
2. Click **New bucket**.
3. Set:
   - **Name**: `inspirations`
   - **Public bucket**: **On** (so inspiration images/videos can be viewed by anyone).
4. Click **Create bucket**.
5. (Optional) Under **Policies** for the `inspirations` bucket, you can restrict uploads to your backend only; for a simple start, the default policies or “Allow uploads for authenticated users” can be adjusted later. The app will upload via the service_role key from the server, which bypasses RLS when using the service role client.

---

## Step 4: Create the database table (for metadata and leaderboard)

1. In the left sidebar, go to **SQL Editor**.
2. Click **New query** and paste the SQL below.
3. Run the query (click **Run** or use the keyboard shortcut).

```sql
-- Inspirations table: one row per upload (image, video, or link).
-- Leaderboard is computed by summing karma_points per uploader_email.
create table if not exists public.inspirations (
  id text primary key,
  media_type text not null check (media_type in ('image', 'video', 'gif', 'link')),
  media_url text not null,
  thumbnail_url text,
  link_url text,

  uploader_name text not null,
  uploader_email text not null,
  product text not null,
  role text not null,

  title text not null,
  description text,

  timestamp bigint not null,
  karma_points int not null default 10,
  status text not null default 'approved' check (status in ('pending', 'approved', 'rejected')),

  file_size bigint,
  file_name text,
  mime_type text,

  created_at timestamptz default now()
);

-- Optional: index for listing by time and for leaderboard aggregation.
create index if not exists idx_inspirations_timestamp on public.inspirations (timestamp desc);
create index if not exists idx_inspirations_uploader_email on public.inspirations (uploader_email);

-- RLS: allow service_role to do everything; anon can read if you expose public read later.
alter table public.inspirations enable row level security;

create policy "Service role full access"
  on public.inspirations
  for all
  to service_role
  using (true)
  with check (true);
```

After this, the `inspirations` table exists. For **auth, leaderboard, and uploads**, run the **auth migration** next: see [SUPABASE_AUTH_SETUP.md](./SUPABASE_AUTH_SETUP.md). It adds a single `auth_profiles` table (linked to `auth.users`), `inspirations.auth_profile_id`, and triggers so the leaderboard stays in sync.

---

## Step 5: Add environment variables (so the app can use Supabase)

In your project root, create or edit `.env.local` and add:

```bash
# Supabase (required for Inspiration uploads and leaderboard)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Replace:

- `YOUR_PROJECT_REF` with your actual project reference (from the Project URL).
- `your_service_role_key_here` with the **service_role** key from Step 2.

Do **not** commit `.env.local` (it should already be in `.gitignore`). For Vercel (or other hosting), add the same two variables in the project’s environment settings.

---

## Step 6: Give the AI / your team “access” to Supabase

You don’t need to share keys in chat. For the AI or another developer to work on this feature:

1. **Code and config**: They need the codebase and the fact that the app uses `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (as in Step 5). No need to paste the actual keys.
2. **Local runs**: You (or they) run the app with a local `.env.local` that contains the real Supabase URL and service_role key so uploads and leaderboard work.
3. **CI / staging**: Use the same variable names in the deployment environment (e.g. Vercel) with the appropriate Supabase project URL and service_role key.

So “giving access” = ensuring the app (and only the app) has these env vars where it runs; no need to share keys with the AI.

---

## Step 7: Verify

1. Start the app: `npm run dev`.
2. Open the Inspirations page and use **Upload** to submit an image or link.
3. Check that:
   - The new inspiration appears in the grid.
   - **Storage** in Supabase shows the file in the `inspirations` bucket (if you uploaded a file).
   - **Table Editor** → `inspirations` shows the new row.
4. Open the leaderboard (on the same page or wherever you display it) and confirm your user appears with the correct karma.

If any step fails, double-check the env vars and that the SQL was run in the correct project and that the bucket name is exactly `inspirations`.

---

## Summary checklist

- [ ] Supabase project created  
- [ ] Project URL and **service_role** key copied  
- [ ] Storage bucket `inspirations` created (public)  
- [ ] SQL run to create `inspirations` table and indexes  
- [ ] **Auth migration run** (see [SUPABASE_AUTH_SETUP.md](./SUPABASE_AUTH_SETUP.md)) so sign-in, uploads, and leaderboard work  
- [ ] `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` set in `.env.local` (and in Vercel/hosting if needed)  
- [ ] Upload and leaderboard tested in the app  

After this, the Inspiration style upload and leaderboard use only Supabase (no Cloudinary or Redis).
