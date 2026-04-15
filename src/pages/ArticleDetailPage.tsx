import { ChevronDown } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useCms } from '../contexts/CmsContext'
import type { ArticleTocEntry } from '../data/articleDetails'
import { resolveArticleDetail } from '../lib/cms/resolveArticleDetail'

const panelBg = '#FAF7F2'
const panelInk = '#6B3B34'
const rule = 'rgba(107, 59, 52, 0.18)'

function TocBlock({ toc }: { toc: ArticleTocEntry[] }) {
  return (
    <nav aria-label="Topic overview">
      <p
        className="font-compact text-[0.6875rem] font-semibold uppercase tracking-[0.22em]"
        style={{ color: panelInk, opacity: 0.75 }}
      >
        Topic overview
      </p>
      <ul className="mt-4 space-y-0">
        {toc.map((entry) => (
          <li key={entry.id} className="border-t first:border-t-0" style={{ borderColor: rule }}>
            {'subItems' in entry && entry.subItems.length > 0 ? (
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-3.5 pr-0.5 font-sans text-[0.9375rem] font-medium leading-snug text-[#6B3B34] [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0">{entry.label}</span>
                  <ChevronDown
                    className="size-4 shrink-0 opacity-70 transition-transform duration-200 group-open:rotate-180"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </summary>
                <ul className="space-y-0 border-t pb-1 pt-1" style={{ borderColor: rule }}>
                  {entry.subItems.map((sub) => (
                    <li key={sub.id}>
                      <a
                        href={`#${sub.id}`}
                        className="block py-2.5 pl-1 font-sans text-[0.875rem] font-medium leading-snug text-[#6B3B34]/90 transition hover:text-[#6B3B34]"
                      >
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <a
                href={`#${entry.id}`}
                className="block py-3.5 font-sans text-[0.9375rem] font-medium leading-snug text-[#6B3B34] transition hover:opacity-80"
              >
                {entry.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { mode, articleDetailsBySlug } = useCms()
  const article = resolveArticleDetail(slug, mode, articleDetailsBySlug)

  if (!article) {
    return (
      <main
        className="w-full min-w-0 rounded-2xl px-4 py-10 sm:px-8 sm:py-12"
        style={{ backgroundColor: panelBg, color: panelInk }}
        aria-label="Article not found"
      >
        <div className="flex w-full min-w-0 flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="type-heading-founders font-display font-medium leading-tight tracking-[0.02em]">
            Article not found
          </h1>
          <Link
            to="/articles"
            className="type-button font-display ml-auto shrink-0 rounded-xl border border-[#6B3B34]/35 px-5 py-2.5 font-medium text-[#6B3B34] transition hover:bg-[#6B3B34]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B3B34]/40"
          >
            Back to articles
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main
      id={`article-${article.id}`}
      aria-label={article.title}
      className="w-full min-w-0 rounded-2xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12"
      style={{ backgroundColor: panelBg, color: panelInk }}
    >
      <div className="flex w-full min-w-0 flex-col gap-8 lg:grid lg:grid-cols-[minmax(12.5rem,22%)_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-10 xl:gap-x-16">
        <div className="flex justify-end lg:col-span-2">
          <Link
            to="/articles"
            className="type-button font-display rounded-xl border border-[#6B3B34]/35 px-5 py-2.5 font-medium text-[#6B3B34] transition hover:bg-[#6B3B34]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B3B34]/40"
          >
            Back to articles
          </Link>
        </div>

        <div className="order-2 min-w-0 space-y-8 lg:order-none lg:col-start-2 lg:row-start-2">
          <h1 className="type-heading-founders font-display text-center font-medium leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="overflow-hidden rounded-2xl">
            <img
              src={article.image}
              alt={article.alt}
              className="aspect-[16/10] w-full object-cover sm:aspect-[2.1/1]"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="space-y-10">
            {article.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28"
                aria-labelledby={`${section.id}-heading`}
              >
                <h2
                  id={`${section.id}-heading`}
                  className="type-card-title font-display text-left font-medium leading-snug tracking-[0.02em]"
                >
                  {section.heading}
                </h2>
                <div className="mt-5 w-full min-w-0 space-y-4">
                  {section.paragraphs.map((p, j) => (
                    <p
                      key={j}
                      className="font-sans text-[length:var(--brand-font-body-lg)] font-normal leading-[1.65] text-[#6B3B34]/95"
                    >
                      {p}
                    </p>
                  ))}
                  {article.slug === 'ibiza-price-index-q1' && section.id === 'what-measured' ? (
                    <p className="font-sans text-[length:var(--brand-font-body-lg)] font-normal leading-[1.65] text-[#6B3B34]/95">
                      Where public series exist, we still read them against cadastral updates and
                      gestor-reported timelines —{' '}
                      <a
                        href="https://www.ine.es/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#6B3B34] underline decoration-[#6B3B34]/35 underline-offset-[0.2em] transition hover:decoration-[#6B3B34]"
                      >
                        national statistical releases
                      </a>{' '}
                      are a useful cross-check, not the full story.
                    </p>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </div>

        <aside className="order-3 space-y-10 border-t border-[#6B3B34]/15 pt-8 lg:order-none lg:col-start-1 lg:row-start-2 lg:border-t-0 lg:pt-0 lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-3 font-sans text-[0.875rem] font-normal leading-relaxed text-[#6B3B34]/88">
            <p>{article.dateLong}</p>
            <p className="font-medium text-[#6B3B34]">By: {article.author}</p>
            <p className="text-[#6B3B34]/70">Last updated {article.lastUpdated}</p>
          </div>
          <TocBlock toc={article.toc} />
        </aside>
      </div>
    </main>
  )
}
