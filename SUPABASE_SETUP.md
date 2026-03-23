# Supabase + Google + Vercel Setup

## 1. Environment variables

Add these locally in `apps/web/.env.local` and in Vercel Project Settings:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

## 2. Database schema

Open the Supabase SQL Editor and run [`supabase/schema.sql`](./supabase/schema.sql).

This creates:

- `public.budgets`
- `public.expenses`
- Row Level Security policies so each signed-in user can only access their own rows

## 3. Supabase Google provider

In Supabase:

1. Go to `Authentication > Providers > Google`
2. Enable Google
3. Paste your Google OAuth client ID and secret

In `Authentication > URL Configuration`:

- `Site URL`
  - local: `http://localhost:3000`
  - production: your Vercel production URL
- `Redirect URLs`
  - `http://localhost:3000/auth/callback`
  - `https://YOUR-PRODUCTION-DOMAIN/auth/callback`
  - add your Vercel preview domain callback too if you want preview deployments to auth correctly

## 4. Google Cloud OAuth app

In Google Cloud Console:

1. Create an OAuth 2.0 Web application
2. Add Authorized JavaScript origins:
   - `http://localhost:3000`
   - `https://YOUR-PRODUCTION-DOMAIN`
3. Add Authorized redirect URIs:
   - `https://wrpbfaktpqzjprxqsauz.supabase.co/auth/v1/callback`

Supabase handles the provider callback. Your app handles the final session exchange at `/auth/callback`.

## 5. Vercel

1. Import the repo into Vercel
2. Set:
   - Root directory: `apps/web`
   - Framework preset: Next.js
3. Add the same two env vars from step 1
4. Deploy

## 6. Notes

- This app now uses Google-only auth.
- No email sender or auth domain setup is required for login.
- App data is stored in Supabase and protected by RLS policies.
