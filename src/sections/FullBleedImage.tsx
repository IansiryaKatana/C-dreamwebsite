import { ImagePrimaryOverlay } from '../components/ImagePrimaryOverlay'
import { SectionShell } from '../components/SectionShell'

type Props = {
  src: string
  alt: string
  /** Tighter SectionShell padding on small viewports only */
  compactMobilePad?: boolean
  id?: string
  'aria-label'?: string
}

/** 21:9 band inside a cream section shell (outer radius + 24px pad). */
export function FullBleedImage({
  src,
  alt,
  compactMobilePad,
  id,
  'aria-label': ariaLabel,
}: Props) {
  return (
    <SectionShell
      variant="cream"
      compactMobilePad={compactMobilePad}
      id={id}
      aria-label={ariaLabel}
    >
      <figure className="w-full overflow-hidden rounded-[1.125rem] bg-ink/10">
        <div className="relative w-full [aspect-ratio:21/9]">
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 z-0 h-full w-full object-cover object-center"
            width={2400}
            height={1029}
            decoding="async"
          />
          <ImagePrimaryOverlay />
        </div>
      </figure>
    </SectionShell>
  )
}
