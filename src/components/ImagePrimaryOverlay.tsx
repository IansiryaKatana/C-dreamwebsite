export function ImagePrimaryOverlay({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[1] bg-terracotta/22 ${className}`.trim()}
      aria-hidden
    />
  )
}
