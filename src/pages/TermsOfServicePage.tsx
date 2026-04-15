import { Link } from 'react-router-dom'
import { LegalH2, LegalP, LegalPageShell, LegalUl } from '@/components/LegalPageShell'
import { usePageSeo } from '@/hooks/usePageSeo'

const CONTACT_EMAIL = 'Hello@apitaldreamdubai.com'

export function TermsOfServicePage() {
  usePageSeo({
    title: 'Terms of Use | Capital Dreams Dubai Real Estate',
    description:
      'Review Capital Dreams website terms of use, legal disclaimers, acceptable use, and governing law for UAE real estate services.',
  })
  return (
    <LegalPageShell
      id="page-terms-of-service"
      title="Terms of use"
      updatedLabel="Last updated: 10 April 2026"
    >
      <LegalP>
        These Terms of Use (“<strong>Terms</strong>”) govern your access to and use of the website
        and online services operated by <strong>Capital Dream Real Estate</strong> (“
        <strong>Capital Dream</strong>,” “<strong>we</strong>,” “<strong>us</strong>”). By using our
        Services, you agree to these Terms and to our{' '}
        <Link to="/privacy-policy" className="underline-offset-2">
          Privacy policy
        </Link>
        .
      </LegalP>

      <LegalH2>Services</LegalH2>
      <LegalP>
        We provide real estate brokerage and related information through our website. Listings,
        images, descriptions, and availability are subject to change and do not constitute an offer
        capable of acceptance online. Transactions are subject to separate agreements, due diligence,
        and applicable laws and regulations in the United Arab Emirates and any relevant free zone.
      </LegalP>

      <LegalH2>Eligibility and acceptable use</LegalH2>
      <LegalP>You agree not to:</LegalP>
      <LegalUl>
        <li>Use the Services for any unlawful purpose or in violation of UAE or applicable law;</li>
        <li>Attempt to gain unauthorised access to our systems, other users’ data, or linked services;</li>
        <li>Scrape, harvest, or automate access to our content without our written consent;</li>
        <li>Transmit malware, spam, or content that is defamatory, discriminatory, or infringing;</li>
        <li>Misrepresent your identity or affiliation.</li>
      </LegalUl>

      <LegalH2>Intellectual property</LegalH2>
      <LegalP>
        All content on the Services (including text, graphics, logos, and layout) is owned by Capital
        Dream or its licensors and is protected by copyright and trademark laws. You may not copy,
        modify, or distribute such content except as permitted for personal, non-commercial browsing
        or as we expressly authorise in writing.
      </LegalP>

      <LegalH2>Third-party content and links</LegalH2>
      <LegalP>
        The Services may contain links to third-party sites, maps, or listing data. We do not control
        and are not responsible for third-party content, accuracy, or availability. Your use of
        third-party services is at your own risk and subject to their terms.
      </LegalP>

      <LegalH2>Disclaimer</LegalH2>
      <LegalP>
        The Services are provided “as is” and “as available.” To the fullest extent permitted by
        applicable law, we disclaim warranties of merchantability, fitness for a particular purpose,
        and non-infringement. We do not warrant uninterrupted or error-free operation. Nothing on
        the Services constitutes legal, tax, investment, or financial advice; obtain professional
        advice before making decisions.
      </LegalP>

      <LegalH2>Limitation of liability</LegalH2>
      <LegalP>
        To the maximum extent permitted by the laws of the United Arab Emirates, Capital Dream and
        its directors, employees, and agents shall not be liable for any indirect, incidental,
        special, consequential, or punitive damages, or for loss of profits, data, or goodwill,
        arising from your use of the Services. Our aggregate liability for any claim arising from
        these Terms or the Services shall not exceed the amount you paid us (if any) for the specific
        service giving rise to the claim in the twelve (12) months preceding the claim, or AED 1,000,
        whichever is greater, except where liability cannot be limited by mandatory law.
      </LegalP>

      <LegalH2>Indemnity</LegalH2>
      <LegalP>
        You agree to indemnify and hold harmless Capital Dream from claims, damages, losses, and
        expenses (including reasonable legal fees) arising from your breach of these Terms or misuse
        of the Services, except to the extent caused by our gross negligence or wilful misconduct.
      </LegalP>

      <LegalH2>Governing law and disputes</LegalH2>
      <LegalP>
        These Terms are governed by the laws of the <strong>United Arab Emirates</strong>, as applied
        in the Emirate of <strong>Dubai</strong>, without regard to conflict-of-law rules. Subject to
        mandatory provisions, you agree that the courts of Dubai shall have exclusive jurisdiction
        over disputes arising from these Terms or the Services, unless applicable law requires
        otherwise.
      </LegalP>

      <LegalH2>Changes</LegalH2>
      <LegalP>
        We may modify these Terms at any time. The “Last updated” date will change when we do.
        Continued use after changes constitutes acceptance of the revised Terms, except where
        prohibited by law.
      </LegalP>

      <LegalH2>Contact</LegalH2>
      <LegalP>
        For questions about these Terms:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </LegalP>
    </LegalPageShell>
  )
}
