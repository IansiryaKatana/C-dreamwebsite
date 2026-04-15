import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/integrations/supabase/database.types'
import {
  CMS_MEDIA_BUCKET,
  inferMediaKindFromMime,
  insertCmsMediaRow,
} from './cmsMedia'

function safeName(name: string) {
  return name.replace(/[^\w.-]/g, '_').slice(0, 120)
}

type UploadResult = {
  publicUrl: string | null
  storagePath: string | null
  error: string | null
}

async function uploadToCmsBucket(
  supabase: SupabaseClient<Database>,
  folder: string,
  file: File,
): Promise<UploadResult> {
  const path = `${folder}/${Date.now()}-${safeName(file.name)}`
  const { error: upErr } = await supabase.storage
    .from(CMS_MEDIA_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: true })
  if (upErr) return { publicUrl: null, storagePath: null, error: upErr.message }
  const { data } = supabase.storage.from(CMS_MEDIA_BUCKET).getPublicUrl(path)
  return { publicUrl: data.publicUrl, storagePath: path, error: null }
}

async function uploadAndRecord(
  supabase: SupabaseClient<Database>,
  folder: string,
  file: File,
): Promise<{ publicUrl: string | null; error: string | null }> {
  const { publicUrl, storagePath, error: upErr } = await uploadToCmsBucket(
    supabase,
    folder,
    file,
  )
  if (upErr || !publicUrl || !storagePath) {
    return { publicUrl: null, error: upErr ?? 'Upload failed' }
  }
  const kind = inferMediaKindFromMime(file.type || 'application/octet-stream')
  const { error: dbErr } = await insertCmsMediaRow(supabase, {
    storage_path: storagePath,
    public_url: publicUrl,
    folder,
    original_filename: file.name || 'upload',
    mime_type: file.type || 'application/octet-stream',
    file_size_bytes: Number.isFinite(file.size) ? file.size : null,
    kind,
  })
  if (dbErr) {
    await supabase.storage.from(CMS_MEDIA_BUCKET).remove([storagePath])
    return { publicUrl: null, error: dbErr }
  }
  return { publicUrl, error: null }
}

export async function uploadCmsImage(
  supabase: SupabaseClient<Database>,
  folder: string,
  file: File,
): Promise<{ publicUrl: string | null; error: string | null }> {
  return uploadAndRecord(supabase, folder, file)
}

/** Any file type (e.g. video/mp4) into public cms-media bucket; recorded in cms_media. */
export async function uploadCmsFile(
  supabase: SupabaseClient<Database>,
  folder: string,
  file: File,
): Promise<{ publicUrl: string | null; error: string | null }> {
  return uploadAndRecord(supabase, folder, file)
}
