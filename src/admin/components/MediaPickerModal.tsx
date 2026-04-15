import { useCallback, useEffect, useState } from 'react'
import { getSupabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/database.types'
import { AdminModal } from './AdminModal'
import { adminBtnGhost } from '@/admin/adminClassNames'

type Row = Database['public']['Tables']['cms_media']['Row']

type MediaFilter = 'image' | 'video' | 'all'

type Props = {
  open: boolean
  title?: string
  onClose: () => void
  onSelect: (publicUrl: string) => void
  /** Limit picker to images, videos, or both. */
  mediaFilter?: MediaFilter
}

export function MediaPickerModal({
  open,
  title = 'Choose from media library',
  onClose,
  onSelect,
  mediaFilter = 'all',
}: Props) {
  const [rows, setRows] = useState<Row[]>([])
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    const sb = getSupabase()
    if (!sb) {
      setErr('Supabase not configured')
      return
    }
    setLoading(true)
    setErr(null)
    let q = sb.from('cms_media').select('*').order('created_at', { ascending: false })
    if (mediaFilter === 'image') q = q.eq('kind', 'image')
    else if (mediaFilter === 'video') q = q.eq('kind', 'video')
    const { data, error } = await q
    setLoading(false)
    if (error) {
      setErr(error.message)
      setRows([])
      return
    }
    setRows(data ?? [])
  }, [mediaFilter])

  useEffect(() => {
    if (open) void load()
  }, [open, load])

  function pick(url: string) {
    onSelect(url)
    onClose()
  }

  return (
    <AdminModal open={open} title={title} onClose={onClose} wide>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-ink/60">
            {loading
              ? 'Loading…'
              : `${rows.length} file${rows.length === 1 ? '' : 's'} in library`}
          </p>
          <button
            type="button"
            className={adminBtnGhost}
            onClick={() => void load()}
            disabled={loading}
          >
            Refresh
          </button>
        </div>
        {err ? <p className="text-xs text-red-600">{err}</p> : null}
        {!loading && rows.length === 0 && !err ? (
          <p className="text-sm text-ink/55">
            No media yet. Upload files from any image or video field, or use the Media page.
          </p>
        ) : null}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {rows.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => pick(r.public_url)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white text-left ring-1 ring-ink/5 transition hover:border-[var(--admin-primary)]/40 hover:ring-[var(--admin-primary)]/15"
              >
                <div className="relative aspect-square w-full bg-ink/5">
                  {r.kind === 'video' ? (
                    <video
                      src={r.public_url}
                      className="absolute inset-0 h-full w-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={r.public_url}
                      alt={r.alt_text ?? ''}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  <span className="absolute bottom-1 right-1 rounded bg-ink/75 px-1.5 py-0.5 text-[0.625rem] font-medium uppercase text-white">
                    {r.kind}
                  </span>
                </div>
                <p className="truncate px-2 py-1.5 text-[0.6875rem] text-ink/80">
                  {r.original_filename || r.folder}
                </p>
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end border-t border-ink/10 pt-3">
          <button type="button" className={adminBtnGhost} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </AdminModal>
  )
}
