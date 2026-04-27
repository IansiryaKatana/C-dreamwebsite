export const FLOATING_SOCIAL_PLATFORMS = [
  'instagram',
  'tiktok',
  'linkedin',
  'facebook',
  'youtube',
  'website',
] as const

export type FloatingSocialPlatform = (typeof FLOATING_SOCIAL_PLATFORMS)[number]

export type FloatingSocialLink = {
  id: string
  platform: FloatingSocialPlatform
  url: string
}

const PLATFORM_SET = new Set<FloatingSocialPlatform>(FLOATING_SOCIAL_PLATFORMS)

export const DEFAULT_FLOATING_SOCIAL_LINKS: FloatingSocialLink[] = [
  { id: crypto.randomUUID(), platform: 'instagram', url: 'https://instagram.com' },
  { id: crypto.randomUUID(), platform: 'tiktok', url: 'https://www.tiktok.com' },
  { id: crypto.randomUUID(), platform: 'linkedin', url: 'https://linkedin.com' },
  { id: crypto.randomUUID(), platform: 'facebook', url: 'https://facebook.com' },
]

type UnknownLink = {
  id?: unknown
  platform?: unknown
  url?: unknown
}

export function normalizeFloatingSocialLinks(raw: unknown): FloatingSocialLink[] {
  if (!Array.isArray(raw)) return []
  const links: FloatingSocialLink[] = []
  for (const entry of raw as UnknownLink[]) {
    if (!entry || typeof entry !== 'object') continue
    const platform = typeof entry.platform === 'string' ? entry.platform : ''
    const url = typeof entry.url === 'string' ? entry.url.trim() : ''
    if (!url || !PLATFORM_SET.has(platform as FloatingSocialPlatform)) continue
    const id = typeof entry.id === 'string' && entry.id.trim() ? entry.id : crypto.randomUUID()
    links.push({
      id,
      platform: platform as FloatingSocialPlatform,
      url,
    })
  }
  return links
}
