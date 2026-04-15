import type { Property } from '../components/PropertyCard'

function listingTagNorm(p: Property): string {
  return p.tag?.trim().toLowerCase() ?? ''
}

/** Listings shown on `/new-developments` (tag-driven until CRM fields exist). */
export function isNewDevelopmentListing(p: Property): boolean {
  return listingTagNorm(p) === 'new'
}

/** Listing tag equals **For rent** (matches CMS `property_listing_tags`). */
export function isForRentListing(p: Property): boolean {
  return listingTagNorm(p) === 'for rent'
}

/** Listing tag equals **For sale**. */
export function isForSaleListing(p: Property): boolean {
  return listingTagNorm(p) === 'for sale'
}
