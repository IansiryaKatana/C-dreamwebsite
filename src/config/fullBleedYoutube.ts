/**
 * Full-width cinematic band — paste any normal YouTube share URL here
 * (youtu.be/…, youtube.com/watch?v=…, or /embed/…).
 */
export const FULL_BLEED_YOUTUBE_PAGE_URL =
  'https://youtu.be/mMSnes229LI?si=sG7xHm1gK_zw3F_y'

const ID_11 = /^[\w-]{11}$/

function youtubeVideoIdFromPageUrl(url: string): string {
  const trimmed = url.trim()
  try {
    const u = new URL(trimmed)
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.replace(/^\//, '').split('/')[0] ?? ''
      if (ID_11.test(id)) return id
    }
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v')
      if (v && ID_11.test(v)) return v
      const parts = u.pathname.split('/').filter(Boolean)
      const embedIdx = parts.indexOf('embed')
      if (embedIdx >= 0 && parts[embedIdx + 1] && ID_11.test(parts[embedIdx + 1])) {
        return parts[embedIdx + 1]
      }
      const shortIdx = parts.indexOf('shorts')
      if (shortIdx >= 0 && parts[shortIdx + 1] && ID_11.test(parts[shortIdx + 1])) {
        return parts[shortIdx + 1]
      }
    }
  } catch {
    /* ignore */
  }
  if (ID_11.test(trimmed)) return trimmed
  return 't8odWrre97s'
}

export const FULL_BLEED_YOUTUBE_VIDEO_ID =
  youtubeVideoIdFromPageUrl(FULL_BLEED_YOUTUBE_PAGE_URL)
