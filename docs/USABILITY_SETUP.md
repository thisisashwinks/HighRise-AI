# Usability Testing (Prototypes) Feature

This feature adds a **Prototypes** area for usability testing: employees create tests with one or more prototype URLs, invite testers via magic link, and view session recordings and comments.

## Database setup

1. Run the SQL in [docs/USABILITY_TABLES.sql](./USABILITY_TABLES.sql) in your Supabase project (SQL Editor). This creates:
   - `usability_tests`
   - `usability_invites`
   - `usability_feedback_sessions`
   - `usability_session_events`
   - `usability_comments`

2. Use the same Supabase project and env vars as the rest of the app (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`). Auth must be configured for employee sign-in (see [SUPABASE_AUTH_SETUP.md](./SUPABASE_AUTH_SETUP.md)).

## Invite emails (optional)

By default, invite links are returned in the API response so you can copy and share them. To send real emails:

- Set `USABILITY_SEND_INVITE_EMAIL=true` and implement the email send in `app/api/usability/invites/route.ts` (e.g. Resend, SendGrid, or Supabase Edge Function).

## Routes

- **Landing:** `/prototypes` — “For HighLevel team” (dashboard) and “As a tester” (instructions).
- **Employee:** `/prototypes/dashboard`, `/prototypes/tests/new`, `/prototypes/tests/[testId]`, `/prototypes/tests/[testId]/invite`. Requires sign-in with a HighLevel email.
- **Tester:** `/prototypes/t/[sessionToken]` — magic link; no sign-up. Guided intro → prototype (with optional session recording and comments) → post-questions → thank you.

## Session recording

When the prototype is embedded in our app (iframe), cursor position and clicks are recorded (Hotjar-style). If the prototype is opened in a new tab (e.g. due to `X-Frame-Options`), recording is not available; testers can still complete post-questions and add comments in our app.
