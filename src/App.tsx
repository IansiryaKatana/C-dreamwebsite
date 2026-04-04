import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { PageFrame } from './components/PageFrame'
import {
  bannerAerialVilla,
  bannerVillaDusk,
  featuredProperties,
  moreHomes,
} from './data/properties'
import { FollowLightSection } from './sections/FollowLightSection'
import { FoundersSection } from './sections/FoundersSection'
import { FullBleedImage } from './sections/FullBleedImage'
import { HeroSection } from './sections/HeroSection'
import { IntroStatementSection } from './sections/IntroStatementSection'
import { MissionSection } from './sections/MissionSection'
import { PropertyGridSection } from './sections/PropertyGridSection'
import { QuoteSection } from './sections/QuoteSection'
import { ServicesGridSection } from './sections/ServicesGridSection'
import { TallLifestyleSection } from './sections/TallLifestyleSection'
import { LogoMarqueeSection } from './sections/LogoMarqueeSection'

function App() {
  return (
    <>
      <Navbar />
      <PageFrame>
        <main className="flex w-full flex-col gap-[0.625rem]">
          <HeroSection />
          <FullBleedImage
            src={bannerVillaDusk}
            alt="Luxury villa with pool and outdoor dining at dusk"
          />
          <IntroStatementSection />
          <PropertyGridSection
            id="homes"
            eyebrow="Our homes"
            eyebrowLeft
            featuredLayout
            properties={featuredProperties}
          />
          <QuoteSection />
          <TallLifestyleSection />
          <ServicesGridSection />
          <MissionSection />
          <FullBleedImage
            src={bannerAerialVilla}
            alt="Aerial view of a white villa in green hills"
            compactMobilePad
          />
          <FoundersSection />
          <PropertyGridSection
            eyebrow="More homes"
            eyebrowLeft
            featuredLayout
            properties={moreHomes}
          />
          <FollowLightSection />
          <LogoMarqueeSection />
        </main>
      </PageFrame>
      <Footer />
    </>
  )
}

export default App
