import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant =
  | 'primary'
  | 'ghost'
  | 'outline'
  | 'outlineTerracotta'
  | 'creamOnTerracotta'
  | 'whiteSolid'
  | 'inkSolid'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: Variant
  className?: string
}

export const buttonBaseClass =
  'type-button font-display inline-flex items-center justify-center rounded-xl px-6 py-2.5 font-medium tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50'

const base = buttonBaseClass

const variants: Record<Variant, string> = {
  primary:
    'bg-terracotta text-cream hover:bg-terracotta/90 focus-visible:outline-terracotta',
  ghost:
    'bg-transparent text-cream underline-offset-4 hover:underline focus-visible:outline-cream',
  outline:
    'border border-cream/80 text-cream hover:bg-cream/10 focus-visible:outline-cream',
  outlineTerracotta:
    'border border-terracotta text-terracotta hover:bg-terracotta/10 focus-visible:outline-terracotta',
  creamOnTerracotta:
    'bg-cream text-terracotta hover:bg-cream/90 focus-visible:outline-cream',
  whiteSolid:
    'bg-white text-terracotta hover:bg-cream hover:text-terracotta focus-visible:outline-white',
  inkSolid:
    'bg-ink text-cream hover:bg-ink/90 focus-visible:outline-ink',
}

export function buttonClassNames(
  variant: Variant = 'primary',
  className = '',
) {
  return `${base} ${variants[variant]} ${className}`.trim()
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={buttonClassNames(variant, className)}
      {...rest}
    >
      {children}
    </button>
  )
}
