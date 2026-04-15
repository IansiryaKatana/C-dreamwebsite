import { useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'

const propertyLinks = [
  { label: 'For sale', href: '/#homes' },
  { label: 'For rent', href: '/#home-more-homes' },
  { label: 'All properties', href: '/all-properties' },
] as const

const aboutLinks = [
  { label: 'Practice', href: '/about#about-intro' },
  { label: 'Team', href: '/team' },
  { label: 'Experiences', href: '/about#about-mission' },
  { label: 'FAQ', href: '/faq' },
] as const

const serviceLinks = [
  { label: 'Buy', href: '/#services' },
  { label: 'Sell', href: '/#services' },
  { label: 'Concierge', href: '/#services' },
] as const

const connectLinks = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Hello@apitaldreamdubai.com', href: 'mailto:Hello@apitaldreamdubai.com' },
  { label: '+971 50 108 3541', href: 'tel:+971501083541' },
  {
    label: 'Rosebay Living · Office No R02 · Meydan · Dubai · UAE',
    href: 'https://maps.google.com/?q=Rosebay+Living+Office+No+R02+Meydan+Dubai+UAE',
  },
] as const

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function Col({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div>
      {/* Same font/size as column links (inherits body); bold + full white */}
      <p className="text-xs font-sans font-semibold uppercase tracking-wide text-white sm:text-sm">
        {title}
      </p>
      <ul className="mt-3 space-y-2 text-sm sm:mt-4 sm:space-y-2.5 sm:text-base">{children}</ul>
    </div>
  )
}

/** Full viewport width — sits outside the padded page frame. */
export function Footer() {
  const [email, setEmail] = useState('')
  const [attempted, setAttempted] = useState(false)
  const trimmed = email.trim()
  const emptyError = Boolean(attempted && trimmed.length === 0)
  const formatError = Boolean(attempted && trimmed.length > 0 && !isValidEmail(trimmed))
  const showError = emptyError || formatError

  function handleNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setAttempted(true)
    if (!trimmed || !isValidEmail(trimmed)) return

    const subj = encodeURIComponent('Subscribe — Capital Dream')
    const body = encodeURIComponent(
      `Please add this email to private notes and listings updates:\n\n${trimmed}`,
    )
    window.location.href = `mailto:Hello@apitaldreamdubai.com?subject=${subj}&body=${body}`
  }

  return (
    <footer
      id="contact"
      className="mt-[0.625rem] w-full text-cream"
    >
      <div className="w-full px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-7 lg:gap-x-4 xl:gap-x-6 2xl:gap-x-8">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <img
              src="/LOGO%20VERTICAL.png"
              alt="Capital Dream"
              className="h-32 w-auto object-contain sm:h-32"
              loading="lazy"
              decoding="async"
            />
          </div>
          <Col title="Property">
            {propertyLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-cream/90 leading-relaxed transition hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </Col>
          <Col title="About">
            {aboutLinks.map((l) => (
              <li key={l.label}>
                {l.href === '/faq' ? (
                  <Link
                    to="/faq"
                    className="text-cream/90 leading-relaxed transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    className="text-cream/90 leading-relaxed transition hover:text-white"
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </Col>
          <Col title="Services">
            {serviceLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-cream/90 leading-relaxed transition hover:text-white"
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
                  className="text-cream/90 leading-relaxed transition hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </Col>
          <div className="min-w-0 lg:col-span-2">
            <p className="text-xs font-sans font-semibold uppercase tracking-wide text-white sm:text-sm">
              Newsletter
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-3 flex w-full flex-col gap-3 sm:mt-4"
              noValidate
            >
              <div className="flex min-w-0 w-full flex-col gap-1.5">
                <label htmlFor="footer-subscribe-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-subscribe-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={showError || undefined}
                  aria-describedby={showError ? 'footer-subscribe-email-error' : undefined}
                  className={`min-h-12 w-full rounded-xl border bg-white/90 px-4 py-3 text-base leading-snug font-sans font-normal normal-case tracking-normal text-ink placeholder:text-ink/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/35 sm:min-h-[3.75rem] sm:px-6 sm:py-3.5 sm:text-lg ${
                    showError
                      ? 'border-terracotta'
                      : 'border-terracotta/35 focus-visible:border-terracotta/60'
                  }`}
                />
                {showError ? (
                  <p
                    id="footer-subscribe-email-error"
                    className="px-2 text-sm text-terracotta"
                    role="alert"
                  >
                    {emptyError
                      ? 'Enter your email address.'
                      : 'Enter a valid email address.'}
                  </p>
                ) : null}
              </div>
              <Button
                type="submit"
                variant="inkSolid"
                className="h-auto min-h-12 w-full whitespace-normal border border-ink px-4 py-3 text-center text-sm font-medium normal-case leading-snug tracking-normal sm:min-h-14 sm:px-5 sm:py-3.5 sm:text-base"
              >
                Subscribe to newsletter
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-cream/15 pt-8 text-cream/70 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Capital Dream. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/privacy-policy" className="nav-caps hover:text-cream">
              Privacy
            </Link>
            <Link to="/terms" className="nav-caps hover:text-cream">
              Terms
            </Link>
            <Link to="/cookies" className="nav-caps hover:text-cream">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
