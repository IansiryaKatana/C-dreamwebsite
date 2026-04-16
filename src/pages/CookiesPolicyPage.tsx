import { LegalPageShell } from '@/components/LegalPageShell'
import { useLocalePreferences } from '@/contexts/LocalePreferencesContext'
import { usePageSeo } from '@/hooks/usePageSeo'
import { CookiesPolicyBodyAr } from '@/legal/cookiesPolicyBodiesAr'
import { CookiesPolicyBodyEn } from '@/legal/cookiesPolicyBodiesEn'
import { CookiesPolicyBodyFr } from '@/legal/cookiesPolicyBodiesFr'

export function CookiesPolicyPage() {
  const { language, t } = useLocalePreferences()
  usePageSeo({
    title: t('seo.cookies.title'),
    description: t('seo.cookies.description'),
  })

  const body =
    language === 'ar' ? (
      <CookiesPolicyBodyAr />
    ) : language === 'fr' ? (
      <CookiesPolicyBodyFr />
    ) : (
      <CookiesPolicyBodyEn />
    )

  return (
    <LegalPageShell
      id="page-cookies-policy"
      title={t('legal.cookies.title')}
      updatedLabel={t('legal.updated')}
    >
      {body}
    </LegalPageShell>
  )
}
