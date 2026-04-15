import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useCms } from '@/contexts/CmsContext'
import type { ConciergeService } from '@/data/conciergeServices'
import { adminBtnGhost, adminBtnPrimary, adminBtnPrimarySm } from './adminClassNames'
import { AdminTablePagination } from './components/AdminTablePagination'
import { AdminModal } from './components/AdminModal'
import { EntityDetailSheet } from './components/EntityDetailSheet'
import { AdminPageHeading } from './components/AdminPageHeading'
import { ExperienceMediaFields } from './components/ExperienceMediaFields'
import { useAdminTablePagination } from './useAdminTablePagination'
import { getSupabase } from '@/integrations/supabase/client'
import { experienceToUpsert, mapExperienceRow } from '@/lib/cms/mapExperience'
import type { Database } from '@/integrations/supabase/database.types'

type Row = Database['public']['Tables']['experiences']['Row']

type Draft = ConciergeService & { published: boolean }

function emptyDraft(): Draft {
  return {
    id: `exp-${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`,
    phase: '',
    title: '',
    excerpt: '',
    mediaType: 'image',
    mediaUrl: '',
    posterUrl: '',
    alt: '',
    published: true,
  }
}

function rowToDraft(r: Row): Draft {
  return { ...mapExperienceRow(r), published: r.published }
}

function fieldClass() {
  return 'mt-1 w-full rounded-2xl border border-ink/15 bg-white px-3 py-2 text-xs text-ink md:text-sm'
}

