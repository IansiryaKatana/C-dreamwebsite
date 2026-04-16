import { LegalPageShell } from '@/components/LegalPageShell'
import { useLocalePreferences } from '@/contexts/LocalePreferencesContext'
import { usePageSeo } from '@/hooks/usePageSeo'
import { PrivacyPolicyBodyAr } from '@/legal/privacyPolicyBodiesAr'
import { PrivacyPolicyBodyEn } from '@/legal/privacyPolicyBodiesEn'
import { PrivacyPolicyBodyFr } from '@/legal/privacyPolicyBodiesFr'

export function PrivacyPolicyPage() {
  const { language, t } = useLocalePreferences()
  usePageSeo({
    title: t('seo.privacy.title'),
    description: t('seo.privacy.description'),
  })

  const body =
    language === 'ar' ? (
      <PrivacyPolicyBodyAr />
    ) : language === 'fr' ? (
      <PrivacyPolicyBodyFr />
    ) : (
      <PrivacyPolicyBodyEn />
    )

  return (
    <LegalPageShell
      id="page-privacy-policy"
      title={t('legal.privacy.title')}
      updatedLabel={t('legal.updated')}
    >
      {body}
    </LegalPageShell>
  )
}
