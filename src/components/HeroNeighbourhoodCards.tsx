import { ArrowUpRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export function HeroNeighbourhoodCards() {
  const cards = useMemo(
    () => [
      { id: 'hero-rent', label: 'Are you looking to rent?', to: '/for-rent' },
      { id: 'hero-buy', label: 'Do you want to buy property?', to: '/for-sale' },
      { id: 'hero-catalog', label: 'Browse our catalog', to: '/all-properties' },
    ],
    [],
  )
  const [revealedCount, setRevealedCount] = useState(0)
  const revealedCountRef = useRef(0)
  const touchStartYRef = useRef<number | null>(null)

  useEffect(() => {
    revealedCountRef.current = revealedCount
  }, [revealedCount])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia('(min-width: 768px)')
    if (!media.matches) {
      setRevealedCount(cards.length)
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setRevealedCount(cards.length)
      return
    }

    const revealOneCard = () => {
      if (revealedCountRef.current >= cards.length) return false

      let nextCount = revealedCountRef.current
      setRevealedCount((prev) => {
        nextCount = Math.min(prev + 1, cards.length)
        return nextCount
      })
      revealedCountRef.current = nextCount

      return true
    }

    const handleWheel = (event: WheelEvent) => {
      if (revealedCountRef.current >= cards.length) return
      if (event.deltaY <= 0) return
      revealOneCard()
    }

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (revealedCountRef.current >= cards.length) return
      if (touchStartYRef.current == null) return
      const currentY = event.touches[0]?.clientY
      if (typeof currentY !== 'number') return
      const deltaY = touchStartYRef.current - currentY
      if (deltaY > 12) {
        revealOneCard()
        touchStartYRef.current = null
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (revealedCountRef.current >= cards.length) return
      const key = event.key
      if (key === 'ArrowDown' || key === 'PageDown' || key === ' ' || key === 'End') {
        revealOneCard()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [cards])

  return (
    <nav
      className="flex w-full max-w-xl flex-col gap-3 md:max-w-none"
      aria-label="Browse property options"
    >
      {cards.map((item, index) => (
        <Link
          key={item.id}
          to={item.to}
          className={`group text-ink flex min-h-[4.625rem] origin-center items-center justify-between gap-4 rounded-[1.125rem] bg-white px-5 py-3.5 shadow-md shadow-black/15 ring-1 ring-ink/10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [will-change:transform] hover:-translate-y-0.5 hover:scale-[1.015] hover:shadow-lg hover:ring-ink/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream md:px-6 ${
            revealedCount > index
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-3 opacity-0'
          }`}
          style={{ transitionProperty: 'opacity, transform, box-shadow' }}
        >
          <span className="type-card-title font-compact min-w-0 flex-1 text-left text-[1.0625rem] font-medium normal-case tracking-normal text-ink lg:text-[1.2rem]">
            {item.label}
          </span>
          <ArrowUpRight
            className="size-7 shrink-0 text-black transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-8"
            strokeWidth={0.8}
            absoluteStrokeWidth
            aria-hidden
          />
        </Link>
      ))}
    </nav>
  )
}
