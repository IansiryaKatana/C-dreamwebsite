import type { PropertyGalleryItem } from '@/components/PropertyCard'
import { u } from './properties'

/**
 * Rotating pool of Unsplash IDs — each listing gets 6 distinct images (by offset).
 * Used for seeding and merge into Supabase so every property has a full hero gallery.
 */
/** 48 ids — each listing’s block of 6 is unique within the listing. */
const GALLERY_POOL = [
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
  'photo-1600566753080-17f0baa2a6c3',
  'photo-1507525428034-b723cf961d3e',
  'photo-1566073771259-6a8506099945',
  'photo-1544551763-46a013bb70d5',
  'photo-1600566753190-17f0baa2a6c3',
  'photo-1600585154340-be6161a56a0c',
  'photo-1613490493576-7fde63acd811',
  'photo-1600596542815-ffad4c1539a9',
  'photo-1600607687939-ce8a6c25118c',
  'photo-1600585154526-990dced4db0d',
  'photo-1512917774080-9991f1c4c750',
  'photo-1600585154084-4e5fe7c39198',
  'photo-1564013799919-ab600027ffc6',
  'photo-1600047509807-ba8f99d2cdde',
  'photo-1600607687644-c7171b42498f',
  'photo-1507525428034-b723cf961d3e',
  'photo-1566073771259-6a8506099945',
  'photo-1544551763-46a013bb70d5',
  'photo-1600566753080-17f0baa2a6c3',
  'photo-1613490493576-7fde63acd811',
  'photo-1600596542815-ffad4c1539a9',
  'photo-1600585154340-be6161a56a0c',
  'photo-1600585154526-990dced4db0d',
  'photo-1600607687939-ce8a6c25118c',
  'photo-1600607687644-c7171b42498f',
  'photo-1600585154084-4e5fe7c39198',
  'photo-1564013799919-ab600027ffc6',
  'photo-1512917774080-9991f1c4c750',
  'photo-1600047509807-ba8f99d2cdde',
  'photo-1507525428034-b723cf961d3e',
  'photo-1566073771259-6a8506099945',
  'photo-1544551763-46a013bb70d5',
  'photo-1600566753190-17f0baa2a6c3',
  'photo-1600566753080-17f0baa2a6c3',
  'photo-1613490493576-7fde63acd811',
  'photo-1600596542815-ffad4c1539a9',
  'photo-1600585154340-be6161a56a0c',
] as const

/** Catalog property ids in stable order (matches featured + more + catalog-only). */
export const GALLERY_SEED_ORDER = [
  '1',
  '2',
  '3',
  '4',
  's1',
  's2',
  's3',
  's4',
  'c1',
  'c2',
  'c3',
  'c4',
] as const

function galleryStartOffsetForId(id: string): number {
  const idx = GALLERY_SEED_ORDER.indexOf(id as (typeof GALLERY_SEED_ORDER)[number])
  if (idx >= 0) return idx * 6
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h % Math.max(1, GALLERY_POOL.length - 5)
}

export function gallerySixForPropertyId(id: string): PropertyGalleryItem[] {
  const start = galleryStartOffsetForId(id)
  return Array.from({ length: 6 }, (_, i) => ({
    type: 'image' as const,
    src: u(GALLERY_POOL[(start + i) % GALLERY_POOL.length], 1600, 1000),
  }))
}
