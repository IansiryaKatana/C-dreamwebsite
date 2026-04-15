import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { CarouselNav } from '../components/CarouselNav'
import type { Property } from '../components/PropertyCard'
import { FeaturedPropertiesCarousel } from '../components/FeaturedPropertiesCarousel'
import { PropertyFiltersBar } from '../components/PropertyFiltersBar'
import { PropertyListingCard } from '../components/PropertyListingCard'
import { SectionShell } from '../components/SectionShell'
import { useCms } from '../contexts/CmsContext'
import { usePropertyFilterDock } from '../contexts/PropertyFilterDockContext'
import { usePageSeo } from '../hooks/usePageSeo'
import { useMediaQuery } from '../hooks/useMediaQuery'
import {
  filterParamsFromSearchParams,
  filterProperties,
} from '../lib/propertyFilters'

type BaseProps = {
  seoTitle: string
  seoDescription: string
  heroTitle: string
  heroDescription: string
  featuredEyebrow: string
  gridTitle: string
  emptyFilteredMessage: string
  /** Landmark id on `<main>` for accessibility / QA */
  mainId?: string
}

type AllVariant = BaseProps & {
  variant: 'all'
}

type ChannelVariant = BaseProps & {
  variant: 'channel'
  channelFilter: (p: Property) => boolean
  emptyChannelMessage: string
}

export type PropertyListingPageProps = AllVariant | ChannelVariant

/**
 * Shared shell: hero + clear (ink) + full-width filters, optional featured carousel, grid.
 * Matches `/all-properties`; channel variants narrow the catalog first, then apply URL filters.
 */
