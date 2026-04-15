import { createContext, useContext, useState, type ReactNode } from 'react'

/**
 * Host for portaled admin dropdown lists so they stay under `.admin-portal` and inherit
 * `--admin-surface` / `--admin-primary` from {@link AdminShell} (body does not).
 */
const AdminDropdownPortalContext = createContext<HTMLElement | null>(null)

export function useAdminDropdownPortalHost(): HTMLElement | null {
  return useContext(AdminDropdownPortalContext)
}

export function AdminDropdownPortalHost({ children }: { children: ReactNode }) {
  const [host, setHost] = useState<HTMLDivElement | null>(null)
  return (
    <AdminDropdownPortalContext.Provider value={host}>
      {children}
      <div
        ref={setHost}
        className="pointer-events-none fixed inset-0 z-[260] overflow-visible [&>*]:pointer-events-auto"
        aria-hidden
      />
    </AdminDropdownPortalContext.Provider>
  )
}
