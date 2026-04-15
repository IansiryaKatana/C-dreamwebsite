import { X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { adminModalCloseBtn } from '@/admin/adminClassNames'

type Props = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  /** Wider sheet on desktop for long forms */
  wide?: boolean
}

export function AdminModal({
  open,
  title,
  onClose,
  children,
  footer,
  wide,
}: Props) {
  const mobile = useIsMobile()
  const bodyScrollRef = useRef<HTMLDivElement>(null)
  const bodyInnerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [bodyScrollable, setBodyScrollable] = useState(false)

  const updateBodyScrollProgress = useCallback(() => {
    const el = bodyScrollRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    const maxScroll = scrollHeight - clientHeight
    if (maxScroll <= 0) {
      setBodyScrollable(false)
      setScrollProgress(0)
      return
    }
    setBodyScrollable(true)
    setScrollProgress(Math.min(1, Math.max(0, scrollTop / maxScroll)))
  }, [])

  useEffect(() => {
    if (!open) return
    const main = bodyScrollRef.current
    const inner = bodyInnerRef.current
    if (!main) return
    updateBodyScrollProgress()
    main.addEventListener('scroll', updateBodyScrollProgress, { passive: true })
    const ro = new ResizeObserver(() => {
      updateBodyScrollProgress()
    })
    ro.observe(main)
    if (inner) ro.observe(inner)
    return () => {
      main.removeEventListener('scroll', updateBodyScrollProgress)
      ro.disconnect()
    }
  }, [open, title, updateBodyScrollProgress])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/45 p-0 backdrop-blur-md md:items-center md:p-4 md:backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close dialog backdrop"
        onClick={onClose}
      />
      <div
        className={`admin-modal-surface relative z-[1] flex max-h-[min(92dvh,960px)] w-full flex-col overflow-hidden border border-ink/10 bg-[#FAFAF8] shadow-[0_-12px_48px_rgba(28,20,18,0.18)] motion-safe:max-md:animate-[adminSheetUp_0.32s_ease-out] motion-safe:md:animate-[adminSheetIn_0.22s_ease-out] md:max-h-[min(88vh,920px)] md:rounded-[28px] md:shadow-2xl ${wide ? 'md:max-w-3xl' : 'md:max-w-lg'} ${mobile ? 'rounded-t-[24px]' : ''} `}
        style={{ marginBottom: mobile ? 0 : undefined }}
      >
        <header className="flex shrink-0 flex-col border-b border-ink/10 bg-[#FAFAF8]">
          <div className="flex items-start justify-between gap-3 px-4 py-3 md:px-5 md:py-4">
            <h2
              id="admin-modal-title"
              className="min-w-0 pr-2 text-base font-semibold leading-snug text-ink md:text-lg"
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className={adminModalCloseBtn}
              aria-label="Close"
            >
              <X className="size-5" strokeWidth={2} aria-hidden />
            </button>
          </div>
          <div
            className="h-0.5 w-full shrink-0 bg-ink/10"
            role={bodyScrollable ? 'progressbar' : 'none'}
            aria-hidden={!bodyScrollable}
            {...(bodyScrollable
              ? ({
                  'aria-label': 'Dialog content scroll position',
                  'aria-valuemin': 0,
                  'aria-valuemax': 100,
                  'aria-valuenow': Math.round(scrollProgress * 100),
                } as const)
              : {})}
          >
            <div
              className="h-full bg-[var(--admin-primary)]"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </header>
        <div
          ref={bodyScrollRef}
          className="admin-modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 text-sm leading-snug text-ink md:px-5 md:py-4 md:text-[0.9375rem]"
        >
          <div ref={bodyInnerRef}>{children}</div>
        </div>
        {footer ? (
          <div className="flex shrink-0 flex-col gap-2 border-t border-ink/10 px-4 py-3 md:flex-row md:justify-end md:px-5 md:py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}
