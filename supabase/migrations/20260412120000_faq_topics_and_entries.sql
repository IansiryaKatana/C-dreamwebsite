-- FAQ topics and entries for public site + admin CMS

create table if not exists public.faq_topics (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faq_entries (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.faq_topics (id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists faq_entries_topic_sort_idx
  on public.faq_entries (topic_id, sort_order);

drop trigger if exists faq_topics_updated_at on public.faq_topics;
create trigger faq_topics_updated_at
  before update on public.faq_topics
  for each row execute function public.set_updated_at();

drop trigger if exists faq_entries_updated_at on public.faq_entries;
create trigger faq_entries_updated_at
  before update on public.faq_entries
  for each row execute function public.set_updated_at();

alter table public.faq_topics enable row level security;
alter table public.faq_entries enable row level security;

create policy "faq_topics_select_public"
  on public.faq_topics for select to anon
  using (published = true);

create policy "faq_entries_select_public"
  on public.faq_entries for select to anon
  using (published = true);

create policy "faq_topics_all_auth"
  on public.faq_topics for all to authenticated
  using (true) with check (true);

create policy "faq_entries_all_auth"
  on public.faq_entries for all to authenticated
  using (true) with check (true);
