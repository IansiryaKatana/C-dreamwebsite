import { SectionShell } from '../components/SectionShell'

const seoPoints = [
  {
    title: 'Dubai real estate broker expertise',
    body: 'Capital Dream advises buyers and sellers across prime Dubai communities with verified comparables, due diligence checklists, and execution timelines.',
  },
  {
    title: 'Luxury property advisory in the UAE',
    body: 'From waterfront apartments to branded residences, we align each property recommendation with your risk profile, cash flow goals, and holding horizon.',
  },
  {
    title: 'Investment-led property sourcing',
    body: 'We evaluate yield, service charges, resale depth, and micro-location demand before we present options, so decisions remain data-backed.',
  },
  {
    title: 'Off-market and private listings',
    body: 'Our brokerage network unlocks discreet inventory and qualified introductions for clients who value confidentiality over portal volume.',
  },
] as const

type ServicesProps = {
  id?: string
  'aria-label'?: string
}

export function ServicesGridSection({
  id = 'services',
  'aria-label': ariaLabel,
}: ServicesProps = {}) {
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
              We protect attention as carefully as capital.
            </h3>
            <p className="mt-5 font-light leading-[1.75] text-cream/92">
              When you work with Capital Dream, you work with people who will
              decline a listing if it is not sound — and who will fight for the
              right one when it is. That is the only sustainable luxury.
            </p>
          </div>
          <div className="grid overflow-hidden rounded-xl border border-white/20 sm:grid-cols-2 lg:col-span-8">
            {seoPoints.map((point) => (
              <article
                key={point.title}
                className="border border-white/20 p-5 text-cream"
              >
                <h3 className="font-display text-[1.05rem] font-semibold leading-snug">
                  {point.title}
                </h3>
                <p className="mt-3 font-light leading-relaxed text-cream/88">
                  {point.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
