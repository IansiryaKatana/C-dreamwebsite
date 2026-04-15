import { Link } from 'react-router-dom'
import { LegalH2, LegalP, LegalPageShell, LegalUl } from '@/components/LegalPageShell'
import { usePageSeo } from '@/hooks/usePageSeo'

const CONTACT_EMAIL = 'Hello@apitaldreamdubai.com'

export function PrivacyPolicyPage() {
  usePageSeo({
    title: 'Privacy Policy | Capital Dreams Dubai Real Estate',
    description:
      'Read the Capital Dreams Privacy Policy covering personal data handling, cookies, legal basis, and your rights under UAE data protection laws.',
  })
  return (
    <LegalPageShell
      id="page-privacy-policy"
      title="Privacy policy"
      updatedLabel="Last updated: 10 April 2026"
    >
      <LegalP>
        <strong>Capital Dream Real Estate</strong> (“Capital Dream,” “we,” “our,” or “us”) respects
        your privacy. This Privacy Policy explains how we collect, use, disclose, and protect personal
        data when you use our website, related subdomains, and online services (together, the{' '}
        <strong>“Services”</strong>), in line with the United Arab Emirates Federal Decree-Law No. 45
        of 2021 on the Protection of Personal Data (<strong>UAE PDPL</strong>) and good industry
        practice. Where our processing also relates to individuals in the European Economic Area
        (EEA) or United Kingdom, we describe relevant rights under the GDPR below.
      </LegalP>
      <LegalP>
        By accessing or using our Services, you acknowledge that you have read this notice. If you do
        not agree, please discontinue use of the Services.
      </LegalP>

      <LegalH2>Who we are</LegalH2>
      <LegalP>
        The data controller for personal data processed through this website is{' '}
        <strong>Capital Dream Real Estate</strong>, operating in the <strong>United Arab Emirates</strong>
        . For privacy requests, contact us at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </LegalP>

      <LegalH2>Definitions</LegalH2>
      <LegalUl>
        <li>
          <strong>Personal data:</strong> Information relating to an identified or identifiable
          individual.
        </li>
        <li>
          <strong>Cookie:</strong> A small file stored on your device to remember preferences, support
          security, or measure site usage.
        </li>
        <li>
          <strong>Service providers:</strong> Third parties that process data on our instructions
          (e.g. hosting, analytics, CRM, email delivery).
        </li>
        <li>
          <strong>You:</strong> Visitors to our website, prospective clients, clients, and others who
          interact with us online or offline in connection with our Services.
        </li>
      </LegalUl>

      <LegalH2>What information we collect</LegalH2>
      <LegalP>We may collect:</LegalP>
      <LegalUl>
        <li>
          <strong>Identity and contact data:</strong> Name, email address, phone number, preferred
          language, and similar details you submit via forms, chat, or email.
        </li>
        <li>
          <strong>Property and enquiry data:</strong> Preferences, budget range, areas of interest,
          and messages related to property viewings or mandates.
        </li>
        <li>
          <strong>Technical data:</strong> IP address, device type, browser, approximate location
          derived from IP, and usage data (pages viewed, time on site) collected via cookies and similar
          technologies.
        </li>
        <li>
          <strong>Information from third parties:</strong> For example, referrals, listing portals,
          or publicly available business information, where permitted by law.
        </li>
      </LegalUl>

      <LegalH2>How we use personal data</LegalH2>
      <LegalP>We use personal data to:</LegalP>
      <LegalUl>
        <li>Respond to enquiries and provide brokerage and related real estate services;</li>
        <li>Operate, secure, and improve our website and Services;</li>
        <li>Send service messages and, where you have opted in, marketing communications;</li>
        <li>Comply with legal and regulatory obligations applicable in the UAE and elsewhere;</li>
        <li>Protect our legitimate interests (e.g. fraud prevention, network security, analytics),
          where not overridden by your rights.</li>
      </LegalUl>
      <LegalP>
        Under UAE PDPL, we rely on appropriate legal bases such as your consent (where required),
        performance of a contract, compliance with a legal obligation, or legitimate interests
        balanced against your rights.
      </LegalP>

      <LegalH2>Marketing and email</LegalH2>
      <LegalP>
        Where required, we will obtain your consent before sending promotional emails. You may
        withdraw consent or unsubscribe using the link in any marketing email or by writing to{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We may send essential
        non-promotional messages (e.g. replies to your enquiry) without separate marketing consent.
      </LegalP>

      <LegalH2>Cookies and similar technologies</LegalH2>
      <LegalP>
        We use cookies and similar tools as described in our{' '}
        <Link to="/cookies" className="underline-offset-2">
          Cookie policy
        </Link>
        . You can control cookies through your browser settings; blocking some cookies may limit site
        functionality.
      </LegalP>

      <LegalH2>Third-party services and links</LegalH2>
      <LegalP>
        Our Services may include links to third-party websites, maps, social networks, or embedded
        content. Those services have their own privacy policies. We are not responsible for their
        practices; please review their terms before sharing personal data.
      </LegalP>

      <LegalH2>International transfers</LegalH2>
      <LegalP>
        We are based in the UAE. Personal data may be processed in the UAE and, where we use global
        service providers, in other countries that may have different data protection laws. When we
        transfer personal data outside the UAE, we implement appropriate safeguards as required by UAE
        PDPL and applicable law (e.g. contractual clauses or adequacy decisions where available).
      </LegalP>

      <LegalH2>Retention</LegalH2>
      <LegalP>
        We retain personal data only as long as necessary for the purposes described in this policy,
        including to meet legal, accounting, or reporting requirements. When data is no longer
        needed, we delete or anonymise it in line with our retention procedures.
      </LegalP>

      <LegalH2>Security</LegalH2>
      <LegalP>
        We implement appropriate technical and organisational measures to protect personal data.
        No method of transmission over the Internet is completely secure; we cannot guarantee
        absolute security.
      </LegalP>

      <LegalH2>Your rights (UAE)</LegalH2>
      <LegalP>
        Subject to UAE PDPL and applicable regulations, you may have the right to request access to,
        correction of, or deletion of your personal data; restrict or object to certain processing;
        withdraw consent where processing is consent-based; and receive information about automated
        processing where relevant. You may exercise these rights by contacting{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We may need to verify your identity
        before fulfilling a request.
      </LegalP>
      <LegalP>
        You may also lodge a complaint with the competent UAE data protection authority where provided
        by law.
      </LegalP>

      <LegalH2>EEA and UK visitors (GDPR)</LegalH2>
      <LegalP>
        If you are in the EEA or UK, the GDPR or UK GDPR may apply to some processing. You may have
        rights including access, rectification, erasure, restriction, data portability, and objection.
        You may lodge a complaint with your local supervisory authority. Our lawful bases may include
        consent, contract, legitimate interests, or legal obligation as described above.
      </LegalP>

      <LegalH2>Children</LegalH2>
      <LegalP>
        Our Services are not directed at children. We do not knowingly collect personal data from
        anyone under the age required for valid consent under applicable law without appropriate
        parental or guardian authorisation. If you believe we have collected such data, please
        contact us and we will take steps to delete it.
      </LegalP>

      <LegalH2>Business transfers</LegalH2>
      <LegalP>
        If we are involved in a merger, acquisition, or asset sale, personal data may be transferred
        as part of that transaction. We will require the recipient to protect personal data
        consistently with this policy.
      </LegalP>

      <LegalH2>Changes to this policy</LegalH2>
      <LegalP>
        We may update this Privacy Policy from time to time. We will post the revised version on this
        page and update the “Last updated” date. Material changes may be communicated through the
        Services or by email where appropriate.
      </LegalP>

      <LegalH2>Contact</LegalH2>
      <LegalP>
        Questions about this Privacy Policy:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </LegalP>
      <LegalP>
        Related documents:{' '}
        <Link to="/terms" className="underline-offset-2">
          Terms of use
        </Link>
        ,{' '}
        <Link to="/cookies" className="underline-offset-2">
          Cookie policy
        </Link>
        .
      </LegalP>
    </LegalPageShell>
  )
}
