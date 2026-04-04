import { Button } from '../components/Button'
import { SectionShell } from '../components/SectionShell'

const cols = [
  {
    title: 'Acquisition',
    body: 'We build a disciplined shortlist from on- and off-market inventory, with comparables you can trace and a timeline you can plan around.',
    showCta: true,
  },
  {
    title: 'Disposal',
    body: 'Editorial storytelling, discreet previews, and buyer qualification — so your home is seen by the right people, not the loudest feed.',
    showCta: false,
  },
  {
    title: 'Residency',
    body: 'Introductions to legal, tax, and build partners who know island code — coordinated as one mandate, not a patchwork of DMs.',
    showCta: false,
  },
] as const

export function ServicesGridSection() {
  return (
    <SectionShell variant="cream" id="services">
      <div className="w-full py-4 sm:py-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="type-heading-display type-heading-display--services font-display font-semibold leading-tight text-ink">
              Ibiza&apos;s leading private-client practice
            </h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:gap-10">
            {cols.map((c) => (
              <div key={c.title} className="flex flex-col">
                <h3 className="nav-caps text-ink/55">{c.title}</h3>
                <p className="mt-4 font-light leading-relaxed text-ink/75">
                  {c.body}
                </p>
                {c.showCta ? (
                  <div className="mt-8">
                    <Button type="button" variant="outlineTerracotta">
                      Start a brief
                    </Button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
