-- Listing tag labels (properties.tag) and property type labels (properties.property_type)
-- Managed in admin under Properties → Listing tags / Property types.

create table if not exists public.property_listing_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.property_type_options (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists property_listing_tags_sort_idx on public.property_listing_tags (sort_order, name);
create index if not exists property_type_options_sort_idx on public.property_type_options (sort_order, name);

drop trigger if exists property_listing_tags_updated_at on public.property_listing_tags;
create trigger property_listing_tags_updated_at
  before update on public.property_listing_tags
  for each row execute function public.set_updated_at();

drop trigger if exists property_type_options_updated_at on public.property_type_options;
create trigger property_type_options_updated_at
  before update on public.property_type_options
  for each row execute function public.set_updated_at();

alter table public.property_listing_tags enable row level security;
alter table public.property_type_options enable row level security;

drop policy if exists "property_listing_tags_all_auth" on public.property_listing_tags;
create policy "property_listing_tags_all_auth"
  on public.property_listing_tags for all to authenticated
  using (true) with check (true);

drop policy if exists "property_type_options_all_auth" on public.property_type_options;
create policy "property_type_options_all_auth"
  on public.property_type_options for all to authenticated
  using (true) with check (true);

-- Public read: optional for unauthenticated clients; safe (display labels only).
drop policy if exists "property_listing_tags_select_anon" on public.property_listing_tags;
create policy "property_listing_tags_select_anon"
  on public.property_listing_tags for select to anon
  using (true);

drop policy if exists "property_type_options_select_anon" on public.property_type_options;
create policy "property_type_options_select_anon"
  on public.property_type_options for select to anon
  using (true);

insert into public.property_listing_tags (name, sort_order) values
  ('For sale', 0),
  ('For rent', 10),
  ('New', 20),
  ('Exclusive', 30)
on conflict (name) do nothing;

insert into public.property_type_options (name, sort_order) values
  ('Villa', 0),
  ('Apartment', 10),
  ('Penthouse', 20),
  ('Townhouse', 30)
on conflict (name) do nothing;
