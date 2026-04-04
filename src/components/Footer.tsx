import type { ReactNode } from 'react'

const propertyLinks = [
  { label: 'Homes', href: '#homes' },
  { label: 'Featured', href: '#homes' },
  { label: 'Off-market', href: '#homes' },
] as const

const aboutLinks = [
  { label: 'Practice', href: '#about' },
  { label: 'Team', href: '#founders' },
  { label: 'Experiences', href: '#experiences' },
] as const

const serviceLinks = [
  { label: 'Buy', href: '#services' },
  { label: 'Sell', href: '#services' },
  { label: 'Concierge', href: '#services' },
] as const

const connectLinks = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'hello@vip.estate', href: 'mailto:hello@vip.estate' },
  { label: '+34 971 000 000', href: 'tel:+34971000000' },
] as const

function Col({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div>
      <p className="nav-caps text-cream/60">{title}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  )
}

/** Full viewport width — sits outside the padded page frame. */
export function Footer() {
  return (
    <footer
      id="contact"
      className="mt-[0.625rem] w-full bg-terracotta text-cream"
    >
      <div className="mx-auto w-full max-w-[min(100%,1600px)] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 md:grid-cols-5 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <p className="type-wordmark-footer font-brand uppercase tracking-[0.06em]">
              Capital Dream
            </p>
          </div>
          <Col title="Property">
            {propertyLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-cream/90 transition hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </Col>
          <Col title="About">
            {aboutLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-cream/90 transition hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </Col>
          <Col title="Services">
            {serviceLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-cream/90 transition hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </Col>
          <Col title="Connect">
            {connectLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-cream/90 transition hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </Col>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-cream/15 pt-8 text-cream/70 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Capital Dream. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <a href="#privacy" className="nav-caps hover:text-cream">
              Privacy
            </a>
            <a href="#terms" className="nav-caps hover:text-cream">
              Terms
            </a>
            <a href="#cookies" className="nav-caps hover:text-cream">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
