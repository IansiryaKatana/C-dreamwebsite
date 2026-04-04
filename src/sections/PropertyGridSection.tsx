import { PropertyCard, type Property } from '../components/PropertyCard'
import { SectionHeader } from '../components/SectionHeader'
import { SectionShell } from '../components/SectionShell'

type Props = {
  id?: string
  title?: string
  subtitle?: string
  eyebrow?: string
  properties: Property[]
  featuredLayout?: boolean
  eyebrowLeft?: boolean
}

export function PropertyGridSection({
  id,
  title,
  subtitle,
  eyebrow,
  properties,
  featuredLayout,
  eyebrowLeft,
}: Props) {
  const showEyebrow = Boolean(eyebrow && (featuredLayout || eyebrowLeft))
  return (
    <SectionShell variant="cream" id={id}>
      <div className="w-full py-4 sm:py-8">
        {showEyebrow ? (
          <p
            className={`nav-caps text-ink/50 ${eyebrowLeft ? 'text-left' : 'text-center'}`}
          >
            {eyebrow}
          </p>
        ) : null}
        {!featuredLayout && !eyebrowLeft && title ? (
          <SectionHeader title={title} subtitle={subtitle} bg="cream" />
        ) : null}
        <div
          className={`grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-12 ${showEyebrow ? 'mt-10' : 'mt-12'}`}
        >
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
