create extension if not exists pgcrypto;

create table if not exists public.budgets (
  user_id uuid not null references auth.users (id) on delete cascade,
  period text not null check (period in ('7days', 'month', 'year')),
  amount integer not null check (amount > 0),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, period)
);

create table if not exists public.expenses (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  category text not null check (category in ('Food', 'Gas', 'Groceries', 'Shopping', 'Bills', 'Health')),
  amount numeric(12, 2) not null check (amount > 0),
  date date not null,
  note text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  primary key (id)
);

create index if not exists expenses_user_date_idx
  on public.expenses (user_id, date desc, created_at desc, id desc);

alter table public.budgets enable row level security;
alter table public.expenses enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.budgets to authenticated;
grant select, insert, update, delete on public.expenses to authenticated;

drop policy if exists "budgets_select_own" on public.budgets;
create policy "budgets_select_own"
  on public.budgets
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "budgets_insert_own" on public.budgets;
create policy "budgets_insert_own"
  on public.budgets
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "budgets_update_own" on public.budgets;
create policy "budgets_update_own"
  on public.budgets
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "budgets_delete_own" on public.budgets;
create policy "budgets_delete_own"
  on public.budgets
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "expenses_select_own" on public.expenses;
create policy "expenses_select_own"
  on public.expenses
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "expenses_insert_own" on public.expenses;
create policy "expenses_insert_own"
  on public.expenses
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "expenses_update_own" on public.expenses;
create policy "expenses_update_own"
  on public.expenses
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "expenses_delete_own" on public.expenses;
create policy "expenses_delete_own"
  on public.expenses
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
