import { Navigate } from 'react-router-dom'

/** Legacy route — settings live under Integrations. */
export function AdminSiteSettings() {
  return <Navigate to="/admin/integrations" replace />
}
