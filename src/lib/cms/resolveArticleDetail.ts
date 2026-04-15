import type { ArticleDetailModel } from '@/data/articleDetails'
import { getArticleDetailModel } from '@/data/articleDetails'
import type { ArticleDetailFromDb } from './mapArticle'

export function resolveArticleDetail(
  slug: string | undefined,
  mode: 'static' | 'live',
  liveMap: Record<string, ArticleDetailFromDb>,
): ArticleDetailModel | undefined {
  if (!slug) return undefined
  if (mode === 'live') {
    const row = liveMap[slug]
    if (row) return row
  }
  return getArticleDetailModel(slug)
}
