import useEmblaCarousel from 'embla-carousel-react'
import { CarouselNav } from '../components/CarouselNav'
import { SalesTeamMemberCard } from '../components/SalesTeamMemberCard'
import { SectionShell } from '../components/SectionShell'
import type { PublicSalesperson } from '@/lib/cms/loadCmsSnapshot'
import { useLocalePreferences } from '../contexts/LocalePreferencesContext'

type Props = {
  id?: string
  sectionAriaLabel?: string
  carouselLabel?: string
  eyebrow?: string
  people: PublicSalesperson[]
  loading?: boolean
}

export function SalesTeamSection({
  id,
  sectionAriaLabel,
  carouselLabel,
  eyebrow,
  people,
  loading,
}: Props) {
  const { t } = useLocalePreferences()
  const resolvedEyebrow = eyebrow ?? t('team.eyebrow')
  const showCarousel = !loading && people.length > 0

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      loop: people.length > 3,
      skipSnaps: false,
      dragFree: false,
    },
    [],
  )

  /* Margin on every slide (no last:mr-0) so loop clones keep spacing between last ↔ first */
  const slideClass =
    'min-w-0 shrink-0 grow-0 basis-full mr-10 sm:basis-[calc((100%-2.5rem)/2)] lg:basis-[calc((100%-6rem)/3)] lg:mr-12'

  return (
    <SectionShell variant="cream" id={id} aria-label={sectionAriaLabel}>
      <div className="w-full">
        <div className="mb-10 flex flex-row items-center justify-between gap-3 sm:mb-12">
          <div className="min-w-0 flex-1 pr-1">
            <p className="type-card-title font-compact truncate font-normal uppercase tracking-[0.02em] text-ink">
              {resolvedEyebrow}
            </p>
          </div>
          {showCarousel ? <CarouselNav emblaApi={emblaApi} /> : null}
        </div>

        {loading ? (
          <p className="text-[length:var(--brand-font-body-lg)] text-ink/70">
            {t('team.loading')}
          </p>
        ) : people.length === 0 ? (
          <p className="max-w-xl text-[length:var(--brand-font-body-lg)] leading-relaxed text-ink/75">
            {t('team.cmsEmpty')}
          </p>
        ) : (
          <div
            className="overflow-hidden"
            ref={emblaRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={carouselLabel ?? resolvedEyebrow}
          >
            <div className="flex touch-pan-y [-webkit-tap-highlight-color:transparent]">
              {people.map((person) => (
                <div key={person.id} className={slideClass}>
                  <SalesTeamMemberCard person={person} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  )
}