export function PropertyListingPage(props: PropertyListingPageProps) {
  const isMobile = useMediaQuery('(max-width: 639px)')
  const { openDock } = usePropertyFilterDock()
  const {
    catalogProperties,
    featuredProperties,
    loading,
    cmsEmpty,
  } = useCms()
  const [searchParams, setSearchParams] = useSearchParams()
  const variant = props.variant
  const channelFilter =
    variant === 'channel' ? props.channelFilter : null
  const emptyChannelMessage =
    variant === 'channel' ? props.emptyChannelMessage : ''

  const filters = useMemo(
    () => filterParamsFromSearchParams(searchParams),
    [searchParams],
  )

  const basePool = useMemo(() => {
    if (variant === 'all') return catalogProperties
    return catalogProperties.filter(channelFilter!)
  }, [variant, channelFilter, catalogProperties])

  const carouselCandidates = useMemo(() => {
    if (variant === 'all') {
      return featuredProperties
    }
    const fromFeatured = featuredProperties.filter(channelFilter!)
    if (fromFeatured.length > 0) {
      return fromFeatured
    }
    return catalogProperties.filter(channelFilter!).slice(0, 4)
  }, [
    variant,
    channelFilter,
    catalogProperties,
    featuredProperties,
  ])

  const filteredPool = useMemo(
    () => filterProperties(basePool, filters),
    [basePool, filters],
  )

  const filteredIdSet = useMemo(
    () => new Set(filteredPool.map((p) => p.id)),
    [filteredPool],
  )

  /** Featured strip only shows listings that also pass the current URL filters. */
  const carouselProperties = useMemo(
    () => carouselCandidates.filter((p) => filteredIdSet.has(p.id)),
    [carouselCandidates, filteredIdSet],
  )

  const carouselIdSet = useMemo(
    () => new Set(carouselProperties.map((p) => p.id)),
    [carouselProperties],
  )

  const gridList = useMemo(
    () => filteredPool.filter((p) => !carouselIdSet.has(p.id)),
    [filteredPool, carouselIdSet],
  )

  const channelEmpty = variant === 'channel' && basePool.length === 0

  /** True when filters match listings but every match only appears in the carousel (grid excludes those ids). */
  const allMatchesShownInCarousel =
    filteredPool.length > 0 &&
    gridList.length === 0 &&
    !channelEmpty &&
    carouselProperties.length > 0

  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true })
  }, [setSearchParams])
  const [gridEmblaRef, gridEmblaApi] = useEmblaCarousel(
    {
      align: 'start',
      loop: gridList.length > 1,
      skipSnaps: false,
      dragFree: false,
    },
    [],
  )

  const {
    seoTitle,
    seoDescription,
    heroTitle,
    heroDescription,
    featuredEyebrow,
    gridTitle,
    emptyFilteredMessage,
    mainId,
  } = props
  usePageSeo({ title: seoTitle, description: seoDescription })

  return (
    <main
      id={mainId}
      className="flex w-full flex-col gap-[0.625rem]"
    >
      <SectionShell variant="cream">
        <div className="relative w-full">
          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <div className="min-w-0 max-w-6xl flex-1 text-left">
              <h1 className="type-hero font-hero max-w-3xl text-balance text-left text-terracotta">
                {heroTitle}
              </h1>
              <p className="mt-4 max-w-2xl text-left text-ink/70">
                {heroDescription}
              </p>
            </div>
            {!isMobile ? (
              <Button
                type="button"
                variant="inkSolid"
                className="w-full shrink-0 sm:mt-1 sm:w-auto sm:self-start"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            ) : null}
          </div>
          <div className="mt-6 w-full min-w-0">
            {isMobile ? (
              <div className="rounded-2xl border-y border-ink/10 py-5">
                <div className="mb-3 grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="inkSolid"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    className="w-full"
                    onClick={openDock}
                  >
                    Search properties
                  </Button>
                </div>
              </div>
            ) : (
              <PropertyFiltersBar hideClearButton />
            )}
          </div>
        </div>
      </SectionShell>

      {!channelEmpty && carouselProperties.length > 0 ? (
        <SectionShell variant="cream">
          <FeaturedPropertiesCarousel
            eyebrow={featuredEyebrow}
            properties={carouselProperties}
          />
        </SectionShell>
      ) : null}

      <SectionShell variant="cream">
        <div className="w-full">
          {isMobile ? (
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="type-section-title font-display text-lg font-semibold text-ink">
                {gridTitle}
              </h2>
              {!loading && !cmsEmpty && !channelEmpty && filteredPool.length > 0 && !allMatchesShownInCarousel ? (
                <CarouselNav emblaApi={gridEmblaApi} />
              ) : null}
            </div>
          ) : (
            <h2 className="type-section-title font-display mb-8 text-lg font-semibold text-ink sm:mb-10 sm:text-xl">
              {gridTitle}
            </h2>
          )}
          {loading ? (
            <p className="rounded-2xl border border-ink/10 bg-cream px-6 py-12 text-center text-ink/60">
              Loading properties...
            </p>
          ) : cmsEmpty ? (
            <p className="rounded-2xl border border-ink/10 bg-cream px-6 py-12 text-center text-ink/60">
              Properties are temporarily unavailable. Please refresh in a moment.
            </p>
          ) : channelEmpty ? (
            <p className="rounded-2xl border border-ink/10 bg-cream px-6 py-12 text-center text-ink/60">
              {emptyChannelMessage}
            </p>
          ) : filteredPool.length === 0 ? (
            <p className="rounded-2xl border border-ink/10 bg-cream px-6 py-12 text-center text-ink/60">
              {emptyFilteredMessage}
            </p>
          ) : allMatchesShownInCarousel ? (
            <p className="rounded-2xl border border-ink/10 bg-cream px-6 py-12 text-center text-ink/60">
              Every listing that matches your filters is shown in the featured carousel above.
            </p>
          ) : isMobile ? (
            <div className="w-full">
              <div
                className="overflow-hidden"
                ref={gridEmblaRef}
                role="region"
                aria-roledescription="carousel"
                aria-label={`${gridTitle} listings`}
              >
                <div className="flex touch-pan-y [-webkit-tap-highlight-color:transparent]">
                  {gridList.map((p) => (
                    <div key={p.id} className="mr-4 min-w-0 shrink-0 grow-0 basis-full last:mr-0">
                      <PropertyListingCard property={p} compact />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6">
              {gridList.map((p) => (
                <PropertyListingCard key={p.id} property={p} compact />
              ))}
            </div>
          )}
        </div>
      </SectionShell>
    </main>
  )
}
