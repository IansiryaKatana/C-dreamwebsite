import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCms } from '@/contexts/CmsContext'
import { getSupabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/database.types'
import { AdminPageHeading } from './components/AdminPageHeading'

type SubmissionRow = Pick<
  Database['public']['Tables']['form_submissions']['Row'],
  'id' | 'created_at' | 'source' | 'property_title' | 'name' | 'email'
>

export function AdminDashboard() {
  const { cmsEmpty, mode } = useCms()
  const [counts, setCounts] = useState({
    properties: 0,
    articles: 0,
    hero: 0,
    marketing: 0,
    salespeople: 0,
    experiences: 0,
    media: 0,
    users: 0,
  })
  const [recentSubmissions, setRecentSubmissions] = useState<SubmissionRow[]>([])

  const refreshCounts = useCallback(async () => {
    const sb = getSupabase()
    if (!sb) return
    const [p, a, h, m, s, x, media, users, submissions] = await Promise.all([
      sb.from('properties').select('id', { count: 'exact', head: true }),
      sb.from('articles').select('id', { count: 'exact', head: true }),
      sb.from('hero_neighbourhoods').select('id', { count: 'exact', head: true }),
      sb.from('marketing_pages').select('id', { count: 'exact', head: true }),
      sb.from('salespeople').select('id', { count: 'exact', head: true }),
      sb.from('experiences').select('id', { count: 'exact', head: true }),
      sb.from('cms_media').select('id', { count: 'exact', head: true }),
      sb.from('admin_users').select('id', { count: 'exact', head: true }),
      sb
        .from('form_submissions')
        .select('id, created_at, source, property_title, name, email')
        .order('created_at', { ascending: false })
        .limit(8),
    ])
    setCounts({
      properties: p.count ?? 0,
      articles: a.count ?? 0,
      hero: h.count ?? 0,
      marketing: m.count ?? 0,
      salespeople: s.count ?? 0,
      experiences: x.count ?? 0,
      media: media.error ? 0 : (media.count ?? 0),
      users: users.error ? 0 : (users.count ?? 0),
    })
    setRecentSubmissions(submissions.error ? [] : (submissions.data ?? []))
  }, [])

  useEffect(() => {
    void refreshCounts()
  }, [refreshCounts])

  const cards = [
    { label: 'Properties', count: counts.properties, to: '/admin/properties/listings' },
    { label: 'Featured neighbourhoods', count: counts.hero, to: '/admin/properties/neighbourhoods' },
    { label: 'Sales team', count: counts.salespeople, to: '/admin/salespeople' },
    { label: 'Articles', count: counts.articles, to: '/admin/articles' },
    { label: 'Experiences', count: counts.experiences, to: '/admin/experiences' },
    { label: 'Media library', count: counts.media, to: '/admin/media' },
    { label: 'Users', count: counts.users, to: '/admin/users' },
    { label: 'Marketing pages', count: counts.marketing, to: '/admin/marketing' },
  ] as const

  return (
    <div className="space-y-8">
      <div>
        <AdminPageHeading title="Dashboard" helpAriaLabel="About the dashboard">
          <p>
            Manage listings, editorial, hero shortcuts, and marketing copy. The public site reads from Supabase when
            published rows exist.
          </p>
        </AdminPageHeading>
        {cmsEmpty ? (
          <p className="mt-3 rounded-2xl border border-amber-200/80 bg-amber-50 px-3 py-2 text-xs text-amber-900 md:text-sm">
            Your database has no published properties yet. Run <strong>Sync static content</strong>{' '}
            below or add listings manually — until then the public site uses built-in static data.
          </p>
        ) : null}
        {mode === 'live' ? (
          <p className="mt-2 text-[0.6875rem] text-[var(--admin-primary)] md:text-xs">
            Live CMS active — public pages use database content.
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="rounded-[var(--admin-radius-lg,24px)] border border-ink/10 bg-white p-5 shadow-sm shadow-ink/5 transition hover:border-[var(--admin-primary)]/35 hover:shadow-md"
          >
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink/45">
              {c.label}
            </p>
            <p className="mt-2 font-display text-3xl font-semibold text-ink">{c.count}</p>
            <p className="mt-2 text-xs text-[var(--admin-primary)]">Open →</p>
          </Link>
        ))}
      </div>

      <section className="rounded-[var(--admin-radius-lg,24px)] border border-ink/10 bg-white p-5 shadow-sm md:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-ink md:text-base">Recent form submissions</h2>
          <Link to="/admin/submissions" className="text-xs font-medium text-[var(--admin-primary)] md:text-sm">
            View all →
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-ink/10">
          <table className="w-full min-w-[760px] border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-ink/10 bg-ink/[0.02] text-[0.6875rem] font-semibold uppercase tracking-wider text-ink/50">
                <th className="px-3 py-2.5 md:px-4">Date</th>
                <th className="px-3 py-2.5 md:px-4">Name</th>
                <th className="px-3 py-2.5 md:px-4">Email</th>
                <th className="px-3 py-2.5 md:px-4">Property</th>
                <th className="px-3 py-2.5 md:px-4">Source</th>
              </tr>
            </thead>
            <tbody>
              {recentSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-ink/55">
                    No submissions yet.
                  </td>
                </tr>
              ) : (
                recentSubmissions.map((r) => (
                  <tr key={r.id} className="border-b border-ink/10 last:border-b-0">
                    <td className="px-3 py-2.5 text-ink/70 md:px-4">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                    <td className="px-3 py-2.5 font-medium text-ink md:px-4">{r.name}</td>
                    <td className="px-3 py-2.5 text-ink/80 md:px-4">{r.email}</td>
                    <td className="px-3 py-2.5 text-ink/75 md:px-4">{r.property_title || '—'}</td>
                    <td className="px-3 py-2.5 text-ink/65 md:px-4">{r.source}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
