# Supabase + Email Auth + Vercel Setup

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

## 3. Supabase authentication setup

In Supabase:

1. Keep the email/password provider enabled.
2. Decide whether new users must confirm their email before the first sign-in.
3. If you want immediate account access for a personal project, disable email confirmation in your auth settings.
4. If you plan to use confirmation or password-reset emails later, set your local and production site URLs in the auth settings first.

## 4. Vercel

1. Import the repo into Vercel
2. Set:
   - Root directory: `apps/web`
   - Framework preset: Next.js
3. Add the same two env vars from step 1
4. Deploy

## 5. Notes

- This app uses Supabase Auth with manual email-and-password accounts.
- Budgets and expenses are stored in Supabase and protected by row-level security policies.
- If email confirmation is disabled, new users can sign in immediately after registering.
