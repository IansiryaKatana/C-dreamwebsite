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
  'dubai-price-index-q1': {
    dateLong: '12 March 2026',
    lastUpdated: '11 March 2026',
    toc: [
      { id: 'what-measured', label: 'What we measured this quarter' },
      {
        id: 'drivers',
        label: 'What is driving asking prices?',
        subItems: [
          { id: 'drivers-stock', label: 'Stock levels and new instructions' },
          { id: 'drivers-foreign', label: 'Cross-border demand and timing' },
        ],
      },
      {
        id: 'regulation',
        label: 'Why regulation did not cool headline numbers',
        subItems: [{ id: 'regulation-rental', label: 'Rental rules and resale positioning' }],
      },
      { id: 'policies', label: 'Policies most likely to shape 2026' },
      { id: 'outlook', label: 'The bigger picture for buyers' },
    ],
    sections: [
      {
        id: 'what-measured',
        heading: 'What we measured this quarter',
        paragraphs: [
          'Registered transactions across Dubai remained uneven by micro-market: waterfront and established villa communities held firmer volumes, while some outer-growth pockets required longer marketing periods.',
          'We compared asking trajectories on like-for-like stock against recently recorded transaction bands. The spread between list and achieved pricing narrowed in key submarkets, which often signals more realistic seller expectations.',
        ],
      },
      {
        id: 'drivers',
        heading: 'What is driving asking prices?',
        paragraphs: [
          'Two forces dominated this cycle: constrained quality inventory in proven communities, and buyers who are increasingly selective on build quality, service charges, and exit liquidity.',
        ],
      },
      {
        id: 'drivers-stock',
        heading: 'Stock levels and new instructions',
        paragraphs: [
          'New instructions improved after year-end, but genuinely turnkey homes in prime Dubai districts remain limited. That scarcity supports pricing power even when citywide indices look flat.',
        ],
      },
      {
        id: 'drivers-foreign',
        heading: 'Cross-border demand and timing',
        paragraphs: [
          'Cross-border enquiries from Europe, Asia, and Africa remained resilient, with many buyers planning short, high-intent viewing windows. Prepared inventory and clear documentation continue to win those mandates.',
        ],
      },
      {
        id: 'regulation',
        heading: 'Why regulation did not cool headline numbers',
        paragraphs: [
          'Compliance costs and registration requirements shape execution timelines more than they reset owner expectations. In practice, sellers still anchor to recent comparables unless speed becomes a priority.',
        ],
      },
      {
        id: 'regulation-rental',
        heading: 'Rental rules and resale positioning',
        paragraphs: [
          'Tighter short-stay enforcement can influence buy-to-let underwriting, but owner-occupier and long-hold investors remain key price setters in prime UAE segments.',
        ],
      },
      {
        id: 'policies',
        heading: 'Policies most likely to shape 2026',
        paragraphs: [
          'Infrastructure delivery, service-charge governance, and regulatory transparency now sit at the core of due diligence. Buyers who model running costs early close with fewer surprises.',
        ],
      },
      {
        id: 'outlook',
        heading: 'The bigger picture for buyers',
        paragraphs: [
          'If you are underwriting a purchase today, we favor discipline on capex assumptions and conservative rental projections. The market rewards prepared buyers who can move quickly on high-quality stock.',
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
          'Recent UAE guidance emphasizes alignment between advertised use, registration status, and authority requirements. Owners should treat listing copy and lease terms as part of the compliance file, not an afterthought.',
        ],
      },
      {
        id: 'short-stays',
        heading: 'Short stays and holiday use',
        paragraphs: [
          'Expect more structured checks from regulators and insurers on occupancy intent and licensing status. If a property alternates between owner use and short stays, documentation consistency is essential.',
        ],
      },
      {
        id: 'licences',
        heading: 'Licences and authority registers',
        paragraphs: [
          'Where approvals are pending renewal, disclose timelines in writing. Buyers and tenants increasingly discount value when compliance timelines are unclear.',
        ],
      },
      {
        id: 'platforms',
        heading: 'Platforms and reporting',
        paragraphs: [
          'Listing platforms are not a substitute for UAE rules. A compliant setup in one emirate may still miss local authority requirements, so validate before publishing.',
        ],
      },
      {
        id: 'long-lets',
        heading: 'Long-term rentals',
        paragraphs: [
          'Annual contracts and rent-adjustment clauses should be reviewed carefully with counsel. Small drafting mistakes can create major disputes at renewal.',
        ],
      },
      {
        id: 'checklist',
        heading: 'Owner checklist before listing',
        paragraphs: [
          'Gather title documents, service-charge records, authority approvals, utility history, and a clear works timeline. This bundle accelerates serious enquiries and reduces renegotiation risk.',
        ],
      },
    ],
  },
  'jumeirah-neighbourhood-notes': {
    dateLong: '22 February 2026',
    lastUpdated: '20 February 2026',
    toc: [
      { id: 'daily', label: 'Daily rhythm and conveniences in Jumeirah' },
      {
        id: 'beaches',
        label: 'Beach access and mobility',
        subItems: [
          { id: 'coastline', label: 'Coastline access points' },
          { id: 'family', label: 'Family-friendly zones' },
        ],
      },
      { id: 'schools', label: 'Schools and services' },
      { id: 'dining', label: 'Where we eat between viewings' },
    ],
    sections: [
      {
        id: 'daily',
        heading: 'Daily rhythm and conveniences in Jumeirah',
        paragraphs: [
          'Jumeirah balances low-rise residential calm with high-access city living. Morning traffic patterns and school runs matter more than map distance when clients are choosing between micro-zones.',
        ],
      },
      {
        id: 'beaches',
        heading: 'Beach access and mobility',
        paragraphs: [
          'Beach proximity is strong across much of Jumeirah, but practical access differs by street network, parking, and public entry points. Lifestyle fit often depends on these daily frictions.',
        ],
      },
      {
        id: 'coastline',
        heading: 'Coastline access points',
        paragraphs: [
          'Some pockets offer immediate walkability to beach frontage, while others require short drives for better facilities. We map this before recommending family-led moves.',
        ],
      },
      {
        id: 'family',
        heading: 'Family-friendly zones',
        paragraphs: [
          'For family buyers, we prioritize school commute reliability, healthcare access, and quieter internal roads over purely visual curb appeal.',
        ],
      },
      {
        id: 'schools',
        heading: 'Schools and services',
        paragraphs: [
          'School availability, curriculum fit, and transport timing drive long-term retention in this district. We benchmark travel times at actual peak windows, not off-peak estimates.',
        ],
      },
      {
        id: 'dining',
        heading: 'Where we eat between viewings',
        paragraphs: [
          'Our team tends to choose reliable neighbourhood spots that reflect everyday livability. Consistent service and practical convenience usually matter more than headline venues.',
        ],
      },
    ],
  },
  'abu-dhabi-day-routes': {
    dateLong: '8 February 2026',
    lastUpdated: '7 February 2026',
    toc: [
      { id: 'drive', label: 'Drive timing and route planning' },
      {
        id: 'routes',
        label: 'Three routes we still recommend',
        subItems: [
          { id: 'route-corniche', label: 'Corniche and downtown core' },
          { id: 'route-saadiyat', label: 'Saadiyat and cultural district' },
        ],
      },
      { id: 'quiet', label: 'Avoiding peak-week crush' },
    ],
    sections: [
      {
        id: 'drive',
        heading: 'Drive timing and route planning',
        paragraphs: [
          'For Dubai-origin trips, early weekday departures usually provide smoother arrival windows and better scheduling flexibility for multiple site visits.',
        ],
      },
      {
        id: 'routes',
        heading: 'Three routes we still recommend',
        paragraphs: [
          'Each route assumes you want one core objective: market reconnaissance, lifestyle due diligence, or institutional meetings. Trying to do all three in one day usually reduces decision quality.',
        ],
      },
      {
        id: 'route-corniche',
        heading: 'Corniche and downtown core',
        paragraphs: [
          'Start with the Corniche and downtown zones to benchmark established stock and infrastructure quality, then layer in secondary districts for value comparison.',
        ],
      },
      {
        id: 'route-saadiyat',
        heading: 'Saadiyat and cultural district',
        paragraphs: [
          'Use Saadiyat as a quality-and-pricing benchmark for premium positioning. This route is strongest for buyers evaluating long-hold lifestyle assets.',
        ],
      },
      {
        id: 'quiet',
        heading: 'Avoiding peak-week crush',
        paragraphs: [
          'Avoid Friday evening and Sunday return peaks when possible. Structured scheduling with pre-confirmed appointments materially improves the productivity of one-day UAE intercity trips.',
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
          'Authority interpretation can vary by asset class and location. Build slack into the programme for technical comments, revised drawings, and approval sequencing.',
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
