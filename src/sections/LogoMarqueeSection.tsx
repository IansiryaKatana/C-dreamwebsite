/** Partner / developer names as typographic tiles (replace with real assets when available). */
const PARTNERS = [
  'Bankinter',
  'Avante',
  'Landed In Ibiza',
  'Purigarcia',
  'la Caixa',
  'Sabadell',
  'Ibiza Country Villas',
  'Villacontact',
  'Salut Labs',
] as const

function LogoTile({ name }: { name: string }) {
  return (
    <div className="flex shrink-0 items-center justify-center rounded-2xl bg-white/95 px-7 py-3.5 shadow-sm ring-1 ring-terracotta/5 sm:px-9 sm:py-4">
      <span className="whitespace-nowrap font-display font-semibold tracking-wide text-terracotta">
        {name}
      </span>
    </div>
  )
}

export function LogoMarqueeSection() {
  const track = [...PARTNERS, ...PARTNERS]

  return (
    <section aria-label="Partner developers" className="w-full">
      <p className="sr-only">
        Partner network includes: {PARTNERS.join(', ')}.
      </p>
      <div className="relative w-full overflow-hidden py-2 sm:py-3" aria-hidden>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-terracotta to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-terracotta to-transparent sm:w-16" />
        <div className="overflow-hidden">
          <div className="marquee-track flex gap-4 sm:gap-5">
            {track.map((name, i) => (
              <LogoTile key={`${name}-${i}`} name={name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
