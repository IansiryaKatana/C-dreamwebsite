import { useLocalePreferences } from '../contexts/LocalePreferencesContext'
import { isForRentListing } from '../lib/propertyChannels'
import { PropertyListingPage } from './PropertyListingPage'

export function ForRentPage() {
  const { t } = useLocalePreferences()
  return (
    <PropertyListingPage
      variant="channel"
      channelFilter={isForRentListing}
      seoTitle={t('seo.forRent.title')}
      seoDescription={t('seo.forRent.description')}
      mainId="page-for-rent"
      heroTitle={t('listing.hero.rent.title')}
      heroDescription={t('listing.hero.rent.desc')}
      featuredEyebrow={t('listing.featured.rent')}
      gridTitle={t('listing.grid.rent')}
      emptyFilteredMessage={t('listing.emptyFiltered.rent')}
      emptyChannelMessage={t('listing.emptyChannel.rent')}
    />
  )
}
