import type { SupabaseClient } from '@supabase/supabase-js'
import { FULL_BLEED_YOUTUBE_VIDEO_ID } from '@/config/fullBleedYoutube'
import { getArticleDetailModel } from '@/data/articleDetails'
import { articles } from '@/data/articles'
import { conciergeServices } from '@/data/conciergeServices'
import { heroNeighbourhoods } from '@/data/heroNeighbourhoods'
import { bannerVillaDusk } from '@/data/properties'
import type { Database } from '@/integrations/supabase/database.types'
import {
  DEFAULT_BRAND_PRIMARY,
  DEFAULT_BRAND_SURFACE,
  DEFAULT_CARD_RADIUS,
  INTEGRATION_KEYS,
} from '@/lib/cms/integrationSettingsKeys'
import { articleDetailToUpsert, mapArticleDetailRow } from './mapArticle'
import { experienceToUpsert } from './mapExperience'
import {
  upsertBulkListings100,
  upsertCapitalDreamSalespeople,
} from './seedSalespeopleAndBulkListings'

export async function migrateStaticToSupabase(
  supabase: SupabaseClient<Database>,
): Promise<{ error: string | null }> {
  const { error: spErr } = await upsertCapitalDreamSalespeople(supabase)
  if (spErr) return { error: spErr }

  const { error: pe } = await upsertBulkListings100(supabase)
  if (pe) return { error: pe }

  const articlePayload = articles
    .map((a, i) => {
      const detail = getArticleDetailModel(a.slug)
      if (!detail) return null
      return articleDetailToUpsert({ ...detail, published: true }, i)
    })
    .filter((row): row is NonNullable<typeof row> => row != null)

  if (articlePayload.length > 0) {
    const { error: ae } = await supabase.from('articles').upsert(articlePayload, {
      onConflict: 'slug',
    })
    if (ae) return { error: ae.message }
  }

  const experiencePayload = conciergeServices.map((row, i) =>
    experienceToUpsert({ ...row, published: true }, i),
  )
  if (experiencePayload.length > 0) {
    const { error: exErr } = await supabase
      .from('experiences')
      .upsert(experiencePayload, { onConflict: 'id' })
    if (exErr) return { error: exErr.message }
  }

  const heroPayload = heroNeighbourhoods.map((h, idx) => ({
    id: h.id,
    label: h.label,
    route_path: h.to,
    sort_order: idx,
    published: true,
  }))
  const { error: he } = await supabase
    .from('hero_neighbourhoods')
    .upsert(heroPayload, { onConflict: 'id' })
  if (he) return { error: he.message }

  const { error: me } = await supabase.from('marketing_pages').upsert(
    {
      slug: 'experiences',
      title: 'Experiences',
      body_html:
        '<p>Explore Capital Dreams UAE services, featured Dubai listings, and advisory support for buying, renting, and investing across the Emirates.</p>',
      hero_image_url: null,
    },
    { onConflict: 'slug' },
  )
  if (me) return { error: me.message }

  const settingsRows = [
    { key: 'hero_banner_url', value: bannerVillaDusk },
    { key: 'full_bleed_youtube_id', value: FULL_BLEED_YOUTUBE_VIDEO_ID },
    { key: INTEGRATION_KEYS.brandPrimaryHex, value: DEFAULT_BRAND_PRIMARY },
    { key: INTEGRATION_KEYS.brandSurfaceHex, value: DEFAULT_BRAND_SURFACE },
    { key: INTEGRATION_KEYS.brandCardRadiusPx, value: DEFAULT_CARD_RADIUS },
    { key: INTEGRATION_KEYS.adminGlassPanels, value: '0' },
  ]
  const { error: se } = await supabase
    .from('site_settings')
    .upsert(settingsRows, { onConflict: 'key' })
  if (se) return { error: se.message }

  return { error: null }
}

/** Load every row for admin tables (includes unpublished). */
export async function loadAllForAdmin(
  supabase: SupabaseClient<Database>,
) {
  const [props, arts, hero, mkt, settings, exps] = await Promise.all([
    supabase.from('properties').select('*').order('sort_order_home'),
    supabase.from('articles').select('*').order('sort_order'),
    supabase.from('hero_neighbourhoods').select('*').order('sort_order'),
    supabase.from('marketing_pages').select('*').order('slug'),
    supabase.from('site_settings').select('*'),
    supabase.from('experiences').select('*').order('sort_order'),
  ])
  return {
    properties: props.data ?? [],
    articles: (arts.data ?? []).map(mapArticleDetailRow),
    hero: hero.data ?? [],
    marketing: mkt.data ?? [],
    settings: settings.data ?? [],
    experiences: exps.data ?? [],
    errors: [
      props.error,
      arts.error,
      hero.error,
      mkt.error,
      settings.error,
      exps.error,
    ].filter(Boolean),
  }
}
