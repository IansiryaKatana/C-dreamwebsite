import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  filterParamsFromSearchParams,
  filterParamsToSearchParams,
  type FilterParams,
} from '../lib/propertyFilters'
import { PropertyFilterFields } from './PropertyFilterFields'

type BarProps = {
  hideClearButton?: boolean
}

export function PropertyFiltersBar({ hideClearButton }: BarProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const value = useMemo(
    () => filterParamsFromSearchParams(searchParams),
    [searchParams],
  )

  const apply = useCallback(
    (next: FilterParams) => {
      setSearchParams(filterParamsToSearchParams(next), { replace: true })
    },
    [setSearchParams],
  )

  const onChange = useCallback(
    (patch: Partial<FilterParams>) => {
      apply({ ...value, ...patch })
    },
    [apply, value],
  )

  const onClear = useCallback(() => {
    setSearchParams({}, { replace: true })
  }, [setSearchParams])

  return (
    <PropertyFilterFields
      layout="page"
      value={value}
      onChange={onChange}
      onClear={onClear}
      showMoreFilters={false}
      showSort
      hideClearButton={hideClearButton}
    />
  )
}
