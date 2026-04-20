import { Link } from 'react-router-dom'
import { LegalH2, LegalP, LegalUl } from '@/components/LegalPageShell'

const CONTACT_EMAIL = 'Info@capitaldreamdubai.com'

/** Conditions d’utilisation (français). */
export function TermsOfServiceBodyFr() {
  return (
    <>
      <LegalP>
        Les présentes conditions d’utilisation (« <strong>Conditions</strong> ») régissent votre
        accès et votre utilisation du site web et des services en ligne exploités par{' '}
        <strong>Capital Dream Real Estate</strong> (« <strong>Capital Dream</strong> », «{' '}
        <strong>nous</strong> »). En utilisant nos Services, vous acceptez ces Conditions ainsi que
        notre{' '}
        <Link to="/privacy-policy" className="underline-offset-2">
          Politique de confidentialité
        </Link>
        .
      </LegalP>

      <LegalH2>Services</LegalH2>
      <LegalP>
        Nous fournissons des services de courtage immobilier et des informations connexes via notre
        site. Les annonces, images, descriptions et disponibilités sont susceptibles de changer et ne
        constituent pas une offre pouvant être acceptée en ligne. Les transactions sont soumises à
        des accords distincts, à une diligence raisonnable et aux lois et règlements applicables aux
        Émirats arabes unis et à toute zone franche concernée.
      </LegalP>

      <LegalH2>Éligibilité et usage acceptable</LegalH2>
      <LegalP>Vous vous engagez à ne pas :</LegalP>
      <LegalUl>
        <li>
          Utiliser les Services à des fins illégales ou en violation du droit des EAU ou de tout droit
          applicable ;
        </li>
        <li>
          Tenter d’accéder sans autorisation à nos systèmes, aux données d’autres utilisateurs ou aux
          services liés ;
        </li>
        <li>
          Extraire, agréger ou automatiser l’accès à notre contenu sans notre accord écrit ;
        </li>
        <li>
          Transmettre des logiciels malveillants, du spam ou un contenu diffamatoire, discriminatoire
          ou contrefaisant ;
        </li>
        <li>Usurper votre identité ou votre affiliation.</li>
      </LegalUl>

      <LegalH2>Propriété intellectuelle</LegalH2>
      <LegalP>
        L’ensemble du contenu des Services (textes, graphismes, logos, mise en page, etc.) appartient
        à Capital Dream ou à ses concédants et est protégé par le droit d’auteur et les marques. Vous
        ne pouvez pas copier, modifier ou distribuer ce contenu sauf pour une consultation personnelle
        et non commerciale ou lorsque nous l’autorisons expressément par écrit.
      </LegalP>

      <LegalH2>Contenu et liens tiers</LegalH2>
      <LegalP>
        Les Services peuvent contenir des liens vers des sites tiers, des cartes ou des données
        d’annonces. Nous ne contrôlons pas et n’assumons pas la responsabilité du contenu, de
        l’exactitude ou de la disponibilité de tiers. Votre utilisation de services tiers se fait à
        vos risques et sous leurs propres conditions.
      </LegalP>

      <LegalH2>Avertissement</LegalH2>
      <LegalP>
        Les Services sont fournis « en l’état » et « selon disponibilité ». Dans toute la mesure
        permise par la loi applicable, nous excluons les garanties de qualité marchande, d’adéquation
        à un usage particulier et de non-violation. Nous ne garantissons pas un fonctionnement ininterrompu
        ou sans erreur. Rien sur les Services ne constitue un conseil juridique, fiscal, d’investissement
        ou financier ; consultez un professionnel avant toute décision.
      </LegalP>

      <LegalH2>Limitation de responsabilité</LegalH2>
      <LegalP>
        Dans la limite maximale autorisée par les lois des Émirats arabes unis, Capital Dream ainsi
        que ses dirigeants, employés et mandataires ne sauraient être tenus responsables de tout
        dommage indirect, accessoire, spécial, consécutif ou punitif, ni de toute perte de profits,
        de données ou de goodwill, résultant de votre utilisation des Services. Notre responsabilité
        globale pour toute réclamation découlant des présentes Conditions ou des Services ne dépassera
        pas le montant que vous nous avez payé (le cas échéant) pour le service concerné au cours des
        douze (12) mois précédant la réclamation, ou 1&nbsp;000&nbsp;AED, selon le montant le plus
        élevé, sauf lorsque la loi impérative interdit une telle limitation.
      </LegalP>

      <LegalH2>Indemnisation</LegalH2>
      <LegalP>
        Vous acceptez d’indemniser Capital Dream et de le dégager de toute responsabilité à l’égard
        des réclamations, dommages, pertes et frais (y compris des honoraires d’avocat raisonnables)
        résultant de votre violation des présentes Conditions ou d’une utilisation abusive des
        Services, sauf dans la mesure où ils sont causés par notre faute lourde ou notre faute
        intentionnelle.
      </LegalP>

      <LegalH2>Droit applicable et litiges</LegalH2>
      <LegalP>
        Les présentes Conditions sont régies par les lois des <strong>Émirats arabes unis</strong>,
        telles qu’appliquées dans l’émirat de <strong>Dubai</strong>, sans égard aux règles de conflits
        de lois. Sous réserve des dispositions impératives, vous acceptez que les tribunaux de Dubai
        aient compétence exclusive pour les litiges nés des présentes Conditions ou des Services, sauf
        si la loi applicable exige autrement.
      </LegalP>

      <LegalH2>Modifications</LegalH2>
      <LegalP>
        Nous pouvons modifier ces Conditions à tout moment. La date de « Dernière mise à jour » sera
        actualisée en conséquence. La poursuite de l’utilisation après modification vaut acceptation
        des Conditions révisées, sauf lorsque la loi l’interdit.
      </LegalP>

      <LegalH2>Contact</LegalH2>
      <LegalP>
        Pour toute question sur ces Conditions :{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </LegalP>
    </>
  )
}
