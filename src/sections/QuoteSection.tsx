import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { buttonClassNames } from '../components/Button'
import { SectionShell } from '../components/SectionShell'
import { useLocalePreferences } from '../contexts/LocalePreferencesContext'

type QuoteProps = {
  id?: string
  'aria-label'?: string
}

export function QuoteSection({
  id = 'quote',
  'aria-label': ariaLabel,
}: QuoteProps = {}) {
  const { t, language } = useLocalePreferences()
  const resolvedAria = ariaLabel ?? t('quote.aria')
  const quoteText = t('quote.text')
  const quoteWords = useMemo(() => quoteText.split(' '), [quoteText, language])
  const quoteWordRefs = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)
    const words = quoteWordRefs.current.filter(
      (node): node is HTMLSpanElement => Boolean(node),
    )
    if (words.length === 0) return

    gsap.set(words, { autoAlpha: 0.16, yPercent: 22 })
    const tween = gsap.to(words, {
      autoAlpha: 1,
      yPercent: 0,
      stagger: 0.055,
      ease: 'power2.out',
      duration: 0.42,
      scrollTrigger: {
        trigger: words[0],
        start: 'top 84%',
        end: 'top 46%',
        scrub: 0.6,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [quoteText])

  return (
    <SectionShell variant="terracotta" id={id} aria-label={resolvedAria}>
      <div className="mx-auto max-w-[min(100%,1440px)] py-4 sm:py-10">
        <blockquote className="mx-auto max-w-4xl text-center">
          <p className="type-quote font-display font-normal">
            <span className="sr-only">{quoteText}</span>
            <span aria-hidden>
              &ldquo;
              {quoteWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  ref={(node) => {
                    quoteWordRefs.current[index] = node
                  }}
                  className="inline-block pr-[0.22em]"
                >
                  {word}
                </span>
              ))}
              &rdquo;
            </span>
          </p>
          <footer className="mt-8 font-display text-cream/88">
            {t('quote.attribution')}
          </footer>
          <div className="mt-10 flex justify-center sm:mt-12">
            <Link
              to="/team"
              className={buttonClassNames('creamOnTerracotta')}
            >
              {t('quote.cta')}
            </Link>
          </div>
        </blockquote>
      </div>
    </SectionShell>
  )
}
