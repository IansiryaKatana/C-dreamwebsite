-- Testimonials: public reviews with admin moderation workflow

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author_name text not null,
  author_role text,
  author_location text,
  rating smallint not null default 5 check (rating between 1 and 5),
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index if not exists testimonials_status_sort_idx
  on public.testimonials (status, sort_order, created_at desc);

drop trigger if exists testimonials_updated_at on public.testimonials;
create trigger testimonials_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();

alter table public.testimonials enable row level security;

create policy "testimonials_select_public"
  on public.testimonials for select to anon
  using (status = 'approved');

create policy "testimonials_insert_public"
  on public.testimonials for insert to anon
  with check (status = 'pending');

create policy "testimonials_all_auth"
  on public.testimonials for all to authenticated
  using (true) with check (true);

insert into public.testimonials (
  quote, author_name, author_role, author_location, rating, status, sort_order, reviewed_at
)
values
  (
    'Capital Dream didn’t just help me buy a property — they helped me build a strategy. Their team invests alongside their clients, which gave me complete confidence that their advice was genuine. I’ve now closed two deals in Dubai Marina and couldn’t be happier with the returns.',
    'James R.',
    'Private Investor',
    'London, UK',
    5,
    'approved',
    0,
    now()
  ),
  (
    'As a first-time investor in the UAE market, I was overwhelmed. Capital Dream walked me through every step with patience and expertise. Their market knowledge is unmatched, and I felt like I had a trusted partner, not just an agency.',
    'Priya M.',
    'Business Owner',
    'Mumbai, India',
    5,
    'approved',
    1,
    now()
  ),
  (
    'What sets Capital Dream apart is that they practice what they preach. They invest in the same projects they recommend — that level of integrity is rare in this industry. My portfolio has grown 22% in under 18 months.',
    'Ahmed Al-Farsi',
    'Entrepreneur',
    'Paris, France',
    5,
    'approved',
    2,
    now()
  ),
  (
    'I’ve worked with several real estate firms across Europe and the Middle East. Capital Dream is in a different league. Their advisory approach is data-driven, transparent, and genuinely client-focused. Dubai real estate was the best financial decision I’ve made.',
    'Sophie L.',
    'CFO',
    'Paris, France',
    5,
    'approved',
    3,
    now()
  ),
  (
    'From the initial consultation to the final handover, the Capital Dream team was professional, responsive, and proactive. They found me an off-plan opportunity in Downtown Dubai that exceeded every expectation. I’ll be investing again soon.',
    'Marcus T.',
    'Tech Executive',
    'Nice, France',
    5,
    'approved',
    4,
    now()
  ),
  (
    'Capital Dream gave me access to opportunities I never would have found on my own. Their insider knowledge of the Dubai market and their honest guidance made me feel secure every step of the way. My ROI has been exceptional.',
    'Fatima Al-Khoury',
    'Investor',
    'Beirut, Lebanon',
    5,
    'approved',
    5,
    now()
  ),
  (
    'The team at Capital Dream doesn’t just sell properties — they build relationships. They understood my investment goals and matched me with exactly the right asset. I’ve already referred three colleagues to them.',
    'David K.',
    'Portfolio Manager',
    'Zurich, Switzerland',
    5,
    'approved',
    6,
    now()
  ),
  (
    'I was skeptical at first, but learning that Capital Dream invests in the very same properties they advise changed everything for me. That alignment of interest is what sold me. My apartment in Business Bay has appreciated beautifully.',
    'Nadia S.',
    'Doctor',
    'Cairo, Egypt',
    5,
    'approved',
    7,
    now()
  ),
  (
    'Seamless, professional, and incredibly knowledgeable. Capital Dream handled everything — from legal due diligence to payment planning — so I could invest from abroad with zero stress. Truly a world-class advisory firm.',
    'Raj P.',
    'Managing Director',
    'Singapore',
    5,
    'approved',
    8,
    now()
  ),
  (
    'Dubai’s real estate market moves fast. Capital Dream kept me ahead of it. Their quarterly market insights and hands-on guidance helped me secure a premium unit before it was publicly listed. I trust them completely with my investment decisions.',
    'Elena V.',
    'Entrepreneur',
    'Moscow, Russia',
    5,
    'approved',
    9,
    now()
  )
on conflict do nothing;
