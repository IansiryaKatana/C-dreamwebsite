import { Link } from 'react-router-dom'
import { LegalH2, LegalP, LegalPageShell, LegalUl } from '@/components/LegalPageShell'
import { usePageSeo } from '@/hooks/usePageSeo'

const CONTACT_EMAIL = 'Hello@apitaldreamdubai.com'

export function CookiesPolicyPage() {
  usePageSeo({
    title: 'Cookie Policy | Capital Dreams Dubai Real Estate',
    description:
      'Learn how Capital Dreams uses cookies and similar technologies on its Dubai and UAE real estate website, and how to manage your preferences.',
  })
  return (
    <LegalPageShell
      id="page-cookies-policy"
      title="Cookie policy"
      updatedLabel="Last updated: 10 April 2026"
    >
      <LegalP>
        This Cookie Policy explains how <strong>Capital Dream Real Estate</strong> (“we,” “us”) uses
        cookies and similar technologies on our website, in line with our{' '}
        <Link to="/privacy-policy" className="underline-offset-2">
          Privacy policy
        </Link>{' '}
        and applicable requirements in the <strong>United Arab Emirates</strong>.
      </LegalP>

      <LegalH2>What are cookies?</LegalH2>
      <LegalP>
        Cookies are small text files stored on your device when you visit a site. They help the site
        remember your preferences, keep sessions secure, and understand how pages are used. Similar
        technologies include local storage and pixels.
      </LegalP>

      <LegalH2>How we use cookies</LegalH2>
      <LegalP>We may use the following categories:</LegalP>
      <LegalUl>
        <li>
          <strong>Strictly necessary:</strong> Required for basic operation (e.g. security, load
          balancing, cookie consent storage). These cannot usually be disabled without breaking the
          site.
        </li>
        <li>
          <strong>Functional:</strong> Remember choices such as language or region to improve your
          experience.
        </li>
        <li>
          <strong>Analytics / performance:</strong> Help us understand traffic and usage (e.g. which
          pages are viewed) so we can improve content and performance.
        </li>
        <li>
          <strong>Marketing (if used):</strong> May be used to deliver relevant content or measure
          campaigns, only where permitted and, where required, with your consent.
        </li>
      </LegalUl>

      <LegalH2>Third-party cookies and embeds</LegalH2>
      <LegalP>
        Some features (e.g. maps, video embeds, or social plugins) may set cookies or process data
        through third-party providers. Those providers control their own cookies; please read their
        privacy notices. We do not control third-party cookies.
      </LegalP>

      <LegalH2>Managing cookies</LegalH2>
      <LegalP>
        You can control or delete cookies through your browser settings. Blocking all cookies may
        affect how our site works (e.g. you may need to re-enter preferences). For more information,
        see your browser’s help section.
      </LegalP>

      <LegalH2>Do Not Track</LegalH2>
      <LegalP>
        There is no uniform standard for “Do Not Track” signals. We treat privacy choices through
        our cookie controls and browser settings where technically feasible.
      </LegalP>

      <LegalH2>Updates</LegalH2>
      <LegalP>
        We may update this Cookie Policy when our practices change. Check this page for the latest
        version and the “Last updated” date.
      </LegalP>

      <LegalH2>Contact</LegalH2>
      <LegalP>
        Questions:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </LegalP>
    </LegalPageShell>
  )
}
