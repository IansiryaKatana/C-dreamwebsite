import { LayoutGrid, LayoutList, Pencil, Trash2, Upload } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TerracottaDropdown } from '@/components/TerracottaDropdown'
import { adminBtnGhost, adminBtnPrimary, adminBtnPrimarySm } from './adminClassNames'
import { AdminModal } from './components/AdminModal'
import { AdminPageHeading } from './components/AdminPageHeading'
import { AdminTablePagination } from './components/AdminTablePagination'
import { useAdminTablePagination } from './useAdminTablePagination'
import { getSupabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/database.types'
import { removeStorageObjects } from '@/lib/cms/cmsMedia'
import { uploadCmsFile } from '@/lib/cms/uploadCmsImage'

type Row = Database['public']['Tables']['cms_media']['Row']

type KindFilter = 'all' | 'image' | 'video'
type SortKey = 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc'
type ViewMode = 'table' | 'grid'

const LIBRARY_FOLDER = 'library'

const PAGE_SIZE_OPTIONS = [12, 24, 48, 96] as const

function sortRows(list: Row[], sortKey: SortKey): Row[] {
  const out = [...list]
  switch (sortKey) {
    case 'date-asc':
      return out.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
    case 'name-asc':
      return out.sort((a, b) =>
        (a.original_filename || '').localeCompare(b.original_filename || '', undefined, {
          sensitivity: 'base',
        }),
      )
    case 'name-desc':
      return out.sort((a, b) =>
        (b.original_filename || '').localeCompare(a.original_filename || '', undefined, {
          sensitivity: 'base',
        }),
      )
    case 'date-desc':
    default:
      return out.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
  }
}

export function AdminMedia() {
  const sb = getSupabase()
  const inputRef = useRef<HTMLInputElement>(null)
  const [rows, setRows] = useState<Row[]>([])
  const [err, setErr] = useState<string | null>(null)
  const [kindFilter, setKindFilter] = useState<KindFilter>('all')
  const [folderFilter, setFolderFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('date-desc')
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [pageSize, setPageSize] = useState<number>(24)
  const [uploadStatus, setUploadStatus] = useState<
    { phase: 'idle' } | { phase: 'uploading'; current: number; total: number }
  >({ phase: 'idle' })
  const uploadBusy = uploadStatus.phase === 'uploading'
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)
  const [bulkBusy, setBulkBusy] = useState(false)
  const [editRow, setEditRow] = useState<Row | null>(null)
  const [editAlt, setEditAlt] = useState('')
  const [saveErr, setSaveErr] = useState<string | null>(null)
  const [saveBusy, setSaveBusy] = useState(false)

  const refresh = useCallback(async () => {
    if (!sb) return
    const { data, error } = await sb
      .from('cms_media')
      .select('*')
      .order('created_at', { ascending: false })
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

  const folderOptions = useMemo(() => {
    const set = new Set<string>()
    for (const r of rows) {
      const f = r.folder?.trim()
      if (f) set.add(f)
    }
    return [...set].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
  }, [rows])

  const kindFilterDropdownOptions = useMemo(
    () => [
      { value: 'all', label: 'All types' },
      { value: 'image', label: 'Images only' },
      { value: 'video', label: 'Videos only' },
    ],
    [],
  )

  const folderFilterDropdownOptions = useMemo(() => {
    const opts = [{ value: 'all', label: 'All folders' }]
    for (const f of folderOptions) opts.push({ value: f, label: f })
    return opts
  }, [folderOptions])

  const sortKeyDropdownOptions = useMemo(
    () => [
      { value: 'date-desc', label: 'Newest first' },
      { value: 'date-asc', label: 'Oldest first' },
      { value: 'name-asc', label: 'File name A–Z' },
      { value: 'name-desc', label: 'File name Z–A' },
    ],
    [],
  )

  const pageSizeDropdownOptions = useMemo(
    () => PAGE_SIZE_OPTIONS.map((n) => ({ value: String(n), label: `${n} items` })),
    [],
  )

  const filtered = useMemo(() => {
    let list = rows
    if (kindFilter !== 'all') list = list.filter((r) => r.kind === kindFilter)
    if (folderFilter !== 'all') list = list.filter((r) => r.folder === folderFilter)
    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (r) =>
          (r.original_filename || '').toLowerCase().includes(q) ||
          (r.folder || '').toLowerCase().includes(q) ||
          (r.public_url || '').toLowerCase().includes(q) ||
          (r.mime_type || '').toLowerCase().includes(q),
      )
    }
    return sortRows(list, sortKey)
  }, [rows, kindFilter, folderFilter, search, sortKey])

  const {
    page: tablePage,
    setPage: setTablePage,
    total: tableTotal,
    totalPages: tableTotalPages,
    pagedItems: pagedRows,
    rangeStart: tableRangeStart,
    rangeEnd: tableRangeEnd,
    showPagination: showTablePagination,
  } = useAdminTablePagination(filtered, {
    pageSize,
    showPaginationWhenSinglePage: true,
  })

  useEffect(() => {
    setTablePage(1)
  }, [pageSize, kindFilter, folderFilter, search, sortKey, setTablePage])

  const selectedList = [...selectedIds]
  const allOnPageSelected =
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
      if (allOnPageSelected) ids.forEach((id) => n.delete(id))
      else ids.forEach((id) => n.add(id))
      return n
    })
  }

  async function onUploadPick(files: FileList | null) {
    const list = files?.length ? Array.from(files) : []
    if (!list.length || !sb) return
    setErr(null)
    setUploadStatus({ phase: 'uploading', current: 0, total: list.length })
    const failures: { name: string; message: string }[] = []
    for (let i = 0; i < list.length; i++) {
      const file = list[i]
      setUploadStatus({ phase: 'uploading', current: i + 1, total: list.length })
      const { error } = await uploadCmsFile(sb, LIBRARY_FOLDER, file)
      if (error) failures.push({ name: file.name, message: error })
    }
    setUploadStatus({ phase: 'idle' })
    if (inputRef.current) inputRef.current.value = ''
    if (failures.length > 0) {
      const detail = failures
        .slice(0, 5)
        .map((f) => `${f.name}: ${f.message}`)
        .join('; ')
      const more =
        failures.length > 5 ? ` …and ${failures.length - 5} more` : ''
      setErr(
        failures.length === list.length
          ? `All ${list.length} upload(s) failed. ${detail}${more}`
          : `${failures.length} of ${list.length} failed. ${detail}${more}`,
      )
    }
    await refresh()
  }

  async function confirmDeleteOne() {
    if (!sb || !deleteId) return
    const row = rows.find((r) => r.id === deleteId)
    if (!row) {
      setDeleteId(null)
      return
    }
    await removeStorageObjects(sb, [row.storage_path])
    const { error } = await sb.from('cms_media').delete().eq('id', deleteId)
    if (error) setErr(error.message)
    setDeleteId(null)
    await refresh()
  }

  async function confirmBulkDelete() {
    if (!sb || selectedList.length === 0) return
    setBulkBusy(true)
    setErr(null)
    const toRemove = rows.filter((r) => selectedIds.has(r.id))
    const paths = toRemove.map((r) => r.storage_path)
    await removeStorageObjects(sb, paths)
    const { error } = await sb.from('cms_media').delete().in('id', selectedList)
    setBulkBusy(false)
    setBulkDeleteOpen(false)
    if (error) setErr(error.message)
    await refresh()
  }

  function openEdit(r: Row) {
    setEditRow(r)
    setEditAlt(r.alt_text ?? '')
    setSaveErr(null)
  }

  async function saveEdit() {
    if (!sb || !editRow) return
    setSaveBusy(true)
    setSaveErr(null)
    const { error } = await sb
      .from('cms_media')
      .update({ alt_text: editAlt.trim() || null })
      .eq('id', editRow.id)
    setSaveBusy(false)
    if (error) {
      setSaveErr(error.message)
      return
    }
    setEditRow(null)
    await refresh()
  }

  const filterBar = (
    <div className="flex flex-col gap-3 border-b border-ink/10 bg-ink/[0.02] p-3 md:flex-row md:flex-wrap md:items-end md:gap-4 md:p-4">
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <label className="flex min-w-0 flex-col gap-1">
          <span className="text-xs font-medium text-ink/70">Type</span>
          <TerracottaDropdown
            variant="admin"
            listPortal
            label="Type"
            options={kindFilterDropdownOptions}
            value={kindFilter}
            onChange={(v) => setKindFilter(v as KindFilter)}
          />
        </label>
        <label className="flex min-w-0 flex-col gap-1">
          <span className="text-xs font-medium text-ink/70">Folder</span>
          <TerracottaDropdown
            variant="admin"
            listPortal
            label="Folder"
            options={folderFilterDropdownOptions}
            value={folderFilter}
            onChange={setFolderFilter}
          />
        </label>
        <label className="flex min-w-0 flex-col gap-1 sm:col-span-2 lg:col-span-1">
          <span className="text-xs font-medium text-ink/70">Sort by</span>
          <TerracottaDropdown
            variant="admin"
            listPortal
            label="Sort by"
            options={sortKeyDropdownOptions}
            value={sortKey}
            onChange={(v) => setSortKey(v as SortKey)}
          />
        </label>
        <label className="flex min-w-0 flex-col gap-1 sm:col-span-2 lg:col-span-2">
          <span className="text-xs font-medium text-ink/70">Search</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="File name, folder, URL, MIME…"
            className="min-h-9 rounded border border-neutral-400 bg-white px-2.5 py-1.5 text-sm text-ink shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--admin-primary)]"
            autoComplete="off"
          />
        </label>
        <label className="flex min-w-0 flex-col gap-1">
          <span className="text-xs font-medium text-ink/70">Per page</span>
          <TerracottaDropdown
            variant="admin"
            listPortal
            label="Per page"
            options={pageSizeDropdownOptions}
            value={String(pageSize)}
            onChange={(v) => setPageSize(Number(v))}
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:ml-auto md:pl-2">
        <span className="text-xs text-ink/55">View</span>
        <div className="inline-flex rounded border border-neutral-400 bg-white p-0.5 shadow-sm">
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`inline-flex items-center gap-1 rounded px-2.5 py-1.5 text-xs font-medium transition ${
              viewMode === 'table'
                ? 'bg-[var(--admin-primary)] text-white'
                : 'text-ink/70 hover:bg-ink/5'
            }`}
            aria-pressed={viewMode === 'table'}
          >
            <LayoutList className="size-3.5" aria-hidden />
            Table
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`inline-flex items-center gap-1 rounded px-2.5 py-1.5 text-xs font-medium transition ${
              viewMode === 'grid'
                ? 'bg-[var(--admin-primary)] text-white'
                : 'text-ink/70 hover:bg-ink/5'
            }`}
            aria-pressed={viewMode === 'grid'}
          >
            <LayoutGrid className="size-3.5" aria-hidden />
            Grid
          </button>
        </div>
      </div>
    </div>
  )

  const bulkActions =
    selectedList.length > 0 ? (
      <div className="flex flex-wrap items-center gap-2 border-b border-ink/10 bg-amber-50/80 px-3 py-2 md:px-4">
        <span className="text-xs font-medium text-ink">{selectedList.length} selected</span>
        <button type="button" className={adminBtnGhost} onClick={() => setSelectedIds(new Set())}>
          Clear selection
        </button>
        <button
          type="button"
          className="rounded border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-800 hover:bg-red-50"
          onClick={() => setBulkDeleteOpen(true)}
        >
          Delete selected
        </button>
      </div>
    ) : null

  const emptyMessage =
    rows.length === 0
      ? 'No files in the library yet. Upload to get started.'
      : 'No media matches the current filters.'

  if (!sb) {
    return (
      <p className="text-sm text-ink/60">
        Supabase is not configured. Media library requires a database connection.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <AdminPageHeading title="Media library" helpAriaLabel="About the media library">
          <p>
            Every image or video uploaded through the CMS is listed here. Use{' '}
            <strong>Upload to library</strong> to add one or many files at once (multi-select in the file dialog). Use
            filters and search to narrow the list; switch between table and grid. Use &quot;Choose from media&quot; on
            any upload field to reuse an asset.
          </p>
        </AdminPageHeading>
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={(e) => void onUploadPick(e.target.files)}
          />
          <button
            type="button"
            disabled={uploadBusy}
            onClick={() => inputRef.current?.click()}
            className={`${adminBtnPrimary} inline-flex items-center gap-2`}
          >
            <Upload className="size-4" aria-hidden />
            {uploadBusy
              ? `Uploading ${uploadStatus.current} / ${uploadStatus.total}…`
              : 'Upload to library'}
          </button>
        </div>
      </div>

      {err ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{err}</p>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
        {filterBar}
        {bulkActions}

        {filtered.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-ink/50">{emptyMessage}</p>
        ) : viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-ink/10 bg-ink/[0.03]">
                  <th className="w-10 px-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={allOnPageSelected}
                      onChange={toggleSelectAllOnPage}
                      disabled={pagedRows.length === 0}
                      aria-label="Select all on this page"
                      className="size-4 rounded border-ink/20"
                    />
                  </th>
                  <th className="px-3 py-2.5 font-medium text-ink/70">Preview</th>
                  <th className="px-3 py-2.5 font-medium text-ink/70">File</th>
                  <th className="px-3 py-2.5 font-medium text-ink/70">Folder</th>
                  <th className="px-3 py-2.5 font-medium text-ink/70">Kind</th>
                  <th className="px-3 py-2.5 font-medium text-ink/70">Uploaded</th>
                  <th className="px-3 py-2.5 text-right font-medium text-ink/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedRows.map((r) => (
                  <tr key={r.id} className="border-b border-ink/5">
                    <td className="px-3 py-2 align-middle">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(r.id)}
                        onChange={() => toggleSelect(r.id)}
                        aria-label={`Select ${r.original_filename}`}
                        className="size-4 rounded border-ink/20"
                      />
                    </td>
                    <td className="px-3 py-2 align-middle">
                      <div className="relative h-14 w-20 overflow-hidden rounded-lg bg-ink/5">
                        {r.kind === 'video' ? (
                          <video
                            src={r.public_url}
                            className="h-full w-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                          />
                        ) : (
                          <img
                            src={r.public_url}
                            alt={r.alt_text ?? ''}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    </td>
                    <td className="max-w-[200px] px-3 py-2 align-middle">
                      <p className="truncate font-medium text-ink">{r.original_filename || '—'}</p>
                      <p className="truncate text-[0.6875rem] text-ink/45">{r.public_url}</p>
                    </td>
                    <td className="px-3 py-2 align-middle text-ink/70">{r.folder || '—'}</td>
                    <td className="px-3 py-2 align-middle uppercase text-ink/55">{r.kind}</td>
                    <td className="whitespace-nowrap px-3 py-2 align-middle text-ink/55">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 align-middle">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(r)}
                          className="rounded-lg p-2 text-ink/60 hover:bg-ink/5 hover:text-ink"
                          aria-label="Edit alt text"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteId(r.id)}
                          className="rounded-lg p-2 text-red-600/80 hover:bg-red-50"
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
          </div>
        ) : (
          <div className="p-3 md:p-4">
            <div className="mb-3 flex items-center gap-2 border-b border-ink/10 pb-3">
              <input
                type="checkbox"
                checked={allOnPageSelected}
                onChange={toggleSelectAllOnPage}
                disabled={pagedRows.length === 0}
                aria-label="Select all on this page"
                className="size-4 rounded border-ink/20"
              />
              <span className="text-xs text-ink/60">Select all on this page</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {pagedRows.map((r) => (
                <article
                  key={r.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-ink/10 bg-ink/[0.02] shadow-sm"
                >
                  <div className="relative aspect-square bg-ink/5">
                    <div className="absolute left-2 top-2 z-[1]">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(r.id)}
                        onChange={() => toggleSelect(r.id)}
                        aria-label={`Select ${r.original_filename}`}
                        className="size-4 rounded border-ink/20 bg-white/90 shadow"
                      />
                    </div>
                    {r.kind === 'video' ? (
                      <video
                        src={r.public_url}
                        className="h-full w-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={r.public_url}
                        alt={r.alt_text ?? ''}
                        className="h-full w-full object-cover"
                      />
                    )}
                    <span className="absolute bottom-2 right-2 rounded bg-ink/80 px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase text-white">
                      {r.kind}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-2">
                    <p className="line-clamp-2 text-xs font-medium text-ink" title={r.original_filename}>
                      {r.original_filename || '—'}
                    </p>
                    <p className="truncate text-[0.6875rem] text-ink/50" title={r.folder}>
                      {r.folder || '—'}
                    </p>
                    <div className="mt-auto flex justify-end gap-0.5 pt-1">
                      <button
                        type="button"
                        onClick={() => openEdit(r)}
                        className="rounded-lg p-1.5 text-ink/60 hover:bg-ink/10"
                        aria-label="Edit alt text"
                      >
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteId(r.id)}
                        className="rounded-lg p-1.5 text-red-600/80 hover:bg-red-50"
                        aria-label="Delete"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {filtered.length > 0 ? (
          <AdminTablePagination
            page={tablePage}
            totalPages={tableTotalPages}
            rangeStart={tableRangeStart}
            rangeEnd={tableRangeEnd}
            total={tableTotal}
            onPageChange={setTablePage}
            visible={showTablePagination}
          />
        ) : null}
      </div>

      <AdminModal open={Boolean(deleteId)} title="Delete media?" onClose={() => setDeleteId(null)}>
        <p className="text-sm text-ink/75">
          This removes the file from storage and from the library. Any content still pointing at this URL will show a
          broken image or video until you replace it.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button type="button" className={adminBtnGhost} onClick={() => setDeleteId(null)}>
            Cancel
          </button>
          <button
            type="button"
            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
            onClick={() => void confirmDeleteOne()}
          >
            Delete
          </button>
        </div>
      </AdminModal>

      <AdminModal
        open={bulkDeleteOpen}
        title={`Delete ${selectedList.length} files?`}
        onClose={() => setBulkDeleteOpen(false)}
      >
        <p className="text-sm text-ink/75">
          Selected items will be removed from storage and the media library. This cannot be undone.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button type="button" className={adminBtnGhost} onClick={() => setBulkDeleteOpen(false)} disabled={bulkBusy}>
            Cancel
          </button>
          <button
            type="button"
            disabled={bulkBusy}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
            onClick={() => void confirmBulkDelete()}
          >
            {bulkBusy ? 'Deleting…' : 'Delete all selected'}
          </button>
        </div>
      </AdminModal>

      <AdminModal open={Boolean(editRow)} title="Edit media" onClose={() => setEditRow(null)}>
        {editRow ? (
          <>
            <div className="mb-4 overflow-hidden rounded-xl border border-ink/10">
              {editRow.kind === 'video' ? (
                <video src={editRow.public_url} className="max-h-48 w-full object-contain" controls muted playsInline />
              ) : (
                <img src={editRow.public_url} alt={editAlt} className="max-h-48 w-full object-contain" />
              )}
            </div>
            <label className="block text-xs font-medium text-ink/70">Alt text (accessibility)</label>
            <textarea
              value={editAlt}
              onChange={(e) => setEditAlt(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-2xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink"
              placeholder="Describe the image for screen readers"
            />
            {saveErr ? <p className="mt-2 text-xs text-red-600">{saveErr}</p> : null}
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button type="button" className={adminBtnGhost} onClick={() => setEditRow(null)} disabled={saveBusy}>
                Cancel
              </button>
              <button type="button" className={adminBtnPrimarySm} onClick={() => void saveEdit()} disabled={saveBusy}>
                {saveBusy ? 'Saving…' : 'Save'}
              </button>
            </div>
          </>
        ) : null}
      </AdminModal>
    </div>
  )
}
