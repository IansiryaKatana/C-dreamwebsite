import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './Button'

const navLinks = [
  { label: 'Homes', href: '#homes' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Experiences', href: '#experiences' },
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const headerBar =
    scrolled && !open
      ? 'border-b border-white/15 bg-terracotta/35 shadow-sm backdrop-blur-xl backdrop-saturate-150'
      : 'border-b border-transparent bg-transparent'

  const linkClass =
    'type-nav-link font-display font-medium uppercase tracking-[0.26em] text-cream/95 hover:text-white'

  return (
    <header
      className={`sticky top-0 z-[100] w-full transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ${headerBar}`}
    >
      <nav
        className="relative mx-auto flex w-full max-w-[min(100%,1600px)] items-center justify-between gap-3 px-4 py-3.5 text-cream [text-shadow:0_1px_2px_rgba(28,20,18,0.45)] sm:gap-4 sm:px-6 sm:py-4 lg:px-10"
        aria-label="Main"
      >
        <a
          href="#"
          className="type-wordmark-nav font-brand max-w-[46%] font-bold uppercase tracking-[0.06em] sm:max-w-none"
        >
          Capital Dream
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex xl:gap-10">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`${linkClass} transition`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="whiteSolid"
            className="type-nav-cta hidden px-5 py-2 font-semibold uppercase tracking-[0.2em] lg:inline-flex"
            onClick={() => {
              document.getElementById('book')?.scrollIntoView({
                behavior: 'smooth',
              })
            }}
          >
            Book
          </Button>
          <button
            type="button"
            className="rounded-full p-2 text-cream lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-[200] flex flex-col bg-terracotta/97 text-cream backdrop-blur-md transition lg:hidden ${
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-end px-4 pt-3 sm:px-6">
          <button
            type="button"
            className="rounded-full p-3 text-cream"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 pb-10 pt-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`${linkClass} rounded-xl px-3 py-4 hover:bg-white/10`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="mt-8">
            <Button
              type="button"
              variant="creamOnTerracotta"
              className="w-full uppercase tracking-[0.2em]"
              onClick={() => {
                setOpen(false)
                document.getElementById('book')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
            >
              Book
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
