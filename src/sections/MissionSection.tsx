import { SectionShell } from '../components/SectionShell'
import { useLocalePreferences } from '../contexts/LocalePreferencesContext'

type MissionProps = {
  id?: string
  'aria-label'?: string
}

export function MissionSection({
  id = 'experiences',
  'aria-label': ariaLabel,
}: MissionProps = {}) {
  const { t } = useLocalePreferences()
  return (
    <SectionShell variant="terracotta" id={id} aria-label={ariaLabel}>
      <div className="mx-auto max-w-[min(100%,1440px)] py-4 sm:py-8">
        <h2 className="type-heading-mission font-statement max-w-4xl font-semibold leading-tight">
          {t('mission.h1')}
        </h2>
        <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-2 md:gap-14 lg:gap-20">
          <p className="font-light leading-[1.75] text-cream/92">
            {t('mission.p1')}
          </p>
          <p className="font-light leading-[1.75] text-cream/92">
            {t('mission.p2')}
          </p>
        </div>
      </div>
    </SectionShell>
  )
}
