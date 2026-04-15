import type { ReactNode } from 'react'
import { SectionShell } from './SectionShell'

type Props = {
  id: string
  title: string
  /** e.g. "Last updated: 10 April 2026" */
  updatedLabel: string
  children: ReactNode
}

const proseArticle =
  'max-w-4xl space-y-5 text-[0.9375rem] leading-relaxed text-ink/85 sm:text-base [&_a]:font-medium [&_a]:text-terracotta [&_a]:underline-offset-2 [&_a]:hover:underline [&_li]:ml-1 [&_ol>li]:mt-2 [&_strong]:font-semibold [&_strong]:text-ink [&_ul>li]:mt-2'

export function LegalPageShell({ id, title, updatedLabel, children }: Props) {
  return (
    <main id={id} aria-label={title} className="flex w-full flex-col gap-[0.625rem]">
      <SectionShell variant="cream">
        <header className="mb-8 border-b border-ink/10 pb-8">
          <h1 className="type-hero font-hero text-balance text-3xl text-terracotta sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-ink/55">{updatedLabel}</p>
        </header>
        <article className={proseArticle}>{children}</article>
      </SectionShell>
    </main>
  )
}

export function LegalH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="type-section-title font-display text-xl font-semibold text-terracotta sm:text-2xl">
      {children}
    </h2>
  )
}

export function LegalH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-base font-semibold text-ink sm:text-lg">{children}</h3>
  )
}

export function LegalP({ children }: { children: ReactNode }) {
  return <p className="text-pretty">{children}</p>
}

export function LegalUl({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1.5 pl-5">{children}</ul>
}

export function LegalOl({ children }: { children: ReactNode }) {
  return <ol className="list-decimal space-y-1.5 pl-5">{children}</ol>
}
