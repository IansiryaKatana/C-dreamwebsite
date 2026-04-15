import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  FALLBACK_RATES_FROM_AED,
  fetchAedRates,
  type RatesFromAed,
} from '../lib/exchangeRates'
import type { DisplayCurrency } from '../lib/formatCurrency'
import type { AreaDisplayMode } from '../lib/formatArea'
import type { AppLanguage } from '../locale/messages'
import { translate } from '../locale/messages'

const STORAGE_KEY = 'capital-dream-locale-v1'

type Stored = {
  language?: AppLanguage
  currency?: DisplayCurrency
  area?: AreaDisplayMode
}

function readStored(): Stored {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Stored
  } catch {
    return {}
  }
}

function writeStored(p: Stored) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
  } catch {
    /* ignore */
  }
}

type Ctx = {
  language: AppLanguage
  setLanguage: (l: AppLanguage) => void
  currency: DisplayCurrency
  setCurrency: (c: DisplayCurrency) => void
  areaUnit: AreaDisplayMode
  setAreaUnit: (a: AreaDisplayMode) => void
  rates: RatesFromAed
  ratesStatus: 'idle' | 'loading' | 'ok' | 'error'
  intlLocale: string
  t: (key: string, vars?: Record<string, string>) => string
}

const LocalePreferencesContext = createContext<Ctx | null>(null)

export function LocalePreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    const s = readStored()
    return s.language === 'ar' ? 'ar' : 'en'
  })
  const [currency, setCurrencyState] = useState<DisplayCurrency>(() => {
    const s = readStored()
    const c = s.currency
    if (c === 'USD' || c === 'EUR' || c === 'GBP' || c === 'AED') return c
    return 'AED'
  })
  const [areaUnit, setAreaUnitState] = useState<AreaDisplayMode>(() => {
    const s = readStored()
    const a = s.area
    if (a === 'm2' || a === 'sqm' || a === 'sqft') return a
    return 'm2'
  })
  const [rates, setRates] = useState<RatesFromAed>(FALLBACK_RATES_FROM_AED)
  const [ratesStatus, setRatesStatus] = useState<
    'idle' | 'loading' | 'ok' | 'error'
  >('idle')

  const setLanguage = useCallback((l: AppLanguage) => {
    setLanguageState(l)
    writeStored({ ...readStored(), language: l })
  }, [])

  const setCurrency = useCallback((c: DisplayCurrency) => {
    setCurrencyState(c)
    writeStored({ ...readStored(), currency: c })
  }, [])

  const setAreaUnit = useCallback((a: AreaDisplayMode) => {
    setAreaUnitState(a)
    writeStored({ ...readStored(), area: a })
  }, [])

  useEffect(() => {
    let cancelled = false
    setRatesStatus((s) => (s === 'idle' ? 'loading' : s))
    fetchAedRates()
      .then((r) => {
        if (!cancelled) {
          setRates(r)
          setRatesStatus('ok')
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRates(FALLBACK_RATES_FROM_AED)
          setRatesStatus('error')
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === 'ar' ? 'ar' : 'en'
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  const intlLocale = language === 'ar' ? 'ar-AE' : 'en-AE'

  const t = useCallback(
    (key: string, vars?: Record<string, string>) =>
      translate(language, key, vars),
    [language],
  )

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      currency,
      setCurrency,
      areaUnit,
      setAreaUnit,
      rates,
      ratesStatus,
      intlLocale,
      t,
    }),
    [
      language,
      setLanguage,
      currency,
      setCurrency,
      areaUnit,
      setAreaUnit,
      rates,
      ratesStatus,
      intlLocale,
      t,
    ],
  )

  return (
    <LocalePreferencesContext.Provider value={value}>
      {children}
    </LocalePreferencesContext.Provider>
  )
}

export function useLocalePreferences() {
  const ctx = useContext(LocalePreferencesContext)
  if (!ctx) {
    throw new Error(
      'useLocalePreferences must be used within LocalePreferencesProvider',
    )
  }
  return ctx
}
