import { Link } from 'react-router-dom'
import { LegalH2, LegalP, LegalUl } from '@/components/LegalPageShell'

const CONTACT_EMAIL = 'Info@capitaldreamdubai.com'

/** Politique de confidentialité (français) — alignée sur la version anglaise. */
export function PrivacyPolicyBodyFr() {
  return (
    <>
      <LegalP>
        <strong>Capital Dream Real Estate</strong> (« Capital Dream », « nous », « notre » ou « nos »)
        respecte votre vie privée. La présente politique de confidentialité explique comment nous
        collectons, utilisons, divulguons et protégeons les données personnelles lorsque vous utilisez
        notre site web, les sous-domaines associés et les services en ligne (ensemble, les{' '}
        <strong>« Services »</strong>), conformément à la loi fédérale par décret n° 45 de 2021 des
        Émirats arabes unis relative à la protection des données personnelles (<strong>UAE PDPL</strong>)
        et aux bonnes pratiques du secteur. Lorsque nos traitements concernent également des personnes
        situées dans l’Espace économique européen (EEE) ou au Royaume-Uni, nous décrivons ci-dessous les
        droits pertinents au titre du RGPD.
      </LegalP>
      <LegalP>
        En accédant aux Services ou en les utilisant, vous reconnaissez avoir pris connaissance de la
        présente notice. Si vous n’acceptez pas ces conditions, veuillez cesser d’utiliser les Services.
      </LegalP>

      <LegalH2>Qui sommes-nous</LegalH2>
      <LegalP>
        Le responsable du traitement des données personnelles traitées via ce site est{' '}
        <strong>Capital Dream Real Estate</strong>, exerçant ses activités aux{' '}
        <strong>Émirats arabes unis</strong>. Pour toute demande relative à la vie privée, contactez-nous
        à l’adresse{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </LegalP>

      <LegalH2>Définitions</LegalH2>
      <LegalUl>
        <li>
          <strong>Données personnelles :</strong> toute information se rapportant à une personne
          identifiée ou identifiable.
        </li>
        <li>
          <strong>Cookie :</strong> petit fichier stocké sur votre appareil pour mémoriser des préférences,
          renforcer la sécurité ou mesurer l’usage du site.
        </li>
        <li>
          <strong>Prestataires :</strong> tiers qui traitent des données pour notre compte et selon nos
          instructions (par ex. hébergement, analyse, CRM, envoi d’e-mails).
        </li>
        <li>
          <strong>Vous :</strong> visiteurs du site, prospects, clients et toute personne interagissant avec
          nous en ligne ou hors ligne dans le cadre des Services.
        </li>
      </LegalUl>

      <LegalH2>Données que nous collectons</LegalH2>
      <LegalP>Nous pouvons notamment collecter :</LegalP>
      <LegalUl>
        <li>
          <strong>Données d’identité et de contact :</strong> nom, adresse e-mail, téléphone, langue
          préférée et informations similaires transmises via formulaires, chat ou e-mail.
        </li>
        <li>
          <strong>Données relatives aux biens et aux demandes :</strong> préférences, fourchette de
          budget, zones d’intérêt et messages liés aux visites ou mandats.
        </li>
        <li>
          <strong>Données techniques :</strong> adresse IP, type d’appareil, navigateur, localisation
          approximative dérivée de l’IP et données d’usage (pages vues, durée) via cookies et technologies
          similaires.
        </li>
        <li>
          <strong>Informations provenant de tiers :</strong> par exemple recommandations, portails
          d’annonces ou informations professionnelles accessibles au public, lorsque la loi l’autorise.
        </li>
      </LegalUl>

      <LegalH2>Finalités du traitement</LegalH2>
      <LegalP>Nous utilisons les données personnelles pour :</LegalP>
      <LegalUl>
        <li>Répondre aux demandes et fournir des services de courtage et services immobiliers connexes ;</li>
        <li>Exploiter, sécuriser et améliorer notre site et nos Services ;</li>
        <li>Envoyer des messages de service et, avec votre consentement le cas échéant, des communications marketing ;</li>
        <li>Respecter les obligations légales et réglementaires aux Émirats et ailleurs ;</li>
        <li>Protéger nos intérêts légitimes (par ex. prévention de la fraude, sécurité du réseau, analyses),
          lorsque vos droits ne l’emportent pas.</li>
      </LegalUl>
      <LegalP>
        Au titre de l’UAE PDPL, nous nous appuyons sur des bases juridiques appropriées telles que votre
        consentement (lorsqu’il est requis), l’exécution d’un contrat, le respect d’une obligation légale
        ou nos intérêts légitimes, dûment équilibrés avec vos droits.
      </LegalP>

      <LegalH2>Marketing et e-mail</LegalH2>
      <LegalP>
        Le cas échéant, nous recueillerons votre consentement avant d’envoyer des e-mails promotionnels.
        Vous pouvez retirer votre consentement ou vous désinscrire via le lien figurant dans tout e-mail
        marketing ou en écrivant à{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Nous pouvons envoyer des messages
        essentiels non promotionnels (par ex. réponses à votre demande) sans consentement marketing
        distinct.
      </LegalP>

      <LegalH2>Cookies et technologies similaires</LegalH2>
      <LegalP>
        Nous utilisons des cookies et outils similaires comme décrit dans notre{' '}
        <Link to="/cookies" className="underline-offset-2">
          politique cookies
        </Link>
        . Vous pouvez gérer les cookies dans les paramètres de votre navigateur ; le blocage de certains
        cookies peut limiter les fonctionnalités du site.
      </LegalP>

      <LegalH2>Services tiers et liens</LegalH2>
      <LegalP>
        Les Services peuvent contenir des liens vers des sites tiers, cartes, réseaux sociaux ou contenus
        intégrés. Ces services appliquent leurs propres politiques de confidentialité. Nous ne sommes pas
        responsables de leurs pratiques ; veuillez consulter leurs conditions avant de communiquer des
        données personnelles.
      </LegalP>

      <LegalH2>Transferts internationaux</LegalH2>
      <LegalP>
        Nous sommes établis aux Émirats arabes unis. Les données peuvent être traitées aux Émirats et,
        lorsque nous faisons appel à des prestataires mondiaux, dans d’autres pays dont les lois peuvent
        différer. Lorsque nous transférons des données hors des Émirats, nous appliquons des
        garanties appropriées conformément à l’UAE PDPL et au droit applicable (par ex. clauses
        contractuelles ou décisions d’adéquation lorsqu’elles existent).
      </LegalP>

      <LegalH2>Conservation</LegalH2>
      <LegalP>
        Nous conservons les données personnelles aussi longtemps que nécessaire aux fins décrites dans
        la présente politique, y compris pour satisfaire à des obligations légales, comptables ou
        d’information. Lorsque les données ne sont plus nécessaires, nous les supprimons ou les
        anonymisons conformément à nos procédures de conservation.
      </LegalP>

      <LegalH2>Sécurité</LegalH2>
      <LegalP>
        Nous appliquons des mesures techniques et organisationnelles appropriées pour protéger les
        données personnelles. Aucun mode de transmission sur Internet n’est totalement sûr ; nous ne
        pouvons garantir une sécurité absolue.
      </LegalP>

      <LegalH2>Vos droits (Émirats)</LegalH2>
      <LegalP>
        Sous réserve de l’UAE PDPL et de la réglementation applicable, vous pouvez disposer du droit
        d’accéder à vos données, de les faire rectifier ou effacer, de limiter ou de vous opposer à
        certains traitements, de retirer votre consentement lorsque le traitement est fondé sur le
        consentement, et d’obtenir des informations sur un traitement automatisé le cas échéant. Vous
        pouvez exercer ces droits en contactant{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Nous pouvons devoir vérifier votre
        identité avant de donner suite à une demande.
      </LegalP>
      <LegalP>
        Vous pouvez également introduire une réclamation auprès de l’autorité compétente en matière de
        protection des données aux Émirats, lorsque la loi le prévoit.
      </LegalP>

      <LegalH2>Visiteurs EEE et Royaume-Uni (RGPD)</LegalH2>
      <LegalP>
        Si vous êtes situé dans l’EEE ou au Royaume-Uni, le RGPD ou le « UK GDPR » peut s’appliquer à
        certains traitements. Vous pouvez disposer de droits d’accès, de rectification, d’effacement, de
        limitation, de portabilité et d’opposition. Vous pouvez introduire une réclamation auprès de
        l’autorité de contrôle locale. Nos bases légales peuvent inclure le consentement, le contrat, les
        intérêts légitimes ou l’obligation légale, comme indiqué ci-dessus.
      </LegalP>

      <LegalH2>Enfants</LegalH2>
      <LegalP>
        Les Services ne s’adressent pas aux enfants.         Nous ne collectons pas sciemment de données
        personnelles auprès de personnes n’ayant pas l’âge requis pour un consentement valable sans
        l’autorisation parentale ou du tuteur appropriée. Si vous pensez que nous avons collecté de
        telles données, contactez-nous et nous prendrons des mesures pour les supprimer.
      </LegalP>

      <LegalH2>Cessions d’entreprise</LegalH2>
      <LegalP>
        En cas de fusion, acquisition ou cession d’actifs, les données personnelles peuvent être
        transférées dans ce cadre. Nous exigerons du cessionnaire qu’il protège les données de manière
        cohérente avec la présente politique.
      </LegalP>

      <LegalH2>Modifications</LegalH2>
      <LegalP>
        Nous pouvons mettre à jour la présente politique de confidentialité. La version révisée sera
        publiée sur cette page et la date de « Dernière mise à jour » sera modifiée. Les changements
        substantiels pourront être communiqués via les Services ou par e-mail lorsque cela est approprié.
      </LegalP>

      <LegalH2>Contact</LegalH2>
      <LegalP>
        Questions relatives à la présente politique :{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </LegalP>
      <LegalP>
        Documents associés :{' '}
        <Link to="/terms" className="underline-offset-2">
          conditions d’utilisation
        </Link>
        ,{' '}
        <Link to="/cookies" className="underline-offset-2">
          politique cookies
        </Link>
        .
      </LegalP>
    </>
  )
}
