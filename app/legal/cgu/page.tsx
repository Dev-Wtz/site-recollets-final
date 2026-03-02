"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CONTAINER_CLASS, SECTION_PADDING, FOOTER, LEGAL, SITE_URL } from "@/app/lib/constants";

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/legal/cgu" />

      <section className={`bg-white ${SECTION_PADDING} animate-fade-in`}>
        <div className={CONTAINER_CLASS}>
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Conditions générales d&apos;utilisation
            </h1>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-6" />
            <p className="font-[var(--font-inter)] text-base text-gray-600 text-center max-w-2xl mx-auto">
              Les présentes Conditions générales d&apos;utilisation (CGU) régissent l&apos;accès et l&apos;utilisation du site
              internet des Récollets. En accédant au site, vous acceptez sans réserve les présentes CGU.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-10">
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                1. Objet et acceptation
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mb-4">
                Le site {SITE_URL} est édité par <strong>{LEGAL.editorName}</strong>, ci-après « l&apos;Éditeur ». Il a pour objet
                de présenter l&apos;ensemble scolaire et d&apos;informer le public (familles, partenaires, candidats) sur
                son offre éducative et son fonctionnement.
              </p>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                L&apos;accès et l&apos;utilisation du site sont subordonnés à l&apos;acceptation et au respect des présentes CGU.
                En naviguant sur le site, vous reconnaissez avoir pris connaissance des CGU et les accepter. Si vous n&apos;y
                souscrivez pas, nous vous invitons à ne pas utiliser le site.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                2. Accès au site et disponibilité
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                L&apos;Éditeur s&apos;efforce d&apos;assurer un accès permanent au site, sous réserve des opérations de maintenance,
                des pannes ou des contraintes techniques indépendantes de sa volonté. L&apos;accès au site est libre et gratuit.
                L&apos;Éditeur se réserve le droit de modifier, suspendre ou interrompre tout ou partie du site sans préavis,
                sans que sa responsabilité ne puisse être engagée.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                3. Comportement des utilisateurs
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mb-4">
                L&apos;utilisateur s&apos;engage à utiliser le site de bonne foi, dans le respect des lois et règlements en vigueur,
                et à ne pas porter atteinte aux droits de tiers ni à l&apos;image de l&apos;établissement. Sont notamment interdits :
              </p>
              <ul className="list-disc pl-6 space-y-2 font-[var(--font-inter)] text-sm lg:text-base text-gray-700">
                <li>L&apos;utilisation du site à des fins illicites ou contraires à l&apos;ordre public et aux bonnes mœurs.</li>
                <li>L&apos;introduction de virus, logiciels malveillants ou toute action susceptible de nuire au fonctionnement du site.</li>
                <li>La collecte automatisée de données (scraping) sans autorisation préalable.</li>
                <li>Les contenus diffamatoires, injurieux, racistes, ou portant atteinte à la dignité des personnes.</li>
              </ul>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mt-4">
                En cas de manquement, l&apos;Éditeur se réserve le droit de prendre toute mesure appropriée, y compris le blocage
                de l&apos;accès et le cas échéant de saisir les autorités compétentes.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                4. Propriété intellectuelle
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                L&apos;ensemble des éléments du site (textes, images, graphismes, logos, vidéos, structure, bases de données,
                logiciels) est protégé par le droit d&apos;auteur, le droit des marques et le droit des bases de données.
                Toute reproduction, représentation, modification ou exploitation non autorisée constitue une contrefaçon
                susceptible d&apos;engager la responsabilité civile et pénale de l&apos;utilisateur. Seule est autorisée une
                reproduction pour usage privé et non commercial, sous réserve de conserver les mentions de source.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                5. Liens hypertextes
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mb-4">
                Le site peut contenir des liens vers des sites tiers. L&apos;Éditeur n&apos;exerce aucun contrôle sur ces sites
                et décline toute responsabilité quant à leur contenu. La création de liens vers le site est autorisée sous
                réserve que le lien ouvre le site dans une fenêtre pleine et que la source soit clairement indiquée. Les
                liens à caractère commercial ou portant atteinte à l&apos;image de l&apos;établissement peuvent être refusés.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                6. Données personnelles
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Le traitement des données personnelles est décrit dans notre{" "}
                <Link href="/legal/confidentialite" className="text-[#8C1515] hover:underline">
                  Politique de confidentialité
                </Link>
                . En utilisant le site, vous acceptez ce traitement dans les conditions qui y sont décrites.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                7. Limitation de responsabilité
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Les informations diffusées sur le site sont fournies à titre indicatif. L&apos;Éditeur ne garantit pas leur
                exhaustivité ni leur mise à jour en temps réel. L&apos;utilisateur est seul responsable de l&apos;usage qu&apos;il
                en fait. L&apos;Éditeur ne pourra être tenu responsable des dommages directs ou indirects résultant de
                l&apos;accès ou de l&apos;utilisation du site, y compris l&apos;indisponibilité, les pertes de données ou les
                préjudices liés à des contenus tiers accessibles via des liens.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                8. Droit applicable et litiges
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Les présentes CGU sont régies par le droit français. En cas de litige, et après échec d&apos;une tentative
                de résolution amiable, les tribunaux français seront seuls compétents. Pour toute question relative aux
                CGU, vous pouvez nous contacter à l&apos;adresse :{" "}
                <a href={`mailto:${FOOTER.email}`} className="text-[#8C1515] hover:underline break-all">
                  {FOOTER.email}
                </a>.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                9. Modifications des CGU
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                L&apos;Éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prennent
                effet dès leur mise en ligne. La poursuite de l&apos;utilisation du site après modification vaut acceptation
                des nouvelles CGU. Nous vous invitons à consulter régulièrement cette page.
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
