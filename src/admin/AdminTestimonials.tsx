import { Check, Pencil, Plus, Trash2, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCms } from '@/contexts/CmsContext'
import { getSupabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/database.types'
import { adminBtnPrimary } from './adminClassNames'
import { AdminModal } from './components/AdminModal'
import { AdminPageHeading } from './components/AdminPageHeading'
import { AdminTablePagination } from './components/AdminTablePagination'
import { useAdminTablePagination } from './useAdminTablePagination'

type Row = Database['public']['Tables']['testimonials']['Row']
type Status = Row['status']

function fieldClass() {
  return 'mt-1 w-full rounded-2xl border border-ink/15 bg-white px-3 py-2 text-xs text-ink md:text-sm'
}

function statusBadge(status: Status) {
  if (status === 'approved') return 'bg-emerald-50 text-emerald-800'
  if (status === 'declined') return 'bg-red-50 text-red-800'
  return 'bg-amber-50 text-amber-800'
}

export function AdminTestimonials() {
  const sb = getSupabase()
  const { refetch } = useCms()
  const [rows, setRows] = useState<Row[]>([])
  const [err, setErr] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [draft, setDraft] = useState<Row | null>(null)
  const [saveErr, setSaveErr] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!sb) return
    const { data, error } = await sb
      .from('testimonials')
      .select('*')
      .order('status', { ascending: true })
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
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

  const filtered = useMemo(
    () => (statusFilter === 'all' ? rows : rows.filter((r) => r.status === statusFilter)),
    [rows, statusFilter],
  )

  const {
    page,
    setPage,
    total,
    totalPages,
    pagedItems,
    rangeStart,
    rangeEnd,
    showPagination,
  } = useAdminTablePagination(filtered)

  function openCreate() {
    setDraft({
      id: crypto.randomUUID(),
      quote: '',
      author_name: '',
      author_role: null,
      author_location: null,
      rating: 5,
      status: 'approved',
      sort_order: rows.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      reviewed_at: new Date().toISOString(),
    })
    setSaveErr(null)
    setModalOpen(true)
  }

  function openEdit(row: Row) {
    setDraft({ ...row })
    setSaveErr(null)
    setModalOpen(true)
  }

  async function save() {
    if (!sb || !draft) return
    if (!draft.quote.trim() || !draft.author_name.trim()) {
      setSaveErr('Quote and author name are required.')
      return
    }
    if (draft.rating < 1 || draft.rating > 5) {
      setSaveErr('Rating must be between 1 and 5.')
      return
    }
    const payload: Database['public']['Tables']['testimonials']['Insert'] = {
      id: draft.id,
      quote: draft.quote.trim(),
      author_name: draft.author_name.trim(),
      author_role: draft.author_role?.trim() || null,
      author_location: draft.author_location?.trim() || null,
      rating: draft.rating,
      status: draft.status,
      sort_order: draft.sort_order,
      reviewed_at: draft.status === 'pending' ? null : new Date().toISOString(),
    }
    const { error } = await sb.from('testimonials').upsert(payload, { onConflict: 'id' })
    if (error) {
      setSaveErr(error.message)
      return
    }
    setModalOpen(false)
    setDraft(null)
    void refresh()
    void refetch()
  }

  async function updateStatus(row: Row, status: Status) {
    if (!sb) return
    const { error } = await sb
      .from('testimonials')
      .update({
        status,
        reviewed_at: status === 'pending' ? null : new Date().toISOString(),
      })
      .eq('id', row.id)
    if (error) {
      setErr(error.message)
      return
    }
    void refresh()
    void refetch()
  }

  async function confirmDelete() {
    if (!sb || !deleteId) return
    const { error } = await sb.from('testimonials').delete().eq('id', deleteId)
    if (error) {
      setErr(error.message)
      return
    }
    setDeleteId(null)
    void refresh()
    void refetch()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <AdminPageHeading title="Testimonials" helpAriaLabel="About testimonials moderation">
          <p>Approve or decline user-submitted reviews and curate approved testimonials shown on the public page.</p>
        </AdminPageHeading>
        <button type="button" onClick={openCreate} className={`inline-flex items-center gap-2 ${adminBtnPrimary}`}>
          <Plus className="size-4" aria-hidden />
          New testimonial
        </button>
      </div>

      {err ? <p className="text-sm text-red-600">{err}</p> : null}

      <div className="flex items-center gap-2">
        <span className="text-xs text-ink/65">Filter:</span>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as Status | 'all')
            setPage(1)
          }}
          className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-xs text-ink md:text-sm"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-[var(--admin-radius-lg,24px)] border border-ink/10 bg-white shadow-sm">
        <table className="w-full min-w-[860px] text-left text-xs md:text-sm">
          <thead>
            <tr className="border-b border-ink/10 bg-ink/[0.02] text-[0.6875rem] font-semibold uppercase tracking-wider text-ink/50">
              <th className="px-3 py-3 md:px-4">Author</th>
              <th className="px-3 py-3 md:px-4">Quote</th>
              <th className="px-3 py-3 md:px-4">Rating</th>
              <th className="px-3 py-3 md:px-4">Status</th>
              <th className="px-3 py-3 md:px-4">Sort</th>
              <th className="px-3 py-3 text-right md:px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedItems.map((row) => (
              <tr key={row.id} className="border-b border-ink/5 last:border-0">
                <td className="px-3 py-2.5 md:px-4">
                  <p className="font-medium text-ink">{row.author_name}</p>
                  <p className="text-ink/60">{[row.author_role, row.author_location].filter(Boolean).join(' | ') || '—'}</p>
                </td>
                <td className="max-w-[360px] px-3 py-2.5 md:px-4">
                  <p className="line-clamp-3 text-ink/85">{row.quote}</p>
                </td>
                <td className="px-3 py-2.5 md:px-4">{'★'.repeat(row.rating)}</td>
                <td className="px-3 py-2.5 md:px-4">
                  <span className={`rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ${statusBadge(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-3 py-2.5 md:px-4">{row.sort_order}</td>
                <td className="px-3 py-2.5 text-right md:px-4">
                  <div className="flex justify-end gap-1">
                    {row.status !== 'approved' ? (
                      <button
                        type="button"
                        onClick={() => void updateStatus(row, 'approved')}
                        className="rounded-full p-2 text-emerald-700 hover:bg-emerald-50"
                        aria-label="Approve"
                      >
                        <Check className="size-4" />
                      </button>
                    ) : null}
                    {row.status !== 'declined' ? (
                      <button
                        type="button"
                        onClick={() => void updateStatus(row, 'declined')}
                        className="rounded-full p-2 text-red-700 hover:bg-red-50"
                        aria-label="Decline"
                      >
                        <X className="size-4" />
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => openEdit(row)}
                      className="rounded-full p-2 text-ink/60 hover:bg-ink/5"
                      aria-label="Edit"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteId(row.id)}
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
          visible={showPagination}
          page={page}
          totalPages={totalPages}
          total={total}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onPageChange={setPage}
        />
        {filtered.length === 0 ? <p className="px-4 py-6 text-center text-sm text-ink/50">No testimonials yet.</p> : null}
      </div>

      <AdminModal
        open={modalOpen && !!draft}
        wide
        title={draft?.author_name ? `Testimonial · ${draft.author_name}` : 'New testimonial'}
        onClose={() => {
          setModalOpen(false)
          setDraft(null)
        }}
        footer={
          <>
            <button
              type="button"
              onClick={() => {
                setModalOpen(false)
                setDraft(null)
              }}
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
          <div className="space-y-3">
            {saveErr ? <p className="text-xs text-red-600">{saveErr}</p> : null}
            <div>
              <label className="text-xs font-medium text-ink/70">Quote</label>
              <textarea
                value={draft.quote}
                onChange={(e) => setDraft((prev) => (prev ? { ...prev, quote: e.target.value } : prev))}
                rows={6}
                className={fieldClass()}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-ink/70">Author name</label>
                <input
                  value={draft.author_name}
                  onChange={(e) => setDraft((prev) => (prev ? { ...prev, author_name: e.target.value } : prev))}
                  className={fieldClass()}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-ink/70">Role (optional)</label>
                <input
                  value={draft.author_role ?? ''}
                  onChange={(e) => setDraft((prev) => (prev ? { ...prev, author_role: e.target.value } : prev))}
                  className={fieldClass()}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-ink/70">Location (optional)</label>
                <input
                  value={draft.author_location ?? ''}
                  onChange={(e) => setDraft((prev) => (prev ? { ...prev, author_location: e.target.value } : prev))}
                  className={fieldClass()}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-ink/70">Rating</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={draft.rating}
                  onChange={(e) =>
                    setDraft((prev) =>
                      prev
                        ? {
                            ...prev,
                            rating: Math.min(5, Math.max(1, Number(e.target.value) || 5)),
                          }
                        : prev,
                    )
                  }
                  className={fieldClass()}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-ink/70">Status</label>
                <select
                  value={draft.status}
                  onChange={(e) =>
                    setDraft((prev) => (prev ? { ...prev, status: e.target.value as Status } : prev))
                  }
                  className={fieldClass()}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-ink/70">Sort order</label>
                <input
                  type="number"
                  min={0}
                  value={draft.sort_order}
                  onChange={(e) =>
                    setDraft((prev) =>
                      prev ? { ...prev, sort_order: Math.max(0, Number(e.target.value) || 0) } : prev,
                    )
                  }
                  className={fieldClass()}
                />
              </div>
            </div>
          </div>
        ) : null}
      </AdminModal>

      <AdminModal
        open={!!deleteId}
        title="Delete testimonial?"
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
        <p className="text-sm text-ink/75">This permanently removes the testimonial.</p>
      </AdminModal>
    </div>
  )
}
