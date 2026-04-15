import { TerracottaDropdown } from '@/components/TerracottaDropdown'
import { ImageUploadField } from './ImageUploadField'
import { VideoUploadField } from './VideoUploadField'

type Props = {
  mediaType: 'image' | 'video'
  onMediaTypeChange: (t: 'image' | 'video') => void
  mediaUrl: string
  onMediaUrlChange: (url: string) => void
  posterUrl: string
  onPosterUrlChange: (url: string) => void
}

export function ExperienceMediaFields({
  mediaType,
  onMediaTypeChange,
  mediaUrl,
  onMediaUrlChange,
  posterUrl,
  onPosterUrlChange,
}: Props) {
  const folder = 'experiences'

  return (
    <div className="space-y-3 sm:col-span-2">
      <div>
        <label className="text-xs font-medium text-ink/70">Media type</label>
        <TerracottaDropdown
          variant="admin"
          listPortal
          label="Media type"
          options={[
            { value: 'image', label: 'Image' },
            { value: 'video', label: 'Video' },
          ]}
          value={mediaType}
          onChange={(v) => onMediaTypeChange(v as 'image' | 'video')}
          className="mt-1"
        />
      </div>
      {mediaType === 'image' ? (
        <ImageUploadField
          label="Image"
          folder={folder}
          value={mediaUrl}
          onChange={onMediaUrlChange}
        />
      ) : (
        <>
          <VideoUploadField
            label="Video"
            folder={folder}
            value={mediaUrl}
            onChange={onMediaUrlChange}
          />
          <ImageUploadField
            label="Poster image (optional, shown before play)"
            folder={folder}
            value={posterUrl}
            onChange={onPosterUrlChange}
          />
        </>
      )}
    </div>
  )
}
