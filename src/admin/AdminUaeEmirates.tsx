import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useCms } from '@/contexts/CmsContext'
import { adminBtnPrimary } from './adminClassNames'
import { AdminModal } from './components/AdminModal'
import { AdminPageHeading } from './components/AdminPageHeading'
import { AdminTablePagination } from './components/AdminTablePagination'
import { useAdminTablePagination } from './useAdminTablePagination'
import { getSupabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/database.types'

type Row = Database['public']['Tables']['uae_emirates']['Row']

function fieldClass() {
  return 'mt-1 w-full rounded-2xl border border-ink/15 bg-white px-3 py-2 text-xs text-ink md:text-sm'
}

export function AdminUaeEmirates() {
  const { refetch: refetchCms } = useCms()
  const sb = getSupabase()
  const [rows, setRows] = useState<Row[]>([])
  const [err, setErr] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [draft, setDraft] = useState<Row | null>(null)
  const [isNew, setIsNew] = useState(true)
  const [saveErr, setSaveErr] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!sb) return
    const { data, error } = await sb
      .from('uae_emirates')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true })
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
    const now = new Date().toISOString()
    setIsNew(true)
    setDraft({
      id: '',
      name: '',
      sort_order: rows.length,
      published: true,
      created_at: now,
      updated_at: now,
    })
    setSaveErr(null)
    setModalOpen(true)
  }

  function openEdit(r: Row) {
    setIsNew(false)
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
    const name = draft.name.trim()
    if (!name) {
      setSaveErr('Name is required.')
      return
    }
    const sortOrder = Number(draft.sort_order) || 0
    if (isNew) {
      const { error } = await sb.from('uae_emirates').insert({
        name,
        sort_order: sortOrder,
        published: draft.published,
      })
      if (error) {
        setSaveErr(error.message)
        return
      }
    } else if (draft.id) {
      const { error } = await sb
        .from('uae_emirates')
        .update({
          name,
          sort_order: sortOrder,
          published: draft.published,
        })
        .eq('id', draft.id)
      if (error) {
        setSaveErr(error.message)
        return
      }
    }
    closeModal()
    void refresh()
    void refetchCms()
  }

  async function confirmDelete() {
    if (!sb || !deleteId) return
    const { error } = await sb.from('uae_emirates').delete().eq('id', deleteId)
    if (error) {
      setErr(error.message)
      return
    }
    setDeleteId(null)
    void refresh()
    void refetchCms()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <AdminPageHeading title="UAE emirates" helpAriaLabel="About UAE emirates">
          <p>
            Canonical emirate names for listing pickers and public filters. Property Finder sync should use the
            same spelling (e.g. <strong>Dubai</strong>, <strong>Abu Dhabi</strong>,{' '}
            <strong>Northern Emirates</strong>).
          </p>
        </AdminPageHeading>
        <button
          type="button"
          onClick={openCreate}
          className={`inline-flex items-center gap-2 self-end sm:self-start ${adminBtnPrimary}`}
        >
          <Plus className="size-4" aria-hidden />
          Add emirate
        </button>
      </div>

      {err ? <p className="text-sm text-red-600">{err}</p> : null}

      <div className="overflow-x-auto rounded-[var(--admin-radius-lg,24px)] border border-ink/10 bg-white shadow-sm">
        <table className="w-full min-w-[480px] text-left text-xs md:text-sm">
          <thead>
            <tr className="border-b border-ink/10 bg-ink/[0.02] text-[0.6875rem] font-semibold uppercase tracking-wider text-ink/50">
              <th className="px-3 py-3 md:px-4">Name</th>
              <th className="px-3 py-3 md:px-4">Sort</th>
              <th className="px-3 py-3 md:px-4">Pub</th>
              <th className="px-3 py-3 text-right md:px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedRows.map((r) => (
              <tr key={r.id} className="border-b border-ink/5 last:border-0">
                <td className="px-3 py-2.5 font-medium md:px-4">{r.name}</td>
                <td className="px-3 py-2.5 md:px-4">{r.sort_order}</td>
                <td className="px-3 py-2.5 md:px-4">{r.published ? 'Yes' : 'No'}</td>
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
                      onClick={() => setDeleteId(r.id)}
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
          <p className="px-4 py-6 text-center text-sm text-ink/50">No rows (run DB migration if missing).</p>
        ) : null}
      </div>

      <AdminModal
        open={modalOpen && !!draft}
        title={draft?.name ? `Emirate · ${draft.name}` : 'New emirate'}
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
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-ink/70">Name</label>
              <input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className={fieldClass()}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink/70">Sort</label>
              <input
                type="number"
                value={draft.sort_order}
                onChange={(e) =>
                  setDraft({ ...draft, sort_order: Number(e.target.value) || 0 })
                }
                className={fieldClass()}
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                id="ue-pub"
                type="checkbox"
                checked={draft.published}
                onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
                className="size-4 rounded border-ink/20"
              />
              <label htmlFor="ue-pub" className="text-xs font-medium text-ink/70">
                Published (visible in filters)
              </label>
            </div>
          </div>
        ) : null}
        {saveErr ? <p className="mt-2 text-xs text-red-600">{saveErr}</p> : null}
      </AdminModal>

      <AdminModal
        open={!!deleteId}
        title="Delete emirate?"
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
        <p className="text-sm text-ink/75">
          Remove this name from admin pickers. Existing listings keep their stored emirate text.
        </p>
      </AdminModal>
    </div>
  )
}
