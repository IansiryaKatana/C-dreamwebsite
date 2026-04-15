import { useEffect, useMemo, useState } from 'react'

export const ADMIN_TABLE_PAGE_SIZE = 20

export type UseAdminTablePaginationOptions = {
  pageSize?: number
  /** When true, show pagination chrome whenever there is at least one row (even a single page). */
  showPaginationWhenSinglePage?: boolean
}

/**
 * Client-side pagination for admin tables. Clamps the current page when the dataset shrinks.
 */
export function useAdminTablePagination<T>(
  items: T[],
  options?: UseAdminTablePaginationOptions,
) {
  const [page, setPage] = useState(1)
  const pageSize = options?.pageSize ?? ADMIN_TABLE_PAGE_SIZE
  const total = items.length
  const totalPages = total === 0 ? 1 : Math.ceil(total / pageSize)

  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(1, totalPages)))
  }, [totalPages])

  const currentPage = Math.min(Math.max(1, page), totalPages)
  const start = (currentPage - 1) * pageSize

  const pagedItems = useMemo(
    () => items.slice(start, start + pageSize),
    [items, start, pageSize],
  )

  const rangeStart = total === 0 ? 0 : start + 1
  const rangeEnd = Math.min(start + pageSize, total)

  const showPagination =
    total > 0 &&
    (options?.showPaginationWhenSinglePage === true || total > pageSize)

  return {
    page: currentPage,
    setPage,
    pageSize,
    total,
    totalPages,
    pagedItems,
    rangeStart,
    rangeEnd,
    showPagination,
  }
}
