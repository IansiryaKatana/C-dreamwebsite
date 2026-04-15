import type { ReactNode } from 'react'

/**
 * Page gutter: ~10px (0.625rem) inset from the viewport; sections stack with the same gap.
 */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-[0.625rem] p-[0.625rem]">
      {children}
    </div>
  )
}
