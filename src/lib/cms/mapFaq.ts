import type { Database } from '@/integrations/supabase/database.types'

export type FaqTopicPublic = {
  id: string
  slug: string
  title: string
  sortOrder: number
}

export type FaqEntryPublic = {
  id: string
  topicId: string
  question: string
  answer: string
  sortOrder: number
}

export type FaqSection = FaqTopicPublic & { entries: FaqEntryPublic[] }

type TopicRow = Database['public']['Tables']['faq_topics']['Row']
type EntryRow = Database['public']['Tables']['faq_entries']['Row']

export function mapFaqTopicRow(row: TopicRow): FaqTopicPublic {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    sortOrder: row.sort_order,
  }
}

export function mapFaqEntryRow(row: EntryRow): FaqEntryPublic {
  return {
    id: row.id,
    topicId: row.topic_id,
    question: row.question,
    answer: row.answer,
    sortOrder: row.sort_order,
  }
}

export function buildFaqSections(
  topics: TopicRow[],
  entries: EntryRow[],
): FaqSection[] {
  const byTopic = new Map<string, FaqEntryPublic[]>()
  for (const e of entries) {
    const list = byTopic.get(e.topic_id) ?? []
    list.push(mapFaqEntryRow(e))
    byTopic.set(e.topic_id, list)
  }
  for (const [, list] of byTopic) {
    list.sort((a, b) => a.sortOrder - b.sortOrder)
  }
  return topics.map((t) => ({
    ...mapFaqTopicRow(t),
    entries: byTopic.get(t.id) ?? [],
  }))
}
