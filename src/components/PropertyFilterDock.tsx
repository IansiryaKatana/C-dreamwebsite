import { X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import {
  defaultFilterParams,
  filterParamsFromSearchParams,
  filterParamsToSearchParams,
  type FilterParams,
} from '../lib/propertyFilters'
import { useLocalePreferences } from '../contexts/LocalePreferencesContext'
import { usePropertyFilterDock } from '../contexts/PropertyFilterDockContext'
import { FilterSearchSubmit, PropertyFilterFields } from './PropertyFilterFields'

/** Routes that support the same URL query filters as `/all-properties`. */
const PROPERTY_LISTING_PATHS = [
  '/all-properties',
  '/for-sale',
  '/for-rent',
  '/new-developments',
] as const

function mergeToUrl(f: FilterParams) {
  return createSearchParams(filterParamsToSearchParams(f)).toString()
}

function propertyListingPath(pathname: string): string {
  return (PROPERTY_LISTING_PATHS as readonly string[]).includes(pathname)
    ? pathname
    : '/all-properties'
}

export function PropertyFilterDock() {
  const { t } = useLocalePreferences()
  const { open, closeDock } = usePropertyFilterDock()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [sp, setSearchParams] = useSearchParams()
  const [draft, setDraft] = useState<FilterParams>(defaultFilterParams)

  useEffect(() => {
    if (!open) return
    setDraft(filterParamsFromSearchParams(sp))
  }, [open, sp])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDock()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closeDock])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const applyFiltersToListing = useCallback(
    (f: FilterParams) => {
      const next = filterParamsToSearchParams(f)
      const target = propertyListingPath(pathname)
      if (pathname === target) {
        setSearchParams(next, { replace: true })
      } else {
        const q = mergeToUrl(f)
        navigate(q ? `${target}?${q}` : target)
      }
      closeDock()
    },
    [pathname, navigate, closeDock, setSearchParams],
  )

  const onListingPage = (PROPERTY_LISTING_PATHS as readonly string[]).includes(
    pathname,
  )

  const onChange = useCallback((patch: Partial<FilterParams>) => {
    setDraft((d) => ({ ...d, ...patch }))
  }, [])

  const onClear = useCallback(() => {
    setDraft(defaultFilterParams)
  }, [])

  if (!open) return null

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[110] bg-ink/40 backdrop-blur-[2px]"
        aria-label={t('dock.closeSearchAria')}
        onClick={closeDock}
      />
      <div
        className="fixed inset-x-0 bottom-0 z-[120] max-h-[min(92vh,720px)] overflow-y-auto border-t border-ink/10 bg-cream shadow-[0_-12px_40px_rgba(28,20,18,0.12)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-filter-dock-title"
      >
        <div className="flex w-full flex-col gap-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pt-5 lg:px-10">
          <div className="flex items-start justify-between gap-3 border-b border-ink/10 pb-3">
            <div className="min-w-0">
              <h2
                id="property-filter-dock-title"
                className="type-section-title font-display text-lg font-semibold text-ink sm:text-xl"
              >
                {t('dock.title')}
              </h2>
              <p className="mt-1 text-sm text-ink/55">
                {onListingPage
                  ? t('dock.subtitleListing')
                  : t('dock.subtitleBrowse')}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-black bg-black text-white transition hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
              aria-label={t('dock.closeIconAria')}
              onClick={closeDock}
            >
              <X className="size-5" strokeWidth={2} aria-hidden />
            </button>
          </div>

          <PropertyFilterFields
            layout="dock"
            value={draft}
            onChange={onChange}
            onClear={onClear}
            showMoreFilters={!onListingPage}
            onMoreFilters={() => applyFiltersToListing(draft)}
            showSort
            showFilterActionLinks={false}
          />

          <div className="flex flex-col gap-4 border-t border-ink/10 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 gap-y-2">
              <button
                type="button"
                className="type-button text-left text-sm font-medium text-ink/55 underline-offset-4 hover:text-terracotta hover:underline"
                onClick={onClear}
              >
                {t('filter.clear')}
              </button>
              {!onListingPage ? (
                <button
                  type="button"
                  className="type-button text-left text-sm font-medium text-terracotta underline-offset-4 hover:underline"
                  onClick={() => applyFiltersToListing(draft)}
                >
                  {t('filter.more')}
                </button>
              ) : null}
            </div>
            <div className="flex flex-col gap-3 self-end sm:flex-row sm:items-center sm:justify-end sm:gap-3">
              <button
                type="button"
                className="type-button order-2 rounded-xl border border-ink/12 px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta sm:order-1"
                onClick={closeDock}
              >
                {t('dock.close')}
              </button>
              <FilterSearchSubmit
                label={t('dock.viewResults')}
                onClick={() => applyFiltersToListing(draft)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
