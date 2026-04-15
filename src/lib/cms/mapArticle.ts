import type { Article } from '@/data/articles'
import type { ArticleBodySection, ArticleTocEntry } from '@/data/articleDetails'
import type { Database } from '@/integrations/supabase/database.types'

type ArticleRow = Database['public']['Tables']['articles']['Row']

function asToc(raw: unknown): ArticleTocEntry[] {
  if (!Array.isArray(raw)) return []
  return raw as ArticleTocEntry[]
}

function asSections(raw: unknown): ArticleBodySection[] {
  if (!Array.isArray(raw)) return []
  return raw as ArticleBodySection[]
}

export function mapArticleListRow(row: ArticleRow): Article {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    dateLabel: row.date_label ?? '',
    author: row.author ?? '',
    image: row.image_url,
    alt: row.alt ?? '',
    excerpt: row.excerpt ?? '',
  }
}

export type ArticleDetailFromDb = Article & {
  dateLong: string
  lastUpdated: string
  published: boolean
  toc: ArticleTocEntry[]
  sections: ArticleBodySection[]
}

export function mapArticleDetailRow(row: ArticleRow): ArticleDetailFromDb {
  const base = mapArticleListRow(row)
  return {
    ...base,
    dateLong: row.date_long ?? base.dateLabel,
    lastUpdated: row.last_updated ?? base.dateLabel,
    published: row.published,
    toc: asToc(row.toc),
    sections: asSections(row.sections),
  }
}

export function articleDetailToUpsert(
  model: ArticleDetailFromDb,
  sortOrder: number,
): Database['public']['Tables']['articles']['Insert'] {
  return {
    id: model.id,
    slug: model.slug,
    title: model.title,
    date_label: model.dateLabel,
    author: model.author,
    image_url: model.image,
    alt: model.alt,
    excerpt: model.excerpt,
    date_long: model.dateLong,
    last_updated: model.lastUpdated,
    toc: model.toc as unknown as ArticleRow['toc'],
    sections: model.sections as unknown as ArticleRow['sections'],
    sort_order: sortOrder,
    published: model.published,
  }
}
