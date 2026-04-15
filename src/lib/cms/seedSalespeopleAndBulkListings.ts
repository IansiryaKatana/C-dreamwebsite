import type { SupabaseClient } from '@supabase/supabase-js'
import type { Property } from '@/components/PropertyCard'
import {
  CAPITAL_DREAM_SALESPEOPLE,
  SALESPERSON_IDS_IN_ORDER,
} from '@/data/capitalDreamSalespeople'
import { gallerySixForPropertyId } from '@/data/propertyGallerySeeds'
import { u } from '@/data/properties'
import type { Database } from '@/integrations/supabase/database.types'
import { propertyToInsert } from '@/lib/cms/mapProperty'

/** Hero / listing imagery — Unsplash (same CDN pattern as static catalog). */
const MAIN_IMAGE_POOL = [
  'photo-1613490493576-7fde63acd811',
  'photo-1600596542815-ffad4c1539a9',
  'photo-1600585154340-be6161a56a0c',
  'photo-1600585154526-990dced4db0d',
  'photo-1512917774080-9991f1c4c750',
  'photo-1600047509807-ba8f99d2cdde',
  'photo-1600566753190-17f0baa2a6c3',
  'photo-1600607687939-ce8a6c25118c',
  'photo-1600607687644-c7171b42498f',
  'photo-1600585154084-4e5fe7c39198',
  'photo-1564013799919-ab600027ffc6',
  'photo-1507525428034-b723cf961d3e',
  'photo-1566073771259-6a8506099945',
  'photo-1544551763-46a013bb70d5',
  'photo-1600566753080-17f0baa2a6c3',
] as const

const NEIGHBOURHOODS = [
  'Palm Jumeirah',
  'Emirates Hills',
  'Dubai Marina',
  'JBR',
  'Business Bay',
  'Downtown Dubai',
  'Arabian Ranches',
  'Damac Hills',
  'Jumeirah Golf Estates',
  'Mudon',
  'JVC',
  'Dubai Hills',
  'Pearl Jumeirah',
  'City Walk',
  'Al Furjan',
  'The Springs',
  'Mohammed Bin Rashid City',
  'Emaar Beachfront',
  'Bluewaters Island',
  'Dubai Creek Harbour',
] as const

const EMIRATES = ['Dubai', 'Dubai', 'Dubai', 'Abu Dhabi', 'Sharjah'] as const

const PROPERTY_TYPES = ['Villa', 'Apartment', 'Penthouse', 'Townhouse'] as const

const TAGS = ['For sale', 'New', 'Exclusive', 'For sale', 'New'] as const

const TITLE_A = [
  'Azure',
  'Mirage',
  'Sapphire',
  'Oasis',
  'Horizon',
  'Lumina',
  'Velvet',
  'Coral',
  'Marina',
  'Summit',
  'Royal',
  'Serene',
  'Palm',
  'Skyline',
  'Grand',
] as const

const TITLE_B = [
  'Residence',
  'Villa',
  'Heights',
  'Gardens',
  'View',
  'Mansion',
  'Court',
  'Terrace',
  'House',
  'Point',
  'Bay',
  'Collection',
] as const

function formatAed(n: number): string {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 0,
  }).format(n)
}

function buildDescriptionHtml(p: {
  title: string
  propertyType: string
  neighbourhood: string
  emirate: string
  beds: number
  baths: number
  interiorM2: number
  plotM2: number
  yearBuilt: number
  exclusive: boolean
}): string {
  const ex = p.exclusive
    ? '<p><strong>Exclusive with us</strong> — priority access and dedicated viewings.</p>'
    : ''
  return [
    `<p>The <strong>${p.title}</strong> is a ${p.propertyType.toLowerCase()} in <strong>${p.neighbourhood}</strong>, ${p.emirate}. It offers <strong>${p.beds}</strong> bedrooms and <strong>${p.baths}</strong> bathrooms across approximately <strong>${p.interiorM2} m²</strong> of interior space${
      p.plotM2 > 0 ? ` on a <strong>${p.plotM2} m²</strong> plot` : ''
    }.</p>`,
    `<p>Built in <strong>${p.yearBuilt}</strong>, the home is positioned for ${p.neighbourhood === 'Downtown Dubai' || p.neighbourhood === 'Business Bay' ? 'urban convenience and skyline living' : 'privacy, light, and generous outdoor living'}. Expect high-quality finishes, thoughtful circulation, and spaces that work for both entertaining and day-to-day family life.</p>`,
    `<p>Capital Dream Real Estate can arrange private tours, comparable sales data, and mortgage introductions. Contact your assigned consultant for the full brochure, floor plans, and service charge breakdown.</p>`,
    ex,
  ].join('')
}

