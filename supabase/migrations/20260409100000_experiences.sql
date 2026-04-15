-- Buyer concierge experiences (public site + admin CRUD). Media: image or video URL (e.g. cms-media bucket).

create table if not exists public.experiences (
  id text primary key,
  phase text not null,
  title text not null,
  excerpt text,
  media_type text not null default 'image'
    check (media_type in ('image', 'video')),
  media_url text not null,
  poster_url text,
  alt text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists experiences_updated_at on public.experiences;
create trigger experiences_updated_at
  before update on public.experiences
  for each row execute function public.set_updated_at();

alter table public.experiences enable row level security;

create policy "experiences_select_public"
  on public.experiences for select to anon
  using (published = true);

create policy "experiences_all_auth"
  on public.experiences for all to authenticated
  using (true) with check (true);
