import useEmblaCarousel from 'embla-carousel-react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { CarouselNav } from '../components/CarouselNav'
import { PropertyCard, type Property } from '../components/PropertyCard'
import { SectionHeader } from '../components/SectionHeader'
import { SectionShell } from '../components/SectionShell'
import { useLocalePreferences } from '../contexts/LocalePreferencesContext'

type Props = {
  id?: string
  /** `aria-label` on the outer section (landmark). */
  sectionAriaLabel?: string
  /** `aria-label` on the carousel region (defaults to eyebrow / title). */
  carouselLabel?: string
  title?: string
  subtitle?: string
  eyebrow?: string
  /** When set, the eyebrow label becomes a link (e.g. to listing hub pages). */
  eyebrowTo?: string
  properties: Property[]
  featuredLayout?: boolean
  eyebrowLeft?: boolean
}

export function PropertyGridSection({
  id,
  sectionAriaLabel,
  carouselLabel,
  title,
  subtitle,
  eyebrow,
  eyebrowTo,
  properties,
  featuredLayout,
  eyebrowLeft,
}: Props) {
  const { t } = useLocalePreferences()
  const showEyebrow = Boolean(eyebrow && (featuredLayout || eyebrowLeft))
  const showSectionHeader = Boolean(!featuredLayout && !eyebrowLeft && title)
  const hasHeaderRow = showEyebrow || showSectionHeader

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      loop: properties.length > 3,
      skipSnaps: false,
      dragFree: false,
    },
    [],
  )

  const slideClass =
    'min-w-0 shrink-0 grow-0 basis-full last:mr-0 mr-10 sm:basis-[calc((100%-2.5rem)/2)] lg:basis-[calc((100%-6rem)/3)] lg:mr-12'

  return (
    <SectionShell variant="cream" id={id} aria-label={sectionAriaLabel}>
      <div className="w-full">
        {hasHeaderRow ? (
          <div
            className={clsx(
              'flex flex-row items-center justify-between gap-3',
              showEyebrow ? 'mb-10' : 'mb-12',
            )}
          >
            <div className="min-w-0 flex-1 pr-1">
              {showEyebrow ? (
                eyebrowTo ? (
                  <Link
                    to={eyebrowTo}
                    className={clsx(
                      'type-card-title font-compact block min-w-0 truncate font-normal uppercase tracking-[0.02em] text-ink underline-offset-4 transition-opacity hover:opacity-80 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/35',
                      eyebrowLeft ? 'text-left' : 'text-left sm:text-left',
                    )}
                  >
                    {eyebrow}
                  </Link>
                ) : (
                  <p
                    className={clsx(
                      'type-card-title font-compact truncate font-normal uppercase tracking-[0.02em] text-ink',
                      eyebrowLeft ? 'text-left' : 'text-left sm:text-left',
                    )}
                  >
                    {eyebrow}
                  </p>
                )
              ) : null}
              {showSectionHeader ? (
                <SectionHeader
                  title={title!}
                  subtitle={subtitle}
                  bg="cream"
                  truncateTitle
                  className={showEyebrow ? 'mt-6 max-w-none' : 'max-w-none'}
                />
              ) : null}
            </div>
            <CarouselNav emblaApi={emblaApi} />
          </div>
        ) : null}

        {!hasHeaderRow ? (
          <div className="mb-10 flex justify-end sm:mb-12">
            <CarouselNav emblaApi={emblaApi} />
          </div>
        ) : null}

        <div
          className="overflow-hidden"
          ref={emblaRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={
            carouselLabel ?? eyebrow ?? title ?? t('propertyGrid.propertiesFallback')
          }
        >
          <div className="flex touch-pan-y [-webkit-tap-highlight-color:transparent]">
            {properties.map((p) => (
              <div key={p.id} className={slideClass}>
                <PropertyCard property={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
