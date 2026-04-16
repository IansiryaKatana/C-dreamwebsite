import useEmblaCarousel from 'embla-carousel-react'
import clsx from 'clsx'
import { useLocalePreferences } from '../contexts/LocalePreferencesContext'
import { CarouselNav } from './CarouselNav'
import { PropertyListingCard } from './PropertyListingCard'
import type { Property } from './PropertyCard'

type Props = {
  properties: Property[]
  eyebrow?: string
  className?: string
}

export function FeaturedPropertiesCarousel({
  properties,
  eyebrow,
  className = '',
}: Props) {
  const { t } = useLocalePreferences()
  const resolvedEyebrow = eyebrow ?? t('listing.featuredShort')
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
    <div className={clsx('w-full', className)}>
      <div className="mb-8 flex flex-row items-center justify-between gap-3 sm:mb-10">
        <p className="type-card-title min-w-0 flex-1 truncate font-compact font-normal uppercase tracking-[0.02em] text-ink">
          {resolvedEyebrow}
        </p>
        <CarouselNav emblaApi={emblaApi} />
      </div>
      <div
        className="overflow-hidden"
        ref={emblaRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={resolvedEyebrow}
      >
        <div className="flex touch-pan-y [-webkit-tap-highlight-color:transparent]">
          {properties.map((p) => (
            <div key={p.id} className={slideClass}>
              <PropertyListingCard property={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
