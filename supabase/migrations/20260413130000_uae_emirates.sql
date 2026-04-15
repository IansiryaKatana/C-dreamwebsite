-- Canonical UAE emirate names for property filters and admin pickers.

create table if not exists public.uae_emirates (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists uae_emirates_updated_at on public.uae_emirates;
create trigger uae_emirates_updated_at
  before update on public.uae_emirates
  for each row execute function public.set_updated_at();

alter table public.uae_emirates enable row level security;

create policy "uae_emirates_select_public"
  on public.uae_emirates for select to anon
  using (published = true);

create policy "uae_emirates_all_auth"
  on public.uae_emirates for all to authenticated
  using (true) with check (true);

insert into public.uae_emirates (name, sort_order, published)
values
  ('Dubai', 1, true),
  ('Abu Dhabi', 2, true),
  ('Sharjah', 3, true),
  ('Ajman', 4, true),
  ('Umm Al Quwain', 5, true),
  ('Ras Al Khaimah', 6, true),
  ('Fujairah', 7, true),
  ('Northern Emirates', 8, true)
on conflict (name) do nothing;

comment on table public.uae_emirates is
  'Canonical emirate labels for listings and public filters; managed under Admin → Properties → Emirates.';
