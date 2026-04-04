import { SectionShell } from '../components/SectionShell'

const photo =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&h=2000&q=85'

export function TallLifestyleSection() {
  return (
    <SectionShell variant="cream" aria-label="Lifestyle" compactMobilePad>
      <div className="w-full py-1 sm:py-2">
        <div className="relative w-full overflow-hidden rounded-[1.125rem] [aspect-ratio:4/5] max-h-[min(92vh,980px)] min-h-[280px] sm:min-h-[380px]">
          <img
            src={photo}
            alt="Group seated on a large outdoor sofa"
            className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
            width={1600}
            height={2000}
            loading="lazy"
          />
        </div>
      </div>
    </SectionShell>
  )
}
