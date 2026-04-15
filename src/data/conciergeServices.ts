const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`

export type ConciergeService = {
  id: string
  /** Shown in the meta line (buying stage). */
  phase: string
  title: string
  excerpt: string
  mediaType: 'image' | 'video'
  mediaUrl: string
  posterUrl?: string | null
  alt: string
}

/** First two render as featured (two-up row); remainder as three-up, matching ArticlesPage. */
export const conciergeServices: ConciergeService[] = [
  {
    id: 'brief-search',
    phase: 'Strategy & search',
    title: 'Briefing, shortlists, and off-market access',
    excerpt:
      'We clarify budget, lifestyle, and timing, then curate a tight shortlist — including discreet inventory you will not see on public portals.',
    mediaType: 'image',
    mediaUrl: u('photo-1600585154526-990dced4db0d', 1600, 1000),
    alt: 'Bright living room with large windows and natural light',
  },
  {
    id: 'viewings',
    phase: 'Viewings & selection',
    title: 'Private tours and like-for-like comparisons',
    excerpt:
      'Coordinated viewings on your schedule, with clear notes on condition, running costs, rental potential, and neighbourhood fit.',
    mediaType: 'image',
    mediaUrl: u('photo-1600607687939-ce8a6c25118c', 1600, 1000),
    alt: 'Modern home interior with staircase and open plan',
  },
  {
    id: 'offer',
    phase: 'Offer & negotiation',
    title: 'Offer strategy, terms, and negotiation',
    excerpt:
      'We advise on price, contingencies, and timing so your offer is credible — and we handle the back-and-forth with sellers and agents.',
    mediaType: 'image',
    mediaUrl: u('photo-1454165804606-c3d57bc86b40', 1200, 750),
    alt: 'Documents and pen on a desk',
  },
  {
    id: 'due-diligence',
    phase: 'Legal & technical',
    title: 'Due diligence: lawyers, surveys, and licences',
    excerpt:
      'Introductions to trusted lawyers and surveyors, plus help reading searches, title, planning, and community rules before you commit.',
    mediaType: 'image',
    mediaUrl: u('photo-1589829545856-d10d557cf95f', 1200, 750),
    alt: 'Law library shelves with legal volumes',
  },
  {
    id: 'finance',
    phase: 'Financing',
    title: 'Mortgage broker and currency introductions',
    excerpt:
      'Where you need leverage or cross-border payments, we connect you with regulated partners and help align timelines with exchange dates.',
    mediaType: 'image',
    mediaUrl: u('photo-1554224155-6726b3ff858f', 1200, 750),
    alt: 'Calculator and financial documents',
  },
  {
    id: 'completion',
    phase: 'Completion',
    title: 'Notary, funds, and handover day',
    excerpt:
      'We stay alongside you through signing, final payments, key collection, and the first handover walkthrough so nothing is missed.',
    mediaType: 'image',
    mediaUrl: u('photo-1560518883-ce09059eeffa', 1200, 750),
    alt: 'Keys being handed over for a new home',
  },
  {
    id: 'aftercare',
    phase: 'After purchase',
    title: 'Settling in: utilities, staff, and local setup',
    excerpt:
      'Practical help with utilities, internet, cleaners, and trusted trades — so you move from completion to living comfortably, faster.',
    mediaType: 'image',
    mediaUrl: u('photo-1600566753190-17f0baa2a6c3', 1200, 750),
    alt: 'Comfortable furnished living space',
  },
]
