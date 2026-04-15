import type { Property } from '../components/PropertyCard'

/**
 * Per-property rich fields (detail page). Gallery is supplied at seed/sync time via
 * `gallerySixForPropertyId` in migrate — six images per listing.
 */
export const propertyDetailOverlays: Record<string, Partial<Property>> = {
  '1': {
    propertyRefId: 'VM-1001',
    yearBuilt: 2022,
    fullAddress: 'Frond N, Palm Jumeirah, Dubai, UAE',
    descriptionHtml: `
      <p>A private Palm Jumeirah estate with uninterrupted sea views, a resort-grade pool deck, and generous interior volumes designed for quiet family living and formal entertaining.</p>
      <p>The main residence spans multiple levels with en-suite bedrooms, a show kitchen and a service kitchen, while outdoor living is anchored by landscaped gardens and direct beach access where applicable.</p>
    `.trim(),
    latitude: 25.1124,
    longitude: 55.139,
  },
  '2': {
    propertyRefId: 'VM-1002',
    yearBuilt: 2019,
    fullAddress: 'Sector E, Emirates Hills, Dubai, UAE',
    descriptionHtml: `
      <p>A golf-frontage Emirates Hills villa with mature landscaping, high ceilings, and a calm material palette that reads well in natural light.</p>
      <p>Bedrooms are generously scaled; formal and informal reception rooms support both day-to-day life and larger gatherings.</p>
    `.trim(),
  },
  '3': {
    propertyRefId: 'VM-1003',
    yearBuilt: 2021,
    fullAddress: 'Pearl Jumeirah waterfront, Dubai, UAE',
    descriptionHtml: `
      <p>Waterfront architecture with panoramic Gulf views, expansive terraces, and a layout that prioritises privacy between family quarters and guest spaces.</p>
    `.trim(),
  },
}
