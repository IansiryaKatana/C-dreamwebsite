/**
 * Seeds Supabase with the same content as the built-in static site data
 * (properties + detail overlays, articles + long-form bodies, hero cards,
 * marketing page, site settings).
 *
 * Requires the service role key (bypasses RLS). Never expose this key in Vite.
 *
 * Usage (from vistamare/):
 *   npm run seed
 */
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { resolve } from 'node:path'
import type { Database } from '../src/integrations/supabase/database.types'
import { migrateStaticToSupabase } from '../src/lib/cms/migrateStaticToSupabase'

config({ path: resolve(process.cwd(), '.env') })

const url = process.env.VITE_SUPABASE_URL?.trim()
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

if (!url || !url.startsWith('http')) {
  console.error(
    'Missing or invalid VITE_SUPABASE_URL in .env (project Settings → API → Project URL).',
  )
  process.exit(1)
}

if (!serviceKey) {
  console.error(
    [
      'Missing SUPABASE_SERVICE_ROLE_KEY in .env.',
      '',
      'Add it from: Supabase Dashboard → Project Settings → API → service_role (secret).',
      'This key bypasses RLS — keep it server-side only; never prefix with VITE_.',
      '',
      'Alternative without CLI: sign into /admin and use “Sync static content to Supabase”.',
    ].join('\n'),
  )
  process.exit(1)
}

const supabase = createClient<Database>(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

console.log('Seeding CMS tables from repo source data…')

const { error } = await migrateStaticToSupabase(supabase)

if (error) {
  console.error('Seed failed:', error)
  process.exit(1)
}

console.log('')
console.log('Done. Seeded / updated:')
console.log('  • salespeople (12) — Capital Dream team profiles')
console.log('  • properties (100) — full fields, galleries, assigned agents, home sections')
console.log('  • articles (5) — list + TOC + sections')
console.log('  • hero_neighbourhoods (6)')
console.log('  • marketing_pages (experiences legacy page)')
console.log('  • experiences (7 buyer concierge cards)')
console.log('  • site_settings (hero banner URL, YouTube video id)')
console.log('')
console.log('Hard-refresh the public site so CmsProvider reloads live data.')
