import { buttonClassNames } from '../components/Button'
import { ImagePrimaryOverlay } from '../components/ImagePrimaryOverlay'
import { SectionShell } from '../components/SectionShell'
import { useLocalePreferences } from '../contexts/LocalePreferencesContext'
import { Link } from 'react-router-dom'

const lifestyle =
  'https://images.pexels.com/photos/8319486/pexels-photo-8319486.jpeg'

type IntroProps = {
  id?: string
  'aria-label'?: string
}

export function IntroStatementSection({
  id = 'intro-statement',
  'aria-label': ariaLabel,
}: IntroProps = {}) {
  const { t } = useLocalePreferences()
  return (
    <SectionShell variant="terracotta" id={id} aria-label={ariaLabel}>
      <div className="mx-auto max-w-[min(100%,1440px)] py-4 sm:py-8">
        <h2 className="type-heading-statement font-statement text-left font-semibold leading-tight">
          {t('intro.heading')}
        </h2>

        <div className="mt-12 flex flex-col gap-10 md:mt-14 md:flex-row md:items-start md:gap-12 lg:gap-16">
          <div className="mx-auto w-full max-w-[220px] shrink-0 md:mx-0 md:w-[26%] md:max-w-none lg:w-[22%]">
            <div className="relative w-full overflow-hidden rounded-[0.75rem] [aspect-ratio:2/3]">
              <img
                src={lifestyle}
                alt={t('intro.imgAlt')}
                className="absolute inset-0 z-0 h-full w-full object-cover object-center"
                width={640}
                height={960}
                loading="lazy"
              />
              <ImagePrimaryOverlay />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="font-light leading-[1.75] text-cream/93 lg:max-w-3xl">
              {t('intro.p1')}
            </p>
            <p className="mt-6 font-light leading-[1.75] text-cream/93 lg:max-w-3xl">
              {t('intro.p2')}
            </p>
            <div className="mt-10 flex justify-center md:justify-start">
              <Link
                to="/about"
                className={buttonClassNames('creamOnTerracotta')}
              >
                {t('intro.ctaAbout')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
