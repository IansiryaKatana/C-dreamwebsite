import type { Database } from '@/integrations/supabase/database.types'
import type { ConciergeService } from '@/data/conciergeServices'

export type ExperienceRow = Database['public']['Tables']['experiences']['Row']

export function mapExperienceRow(row: ExperienceRow): ConciergeService {
  return {
    id: row.id,
    phase: row.phase,
    title: row.title,
    excerpt: row.excerpt ?? '',
    mediaType: row.media_type,
    mediaUrl: row.media_url,
    posterUrl: row.poster_url,
    alt: row.alt,
  }
}

export function experienceToUpsert(
  e: ConciergeService & { published: boolean },
  sortOrder: number,
): Database['public']['Tables']['experiences']['Insert'] {
  const poster =
    e.mediaType === 'video' && e.posterUrl?.trim() ? e.posterUrl.trim() : null
  return {
    id: e.id,
    phase: e.phase,
    title: e.title,
    excerpt: e.excerpt.trim() ? e.excerpt : null,
    media_type: e.mediaType,
    media_url: e.mediaUrl,
    poster_url: poster,
    alt: e.alt,
    sort_order: sortOrder,
    published: e.published,
  }
}
