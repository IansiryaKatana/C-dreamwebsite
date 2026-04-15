-- Vista Mare CMS: public content + authenticated admin writes
-- Run in Supabase SQL Editor or via `supabase db push` after linking the project.

-- ─── Tables ───────────────────────────────────────────────────────────────

create table if not exists public.properties (
  id text primary key,
  slug text unique,
  title text not null,
  tag text not null default 'For sale',
  meta text,
  detail text,
  alt text not null default '',
  image_url text not null,
  price_aed numeric,
  beds integer,
  baths integer,
  location text,
  neighbourhood text,
  emirate text,
  exclusive_with_us boolean not null default false,
  interior_m2 numeric,
  plot_m2 numeric,
  latitude double precision,
  longitude double precision,
  full_address text,
  description_html text,
  property_ref_id text,
  year_built integer,
  gallery jsonb not null default '[]'::jsonb,
  home_section text not null default 'none'
    check (home_section in ('featured', 'more_homes', 'none')),
  sort_order_home integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.articles (
  id text primary key,
  slug text not null unique,
  title text not null,
  date_label text,
  author text,
  image_url text not null,
  alt text,
  excerpt text,
  date_long text,
  last_updated text,
  toc jsonb not null default '[]'::jsonb,
  sections jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hero_neighbourhoods (
  id text primary key,
  label text not null,
  route_path text not null default '/all-properties',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.marketing_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  body_html text,
  hero_image_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

-- ─── updated_at trigger ────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists properties_updated_at on public.properties;
create trigger properties_updated_at
  before update on public.properties
  for each row execute function public.set_updated_at();

drop trigger if exists articles_updated_at on public.articles;
create trigger articles_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

drop trigger if exists hero_neighbourhoods_updated_at on public.hero_neighbourhoods;
create trigger hero_neighbourhoods_updated_at
  before update on public.hero_neighbourhoods
  for each row execute function public.set_updated_at();

drop trigger if exists marketing_pages_updated_at on public.marketing_pages;
create trigger marketing_pages_updated_at
  before update on public.marketing_pages
  for each row execute function public.set_updated_at();

drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ─── RLS ───────────────────────────────────────────────────────────────────

alter table public.properties enable row level security;
alter table public.articles enable row level security;
alter table public.hero_neighbourhoods enable row level security;
alter table public.marketing_pages enable row level security;
alter table public.site_settings enable row level security;

-- Anonymous site visitors: read published content only
create policy "properties_select_public"
  on public.properties for select to anon
  using (published = true);

create policy "articles_select_public"
  on public.articles for select to anon
  using (published = true);

create policy "hero_select_public"
  on public.hero_neighbourhoods for select to anon
  using (published = true);

create policy "marketing_select_public"
  on public.marketing_pages for select to anon
  using (true);

create policy "site_settings_select_public"
  on public.site_settings for select to anon
  using (true);

-- Authenticated (admin session): full read/write
create policy "properties_all_auth"
  on public.properties for all to authenticated
  using (true) with check (true);

create policy "articles_all_auth"
  on public.articles for all to authenticated
  using (true) with check (true);

create policy "hero_all_auth"
  on public.hero_neighbourhoods for all to authenticated
  using (true) with check (true);

create policy "marketing_all_auth"
  on public.marketing_pages for all to authenticated
  using (true) with check (true);

create policy "site_settings_all_auth"
  on public.site_settings for all to authenticated
  using (true) with check (true);

-- ─── Storage bucket for uploads ────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('cms-media', 'cms-media', true)
on conflict (id) do nothing;

drop policy if exists "cms_media_public_read" on storage.objects;
create policy "cms_media_public_read"
  on storage.objects for select
  using (bucket_id = 'cms-media');

drop policy if exists "cms_media_auth_insert" on storage.objects;
create policy "cms_media_auth_insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'cms-media');

drop policy if exists "cms_media_auth_update" on storage.objects;
create policy "cms_media_auth_update"
  on storage.objects for update to authenticated
  using (bucket_id = 'cms-media');

drop policy if exists "cms_media_auth_delete" on storage.objects;
create policy "cms_media_auth_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'cms-media');
