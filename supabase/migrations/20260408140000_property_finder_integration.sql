-- Property Finder: sync writes server-side rows into `properties` with listing_source = property_finder.
-- API credentials live in Edge Function secrets only (never in the browser).

alter table public.properties
  add column if not exists listing_source text not null default 'cms';

alter table public.properties
  drop constraint if exists properties_listing_source_check;

alter table public.properties
  add constraint properties_listing_source_check
  check (listing_source in ('cms', 'property_finder'));

alter table public.properties
  add column if not exists pf_listing_id text;

alter table public.properties
  add column if not exists pf_payload jsonb;

comment on column public.properties.listing_source is
  'cms = created in Capital Dream admin; property_finder = synced from PF Expert Enterprise API';

comment on column public.properties.pf_listing_id is
  'Property Finder listing id (string) when listing_source = property_finder';

comment on column public.properties.pf_payload is
  'Last raw listing JSON from PF API (for debugging / future field mapping)';

create unique index if not exists properties_pf_listing_id_unique
  on public.properties (pf_listing_id)
  where pf_listing_id is not null;

create index if not exists properties_listing_source_idx
  on public.properties (listing_source);
