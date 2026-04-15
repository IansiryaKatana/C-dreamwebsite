import { useCms } from '../contexts/CmsContext'
import { usePageSeo } from '../hooks/usePageSeo'
import { AboutFaqTopicsSection } from '../sections/AboutFaqTopicsSection'
import { MissionSection } from '../sections/MissionSection'
import { SalesTeamSection } from '../sections/SalesTeamSection'
import { TallLifestyleSection } from '../sections/TallLifestyleSection'
import { LogoMarqueeSection } from '../sections/LogoMarqueeSection'

export function AboutPage() {
  const { salespeopleList, loading } = useCms()
  usePageSeo({
    title: 'About Capital Dreams | Dubai Real Estate Experts',
    description:
      'Learn about Capital Dreams, a Dubai real estate brokerage serving clients across the UAE with tailored advisory, acquisitions, and leasing support.',
  })

  return (
    <main id="page-about" aria-label="About us" className="flex w-full flex-col gap-[0.625rem]">
      <TallLifestyleSection
        id="about-lifestyle"
        aria-label="About us — lifestyle imagery"
        showServicesOverlay
      />
      <MissionSection
        id="about-mission"
        aria-label="About us — mission and principles"
      />
      <AboutFaqTopicsSection
        id="about-video-band"
        aria-label="About us — featured FAQ topics"
      />
      <SalesTeamSection
        id="about-team"
        sectionAriaLabel="About us — our team"
        carouselLabel="About us — our team carousel"
        eyebrow="Our team"
        people={salespeopleList}
        loading={loading}
      />
      <LogoMarqueeSection
        id="about-partner-marquee"
        aria-label="About us — partner developers"
      />
    </main>
  )
}
