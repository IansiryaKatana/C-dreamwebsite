import { ar } from './ar'
import { en } from './en'
import { fr } from './fr'

export type AppLanguage = 'en' | 'ar' | 'fr'

type Dict = Record<string, string>

export const messages: Record<AppLanguage, Dict> = { en, ar, fr }

export function translate(
  lang: AppLanguage,
  key: string,
  vars?: Record<string, string>,
): string {
  let s = messages[lang][key] ?? messages.en[key] ?? key
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replaceAll(`{${k}}`, v)
    }
  }
  return s
}

/** When a key may be missing (e.g. CMS-only concierge ids), fall back to provided string. */
export function translateWithFallback(
  lang: AppLanguage,
  key: string,
  fallback: string,
  vars?: Record<string, string>,
): string {
  const raw = messages[lang][key] ?? messages.en[key]
  if (raw === undefined) return fallback
  let s = raw
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replaceAll(`{${k}}`, v)
    }
  }
  return s
}
