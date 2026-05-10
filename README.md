# Submitted

Submitted is a minimalist web MVP for releasing a private request, receiving a tracking ID, and stepping away.

## Setup

1. Install dependencies with your package manager.
2. Copy `.env.example` to `.env.local`.
3. Add Supabase and Resend credentials.
4. Run the SQL in `supabase/schema.sql` in your Supabase project.
5. Start the app with `npm run dev` or the equivalent command for your package manager.

## Environment

- `NEXT_PUBLIC_SITE_URL`: public app URL, used in confirmation emails.
- `SUPABASE_URL`: Supabase project URL.
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key for server-side inserts and updates.
- `RESEND_API_KEY`: Resend API key.
- `RESEND_FROM`: sender address for confirmation emails.
