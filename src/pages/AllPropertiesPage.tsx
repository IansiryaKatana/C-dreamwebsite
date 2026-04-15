import { PropertyListingPage } from './PropertyListingPage'

export function AllPropertiesPage() {
  return (
    <PropertyListingPage
      variant="all"
      seoTitle="All Dubai Properties | Capital Dreams UAE Listings"
      seoDescription="Browse all Capital Dreams listings across Dubai and the UAE, including apartments, villas, penthouses, and investment properties."
      mainId="page-all-properties"
      heroTitle="Your next home awaits…"
      heroDescription="Browse our full collection. Use filters to narrow by price, beds, baths, and keywords."
      featuredEyebrow="Featured properties"
      gridTitle="All properties"
      emptyFilteredMessage="No properties match these filters. Try clearing filters or broadening your search."
    />
  )
}
