import { ChevronLeft, ChevronRight } from 'lucide-react'
import { adminBtnGhost } from '../adminClassNames'

type Props = {
  page: number
  totalPages: number
  total: number
  rangeStart: number
  rangeEnd: number
  onPageChange: (next: number) => void
  /** When false, render nothing (e.g. ≤ one page of data). */
  visible: boolean
}

export function AdminTablePagination({
  page,
  totalPages,
  total,
  rangeStart,
  rangeEnd,
  onPageChange,
  visible,
}: Props) {
  if (!visible || total === 0) return null

  return (
    <div className="flex flex-col gap-3 border-t border-ink/10 bg-ink/[0.02] px-3 py-3 sm:flex-row sm:items-center sm:justify-between md:px-4">
      <p className="text-center text-[0.6875rem] text-ink/60 sm:text-left md:text-xs">
        Showing <span className="font-medium text-ink">{rangeStart}</span>–
        <span className="font-medium text-ink">{rangeEnd}</span> of{' '}
        <span className="font-medium text-ink">{total}</span>
      </p>
      <div className="flex items-center justify-center gap-2 sm:justify-end">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className={`inline-flex items-center gap-1 px-3 py-2 text-xs font-medium disabled:opacity-40 md:text-sm ${adminBtnGhost}`}
        >
          <ChevronLeft className="size-4" aria-hidden />
          Previous
        </button>
        <span className="min-w-[5.5rem] text-center text-[0.6875rem] tabular-nums text-ink/70 md:text-xs">
          Page {page} / {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className={`inline-flex items-center gap-1 px-3 py-2 text-xs font-medium disabled:opacity-40 md:text-sm ${adminBtnGhost}`}
        >
          Next
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}
