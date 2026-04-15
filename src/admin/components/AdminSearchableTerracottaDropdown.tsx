import { useMemo, useState } from 'react'
import type { TerracottaDropdownOption } from '@/components/TerracottaDropdown'
import { TerracottaDropdown } from '@/components/TerracottaDropdown'

type Props = {
  label: string
  /** Full option list (e.g. all featured neighbourhoods). */
  options: TerracottaDropdownOption[]
  value: string
  onChange: (value: string) => void
  searchPlaceholder?: string
  className?: string
}

/**
 * Filters a long option list by a search field, then uses the same Terracotta dropdown as the rest of admin.
 */
export function AdminSearchableTerracottaDropdown({
  label,
  options,
  value,
  onChange,
  searchPlaceholder = 'Type to filter…',
  className = '',
}: Props) {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return options
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(s) || o.value.toLowerCase().includes(s),
    )
  }, [options, q])

  const safeOptions = filtered.length > 0 ? filtered : options

  return (
    <div className={`space-y-2 ${className}`.trim()}>
      <p className="text-xs font-medium text-ink/70">{label}</p>
      <input
        type="search"
        autoComplete="off"
        placeholder={searchPlaceholder}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-full rounded-2xl border border-ink/15 bg-white px-3 py-2 text-xs text-ink md:text-sm"
      />
      <TerracottaDropdown
        variant="admin"
        listPortal
        label={label}
        showTriggerLabel={false}
        options={safeOptions}
        value={value}
        onChange={onChange}
        className="mt-0"
      />
    </div>
  )
}
