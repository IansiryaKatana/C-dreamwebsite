import {
  FALLBACK_RATES_FROM_AED,
  type RatesFromAed,
} from './exchangeRates'

export type DisplayCurrency = 'AED' | 'USD' | 'EUR' | 'GBP'

export function formatAed(n: number) {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 0,
  }).format(n)
}

/** Convert stored AED list price using rates where `rates[currency]` = foreign units per 1 AED. */
export function formatPriceFromAed(
  priceAed: number,
  currency: DisplayCurrency,
  rates: RatesFromAed,
  locale: string,
): string {
  if (currency === 'AED') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0,
    }).format(priceAed)
  }
  const perAed =
    rates[currency] ?? FALLBACK_RATES_FROM_AED[currency] ?? 0
  const amount = priceAed * perAed
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}
