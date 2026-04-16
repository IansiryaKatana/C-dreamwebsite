import { Link } from 'react-router-dom'
import { LegalH2, LegalP, LegalUl } from '@/components/LegalPageShell'

const CONTACT_EMAIL = 'Hello@apitaldreamdubai.com'

/** Politique cookies (français). */
export function CookiesPolicyBodyFr() {
  return (
    <>
      <LegalP>
        La présente politique cookies explique comment <strong>Capital Dream Real Estate</strong> («
        nous ») utilise les cookies et technologies similaires sur notre site, conformément à notre{' '}
        <Link to="/privacy-policy" className="underline-offset-2">
          Politique de confidentialité
        </Link>{' '}
        et aux exigences applicables aux <strong>Émirats arabes unis</strong>.
      </LegalP>

      <LegalH2>Qu’est-ce qu’un cookie&nbsp;?</LegalH2>
      <LegalP>
        Les cookies sont de petits fichiers texte enregistrés sur votre appareil lorsque vous visitez
        un site. Ils aident à mémoriser vos préférences, à sécuriser les sessions et à comprendre
        l’usage des pages. Les technologies proches incluent le stockage local et les pixels.
      </LegalP>

      <LegalH2>Comment nous utilisons les cookies</LegalH2>
      <LegalP>Nous pouvons utiliser les catégories suivantes&nbsp;:</LegalP>
      <LegalUl>
        <li>
          <strong>Strictement nécessaires&nbsp;:</strong> indispensables au fonctionnement de base
          (sécurité, répartition de charge, mémorisation du consentement cookies). Ils ne peuvent
          généralement pas être désactivés sans dégrader le site.
        </li>
        <li>
          <strong>Fonctionnels&nbsp;:</strong> mémorisent des choix comme la langue ou la région pour
          améliorer votre expérience.
        </li>
        <li>
          <strong>Analytiques / performance&nbsp;:</strong> nous aident à comprendre le trafic et
          l’usage (pages consultées) afin d’améliorer le contenu et les performances.
        </li>
        <li>
          <strong>Marketing (le cas échéant)&nbsp;:</strong> peuvent servir à diffuser du contenu
          pertinent ou à mesurer des campagnes, uniquement lorsque c’est permis et, si nécessaire,
          avec votre consentement.
        </li>
      </LegalUl>

      <LegalH2>Cookies tiers et intégrations</LegalH2>
      <LegalP>
        Certaines fonctionnalités (cartes, vidéos intégrées, plugins sociaux) peuvent déposer des
        cookies ou traiter des données via des prestataires tiers. Ceux-ci gèrent leurs propres
        cookies&nbsp;; consultez leurs notices de confidentialité. Nous ne contrôlons pas les cookies
        tiers.
      </LegalP>

      <LegalH2>Gérer les cookies</LegalH2>
      <LegalP>
        Vous pouvez contrôler ou supprimer les cookies via les paramètres de votre navigateur. Le
        blocage de tous les cookies peut affecter le fonctionnement du site (par ex. resaisie des
        préférences). Pour en savoir plus, voir l’aide de votre navigateur.
      </LegalP>

      <LegalH2>Do Not Track</LegalH2>
      <LegalP>
        Il n’existe pas de norme uniforme pour les signaux « Do Not Track ». Nous tenons compte des
        choix de confidentialité via nos contrôles cookies et les réglages du navigateur lorsque
        c’est techniquement possible.
      </LegalP>

      <LegalH2>Mises à jour</LegalH2>
      <LegalP>
        Nous pouvons mettre à jour cette politique cookies lorsque nos pratiques évoluent. Consultez
        cette page pour la dernière version et la date de « Dernière mise à jour ».
      </LegalP>

      <LegalH2>Contact</LegalH2>
      <LegalP>
        Questions&nbsp;:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </LegalP>
    </>
  )
}
