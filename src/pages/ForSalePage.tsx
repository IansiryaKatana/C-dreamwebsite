import { useLocalePreferences } from '../contexts/LocalePreferencesContext'
import { isForSaleListing } from '../lib/propertyChannels'
import { PropertyListingPage } from './PropertyListingPage'

export function ForSalePage() {
  const { t } = useLocalePreferences()
  return (
    <PropertyListingPage
      variant="channel"
      channelFilter={isForSaleListing}
      seoTitle={t('seo.forSale.title')}
      seoDescription={t('seo.forSale.description')}
      mainId="page-for-sale"
      heroTitle={t('listing.hero.sale.title')}
      heroDescription={t('listing.hero.sale.desc')}
      featuredEyebrow={t('listing.featured.sale')}
      gridTitle={t('listing.grid.sale')}
      emptyFilteredMessage={t('listing.emptyFiltered')}
      emptyChannelMessage={t('listing.emptyChannel.sale')}
    />
  )
}
