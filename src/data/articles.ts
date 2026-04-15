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
    slug: 'ibiza-price-index-q1',
    title: 'What the latest Balearic price data means for buyers on Ibiza',
    dateLabel: '12 Mar 2026',
    author: 'Capital Dream',
    image: u('photo-1507525428034-b723cf961d3e', 1600, 1000),
    alt: 'Coastal view with calm sea and rocky shore',
    excerpt:
      'A concise read on registered transactions, asking vs achieved spreads, and where we see stability this season.',
  },
  {
    id: '2',
    slug: 'rental-law-updates-2026',
    title: 'New rental and short-stay rules: what owners should verify now',
    dateLabel: '3 Mar 2026',
    author: 'Capital Dream',
    image: u('photo-1512917774080-9991f1c4c750', 1600, 1000),
    alt: 'Modern villa exterior with pool at golden hour',
    excerpt:
      'We summarise compliance checkpoints for long lets and holiday use, without the jargon.',
  },
  {
    id: '3',
    slug: 'santa-eulalia-neighbourhood-notes',
    title: 'Santa Eulària: cafés, calas, and calm family streets we keep returning to',
    dateLabel: '22 Feb 2026',
    author: 'Capital Dream',
    image: u('photo-1566073771259-6a8506099945', 1200, 750),
    alt: 'Resort pool terrace with sea view',
    excerpt: 'Field notes from our team on daily life and proximity to marinas and schools.',
  },
  {
    id: '4',
    slug: 'formentera-day-routes',
    title: 'Three Formentera day trips that still feel uncrowded in peak weeks',
    dateLabel: '8 Feb 2026',
    author: 'Capital Dream',
    image: u('photo-1544551763-46a013bb70d5', 1200, 750),
    alt: 'Sailboat on blue water',
    excerpt: 'Ferry timing, lunch stops, and quiet beaches worth the short crossing.',
  },
  {
    id: '5',
    slug: 'restoration-vs-new-build',
    title: 'Restoration or new build: how we underwrite total cost on island plots',
    dateLabel: '24 Jan 2026',
    author: 'Capital Dream',
    image: u('photo-1600585154340-be6161a56a0c', 1200, 750),
    alt: 'Architectural detail of a luxury home facade',
    excerpt: 'Engineering, licensing timelines, and resale liquidity compared side by side.',
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
