import type { PublicSalesperson } from '@/lib/cms/loadCmsSnapshot'

/** Build a wa.me URL from a stored phone string (digits only). */
export function whatsappHref(phone: string | null | undefined): string | null {
  if (!phone?.trim()) return null
  const digits = phone.replace(/\D/g, '')
  if (!digits) return null
  return `https://wa.me/${digits}`
}

/** WhatsApp URL for an agent: explicit `social_links.whatsapp` or fallback to phone. */
export function agentWhatsappUrl(sp: PublicSalesperson | null): string | null {
  if (!sp) return null
  const raw = sp.social_links.whatsapp
  if (typeof raw === 'string') {
    const t = raw.trim()
    if (t.startsWith('http')) return t
    return whatsappHref(t)
  }
  return whatsappHref(sp.phone)
}
