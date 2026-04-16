import { SectionShell } from '../components/SectionShell'
import { useLocalePreferences } from '../contexts/LocalePreferencesContext'

const POINT_KEYS = [
  { titleKey: 'services.p1.title', bodyKey: 'services.p1.body' },
  { titleKey: 'services.p2.title', bodyKey: 'services.p2.body' },
  { titleKey: 'services.p3.title', bodyKey: 'services.p3.body' },
  { titleKey: 'services.p4.title', bodyKey: 'services.p4.body' },
] as const

type ServicesProps = {
  id?: string
  'aria-label'?: string
}

export function ServicesGridSection({
  id = 'services',
  'aria-label': ariaLabel,
}: ServicesProps = {}) {
  const { t } = useLocalePreferences()
  return (
    <SectionShell
      variant="terracotta"
      id={id}
      aria-label={ariaLabel}
      className="relative overflow-hidden !bg-black p-4 lg:p-[50px] text-cream"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.03), transparent 34%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.02), transparent 30%), radial-gradient(circle at 80% 75%, rgba(255,255,255,0.03), transparent 28%), linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
          backgroundSize: 'auto, auto, auto, 3px 3px, 3px 3px',
        }}
      />
      <div className="relative z-10 w-full">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h3 className="type-heading-mission font-statement max-w-3xl font-semibold leading-tight text-cream">
              {t('services.heading')}
            </h3>
            <p className="mt-5 font-light leading-[1.75] text-cream/92">
              {t('services.lead')}
            </p>
          </div>
          <div className="grid overflow-hidden rounded-xl border border-white/20 sm:grid-cols-2 lg:col-span-8">
            {POINT_KEYS.map((point) => (
              <article
                key={point.titleKey}
                className="border border-white/20 p-5 text-cream"
              >
                <h3 className="font-display text-[1.05rem] font-semibold leading-snug">
                  {t(point.titleKey)}
                </h3>
                <p className="mt-3 font-light leading-relaxed text-cream/88">
                  {t(point.bodyKey)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
