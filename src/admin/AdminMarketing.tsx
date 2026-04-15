import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useCms } from '@/contexts/CmsContext'
import { adminBtnPrimary } from './adminClassNames'
import { AdminTablePagination } from './components/AdminTablePagination'
import { AdminModal } from './components/AdminModal'
import { AdminPageHeading } from './components/AdminPageHeading'
import { useAdminTablePagination } from './useAdminTablePagination'
import { ImageUploadField } from './components/ImageUploadField'
import { getSupabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/database.types'

type Row = Database['public']['Tables']['marketing_pages']['Row']

function fieldClass() {
  return 'mt-1 w-full rounded-2xl border border-ink/15 bg-white px-3 py-2 text-xs text-ink md:text-sm'
}

export function AdminMarketing() {
  const { refetch: refetchCms } = useCms()
  const sb = getSupabase()
  const [rows, setRows] = useState<Row[]>([])
  const [err, setErr] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [draft, setDraft] = useState<Row | null>(null)
  const [saveErr, setSaveErr] = useState<string | null>(null)
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null)
  const [slugLocked, setSlugLocked] = useState(false)

  const refresh = useCallback(async () => {
    if (!sb) return
    const { data, error } = await sb.from('marketing_pages').select('*').order('slug')
    if (error) {
      setErr(error.message)
      return
    }
    setErr(null)
    setRows(data ?? [])
  }, [sb])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const {
    page: tablePage,
    setPage: setTablePage,
    total: tableTotal,
    totalPages: tableTotalPages,
    pagedItems: pagedRows,
    rangeStart: tableRangeStart,
    rangeEnd: tableRangeEnd,
    showPagination: showTablePagination,
  } = useAdminTablePagination(rows)

  function openCreate() {
    setSlugLocked(false)
    setDraft({
      id: crypto.randomUUID(),
      slug: '',
      title: '',
      body_html: '<p></p>',
      hero_image_url: null,
      updated_at: new Date().toISOString(),
    })
    setSaveErr(null)
    setModalOpen(true)
  }

  function openEdit(r: Row) {
    setSlugLocked(true)
    setDraft({ ...r })
    setSaveErr(null)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setDraft(null)
  }

  async function save() {
    if (!sb || !draft) return
    setSaveErr(null)
    if (!draft.slug.trim() || !draft.title.trim()) {
      setSaveErr('Slug and title are required.')
      return
    }
    const { error } = await sb.from('marketing_pages').upsert(
      {
        slug: draft.slug,
        title: draft.title,
        body_html: draft.body_html,
        hero_image_url: draft.hero_image_url,
      },
      { onConflict: 'slug' },
    )
    if (error) {
      setSaveErr(error.message)
      return
    }
    closeModal()
    void refresh()
    void refetchCms()
  }

  async function confirmDelete() {
    if (!sb || !deleteSlug) return
    const { error } = await sb.from('marketing_pages').delete().eq('slug', deleteSlug)
    if (error) {
      setErr(error.message)
      return
    }
    setDeleteSlug(null)
    void refresh()
    void refetchCms()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <AdminPageHeading title="Marketing pages" helpAriaLabel="About marketing pages">
          <p>Simple content pages (e.g. Experiences). The public route passes a matching slug.</p>
        </AdminPageHeading>
        <button
          type="button"
          onClick={openCreate}
          className={`inline-flex items-center gap-2 self-end sm:self-start ${adminBtnPrimary}`}
        >
          <Plus className="size-4" aria-hidden />
          New page
        </button>
      </div>

      {err ? <p className="text-sm text-red-600">{err}</p> : null}

      <div className="overflow-x-auto rounded-[var(--admin-radius-lg,24px)] border border-ink/10 bg-white shadow-sm">
        <table className="w-full min-w-[480px] text-left text-xs md:text-sm">
          <thead>
            <tr className="border-b border-ink/10 bg-ink/[0.02] text-[0.6875rem] font-semibold uppercase tracking-wider text-ink/50">
              <th className="px-3 py-3 md:px-4">Title</th>
              <th className="px-3 py-3 md:px-4">Slug</th>
              <th className="px-3 py-3 text-right md:px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedRows.map((r) => (
              <tr key={r.id} className="border-b border-ink/5 last:border-0">
                <td className="px-3 py-2.5 font-medium md:px-4">{r.title}</td>
                <td className="px-3 py-2.5 text-ink/65 md:px-4">{r.slug}</td>
                <td className="px-3 py-2.5 text-right md:px-4">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => openEdit(r)}
                      className="rounded-full p-2 text-ink/60 hover:bg-ink/5"
                      aria-label="Edit"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteSlug(r.slug)}
                      className="rounded-full p-2 text-red-600/80 hover:bg-red-50"
                      aria-label="Delete"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AdminTablePagination
          visible={showTablePagination}
          page={tablePage}
          totalPages={tableTotalPages}
          total={tableTotal}
          rangeStart={tableRangeStart}
          rangeEnd={tableRangeEnd}
          onPageChange={setTablePage}
        />
        {rows.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm text-ink/50">No pages yet.</p>
        ) : null}
      </div>

      <AdminModal
        open={modalOpen && !!draft}
        wide
        title={draft?.title ? `Page · ${draft.title}` : 'New marketing page'}
        onClose={closeModal}
        footer={
          <>
            <button
              type="button"
              onClick={closeModal}
              className="w-full rounded-2xl border border-ink/15 px-4 py-2.5 text-sm font-medium md:w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void save()}
              className={`w-full md:w-auto ${adminBtnPrimary}`}
            >
              Save
            </button>
          </>
        }
      >
        {draft ? (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-ink/70">Slug</label>
              <input
                value={draft.slug}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                disabled={slugLocked}
                className={fieldClass()}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink/70">Title</label>
              <input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className={fieldClass()}
              />
            </div>
            <ImageUploadField
              label="Hero image (optional)"
              folder="marketing"
              value={draft.hero_image_url ?? ''}
              onChange={(url) =>
                setDraft({ ...draft, hero_image_url: url || null })
              }
            />
            <div>
              <label className="text-xs font-medium text-ink/70">Body HTML</label>
              <textarea
                value={draft.body_html ?? ''}
                onChange={(e) => setDraft({ ...draft, body_html: e.target.value })}
                rows={12}
                className={fieldClass()}
              />
            </div>
            {saveErr ? <p className="text-xs text-red-600">{saveErr}</p> : null}
          </div>
        ) : null}
      </AdminModal>

      <AdminModal
        open={!!deleteSlug}
        title="Delete page?"
        onClose={() => setDeleteSlug(null)}
        footer={
          <>
            <button
              type="button"
              onClick={() => setDeleteSlug(null)}
              className="w-full rounded-2xl border border-ink/15 px-4 py-2.5 text-sm font-medium md:w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void confirmDelete()}
              className="w-full rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white md:w-auto"
            >
              Delete
            </button>
          </>
        }
      >
        <p className="text-sm text-ink/75">This removes the marketing page from the database.</p>
      </AdminModal>
    </div>
  )
}