function buildPropertyAtIndex(i: number): Property {
  const id = `vm-100-${String(i + 1).padStart(3, '0')}`
  const neighbourhood = NEIGHBOURHOODS[i % NEIGHBOURHOODS.length]
  const emirate = EMIRATES[i % EMIRATES.length]
  const propertyType = PROPERTY_TYPES[i % PROPERTY_TYPES.length]
  const tag = TAGS[i % TAGS.length]
  const beds = 3 + (i % 4)
  const baths = Math.max(2, beds - 1 + (i % 2))
  const priceAed = 4_200_000 + ((i * 437_777) % 38_000_000)
  const interiorM2 =
    propertyType === 'Apartment'
      ? 120 + (i % 180)
      : propertyType === 'Penthouse'
        ? 220 + (i % 200)
        : propertyType === 'Townhouse'
          ? 180 + (i % 120)
          : 320 + (i % 400)
  const plotM2 =
    propertyType === 'Apartment' || propertyType === 'Penthouse'
      ? i % 3 === 0
        ? 0
        : 80 + (i % 40)
      : 420 + (i % 800)
  const title = `${TITLE_A[i % TITLE_A.length]} ${TITLE_B[i % TITLE_B.length]}`
  const exclusiveWithUs = i % 7 === 0
  const yearBuilt = 2014 + (i % 12)
  const salespersonId = SALESPERSON_IDS_IN_ORDER[i % SALESPERSON_IDS_IN_ORDER.length]

  const descriptionHtml = buildDescriptionHtml({
    title,
    propertyType,
    neighbourhood,
    emirate,
    beds,
    baths,
    interiorM2,
    plotM2,
    yearBuilt,
    exclusive: exclusiveWithUs,
  })

  const imgId = MAIN_IMAGE_POOL[i % MAIN_IMAGE_POOL.length]

  return {
    id,
    slug: `listing-${id}`,
    image: u(imgId, 1400, 933),
    tag,
    title,
    meta: `${formatAed(priceAed)} · ${neighbourhood}`,
    detail: `${propertyType} · ${beds} bed · ${baths} bath`,
    alt: `${title} — ${propertyType} in ${neighbourhood}, ${emirate}`,
    priceAed,
    beds,
    baths,
    location: neighbourhood,
    neighbourhood,
    emirate,
    exclusiveWithUs,
    interiorM2,
    plotM2,
    gallery: gallerySixForPropertyId(id),
    latitude: 25.05 + (i % 25) * 0.012,
    longitude: 55.1 + (i % 20) * 0.015,
    fullAddress: `Plot ${100 + i}, ${neighbourhood}, ${emirate}, UAE`,
    descriptionHtml,
    propertyRefId: `VM-2026-${String(i + 1).padStart(4, '0')}`,
    yearBuilt,
    salespersonId,
    propertyType,
  }
}

function homeSectionForIndex(i: number): 'featured' | 'more_homes' | 'none' {
  if (i < 4) return 'featured'
  if (i < 10) return 'more_homes'
  return 'none'
}

export async function upsertCapitalDreamSalespeople(
  supabase: SupabaseClient<Database>,
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('salespeople')
    .upsert(CAPITAL_DREAM_SALESPEOPLE, { onConflict: 'id' })
  return { error: error?.message ?? null }
}

/** 100 fully populated listings; assigns salespeople round-robin. */
export async function upsertBulkListings100(
  supabase: SupabaseClient<Database>,
): Promise<{ error: string | null }> {
  const payloads = Array.from({ length: 100 }, (_, i) => {
    const p = buildPropertyAtIndex(i)
    return propertyToInsert(p, homeSectionForIndex(i), i, true)
  })
  const { error } = await supabase.from('properties').upsert(payloads, {
    onConflict: 'id',
  })
  return { error: error?.message ?? null }
}
