import { buttonClassNames } from '../components/Button'
import { SectionShell } from '../components/SectionShell'
import { Link } from 'react-router-dom'

type FoundersProps = {
  id?: string
  'aria-label'?: string
}

export function FoundersSection({
  id = 'founders',
  'aria-label': ariaLabel,
}: FoundersProps = {}) {
  return (
    <SectionShell variant="terracotta" id={id} aria-label={ariaLabel}>
      <div className="mx-auto max-w-[min(100%,1440px)] py-4 sm:py-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="type-heading-founders font-display font-semibold leading-tight">
            Founded on discretion — built on proof.
          </h2>
          <p className="mt-6 font-light leading-[1.75] text-cream/93">
            Capital Dream began as a circle of advisors for friends relocating to the
            islands. Today we represent a small number of mandates at a time —
            so every introduction receives the same standard: verified, calm,
            and complete.
          </p>
          <div className="mt-10 flex justify-center">
            <Link to="/team" className={buttonClassNames('creamOnTerracotta')}>
              Meet the team
            </Link>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