export function AdminExperiences() {
  const { refetch: refetchCms } = useCms()
  const sb = getSupabase()
  const [rows, setRows] = useState<Row[]>([])
  const [err, setErr] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [sortOrder, setSortOrder] = useState(0)
  const [idLocked, setIdLocked] = useState(false)
  const [saveErr, setSaveErr] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)
  const [bulkBusy, setBulkBusy] = useState(false)
  const [viewRow, setViewRow] = useState<Row | null>(null)

  const refresh = useCallback(async () => {
    if (!sb) return
    const { data, error } = await sb.from('experiences').select('*').order('sort_order')
    if (error) {
      setErr(error.message)
      return
    }
    setErr(null)
    setRows(data ?? [])
    setSelectedIds(new Set())
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

  const selectedList = [...selectedIds]
  const allSelectedOnPage =
    pagedRows.length > 0 && pagedRows.every((r) => selectedIds.has(r.id))

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  function toggleSelectAllOnPage() {
    const ids = pagedRows.map((r) => r.id)
    setSelectedIds((prev) => {
      const n = new Set(prev)
      if (allSelectedOnPage) ids.forEach((id) => n.delete(id))
      else ids.forEach((id) => n.add(id))
      return n
    })
  }

  function clearSelection() {
    setSelectedIds(new Set())
  }

  async function runBulkPublish(published: boolean) {
    if (!sb || selectedList.length === 0) return
    setBulkBusy(true)
    const { error } = await sb.from('experiences').update({ published }).in('id', selectedList)
    setBulkBusy(false)
    if (error) setErr(error.message)
    else {
      clearSelection()
      void refresh()
      void refetchCms()
    }
  }

  async function runBulkDelete() {
    if (!sb || selectedList.length === 0) return
    setBulkBusy(true)
    const { error } = await sb.from('experiences').delete().in('id', selectedList)
    setBulkBusy(false)
    setBulkDeleteOpen(false)
    if (error) setErr(error.message)
    else {
      clearSelection()
      void refresh()
      void refetchCms()
    }
  }

  function openCreate() {
    setDraft(emptyDraft())
    setSortOrder(rows.length)
    setIdLocked(false)
    setSaveErr(null)
    setModalOpen(true)
  }

  function openEdit(r: Row) {
    setDraft(rowToDraft(r))
    setIdLocked(true)
    const ix = rows.findIndex((x) => x.id === r.id)
    setSortOrder(ix >= 0 ? r.sort_order : rows.length)
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
    if (!draft.id.trim()) {
      setSaveErr('ID is required.')
      return
    }
    if (!draft.phase.trim() || !draft.title.trim()) {
      setSaveErr('Phase and title are required.')
      return
    }
    if (!draft.mediaUrl.trim()) {
      setSaveErr(draft.mediaType === 'video' ? 'Video URL is required.' : 'Image URL is required.')
      return
    }
    const payload = experienceToUpsert(draft, sortOrder)
    const { error } = await sb.from('experiences').upsert(payload, { onConflict: 'id' })
    if (error) {
      setSaveErr(error.message)
      return
    }
    closeModal()
    void refresh()
    void refetchCms()
  }

  async function confirmDelete() {
    if (!sb || !deleteId) return
    const { error } = await sb.from('experiences').delete().eq('id', deleteId)
    if (error) {
      setErr(error.message)
      return
    }
    setDeleteId(null)
    void refresh()
    void refetchCms()
  }

  function upd<K extends keyof Draft>(key: K, v: Draft[K]) {
    setDraft((d) => (d ? { ...d, [key]: v } : d))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <AdminPageHeading title="Experiences" helpAriaLabel="About experiences">
          <p>
            Buyer concierge cards on the public Experiences page. First two by sort order appear large; the rest in a
            three-column grid. Upload an image or video to the cms-media bucket.
          </p>
        </AdminPageHeading>
        <button
          type="button"
          onClick={openCreate}
          className={`inline-flex items-center gap-2 self-end sm:self-start ${adminBtnPrimary}`}
        >
          <Plus className="size-4" aria-hidden />
          New experience
        </button>
      </div>

      {err ? <p className="text-sm text-red-600">{err}</p> : null}

      {selectedList.length > 0 ? (
        <div className="flex flex-col gap-3 rounded-[var(--admin-radius-lg,24px)] border border-[var(--admin-primary)]/25 bg-[var(--admin-accent-soft)] p-4 sm:flex-row sm:flex-wrap sm:items-center">
          <p className="text-xs font-medium text-ink md:text-sm">{selectedList.length} selected</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={bulkBusy}
              onClick={() => void runBulkPublish(true)}
              className={adminBtnPrimarySm}
            >
              Publish
            </button>
            <button
              type="button"
              disabled={bulkBusy}
              onClick={() => void runBulkPublish(false)}
              className={adminBtnGhost}
            >
              Unpublish
            </button>
            <button
              type="button"
              disabled={bulkBusy}
              onClick={() => setBulkDeleteOpen(true)}
              className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-800 md:text-sm"
            >
              Delete
            </button>
            <button type="button" onClick={clearSelection} className={adminBtnGhost}>
              Clear
            </button>
          </div>
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-[var(--admin-radius-lg,24px)] border border-ink/10 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-xs md:text-sm">
          <thead>
            <tr className="border-b border-ink/10 bg-ink/[0.02] text-[0.6875rem] font-semibold uppercase tracking-wider text-ink/50">
              <th className="w-10 px-2 py-3 md:px-3">
                <input
                  type="checkbox"
                  checked={allSelectedOnPage}
                  onChange={toggleSelectAllOnPage}
                  disabled={pagedRows.length === 0}
                  className="size-4 rounded border-ink/20"
                  aria-label="Select all on this page"
                />
              </th>
              <th className="px-3 py-3 md:px-4">Title</th>
              <th className="px-3 py-3 md:px-4">Phase</th>
              <th className="px-3 py-3 md:px-4">Media</th>
              <th className="px-3 py-3 md:px-4">Sort</th>
              <th className="px-3 py-3 md:px-4">Status</th>
              <th className="px-3 py-3 text-right md:px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedRows.map((r) => (
              <tr
                key={r.id}
                className="cursor-pointer border-b border-ink/5 transition hover:bg-ink/[0.02] last:border-0"
                onClick={() => setViewRow(r)}
              >
                <td className="px-2 py-2.5 md:px-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(r.id)}
                    onChange={() => toggleSelect(r.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="size-4 rounded border-ink/20"
                    aria-label={`Select ${r.title}`}
                  />
                </td>
                <td className="px-3 py-2.5 font-medium md:px-4">{r.title}</td>
                <td className="px-3 py-2.5 text-ink/65 md:px-4">{r.phase}</td>
                <td className="px-3 py-2.5 text-ink/65 md:px-4">{r.media_type}</td>
                <td className="px-3 py-2.5 text-ink/65 md:px-4">{r.sort_order}</td>
                <td className="px-3 py-2.5 text-ink/65 md:px-4">
                  {r.published ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.6875rem] font-medium text-emerald-800">
                      Live
                    </span>
                  ) : (
                    <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[0.6875rem] font-medium text-ink/60">
                      Draft
                    </span>
                  )}
                </td>
                <td className="px-3 py-2.5 text-right md:px-4">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        openEdit(r)
                      }}
                      className="rounded-full p-2 text-ink/60 hover:bg-ink/5"
                      aria-label="Edit"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeleteId(r.id)
                      }}
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
          <p className="px-4 py-6 text-center text-sm text-ink/50">No experiences yet.</p>
        ) : null}
      </div>

      <AdminModal
        open={modalOpen && !!draft}
        wide
        title={draft?.title ? `Experience · ${draft.title}` : 'New experience'}
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
            <button type="button" onClick={() => void save()} className={`w-full md:w-auto ${adminBtnPrimary}`}>
              Save
            </button>
          </>
        }
      >
        {draft ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {saveErr ? <p className="text-xs text-red-600 sm:col-span-2">{saveErr}</p> : null}
            <div>
              <label className="text-xs font-medium text-ink/70">ID (stable key)</label>
              <input
                value={draft.id}
                onChange={(e) => upd('id', e.target.value)}
                disabled={idLocked}
                className={fieldClass()}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink/70">Sort order</label>
              <input
                type="number"
                min={0}
                value={sortOrder}
                onChange={(e) => setSortOrder(Math.max(0, Number(e.target.value) || 0))}
                className={fieldClass()}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-ink/70">Phase (eyebrow)</label>
              <input value={draft.phase} onChange={(e) => upd('phase', e.target.value)} className={fieldClass()} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-ink/70">Title</label>
              <input value={draft.title} onChange={(e) => upd('title', e.target.value)} className={fieldClass()} />
            </div>
            <ExperienceMediaFields
              mediaType={draft.mediaType}
              onMediaTypeChange={(t) => {
                setDraft((d) =>
                  d
                    ? {
                        ...d,
                        mediaType: t,
                        posterUrl: t === 'image' ? '' : d.posterUrl,
                      }
                    : d,
                )
              }}
              mediaUrl={draft.mediaUrl}
              onMediaUrlChange={(url) => upd('mediaUrl', url)}
              posterUrl={draft.posterUrl ?? ''}
              onPosterUrlChange={(url) => upd('posterUrl', url)}
            />
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-ink/70">Alt text (accessibility)</label>
              <input value={draft.alt} onChange={(e) => upd('alt', e.target.value)} className={fieldClass()} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-ink/70">Excerpt</label>
              <textarea
                value={draft.excerpt}
                onChange={(e) => upd('excerpt', e.target.value)}
                rows={4}
                className={fieldClass()}
              />
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <input
                id="exp-published"
                type="checkbox"
                checked={draft.published}
                onChange={(e) => upd('published', e.target.checked)}
                className="size-4 rounded border-ink/20"
              />
              <label htmlFor="exp-published" className="text-xs font-medium text-ink/70">
                Published (visible on site)
              </label>
            </div>
          </div>
        ) : null}
      </AdminModal>

      <AdminModal
        open={bulkDeleteOpen}
        title={`Delete ${selectedList.length} experiences?`}
        onClose={() => setBulkDeleteOpen(false)}
        footer={
          <>
            <button
              type="button"
              onClick={() => setBulkDeleteOpen(false)}
              disabled={bulkBusy}
              className="w-full rounded-2xl border border-ink/15 px-4 py-2.5 text-sm font-medium md:w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={bulkBusy}
              onClick={() => void runBulkDelete()}
              className="w-full rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white md:w-auto disabled:opacity-50"
            >
              {bulkBusy ? 'Deleting…' : 'Delete all selected'}
            </button>
          </>
        }
      >
        <p className="text-sm text-ink/75">
          Selected experience cards will be removed from the database. The public Experiences page updates after refresh.
        </p>
      </AdminModal>

      <AdminModal
        open={!!deleteId}
        title="Delete experience?"
        onClose={() => setDeleteId(null)}
        footer={
          <>
            <button
              type="button"
              onClick={() => setDeleteId(null)}
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
        <p className="text-sm text-ink/75">This permanently removes the experience card.</p>
      </AdminModal>

      <EntityDetailSheet
        open={!!viewRow}
        title={viewRow?.title ? `Experience · ${viewRow.title}` : 'Experience details'}
        onClose={() => setViewRow(null)}
        fields={
          viewRow
            ? [
                { label: 'Phase', value: viewRow.phase },
                { label: 'Media type', value: viewRow.media_type },
                { label: 'Status', value: viewRow.published ? 'Live' : 'Draft' },
                { label: 'Sort order', value: String(viewRow.sort_order) },
                { label: 'Excerpt', value: viewRow.excerpt || '—' },
                { label: 'Media URL', value: viewRow.media_url || '—' },
              ]
            : []
        }
      />
    </div>
  )
}
