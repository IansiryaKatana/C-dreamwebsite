import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type Ctx = {
  open: boolean
  openDock: () => void
  closeDock: () => void
}

const PropertyFilterDockContext = createContext<Ctx | null>(null)

export function PropertyFilterDockProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openDock = useCallback(() => setOpen(true), [])
  const closeDock = useCallback(() => setOpen(false), [])
  const value = useMemo(
    () => ({ open, openDock, closeDock }),
    [open, openDock, closeDock],
  )
  return (
    <PropertyFilterDockContext.Provider value={value}>
      {children}
    </PropertyFilterDockContext.Provider>
  )
}

export function usePropertyFilterDock() {
  const ctx = useContext(PropertyFilterDockContext)
  if (!ctx) {
    throw new Error(
      'usePropertyFilterDock must be used within PropertyFilterDockProvider',
    )
  }
  return ctx
}
