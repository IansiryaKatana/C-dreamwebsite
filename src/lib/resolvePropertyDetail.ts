import type { Property, PropertyGalleryItem } from '../components/PropertyCard'
import { catalogProperties } from '../data/properties'
import { propertyDetailOverlays } from '../data/propertyDetailOverlays'

const FALLBACK_CENTER = { latitude: 25.2048, longitude: 55.2708 }

const NEIGHBOURHOOD_COORDS: Record<string, { latitude: number; longitude: number }> =
  {
    'Palm Jumeirah': { latitude: 25.1124, longitude: 55.139 },
    'Emirates Hills': { latitude: 25.0545, longitude: 55.1802 },
    'Pearl Jumeirah': { latitude: 25.2308, longitude: 55.2581 },
    'Dubai Marina': { latitude: 25.0772, longitude: 55.1395 },
    'Arabian Ranches': { latitude: 25.0368, longitude: 55.264 },
    'Downtown Dubai': { latitude: 25.1972, longitude: 55.2744 },
    'Jumeirah Golf Estates': { latitude: 25.025, longitude: 55.195 },
    'Dubai Hills Estate': { latitude: 25.1, longitude: 55.24 },
    'City Walk': { latitude: 25.21, longitude: 55.265 },
    Meydan: { latitude: 25.15, longitude: 55.3 },
  }

function coordsForProperty(p: Property) {
  const key = p.neighbourhood?.trim() ?? p.location?.trim() ?? ''
  return NEIGHBOURHOOD_COORDS[key] ?? FALLBACK_CENTER
}

export function resolveGallery(property: Property): PropertyGalleryItem[] {
  if (property.gallery && property.gallery.length > 0) return property.gallery
  return [{ type: 'image', src: property.image }]
}

/** Merges catalog row + optional admin overlay + map defaults. */
export function resolvePropertyDetail(id: string): Property | null {
  const base = catalogProperties.find((p) => p.id === id)
  if (!base) return null
  const overlay = propertyDetailOverlays[id] ?? {}
  const merged: Property = { ...base, ...overlay }
  if (merged.latitude == null || merged.longitude == null) {
    const c = coordsForProperty(merged)
    merged.latitude = merged.latitude ?? c.latitude
    merged.longitude = merged.longitude ?? c.longitude
  }
  return merged
}

export function relatedProperties(
  current: Property,
  limit = 3,
): Property[] {
  return relatedPropertiesInCatalog(catalogProperties, current, limit)
}

export function relatedPropertiesInCatalog(
  catalog: Property[],
  current: Property,
  limit = 3,
): Property[] {
  const others = catalog.filter((p) => p.id !== current.id)
  const n = current.neighbourhood?.trim()
  const sameNeighbourhood = n
    ? others.filter((p) => p.neighbourhood === n)
    : []
  const sameIds = new Set(sameNeighbourhood.map((p) => p.id))
  const rest = others.filter((p) => !sameIds.has(p.id))
  return [...sameNeighbourhood, ...rest].slice(0, limit)
}

export function mergeDefaultCoords(property: Property): Property {
  if (property.latitude != null && property.longitude != null) return property
  const key = property.neighbourhood?.trim() ?? property.location?.trim() ?? ''
  const c = NEIGHBOURHOOD_COORDS[key] ?? FALLBACK_CENTER
  return {
    ...property,
    latitude: property.latitude ?? c.latitude,
    longitude: property.longitude ?? c.longitude,
  }
}
