type Bg = 'cream' | 'terracotta'

type Props = {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  bg?: Bg
  className?: string
}

const bgTitle: Record<Bg, string> = {
  cream: 'text-ink',
  terracotta: 'text-cream',
}

const bgSub: Record<Bg, string> = {
  cream: 'text-ink/70',
  terracotta: 'text-cream/85',
}

export function SectionHeader({
  title,
  subtitle,
  align = 'left',
  bg = 'cream',
  className = '',
}: Props) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <header className={`max-w-4xl ${alignCls} ${className}`.trim()}>
      <h2
        className={`type-section-header font-display font-semibold tracking-tight ${bgTitle[bg]}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 max-w-2xl font-light leading-relaxed ${bgSub[bg]} ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  )
}
