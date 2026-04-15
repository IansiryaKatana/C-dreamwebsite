import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AdminAuthProvider } from './contexts/AdminAuthContext'
import { CmsProvider } from './contexts/CmsContext'
import { LocalePreferencesProvider } from './contexts/LocalePreferencesContext'
import { PropertyFilterDockProvider } from './contexts/PropertyFilterDockContext'
import './index.css'
import './admin/admin-theme.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LocalePreferencesProvider>
        <AdminAuthProvider>
          <PropertyFilterDockProvider>
            <CmsProvider>
              <App />
            </CmsProvider>
          </PropertyFilterDockProvider>
        </AdminAuthProvider>
      </LocalePreferencesProvider>
    </BrowserRouter>
  </StrictMode>,
)
