import { Button } from '../components/Button'
import { SectionShell } from '../components/SectionShell'

export function QuoteSection() {
  return (
    <SectionShell variant="terracotta">
      <div className="mx-auto max-w-[min(100%,1440px)] py-4 sm:py-10">
        <blockquote className="mx-auto max-w-4xl text-center">
          <p className="type-quote font-display font-normal italic">
            &ldquo;You are making a big investment, so this should be taken
            seriously. Don&apos;t play real estate roulette.&rdquo;
          </p>
          <footer className="mt-8 font-display text-cream/88">
            — Claudia&hellip;
          </footer>
          <div className="mt-10 flex justify-center sm:mt-12">
            <Button type="button" variant="creamOnTerracotta">
              Learn more
            </Button>
          </div>
        </blockquote>
      </div>
    </SectionShell>
  )
}
