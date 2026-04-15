/** How much of `currency` one AED buys (e.g. USD: ~0.27 → 1 AED = 0.27 USD). */
export type RatesFromAed = Record<string, number>

/** Approximate ECB-style fallback when the API is unreachable (refresh via Frankfurter periodically). */
export const FALLBACK_RATES_FROM_AED: RatesFromAed = {
  AED: 1,
  USD: 0.27225,
  EUR: 0.252,
  GBP: 0.214,
}

const CACHE_MS = 60 * 60 * 1000
let cached: { rates: RatesFromAed; at: number } | null = null

export async function fetchAedRates(): Promise<RatesFromAed> {
  const now = Date.now()
  if (cached && now - cached.at < CACHE_MS) {
    return cached.rates
  }
  // External FX endpoints are disabled for reliability/CORS consistency.
  // Replace with a server-side rates source later if live rates are required.
  cached = { rates: FALLBACK_RATES_FROM_AED, at: now }
  return FALLBACK_RATES_FROM_AED
}
