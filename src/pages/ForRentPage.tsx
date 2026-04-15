import { isForRentListing } from '../lib/propertyChannels'
import { PropertyListingPage } from './PropertyListingPage'

export function ForRentPage() {
  return (
    <PropertyListingPage
      variant="channel"
      channelFilter={isForRentListing}
      mainId="page-for-rent"
      heroTitle="For rent"
      heroDescription="Browse rental homes and apartments. Filter by price, emirate, neighbourhood, and layout — same tools as our full collection."
      featuredEyebrow="Featured rentals"
      gridTitle="For rent"
      emptyFilteredMessage="No rentals match these filters. Try clearing filters or broadening your search."
      emptyChannelMessage="There are no for-rent listings in the catalog yet. Tag listings with “For rent” in the admin or browse all properties."
    />
  )
}
