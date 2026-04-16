import type { FilterDropdownOption } from './propertyFilters'
import type { RatesFromAed } from './exchangeRates'
import type { Property } from '../components/PropertyCard'
import {
  FILTER_BATH_OPTIONS,
  FILTER_BED_OPTIONS,
  FILTER_EMIRATE_OPTIONS,
  FILTER_EXCLUSIVE_OPTIONS,
  FILTER_NEIGHBOURHOOD_OPTIONS,
  FILTER_SORT_OPTIONS,
  emirateOptionsFromCatalog,
  neighbourhoodOptionsFromCatalog,
} from './propertyFilters'
import type { DisplayCurrency } from './formatCurrency'
import { formatPriceFromAed } from './formatCurrency'
import type { AppLanguage } from '../locale/messages'
import { translate } from '../locale/messages'

function intlLocale(lang: AppLanguage): string {
  if (lang === 'ar') return 'ar-AE'
  if (lang === 'fr') return 'fr-FR'
  return 'en-AE'
}

export function buildPriceFilterOptions(
  lang: AppLanguage,
  currency: DisplayCurrency,
  rates: RatesFromAed,
): FilterDropdownOption[] {
  const loc = intlLocale(lang)
  const t = (key: string, vars?: Record<string, string>) =>
    translate(lang, key, vars)
  const fmt = (aed: number) => formatPriceFromAed(aed, currency, rates, loc)
  return [
    { value: 'any', label: t('filter.anyPrice') },
    {
      value: 'under15',
      label: t('filter.underPrice', { price: fmt(15_000_000) }),
    },
    {
      value: '15to25',
      label: t('filter.betweenPrice', {
        a: fmt(15_000_000),
        b: fmt(25_000_000),
      }),
    },
    {
      value: 'over25',
      label: t('filter.overPrice', { price: fmt(25_000_000) }),
    },
  ]
}

function mapValues(
  lang: AppLanguage,
  options: FilterDropdownOption[],
  valueToKey: Record<string, string>,
): FilterDropdownOption[] {
  return options.map((o) => ({
    value: o.value,
    label: valueToKey[o.value]
      ? translate(lang, valueToKey[o.value])
      : o.label,
  }))
}

const BED_KEYS: Record<string, string> = {
  any: 'filter.anyBeds',
  studio: 'filter.bedsStudio',
  '1': 'filter.beds1',
  '2': 'filter.beds2',
  '3': 'filter.beds3',
  '4': 'filter.beds4',
  '5': 'filter.beds5',
  '6': 'filter.beds6',
}

const BATH_KEYS: Record<string, string> = {
  any: 'filter.anyBaths',
  '1': 'filter.baths1',
  '2': 'filter.baths2',
  '3': 'filter.baths3',
  '4': 'filter.baths4',
  '5': 'filter.baths5',
}

const EXC_KEYS: Record<string, string> = {
  any: 'filter.exclusive.any',
  yes: 'filter.exclusive.yes',
  no: 'filter.exclusive.no',
}

const SORT_KEYS: Record<string, string> = {
  popular: 'filter.sort.popular',
  new: 'filter.sort.new',
  priceAsc: 'filter.sort.priceAsc',
  priceDesc: 'filter.sort.priceDesc',
}

export function buildBedFilterOptions(lang: AppLanguage): FilterDropdownOption[] {
  return mapValues(lang, FILTER_BED_OPTIONS, BED_KEYS)
}

export function buildBathFilterOptions(lang: AppLanguage): FilterDropdownOption[] {
  return mapValues(lang, FILTER_BATH_OPTIONS, BATH_KEYS)
}

export function buildExclusiveFilterOptions(
  lang: AppLanguage,
): FilterDropdownOption[] {
  return mapValues(lang, FILTER_EXCLUSIVE_OPTIONS, EXC_KEYS)
}

export function buildSortFilterOptions(lang: AppLanguage): FilterDropdownOption[] {
  return mapValues(lang, FILTER_SORT_OPTIONS, SORT_KEYS)
}

export function buildNeighbourhoodOptionsLocalized(
  lang: AppLanguage,
  catalog?: Property[],
  featuredNeighbourhoodLabels?: string[],
): FilterDropdownOption[] {
  const hasFeatured = (featuredNeighbourhoodLabels?.length ?? 0) > 0
  const hasCatalog = (catalog?.length ?? 0) > 0
  const base =
    hasFeatured || hasCatalog
      ? neighbourhoodOptionsFromCatalog(catalog ?? [], featuredNeighbourhoodLabels ?? [])
      : FILTER_NEIGHBOURHOOD_OPTIONS
  return base.map((o) =>
    o.value === 'any'
      ? { ...o, label: translate(lang, 'filter.anyNeighbourhood') }
      : o,
  )
}

export function buildEmirateOptionsLocalized(
  lang: AppLanguage,
  catalog?: Property[],
  canonicalEmirates?: string[],
): FilterDropdownOption[] {
  const hasCanon = (canonicalEmirates?.length ?? 0) > 0
  const hasCatalog = (catalog?.length ?? 0) > 0
  const base =
    hasCanon || hasCatalog
      ? emirateOptionsFromCatalog(catalog ?? [], canonicalEmirates ?? [])
      : FILTER_EMIRATE_OPTIONS
  return base.map((o) =>
    o.value === 'any' ? { ...o, label: translate(lang, 'filter.anyEmirate') } : o,
  )
}
