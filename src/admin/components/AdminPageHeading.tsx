import { Info } from 'lucide-react'
import { useId, type ReactNode } from 'react'

export type AdminPageHeadingProps = {
  title: string
  /** Announced for the info control; keep short. */
  helpAriaLabel?: string
  /** Tooltip body (paragraphs, optional <strong>). */
  children: ReactNode
}

/**
 * Page title with an info icon; full description appears in a hover / focus tooltip.
 */
export function AdminPageHeading({
  title,
  helpAriaLabel = 'About this page',
  children,
}: AdminPageHeadingProps) {
  const tooltipId = useId()

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-xl font-semibold text-ink md:text-2xl">{title}</h1>
        <div className="group relative inline-flex">
          <button
            type="button"
            className="rounded-full p-1 text-ink/45 outline-none transition hover:bg-ink/10 hover:text-ink/85 focus-visible:ring-2 focus-visible:ring-[var(--admin-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--admin-surface)]"
            aria-describedby={tooltipId}
            aria-label={helpAriaLabel}
          >
            <Info className="size-5 shrink-0" strokeWidth={2} aria-hidden />
          </button>
          <div
            id={tooltipId}
            role="tooltip"
            className="pointer-events-none invisible absolute left-0 top-full z-50 mt-2 w-[min(calc(100vw-2rem),28rem)] max-w-[min(100vw-2rem,28rem)] rounded-lg border border-ink/15 bg-[#FAFAF8] px-3 py-2.5 text-left text-xs leading-relaxed text-ink shadow-lg opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
          >
            <div className="text-ink/90 [&_strong]:font-semibold [&_strong]:text-ink">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
