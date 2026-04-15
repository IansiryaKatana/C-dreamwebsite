import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { AdminShell } from './AdminShell'

export function AdminLayout() {
  const { session, loading, configured } = useAdminAuth()
  const location = useLocation()

  if (!configured) {
    return (
      <div className="min-h-svh bg-[#F5F6F8] px-4 py-10 text-ink">
        <p className="max-w-md text-sm leading-relaxed">
          Supabase is not configured. Add <code className="rounded bg-ink/10 px-1">VITE_SUPABASE_URL</code>{' '}
          and <code className="rounded bg-ink/10 px-1">VITE_SUPABASE_ANON_KEY</code> to{' '}
          <code className="rounded bg-ink/10 px-1">.env</code> and restart the dev server.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#F5F6F8] text-sm text-ink/70">
        Loading session…
      </div>
    )
  }

  if (!session) {
    return (
      <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
    )
  }

  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  )
}
