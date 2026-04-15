import type { ElementType, ReactNode } from 'react'

const variants = {
  cream: 'bg-cream text-ink',
  /** No fill — inherits page (primary) surface; keeps cream type for contrast */
  terracotta: 'bg-transparent text-cream',
} as const

export type SectionVariant = keyof typeof variants

type Props = {
  as?: ElementType
  variant: SectionVariant
  children: ReactNode
  className?: string
  id?: string
  'aria-label'?: string
  /** Omit default padding (e.g. navbar supplies its own rhythm) */
  noPad?: boolean
  /** Tighter shell padding below `sm` (10px vs 24px), full padding from `sm` up */
  compactMobilePad?: boolean
}

/**
 * Full-width section inside the page frame: 24px (1.5rem) radius + padding.
 */
export function SectionShell({
  as: Tag = 'section',
  variant,
  children,
  className = '',
  id,
  'aria-label': ariaLabel,
  noPad,
  compactMobilePad,
}: Props) {
  const pad = noPad
    ? ''
    : compactMobilePad
      ? 'p-2.5 sm:p-[1.5rem]'
      : 'p-[1.5rem]'
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={`w-full max-w-full rounded-[1.5rem] ${pad} ${variants[variant]} ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}
