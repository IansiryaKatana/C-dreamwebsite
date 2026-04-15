import { Link } from 'react-router-dom'
import { buttonClassNames } from '../components/Button'
import { ImagePrimaryOverlay } from '../components/ImagePrimaryOverlay'
import { SectionShell } from '../components/SectionShell'

const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`

const stackImgs = [
  u('photo-1600585154526-990dced4db0d', 720, 480),
  u('photo-1600607687939-ce8a6c25118c', 720, 480),
  u('photo-1600566752355-35792bedcfea', 720, 480),
]

const dogImg = u('photo-1587300003388-59208cc962b7', 640, 640)

type EditorialHeroProps = {
  id?: string
  'aria-label'?: string
}

export function EditorialHeroSection({
  id = 'about-editorial-hero',
  'aria-label': ariaLabel = 'About us — editorial introduction',
}: EditorialHeroProps = {}) {
  return (
    <SectionShell variant="cream" id={id} aria-label={ariaLabel}>
      <div className="grid w-full items-center gap-10 py-4 sm:gap-12 sm:py-8 lg:grid-cols-2 lg:gap-16 lg:py-10">
        <div className="order-2 lg:order-1">
          <h1 className="type-hero font-hero text-ink">
            Don&apos;t Play Real Estate Roulette.
          </h1>
          <p className="mt-7 max-w-lg font-light leading-relaxed text-ink/78">
            We pair private clients with vetted island homes — editorial
            presentation, disciplined process, and zero theatre from first
            conversation to closing.
          </p>
          <div className="mt-10">
            <Link to="/all-properties" className={buttonClassNames('primary')}>
              Explore homes
            </Link>
          </div>
        </div>

        <div className="order-1 flex min-h-[260px] items-end justify-center gap-4 sm:min-h-[320px] lg:order-2 lg:min-h-[400px] lg:justify-end lg:pr-1">
          <img
            src={dogImg}
            alt=""
            className="relative z-10 max-h-[min(48vw,300px)] w-auto object-contain drop-shadow-2xl sm:max-h-[320px] lg:max-h-[360px]"
            width={320}
            height={320}
            loading="eager"
          />
          <div className="flex flex-col gap-3 sm:gap-3.5">
            {stackImgs.map((src) => (
              <div
                key={src}
                className="w-[8.25rem] overflow-hidden rounded-sm shadow-lg ring-2 ring-cream sm:w-[9.5rem]"
              >
                <div className="relative w-full [aspect-ratio:3/2]">
                  <img
                    src={src}
                    alt=""
                    className="absolute inset-0 z-0 h-full w-full object-cover object-center"
                    width={720}
                    height={480}
                    loading="lazy"
                  />
                  <ImagePrimaryOverlay />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
