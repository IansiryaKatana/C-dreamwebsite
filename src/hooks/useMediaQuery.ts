import { useEffect, useState } from 'react'

/** SSR-safe matchMedia hook (initial false until mounted). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const m = window.matchMedia(query)
    const sync = () => setMatches(m.matches)
    sync()
    m.addEventListener('change', sync)
    return () => m.removeEventListener('change', sync)
  }, [query])

  return matches
}
