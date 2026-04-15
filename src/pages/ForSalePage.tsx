import { isForSaleListing } from '../lib/propertyChannels'
import { PropertyListingPage } from './PropertyListingPage'

export function ForSalePage() {
  return (
    <PropertyListingPage
      variant="channel"
      channelFilter={isForSaleListing}
      seoTitle="Properties for Sale in Dubai | Capital Dreams"
      seoDescription="Explore Dubai and UAE properties for sale, from ready homes to investment opportunities, with Capital Dreams real estate advisors."
      mainId="page-for-sale"
      heroTitle="For sale"
      heroDescription="Browse properties for sale across Dubai and beyond. Narrow by price, location, beds, and more."
      featuredEyebrow="Featured for sale"
      gridTitle="For sale"
      emptyFilteredMessage="No listings match these filters. Try clearing filters or broadening your search."
      emptyChannelMessage="There are no for-sale listings in the catalog yet. Tag listings with “For sale” in the admin or browse all properties."
    />
  )
}
