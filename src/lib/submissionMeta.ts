import type { Json } from '@/integrations/supabase/database.types'

export type SubmissionMeta = {
  salesperson_id: string | null
  salesperson_name: string | null
}

export function parseSubmissionMeta(meta: Json): SubmissionMeta {
  if (!meta || typeof meta !== 'object' || Array.isArray(meta)) {
    return { salesperson_id: null, salesperson_name: null }
  }
  const m = meta as Record<string, unknown>
  return {
    salesperson_id:
      typeof m.salesperson_id === 'string' ? m.salesperson_id : null,
    salesperson_name:
      typeof m.salesperson_name === 'string' ? m.salesperson_name : null,
  }
}
