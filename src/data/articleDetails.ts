import { getArticleBySlug, type Article } from './articles'

export type ArticleTocEntry =
  | { id: string; label: string }
  | {
      id: string
      label: string
      subItems: { id: string; label: string }[]
    }

export type ArticleBodySection = {
  id: string
  heading: string
  paragraphs: string[]
}

export type ArticleDetailModel = Article & {
  dateLong: string
  lastUpdated: string
  toc: ArticleTocEntry[]
  sections: ArticleBodySection[]
}

const detailsBySlug: Record<
  string,
  {
    dateLong: string
    lastUpdated: string
    toc: ArticleTocEntry[]
    sections: ArticleBodySection[]
  }
> = {
  'ibiza-price-index-q1': {
    dateLong: '12 March 2026',
    lastUpdated: '11 March 2026',
    toc: [
      { id: 'what-measured', label: 'What we measured this quarter' },
      {
        id: 'drivers',
        label: 'What is driving asking prices?',
        subItems: [
          { id: 'drivers-stock', label: 'Stock levels and new instructions' },
          { id: 'drivers-foreign', label: 'Foreign demand and seasonality' },
        ],
      },
      {
        id: 'regulation',
        label: 'Why regulation did not cool headline numbers',
        subItems: [{ id: 'regulation-rental', label: 'Rental rules and the sales market' }],
      },
      { id: 'policies', label: 'Policies most likely to shape 2026' },
      { id: 'outlook', label: 'The bigger picture for buyers' },
    ],
    sections: [
      {
        id: 'what-measured',
        heading: 'What we measured this quarter',
        paragraphs: [
          'Registered transactions across the Pitiusas remained uneven: coastal municipalities saw firmer volumes than inland parishes, while the upper segment continued to trade on longer timelines with fewer, larger deals.',
          'We compared asking trajectories on comparable stock against last year’s agreed levels where disclosure allows. The spread between list and achieved pricing narrowed slightly in several postcodes, which usually signals more serious sellers entering the market.',
        ],
      },
      {
        id: 'drivers',
        heading: 'What is driving asking prices?',
        paragraphs: [
          'Two forces dominated the winter data: constrained quality stock in walk-to-sea locations, and buyers who are willing to wait for the right asset rather than chase marginal listings.',
        ],
      },
      {
        id: 'drivers-stock',
        heading: 'Stock levels and new instructions',
        paragraphs: [
          'New instructions of renovated villas picked up after the new year, but turnkey homes in prime calas remain scarce. That scarcity supports list prices even when headline indices look flat.',
        ],
      },
      {
        id: 'drivers-foreign',
        heading: 'Foreign demand and seasonality',
        paragraphs: [
          'Early enquiries from northern European buyers ran ahead of the same week in 2025. Many are pre-booking viewings around Easter, which suggests a compressed but active spring window.',
        ],
      },
      {
        id: 'regulation',
        heading: 'Why regulation did not cool headline numbers',
        paragraphs: [
          'Compliance costs and licensing timelines affect development margins more than they reset existing owner expectations. In practice, sellers of finished homes still anchor to recent comparable asks unless personal circumstances force a discount.',
        ],
      },
      {
        id: 'regulation-rental',
        heading: 'Rental rules and the sales market',
        paragraphs: [
          'Tighter short-stay oversight can influence buy-to-let underwriting, but owner-occupier and second-home buyers remain the marginal price setters in the segments we track most closely.',
        ],
      },
      {
        id: 'policies',
        heading: 'Policies most likely to shape 2026',
        paragraphs: [
          'Municipal infrastructure plans and water-use scrutiny are now part of standard due diligence. Buyers who model operating costs early tend to transact with fewer surprises at notary.',
        ],
      },
      {
        id: 'outlook',
        heading: 'The bigger picture for buyers',
        paragraphs: [
          'If you are underwriting a purchase today, we favour discipline on renovation budgets and conservative rental assumptions. The market rewards prepared buyers who can move when the right plan appears — not those stretching for “just acceptable” stock.',
        ],
      },
    ],
  },
  'rental-law-updates-2026': {
    dateLong: '3 March 2026',
    lastUpdated: '2 March 2026',
    toc: [
      { id: 'scope', label: 'What changed and who it affects' },
      {
        id: 'short-stays',
        label: 'Short stays and holiday use',
        subItems: [
          { id: 'licences', label: 'Licences and municipal registers' },
          { id: 'platforms', label: 'Platforms and reporting' },
        ],
      },
      { id: 'long-lets', label: 'Long-term rentals' },
      { id: 'checklist', label: 'Owner checklist before listing' },
    ],
    sections: [
      {
        id: 'scope',
        heading: 'What changed and who it affects',
        paragraphs: [
          'Recent guidance emphasises alignment between advertised use, municipal classification, and energy performance documentation. Owners should treat marketing copy as part of the compliance file, not an afterthought.',
        ],
      },
      {
        id: 'short-stays',
        heading: 'Short stays and holiday use',
        paragraphs: [
          'Expect more consistent questions from registrars and insurers about intended occupancy. If your asset alternates between owner weeks and guest stays, keep calendars and contracts coherent.',
        ],
      },
      {
        id: 'licences',
        heading: 'Licences and municipal registers',
        paragraphs: [
          'Where a licence or habitability certificate is pending renewal, disclose timelines in writing. Buyers increasingly discount offers when administrative loose ends are opaque.',
        ],
      },
      {
        id: 'platforms',
        heading: 'Platforms and reporting',
        paragraphs: [
          'Listing platforms are not a substitute for local rules. A compliant description in one jurisdiction can still miss a Pitiusas-specific requirement — verify with your gestor before going live.',
        ],
      },
      {
        id: 'long-lets',
        heading: 'Long-term rentals',
        paragraphs: [
          'Annual contracts and indexation clauses deserve a fresh read with counsel. Small drafting errors create outsized disputes when tenants hold cost-of-living concerns.',
        ],
      },
      {
        id: 'checklist',
        heading: 'Owner checklist before listing',
        paragraphs: [
          'Gather: escritura excerpts, IBI receipts, community statutes, touristic licence status (if any), and a simple timeline of works. This bundle accelerates serious enquiries and reduces renegotiation risk.',
        ],
      },
    ],
  },
  'santa-eulalia-neighbourhood-notes': {
    dateLong: '22 February 2026',
    lastUpdated: '20 February 2026',
    toc: [
      { id: 'daily', label: 'Daily rhythm and conveniences' },
      {
        id: 'calas',
        label: 'Calas and beaches within reach',
        subItems: [
          { id: 'north', label: 'North-east coves' },
          { id: 'family', label: 'Family-friendly stretches' },
        ],
      },
      { id: 'schools', label: 'Schools and services' },
      { id: 'dining', label: 'Where we eat between viewings' },
    ],
    sections: [
      {
        id: 'daily',
        heading: 'Daily rhythm and conveniences',
        paragraphs: [
          'Santa Eulària balances marina life with hillside quiet. Mornings tend to move at a civilised pace: cafès along the promenade fill first, then the inland roads pick up as teams head to country fincas.',
        ],
      },
      {
        id: 'calas',
        heading: 'Calas and beaches within reach',
        paragraphs: [
          'You are never far from water, but access styles differ. Some calas reward an early arrival; others stay comfortable through midday if you favour shade and a short swim.',
        ],
      },
      {
        id: 'north',
        heading: 'North-east coves',
        paragraphs: [
          'The coastline towards Es Canar and beyond mixes rocky entries with sandy pockets. Clients with small children often prioritise gentle shelving sand over dramatic cliffs — both exist within fifteen minutes’ drive.',
        ],
      },
      {
        id: 'family',
        heading: 'Family-friendly stretches',
        paragraphs: [
          'Look for lifeguard seasonality, parking capacity, and the walk from the car. A perfect cove on Instagram can be the wrong call on a July afternoon with pushchairs and cool boxes.',
        ],
      },
      {
        id: 'schools',
        heading: 'Schools and services',
        paragraphs: [
          'International and concertado options draw year-round residents. If schools anchor your search, model commute times at school-run hours, not mid-morning GPS estimates.',
        ],
      },
      {
        id: 'dining',
        heading: 'Where we eat between viewings',
        paragraphs: [
          'We gravitate to simple fish, seasonal salads, and a reliable post-viewing coffee. Santa Eulària rewards consistency — the best tables are often the ones that respect ingredients over spectacle.',
        ],
      },
    ],
  },
  'formentera-day-routes': {
    dateLong: '8 February 2026',
    lastUpdated: '7 February 2026',
    toc: [
      { id: 'ferry', label: 'Ferry timing and tickets' },
      {
        id: 'routes',
        label: 'Three routes we still recommend',
        subItems: [
          { id: 'route-lighthouse', label: 'La Mola and back' },
          { id: 'route-beaches', label: 'Beach loop with one long lunch' },
        ],
      },
      { id: 'quiet', label: 'Avoiding peak-week crush' },
    ],
    sections: [
      {
        id: 'ferry',
        heading: 'Ferry timing and tickets',
        paragraphs: [
          'Book return legs on busy Saturdays. Mid-morning departures from Ibiza Town usually offer calmer queues than the first wave, without sacrificing a full afternoon on Formentera.',
        ],
      },
      {
        id: 'routes',
        heading: 'Three routes we still recommend',
        paragraphs: [
          'Each route assumes you want one swim, one sit-down meal, and time to breathe. If you try to “do the island”, you will remember the rental scooter and not the water.',
        ],
      },
      {
        id: 'route-lighthouse',
        heading: 'La Mola and back',
        paragraphs: [
          'Drive or ride to the lighthouse for wind, views, and a reminder of scale. Pair it with a late lunch inland where terraces catch the afternoon shade.',
        ],
      },
      {
        id: 'route-beaches',
        heading: 'Beach loop with one long lunch',
        paragraphs: [
          'Pick two beaches maximum. Anchor the day around a reservation — spontaneity works in May; August rewards planning.',
        ],
      },
      {
        id: 'quiet',
        heading: 'Avoiding peak-week crush',
        paragraphs: [
          'Walk ten minutes past the first parasol row. Carry cash for smaller chiringuitos. Leave Ibiza with water and patience; return with salt on your skin and a slower pulse.',
        ],
      },
    ],
  },
  'restoration-vs-new-build': {
    dateLong: '24 January 2026',
    lastUpdated: '22 January 2026',
    toc: [
      { id: 'underwrite', label: 'How we underwrite total cost' },
      {
        id: 'restoration',
        label: 'Restoration paths',
        subItems: [
          { id: 'structure', label: 'Structure and systems' },
          { id: 'licences-rest', label: 'Licences and inspectors' },
        ],
      },
      {
        id: 'newbuild',
        label: 'New build on raw land',
        subItems: [{ id: 'timeline', label: 'Timeline realism' }],
      },
      { id: 'liquidity', label: 'Resale liquidity compared' },
    ],
    sections: [
      {
        id: 'underwrite',
        heading: 'How we underwrite total cost',
        paragraphs: [
          'We separate four buckets: land (or existing structure), hard construction, soft costs, and contingency. The mistake is mixing optimism across buckets — a disciplined spreadsheet beats a beautiful render.',
        ],
      },
      {
        id: 'restoration',
        heading: 'Restoration paths',
        paragraphs: [
          'Heritage charm can carry hidden liabilities: moisture paths, outdated electrics, and roof geometry that fights modern insulation. We walk sites with engineers before we endorse a number to a client.',
        ],
      },
      {
        id: 'structure',
        heading: 'Structure and systems',
        paragraphs: [
          'Walls that look thick in photographs may not carry the loads you assume. Test pits and targeted openings reduce guesswork more than glossy concept plans.',
        ],
      },
      {
        id: 'licences-rest',
        heading: 'Licences and inspectors',
        paragraphs: [
          'Municipal interpretation varies by parcel. Build slack into the programme for queries, neighbour consultations, and revised elevations — especially near protected zones.',
        ],
      },
      {
        id: 'newbuild',
        heading: 'New build on raw land',
        paragraphs: [
          'Utilities, access rights, and topography determine feasibility before architecture does. If any of the three is weak, the best design in the world will not save the underwriting.',
        ],
      },
      {
        id: 'timeline',
        heading: 'Timeline realism',
        paragraphs: [
          'Twelve-month fantasies are rare once licensing and weather are honest. We prefer conservative schedules with staged payments tied to verified milestones.',
        ],
      },
      {
        id: 'liquidity',
        heading: 'Resale liquidity compared',
        paragraphs: [
          'Finished, compliant homes with clear paperwork trade faster than ambitious projects mid-flight. If exit flexibility matters, bias toward de-risked assets even if headline yield looks lower on paper.',
        ],
      },
    ],
  },
}

export function getArticleDetailModel(slug: string | undefined): ArticleDetailModel | undefined {
  if (!slug) return undefined
  const base = getArticleBySlug(slug)
  if (!base) return undefined
  const extra = detailsBySlug[slug]
  if (!extra) {
    return {
      ...base,
      dateLong: base.dateLabel,
      lastUpdated: base.dateLabel,
      toc: [{ id: 'overview', label: 'Overview' }],
      sections: [
        {
          id: 'overview',
          heading: 'Overview',
          paragraphs: [base.excerpt],
        },
      ],
    }
  }
  return { ...base, ...extra }
}
