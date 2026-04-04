import { Button } from '../components/Button'
import { SectionShell } from '../components/SectionShell'

const portrait =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&h=800&q=85'

export function FoundersSection() {
  return (
    <SectionShell variant="terracotta" id="founders">
      <div className="mx-auto grid max-w-[min(100%,1440px)] items-start gap-10 py-4 sm:gap-12 sm:py-8 md:grid-cols-12 md:gap-16">
        <div className="mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-[0.75rem] md:col-span-4 md:mx-0 md:max-w-none lg:col-span-3">
          <img
            src={portrait}
            alt="Founder portrait"
            className="h-full w-full object-cover object-center"
            width={800}
            height={800}
            loading="lazy"
          />
        </div>
        <div className="md:col-span-8 lg:col-span-9">
          <h2 className="type-heading-founders font-display font-semibold leading-tight">
            Founded on discretion — built on proof.
          </h2>
          <p className="mt-6 max-w-2xl font-light leading-[1.75] text-cream/93">
            Capital Dream began as a circle of advisors for friends relocating to the
            islands. Today we represent a small number of mandates at a time —
            so every introduction receives the same standard: verified, calm,
            and complete.
          </p>
          <div className="mt-10">
            <Button type="button" variant="creamOnTerracotta">
              Meet the team
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
