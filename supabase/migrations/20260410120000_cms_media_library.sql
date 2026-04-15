-- Media library: metadata for every file uploaded to cms-media (admin CRUD + picker).

create table if not exists public.cms_media (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  public_url text not null,
  folder text not null default '',
  original_filename text not null default '',
  mime_type text not null default 'application/octet-stream',
  file_size_bytes bigint,
  kind text not null default 'image' check (kind in ('image', 'video')),
  alt_text text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists cms_media_updated_at on public.cms_media;
create trigger cms_media_updated_at
  before update on public.cms_media
  for each row execute function public.set_updated_at();

create index if not exists cms_media_created_at_idx on public.cms_media (created_at desc);
create index if not exists cms_media_kind_idx on public.cms_media (kind);
create index if not exists cms_media_folder_idx on public.cms_media (folder);

alter table public.cms_media enable row level security;

-- Admin-only: public site reads file URLs from storage directly, not this table.
create policy "cms_media_all_auth"
  on public.cms_media for all to authenticated
  using (true) with check (true);
