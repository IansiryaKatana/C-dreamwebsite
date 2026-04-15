import type { FilterDropdownOption } from '../lib/propertyFilters'
import { TerracottaDropdown } from './TerracottaDropdown'

type Props = {
  id?: string
  label: string
  options: FilterDropdownOption[]
  value: string
  onChange: (value: string) => void
  className?: string
  disabled?: boolean
  listPortal?: boolean
}

/** Property listing filters — same UX as {@link TerracottaDropdown}. */
export function FilterTerracottaDropdown(props: Props) {
  return <TerracottaDropdown {...props} />
}
