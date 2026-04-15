-- Sales team + property assignments (salesperson, property type for admin/filters display)

create table if not exists public.salespeople (
  id text primary key,
  slug text not null unique,
  name text not null,
  title text not null default '',
  bio text not null default '',
  profile_image_url text not null default '',
  listings_count integer not null default 0,
  phone text,
  email text,
  social_links jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists salespeople_updated_at on public.salespeople;
create trigger salespeople_updated_at
  before update on public.salespeople
  for each row execute function public.set_updated_at();

alter table public.properties
  add column if not exists salesperson_id text references public.salespeople (id) on delete set null;

alter table public.properties
  add column if not exists property_type text;

comment on column public.properties.property_type is 'e.g. Villa, Apartment, Penthouse — shown in admin and can feed future filters';

alter table public.salespeople enable row level security;

create policy "salespeople_select_public"
  on public.salespeople for select to anon
  using (published = true);

create policy "salespeople_all_auth"
  on public.salespeople for all to authenticated
  using (true) with check (true);

create index if not exists properties_salesperson_id_idx on public.properties (salesperson_id);
