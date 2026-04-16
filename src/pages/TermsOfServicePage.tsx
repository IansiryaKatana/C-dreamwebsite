import { LegalPageShell } from '@/components/LegalPageShell'
import { useLocalePreferences } from '@/contexts/LocalePreferencesContext'
import { usePageSeo } from '@/hooks/usePageSeo'
import { TermsOfServiceBodyAr } from '@/legal/termsOfServiceBodiesAr'
import { TermsOfServiceBodyEn } from '@/legal/termsOfServiceBodiesEn'
import { TermsOfServiceBodyFr } from '@/legal/termsOfServiceBodiesFr'

export function TermsOfServicePage() {
  const { language, t } = useLocalePreferences()
  usePageSeo({
    title: t('seo.terms.title'),
    description: t('seo.terms.description'),
  })

  const body =
    language === 'ar' ? (
      <TermsOfServiceBodyAr />
    ) : language === 'fr' ? (
      <TermsOfServiceBodyFr />
    ) : (
      <TermsOfServiceBodyEn />
    )

  return (
    <LegalPageShell
      id="page-terms-of-service"
      title={t('legal.terms.title')}
      updatedLabel={t('legal.updated')}
    >
      {body}
    </LegalPageShell>
  )
}
