export type Property = {
  id: string
  image: string
  tag: string
  title: string
  meta: string
  detail?: string
  alt: string
}

type Props = {
  property: Property
}

export function PropertyCard({ property }: Props) {
  return (
    <article className="group flex flex-col overflow-hidden bg-cream">
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[1.125rem]">
        <img
          src={property.image}
          alt={property.alt}
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <span className="type-badge absolute right-3 top-3 rounded-md bg-badge-blue px-2.5 py-1 font-semibold uppercase tracking-widest text-white">
          {property.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-1 pt-6 sm:pt-7">
        <p className="type-card-title font-compact font-semibold uppercase tracking-[0.06em] text-ink">
          {property.title}
        </p>
        <p className="font-normal leading-snug text-ink/72">
          {property.meta}
        </p>
        {property.detail ? (
          <p className="type-card-detail font-compact font-medium uppercase tracking-[0.14em] text-ink/45">
            {property.detail}
          </p>
        ) : null}
      </div>
    </article>
  )
}
