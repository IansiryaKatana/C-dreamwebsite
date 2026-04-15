import { MessageCircle } from 'lucide-react'
import { whatsappHref } from '../lib/whatsapp'

const COMPANY_WHATSAPP = '+971 50 108 3541'

export function FloatingWhatsappButton() {
  const href = whatsappHref(COMPANY_WHATSAPP)
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-[120] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-6 sm:right-6"
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/60 animate-ping"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -inset-1 rounded-full border border-[#25D366]/35"
        aria-hidden
      />
      <MessageCircle className="relative z-10 size-7" strokeWidth={2.2} />
    </a>
  )
}
