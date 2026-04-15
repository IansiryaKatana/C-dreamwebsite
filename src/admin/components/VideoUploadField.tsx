import { useRef, useState } from 'react'
import { getSupabase } from '@/integrations/supabase/client'
import { uploadCmsFile } from '@/lib/cms/uploadCmsImage'
import { adminBtnGhost } from '@/admin/adminClassNames'
import { MediaPickerModal } from './MediaPickerModal'

type Props = {
  label: string
  folder: string
  value: string
  onChange: (url: string) => void
  compact?: boolean
  /** Show button to pick an existing video from the media library. Default true. */
  mediaLibrary?: boolean
}

export function VideoUploadField({
  label,
  folder,
  value,
  onChange,
  compact,
  mediaLibrary = true,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)

  async function onPick(files: FileList | null) {
    const f = files?.[0]
    if (!f) return
    setErr(null)
    setBusy(true)
    const supabase = getSupabase()
    if (!supabase) {
      setErr('Supabase not configured')
      setBusy(false)
      return
    }
    const { publicUrl, error } = await uploadCmsFile(supabase, folder, f)
    setBusy(false)
    if (error || !publicUrl) {
      setErr(error ?? 'Upload failed')
      return
    }
    onChange(publicUrl)
  }

  return (
    <div className={compact ? 'space-y-1.5' : 'space-y-2'}>
      <p className="text-xs font-medium text-ink/70 md:text-[0.8125rem]">{label}</p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
        {value ? (
          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white ring-1 ring-ink/5">
            <video
              src={value}
              className="h-28 w-full max-w-[280px] object-cover sm:h-32"
              controls
              muted
              playsInline
              preload="metadata"
            />
          </div>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => void onPick(e.target.files)}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
              className="rounded-2xl border border-dashed border-[var(--admin-primary)]/45 bg-white px-3 py-2.5 text-left text-xs font-medium text-[var(--admin-primary)] transition hover:bg-[var(--admin-accent-soft)] disabled:opacity-50 md:text-[0.8125rem]"
            >
              {busy ? 'Uploading…' : 'Choose video file'}
            </button>
            {mediaLibrary ? (
              <button
                type="button"
                className={adminBtnGhost}
                onClick={() => setPickerOpen(true)}
              >
                Choose from media
              </button>
            ) : null}
          </div>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste video URL"
            className="w-full rounded-2xl border border-ink/15 bg-white px-3 py-2 text-xs text-ink placeholder:text-ink/40 md:text-[0.8125rem]"
          />
        </div>
      </div>
      {err ? <p className="text-xs text-red-600">{err}</p> : null}
      {mediaLibrary ? (
        <MediaPickerModal
          open={pickerOpen}
          title="Choose video from media library"
          onClose={() => setPickerOpen(false)}
          onSelect={onChange}
          mediaFilter="video"
        />
      ) : null}
    </div>
  )
}
