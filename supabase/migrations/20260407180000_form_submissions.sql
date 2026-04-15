-- Public lead captures (property enquiries, etc.) — anon insert, admin read

create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null
    check (source in ('property_enquiry')),
  property_id text references public.properties (id) on delete set null,
  property_title text,
  name text not null,
  email text not null,
  phone text,
  message text,
  meta jsonb not null default '{}'::jsonb
);

create index if not exists form_submissions_created_at_idx
  on public.form_submissions (created_at desc);

alter table public.form_submissions enable row level security;

create policy "form_submissions_insert_anon"
  on public.form_submissions for insert to anon
  with check (true);

create policy "form_submissions_select_auth"
  on public.form_submissions for select to authenticated
  using (true);

create policy "form_submissions_delete_auth"
  on public.form_submissions for delete to authenticated
  using (true);

create policy "form_submissions_update_auth"
  on public.form_submissions for update to authenticated
  using (true) with check (true);
