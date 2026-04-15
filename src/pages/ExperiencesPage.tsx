import { Link } from 'react-router-dom'
import type { ConciergeService } from '../data/conciergeServices'
import { conciergeServices as staticConcierge } from '../data/conciergeServices'
import { useLocalePreferences } from '../contexts/LocalePreferencesContext'
import { useCms } from '../contexts/CmsContext'

const panelBg = '#FAF7F2'
const panelInk = '#6B3B34'

export function ExperiencesPage() {
  const { t } = useLocalePreferences()
  const { mode, loading, experiences } = useCms()

  const list: ConciergeService[] | null =
    mode === 'static' ? staticConcierge : loading ? null : experiences

  const featured = list ? list.slice(0, 2) : []
  const standard = list ? list.slice(2) : []

  return (
    <main
      id="page-experiences"
      aria-label={t('nav.experiences')}
      className="w-full min-w-0 pb-8 pt-0 sm:pb-10 lg:pb-12"
    >
      <section
        aria-label={t('nav.experiences')}
        className="w-full min-w-0 rounded-2xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10"
        style={{ backgroundColor: panelBg, color: panelInk }}
      >
        <div className="flex w-full min-w-0 flex-col gap-8 sm:gap-10">
          <header className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1
                className="type-section-header font-display tracking-[0.02em]"
                style={{ color: panelInk }}
              >
                {t('nav.experiences')}
              </h1>
              <p
                className="mt-3 max-w-3xl text-[length:var(--brand-font-body-lg)] leading-relaxed"
                style={{ color: panelInk, opacity: 0.88 }}
              >
                {t('experiences.intro')}
              </p>
            </div>
            <Link
              to="/about#about-services"
              className="type-button font-display ml-auto shrink-0 self-start rounded-xl bg-black px-5 py-2.5 font-medium text-white transition hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
            >
              {t('experiences.ctaServices')}
            </Link>
          </header>

          {list === null ? (
            <p className="text-[length:var(--brand-font-body-lg)] opacity-70" style={{ color: panelInk }}>
              Loading…
            </p>
          ) : list.length === 0 ? (
            <p className="max-w-xl text-[length:var(--brand-font-body-lg)] leading-relaxed opacity-85" style={{ color: panelInk }}>
              Concierge experiences will appear here once they are published in the CMS.
            </p>
          ) : (
            <>
              <div
                className="grid w-full min-w-0 grid-cols-1 gap-6 md:grid-cols-2 md:gap-7"
                aria-label="Featured concierge services"
              >
                {featured.map((item) => (
                  <ServiceCard key={item.id} service={item} />
                ))}
              </div>
              <div
                className="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3"
                aria-label="More concierge services"
              >
                {standard.map((item) => (
                  <ServiceCard key={item.id} service={item} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

function ServiceCard({ service }: { service: ConciergeService }) {
  const { t } = useLocalePreferences()
  const isVideo = service.mediaType === 'video'

  return (
    <article className="min-w-0">
      <div className="group flex h-full flex-col text-left">
        <div className="overflow-hidden rounded-lg">
          <div className="aspect-[16/10] w-full overflow-hidden bg-black/5">
            {isVideo ? (
              <video
                src={service.mediaUrl}
                poster={service.posterUrl?.trim() || undefined}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                controls
                playsInline
                preload="metadata"
                aria-label={service.alt || service.title}
              />
            ) : (
              <img
                src={service.mediaUrl}
                alt={service.alt}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        </div>
        <p
          className="mt-3 font-compact text-[0.6875rem] font-medium uppercase tracking-[0.2em] sm:text-[0.75rem]"
          style={{ color: panelInk, opacity: 0.85 }}
        >
          {service.phase}
          <span className="mx-2 opacity-50" aria-hidden>
            ·
          </span>
          <span>{t('experiences.buyerConcierge')}</span>
        </p>
        <h2
          className="type-card-title font-compact mt-2 font-medium leading-snug transition-opacity group-hover:opacity-90"
          style={{ color: panelInk }}
        >
          {service.title}
        </h2>
        <p
          className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed"
          style={{ color: panelInk, opacity: 0.82 }}
        >
          {service.excerpt}
        </p>
      </div>
    </article>
  )
}
