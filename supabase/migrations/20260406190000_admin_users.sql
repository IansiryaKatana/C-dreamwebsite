-- Admin user management records for CMS operations.
-- Note: auth identity remains in Supabase Auth; this table stores management metadata.

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  email text not null unique,
  full_name text not null default '',
  role text not null default 'editor'
    check (role in ('owner', 'admin', 'editor', 'viewer')),
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists admin_users_role_idx on public.admin_users (role);
create index if not exists admin_users_active_idx on public.admin_users (is_active);
create index if not exists admin_users_email_idx on public.admin_users (email);

drop trigger if exists admin_users_updated_at on public.admin_users;
create trigger admin_users_updated_at
  before update on public.admin_users
  for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;

drop policy if exists "admin_users_all_auth" on public.admin_users;
create policy "admin_users_all_auth"
  on public.admin_users for all to authenticated
  using (true) with check (true);
