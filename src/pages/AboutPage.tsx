import { useCms } from '../contexts/CmsContext'
import { useLocalePreferences } from '../contexts/LocalePreferencesContext'
import { usePageSeo } from '../hooks/usePageSeo'
import { AboutFaqTopicsSection } from '../sections/AboutFaqTopicsSection'
import { MissionSection } from '../sections/MissionSection'
import { SalesTeamSection } from '../sections/SalesTeamSection'
import { TallLifestyleSection } from '../sections/TallLifestyleSection'
import { LogoMarqueeSection } from '../sections/LogoMarqueeSection'

export function AboutPage() {
  const { salespeopleList, loading } = useCms()
  const { t } = useLocalePreferences()
  usePageSeo({
    title: t('seo.about.title'),
    description: t('seo.about.description'),
  })

  return (
    <main
      id="page-about"
      aria-label={t('nav.about')}
      className="flex w-full flex-col gap-[0.625rem]"
    >
      <TallLifestyleSection
        id="about-lifestyle"
        aria-label={t('aria.about.lifestyle')}
        showServicesOverlay
      />
      <MissionSection
        id="about-mission"
        aria-label={t('aria.about.mission')}
      />
      <AboutFaqTopicsSection
        id="about-video-band"
        aria-label={t('aria.about.faq')}
      />
      <SalesTeamSection
        id="about-team"
        sectionAriaLabel={t('aria.about.team')}
        carouselLabel={t('aria.about.teamCarousel')}
        eyebrow={t('about.eyebrow.team')}
        people={salespeopleList}
        loading={loading}
      />
      <LogoMarqueeSection
        id="about-partner-marquee"
        aria-label={t('aria.about.partners')}
      />
    </main>
  )
}
