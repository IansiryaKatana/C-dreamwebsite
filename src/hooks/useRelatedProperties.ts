import { useMemo } from 'react'
import type { Property } from '@/components/PropertyCard'
import { useCms } from '@/contexts/CmsContext'
import {
  relatedProperties,
  relatedPropertiesInCatalog,
} from '@/lib/resolvePropertyDetail'

export function useRelatedProperties(
  current: Property | null,
  limit = 3,
): Property[] {
  const { mode, catalogProperties } = useCms()
  return useMemo(() => {
    if (!current) return []
    if (mode === 'static') return relatedProperties(current, limit)
    return relatedPropertiesInCatalog(catalogProperties, current, limit)
  }, [mode, catalogProperties, current, limit])
}
