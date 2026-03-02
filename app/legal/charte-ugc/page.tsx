"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CONTAINER_CLASS, SECTION_PADDING, FOOTER, LEGAL, SITE_URL } from "@/app/lib/constants";

export default function CharteUGCPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/legal/charte-ugc" />

      <section className={`bg-white ${SECTION_PADDING} animate-fade-in`}>
        <div className={CONTAINER_CLASS}>
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Charte des contenus publiés par les utilisateurs (UGC)
            </h1>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-6" />
            <p className="font-[var(--font-inter)] text-base text-gray-600 text-center max-w-2xl mx-auto">
              Lorsque l&apos;établissement permet la publication de contenus par les utilisateurs (commentaires, témoignages,
              photos, vidéos, etc.), les règles ci-dessous s&apos;appliquent. Elles protègent les mineurs, le droit à l&apos;image
              et la réputation de tous.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-10">
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                1. Objet et champ d&apos;application
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mb-4">
                La présente charte définit les règles applicables aux contenus créés et publiés par des utilisateurs
                (« User Generated Content » ou UGC) sur le site {SITE_URL} ou sur les espaces officiels gérés par{" "}
                <strong>{LEGAL.editorName}</strong> (réseaux sociaux, formulaires, espaces de témoignages, galeries
                photo/vidéo, etc.).
              </p>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                En soumettant un contenu (texte, image, vidéo, enregistrement audio), l&apos;utilisateur accepte sans réserve
                la présente charte et les{" "}
                <Link href="/legal/cgu" className="text-[#8C1515] hover:underline">Conditions générales d&apos;utilisation</Link>.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                2. Définition des contenus concernés
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mb-4">
                Sont considérés comme UGC, sans que cette liste soit limitative :
              </p>
              <ul className="list-disc pl-6 space-y-2 font-[var(--font-inter)] text-sm lg:text-base text-gray-700">
                <li>Commentaires, avis ou témoignages laissés sur le site ou sur des formulaires dédiés.</li>
                <li>Photos, vidéos ou enregistrements audio envoyés dans le cadre d&apos;animations, concours, projets pédagogiques ou de communication de l&apos;établissement.</li>
                <li>Publications sur les comptes officiels de l&apos;établissement (réseaux sociaux) lorsque celles-ci sont relayées, partagées ou autorisées par l&apos;établissement.</li>
              </ul>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                3. Règles de fond – contenus interdits
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mb-4">
                Tout contenu doit respecter les lois en vigueur et les valeurs de l&apos;établissement. Sont strictement interdits :
              </p>
              <ul className="list-disc pl-6 space-y-2 font-[var(--font-inter)] text-sm lg:text-base text-gray-700">
                <li>Les contenus illicites (diffamation, injures, incitation à la haine, atteinte à la vie privée, contrefaçon, contenus à caractère pornographique ou violent).</li>
                <li>Les contenus portant atteinte à la dignité ou à l&apos;image de mineurs (élèves, enfants).</li>
                <li>Les contenus représentant des personnes identifiables sans leur consentement (ou sans consentement des titulaires de l&apos;autorité parentale pour les mineurs).</li>
                <li>Les contenus publicitaires, commerciaux ou spam.</li>
                <li>Les contenus susceptibles de troubler l&apos;ordre public ou de nuire à la réputation de l&apos;établissement ou de ses membres.</li>
              </ul>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mt-4">
                L&apos;établissement se réserve le droit de refuser ou de retirer tout contenu ne respectant pas ces règles,
                sans préavis ni indemnité.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                4. Droit à l&apos;image et consentement
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mb-4">
                Toute personne apparaissant de manière identifiable dans un contenu (photo, vidéo) doit avoir donné son
                accord pour la prise de vue et sa diffusion. Pour les mineurs, l&apos;autorisation des titulaires de
                l&apos;autorité parentale est requise. En soumettant un contenu représentant des personnes, l&apos;utilisateur
                garantit détenir les autorisations nécessaires et en assume l&apos;entière responsabilité.
              </p>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                L&apos;établissement peut exiger la production d&apos;une autorisation écrite (droit à l&apos;image / droit à la voix)
                avant toute publication.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                5. Licence accordée à l&apos;établissement
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                En soumettant un contenu, l&apos;utilisateur accorde à {LEGAL.editorName} une licence non exclusive,
                gratuite, mondiale et pour la durée de protection des droits, lui permettant de reproduire, représenter,
                adapter, diffuser et communiquer le contenu sur le site, les supports de communication et les réseaux
                sociaux de l&apos;établissement, à des fins d&apos;information, de promotion et d&apos;archives. L&apos;établissement
                s&apos;engage à ne pas utiliser le contenu à des fins commerciales hors de son objet éducatif et institutionnel,
                sauf accord écrit contraire. L&apos;utilisateur reste titulaire de ses droits et peut demander le retrait
                du contenu dans les conditions prévues à l&apos;article 7.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                6. Modération
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                L&apos;établissement peut modérer a priori (validation avant publication) ou a posteriori (contrôle après
                publication) les contenus. Elle peut retirer ou refuser tout contenu sans avoir à en justifier la raison
                auprès de l&apos;auteur, notamment en cas de non-respect de la charte. Aucune obligation de conservation
                des contenus refusés ou retirés n&apos;est due. En cas de contenu manifestement illicite, l&apos;établissement
                se réserve le droit de signaler les faits aux autorités compétentes et de conserver les éléments
                nécessaires aux procédures.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                7. Retrait et réclamation
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mb-4">
                Toute personne peut demander le retrait d&apos;un contenu la concernant ou concernant son enfant (mineur),
                en particulier pour atteinte au droit à l&apos;image ou à la vie privée. La demande doit être adressée par
                écrit (courriel recommandé) à l&apos;établissement, en indiquant l&apos;URL ou le support concerné et l&apos;identité
                du demandeur. L&apos;établissement s&apos;engage à traiter les demandes légitimes dans un délai raisonnable.
              </p>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Contact :{" "}
                <a href={`mailto:${FOOTER.email}`} className="text-[#8C1515] hover:underline break-all">
                  {FOOTER.email}
                </a>
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                8. Données personnelles
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Les données personnelles collectées dans le cadre de la soumission de contenus (nom, courriel, etc.) sont
                traitées conformément à notre{" "}
                <Link href="/legal/confidentialite" className="text-[#8C1515] hover:underline">
                  Politique de confidentialité
                </Link>.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                9. Sanctions et responsabilité
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Le non-respect de la présente charte peut entraîner le refus ou le retrait du contenu, le blocage de
                l&apos;accès aux espaces de publication et, le cas échéant, des poursuites disciplinaires ou judiciaires.
                L&apos;utilisateur est seul responsable du contenu qu&apos;il publie. L&apos;établissement ne peut être tenu
                responsable des contenus publiés par les utilisateurs tant qu&apos;elle n&apos;a pas eu effectivement connaissance
                de leur caractère illicite et n&apos;a pas agi promptement pour les retirer (conformément au régime de
                responsabilité des hébergeurs et éditeurs).
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                10. Modifications de la charte
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                L&apos;établissement peut modifier la présente charte à tout moment. Les modifications sont opposables dès
                leur mise en ligne. La soumission de nouveaux contenus après modification vaut acceptation de la charte
                mise à jour.
              </p>
              <p className="font-[var(--font-inter)] text-xs text-gray-500 mt-4">
                Dernière mise à jour : mars 2025.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
