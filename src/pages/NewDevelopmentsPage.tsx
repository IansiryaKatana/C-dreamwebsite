import { isNewDevelopmentListing } from '../lib/propertyChannels'
import { PropertyListingPage } from './PropertyListingPage'

export function NewDevelopmentsPage() {
  return (
    <PropertyListingPage
      variant="channel"
      channelFilter={isNewDevelopmentListing}
      mainId="page-new-developments"
      heroTitle="New developments"
      heroDescription="Explore launches and newly released homes. Use the same filters as our full collection to narrow by price, location, and layout."
      featuredEyebrow="Featured new developments"
      gridTitle="New developments"
      emptyFilteredMessage="No new developments match these filters. Try clearing filters or broadening your search."
      emptyChannelMessage="There are no new development listings in the catalog yet. Browse all properties or check back soon."
    />
  )
}
