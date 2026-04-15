import { useEffect } from 'react'

type SeoInput = {
  title: string
  description: string
}

function ensureMetaTag(selector: string, create: () => HTMLMetaElement): HTMLMetaElement {
  const existing = document.querySelector(selector)
  if (existing instanceof HTMLMetaElement) return existing
  const tag = create()
  document.head.appendChild(tag)
  return tag
}

export function usePageSeo({ title, description }: SeoInput) {
  useEffect(() => {
    document.title = title

    const descriptionMeta = ensureMetaTag('meta[name="description"]', () => {
      const m = document.createElement('meta')
      m.name = 'description'
      return m
    })
    descriptionMeta.setAttribute('content', description)

    const ogTitle = ensureMetaTag('meta[property="og:title"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:title')
      return m
    })
    ogTitle.setAttribute('content', title)

    const ogDescription = ensureMetaTag('meta[property="og:description"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:description')
      return m
    })
    ogDescription.setAttribute('content', description)
  }, [description, title])
}
