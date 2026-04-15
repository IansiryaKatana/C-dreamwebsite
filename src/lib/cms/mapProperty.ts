import type { Property, PropertyGalleryItem } from '@/components/PropertyCard'
import type { Database } from '@/integrations/supabase/database.types'

type Row = Database['public']['Tables']['properties']['Row']

function asGallery(raw: unknown): PropertyGalleryItem[] {
  if (!Array.isArray(raw)) return []
  return raw.filter(Boolean) as PropertyGalleryItem[]
}

export function mapPropertyRow(row: Row): Property {
  const gallery = asGallery(row.gallery)
  return {
    id: row.id,
    slug: row.slug ?? undefined,
    image: row.image_url,
    tag: row.tag,
    title: row.title,
    meta: row.meta ?? '',
    detail: row.detail ?? undefined,
    alt: row.alt,
    priceAed: row.price_aed ?? undefined,
    beds: row.beds ?? undefined,
    baths: row.baths ?? undefined,
    location: row.location ?? undefined,
    neighbourhood: row.neighbourhood ?? undefined,
    emirate: row.emirate ?? undefined,
    exclusiveWithUs: row.exclusive_with_us,
    interiorM2: row.interior_m2 ?? undefined,
    plotM2: row.plot_m2 ?? undefined,
    latitude: row.latitude ?? undefined,
    longitude: row.longitude ?? undefined,
    fullAddress: row.full_address ?? undefined,
    descriptionHtml: row.description_html ?? undefined,
    propertyRefId: row.property_ref_id ?? undefined,
    yearBuilt: row.year_built ?? undefined,
    gallery: gallery.length > 0 ? gallery : undefined,
    salespersonId: row.salesperson_id ?? undefined,
    propertyType: row.property_type ?? undefined,
  }
}

export function propertyToInsert(
  p: Property,
  homeSection: Row['home_section'],
  sortOrderHome: number,
  published: boolean,
  sourceMeta?: Pick<Row, 'listing_source' | 'pf_listing_id' | 'pf_payload'>,
): Database['public']['Tables']['properties']['Insert'] {
  const gallery = p.gallery && p.gallery.length > 0 ? p.gallery : []
  return {
    id: p.id,
    slug: p.slug ?? null,
    title: p.title,
    tag: p.tag,
    meta: p.meta || null,
    detail: p.detail ?? null,
    alt: p.alt,
    image_url: p.image,
    price_aed: p.priceAed ?? null,
    beds: p.beds ?? null,
    baths: p.baths ?? null,
    location: p.location ?? null,
    neighbourhood: p.neighbourhood ?? null,
    emirate: p.emirate ?? null,
    exclusive_with_us: Boolean(p.exclusiveWithUs),
    interior_m2: p.interiorM2 ?? null,
    plot_m2: p.plotM2 ?? null,
    latitude: p.latitude ?? null,
    longitude: p.longitude ?? null,
    full_address: p.fullAddress ?? null,
    description_html: p.descriptionHtml ?? null,
    property_ref_id: p.propertyRefId ?? null,
    year_built: p.yearBuilt ?? null,
    gallery: gallery as unknown as Database['public']['Tables']['properties']['Row']['gallery'],
    home_section: homeSection,
    sort_order_home: sortOrderHome,
    published,
    salesperson_id: p.salespersonId ?? null,
    property_type: p.propertyType ?? null,
    listing_source: sourceMeta?.listing_source ?? 'cms',
    pf_listing_id: sourceMeta?.pf_listing_id ?? null,
    pf_payload: sourceMeta?.pf_payload ?? null,
  }
}
