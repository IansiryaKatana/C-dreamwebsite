import { Button } from '../components/Button'
import { SectionShell } from '../components/SectionShell'

const lifestyle =
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=640&h=960&q=85'

export function IntroStatementSection() {
  return (
    <SectionShell variant="terracotta" id="about">
      <div className="mx-auto max-w-[min(100%,1440px)] py-4 sm:py-8">
        <h2 className="type-heading-statement font-statement text-center font-semibold leading-tight">
          A quieter way to move in Ibiza &amp; the Balearics.
        </h2>

        <div className="mt-12 flex flex-col gap-10 md:mt-14 md:flex-row md:items-start md:gap-12 lg:gap-16">
          <div className="mx-auto w-full max-w-[220px] shrink-0 md:mx-0 md:w-[26%] md:max-w-none lg:w-[22%]">
            <div className="relative w-full overflow-hidden rounded-[0.75rem] [aspect-ratio:2/3]">
              <img
                src={lifestyle}
                alt="Friends at a table"
                className="absolute inset-0 h-full w-full object-cover object-center"
                width={640}
                height={960}
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="font-light leading-[1.75] text-cream/93 lg:max-w-3xl">
              Capital Dream is a private brokerage for people who treat property as
              capital, not content. We underwrite every introduction —
              documentation, comparables, and coastal nuance — before we ever
              suggest a walk-through.
            </p>
            <p className="mt-6 font-light leading-[1.75] text-cream/93 lg:max-w-3xl">
              No roulette. No inflated listings for optics. If it is not the
              right fit, we say so early — and stay beside you until the right
              door opens.
            </p>
            <div className="mt-10 flex justify-center md:justify-start">
              <Button type="button" variant="creamOnTerracotta">
                About
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
