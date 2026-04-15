import { SectionShell } from '../components/SectionShell'

type MissionProps = {
  id?: string
  'aria-label'?: string
}

export function MissionSection({
  id = 'experiences',
  'aria-label': ariaLabel,
}: MissionProps = {}) {
  return (
    <SectionShell variant="terracotta" id={id} aria-label={ariaLabel}>
      <div className="mx-auto max-w-[min(100%,1440px)] py-4 sm:py-8">
        <h2 className="type-heading-mission font-statement max-w-4xl font-semibold leading-tight">
          We protect attention as carefully as capital.
        </h2>
        <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-2 md:gap-14 lg:gap-20">
          <p className="font-light leading-[1.75] text-cream/92">
            Markets move; principles should not. Our mandate is to translate
            noise into decisions — with documentation you can share with family
            offices, counsel, and boards without embarrassment.
          </p>
          <p className="font-light leading-[1.75] text-cream/92">
            When you work with Capital Dream, you work with people who will decline a
            listing if it is not sound — and who will fight for the right one
            when it is. That is the only sustainable luxury.
          </p>
        </div>
      </div>
    </SectionShell>
  )
}
