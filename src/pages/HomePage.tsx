import { useMemo } from 'react'
import { FULL_BLEED_YOUTUBE_VIDEO_ID } from '../config/fullBleedYoutube'
import { useCms } from '../contexts/CmsContext'
import { usePageSeo } from '../hooks/usePageSeo'
import { isForRentListing, isForSaleListing } from '../lib/propertyChannels'
import { FoundersSection } from '../sections/FoundersSection'
import { FullBleedYouTube } from '../sections/FullBleedYouTube'
import { HeroSection } from '../sections/HeroSection'
import { IntroStatementSection } from '../sections/IntroStatementSection'
import { PropertyGridSection } from '../sections/PropertyGridSection'
import { QuoteSection } from '../sections/QuoteSection'
import { ServicesGridSection } from '../sections/ServicesGridSection'
import { LogoMarqueeSection } from '../sections/LogoMarqueeSection'

export function HomePage() {
  const { catalogProperties, siteSettings } = useCms()
  usePageSeo({
    title: 'Capital Dreams Dubai Real Estate | Buy, Sell, Rent in UAE',
    description:
      'Capital Dreams is a Dubai real estate agency helping buyers, sellers, landlords, and investors across the UAE with curated homes and advisory services.',
  })
  const forSaleHomes = useMemo(
    () => catalogProperties.filter(isForSaleListing),
    [catalogProperties],
  )
  const forRentHomes = useMemo(
    () => catalogProperties.filter(isForRentListing),
    [catalogProperties],
  )
  return (
    <main id="page-home" aria-label="Home" className="flex w-full flex-col gap-[0.625rem]">
      <HeroSection heroImageUrl={siteSettings.heroBannerUrl} />
      <IntroStatementSection
        id="about"
        aria-label="Home — brokerage introduction"
      />
      <PropertyGridSection
        id="homes"
        sectionAriaLabel="Home — for sale"
        carouselLabel="Home — for sale carousel"
        eyebrow="For sale"
        eyebrowLeft
        featuredLayout
        properties={forSaleHomes}
      />
      <QuoteSection id="home-quote" aria-label="Home — client quote" />
      <ServicesGridSection
        id="services"
        aria-label="Home — private client services"
      />
      <FullBleedYouTube
        videoId={
          siteSettings.fullBleedYoutubeId?.trim()
            ? siteSettings.fullBleedYoutubeId
            : FULL_BLEED_YOUTUBE_VIDEO_ID
        }
        embedInstanceId="home-fullbleed-youtube"
        sectionId="home-video-band"
        aria-label="Home — cinematic property video"
        compactMobilePad
      />
      <FoundersSection
        id="founders"
        aria-label="Home — founders story"
      />
      <PropertyGridSection
        id="home-more-homes"
        sectionAriaLabel="Home — for rent"
        carouselLabel="Home — for rent carousel"
        eyebrow="For rent"
        eyebrowLeft
        featuredLayout
        properties={forRentHomes}
      />
      <LogoMarqueeSection
        id="home-partner-marquee"
        aria-label="Home — partner developers"
      />
    </main>
  )
}
