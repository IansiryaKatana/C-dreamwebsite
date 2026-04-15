const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`

export type Article = {
  id: string
  slug: string
  title: string
  dateLabel: string
  author: string
  image: string
  alt: string
  excerpt: string
}

/** Order: first two render as featured (wide row); remainder as three-up. */
export const articles: Article[] = [
  {
    id: '1',
    slug: 'dubai-price-index-q1',
    title: 'What the latest Dubai price data means for UAE-focused buyers',
    dateLabel: '12 Mar 2026',
    author: 'Capital Dreams',
    image: u('photo-1507525428034-b723cf961d3e', 1600, 1000),
    alt: 'Dubai skyline at sunset with waterfront towers',
    excerpt:
      'A concise read on transaction velocity, asking-versus-achieved spreads, and where we see resilient demand this quarter.',
  },
  {
    id: '2',
    slug: 'rental-law-updates-2026',
    title: 'New UAE rental and short-stay rules: what owners should verify now',
    dateLabel: '3 Mar 2026',
    author: 'Capital Dreams',
    image: u('photo-1512917774080-9991f1c4c750', 1600, 1000),
    alt: 'Modern villa in a gated Dubai community',
    excerpt:
      'We summarise compliance checkpoints for long-term leasing and holiday-home operations across the UAE.',
  },
  {
    id: '3',
    slug: 'jumeirah-neighbourhood-notes',
    title: 'Jumeirah neighbourhood notes: schools, beach access, and everyday livability',
    dateLabel: '22 Feb 2026',
    author: 'Capital Dreams',
    image: u('photo-1566073771259-6a8506099945', 1200, 750),
    alt: 'Upscale residential street with low-rise homes in Dubai',
    excerpt:
      'Field notes from our team on commute patterns, family conveniences, and long-term value retention.',
  },
  {
    id: '4',
    slug: 'abu-dhabi-day-routes',
    title: 'Three Abu Dhabi day routes for Dubai residents and investors',
    dateLabel: '8 Feb 2026',
    author: 'Capital Dreams',
    image: u('photo-1544551763-46a013bb70d5', 1200, 750),
    alt: 'Abu Dhabi corniche road and skyline on a clear day',
    excerpt: 'Driving windows, key stops, and practical route planning for productive day trips.',
  },
  {
    id: '5',
    slug: 'restoration-vs-new-build',
    title: 'Restoration or new build: how we underwrite total cost in the UAE',
    dateLabel: '24 Jan 2026',
    author: 'Capital Dreams',
    image: u('photo-1600585154340-be6161a56a0c', 1200, 750),
    alt: 'Architectural detail of a luxury Dubai villa facade',
    excerpt:
      'Engineering realities, approvals, and resale liquidity compared side by side for UAE buyers.',
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
