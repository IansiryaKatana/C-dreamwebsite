-- Expand PF sync schema so key Property Finder fields are first-class columns.

alter table public.salespeople
  add column if not exists pf_public_profile_id text;

alter table public.salespeople
  add column if not exists pf_user_id text;

create unique index if not exists salespeople_pf_public_profile_id_unique
  on public.salespeople (pf_public_profile_id)
  where pf_public_profile_id is not null and btrim(pf_public_profile_id) <> '';

create unique index if not exists salespeople_pf_user_id_unique
  on public.salespeople (pf_user_id)
  where pf_user_id is not null and btrim(pf_user_id) <> '';

comment on column public.salespeople.pf_public_profile_id is
  'Property Finder public profile id used for auto-linking assignedTo.id during sync';

comment on column public.salespeople.pf_user_id is
  'Property Finder user id used for fallback linking during sync';

alter table public.properties
  add column if not exists pf_state_stage text;

alter table public.properties
  add column if not exists pf_state_type text;

alter table public.properties
  add column if not exists pf_category text;

alter table public.properties
  add column if not exists pf_offering_type text;

alter table public.properties
  add column if not exists pf_project_status text;

alter table public.properties
  add column if not exists pf_verification_status text;

alter table public.properties
  add column if not exists pf_quality_score numeric;

alter table public.properties
  add column if not exists pf_assigned_to_id text;

alter table public.properties
  add column if not exists pf_assigned_to_name text;

alter table public.properties
  add column if not exists pf_created_by_id text;

alter table public.properties
  add column if not exists pf_location_id text;

alter table public.properties
  add column if not exists pf_location_name text;

alter table public.properties
  add column if not exists pf_latitude double precision;

alter table public.properties
  add column if not exists pf_longitude double precision;

alter table public.properties
  add column if not exists pf_price_type text;

alter table public.properties
  add column if not exists pf_price_on_request boolean not null default false;

alter table public.properties
  add column if not exists pf_price_raw jsonb;

alter table public.properties
  add column if not exists pf_currency text;

alter table public.properties
  add column if not exists pf_published_at timestamptz;

create index if not exists properties_pf_state_stage_idx on public.properties (pf_state_stage);
create index if not exists properties_pf_assigned_to_id_idx on public.properties (pf_assigned_to_id);
create index if not exists properties_pf_location_id_idx on public.properties (pf_location_id);
