"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/app/lib/constants";

export default function ReglementPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/administration/reglement" />

      <section className={`bg-white ${SECTION_PADDING} animate-fade-in`}>
        <div className={CONTAINER_CLASS}>
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Règlement Intérieur
            </h2>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8" />

            {/* Introduction */}
            <div className="max-w-4xl mx-auto mb-12">
              <h3 className="font-[var(--font-playfair)] text-2xl lg:text-3xl font-bold text-[#8C1515] mb-4 text-center">
                Vivre Ensemble
              </h3>
              <p className="font-[var(--font-inter)] text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                L&apos;ensemble des règles qui suivent a pour but de favoriser la vie en communautaire dans l&apos;établissement, d&apos;instaurer un climat de confiance et de dialogue, en pleine connaissance de ses droits et de ses devoirs, de garantir la tolérance et le respect d&apos;autrui, ainsi que la protection de chacun contre toute agression physique ou morale.
              </p>
              <p className="font-[var(--font-inter)] text-base lg:text-lg text-gray-700 leading-relaxed">
                Ce règlement constitue un contrat de vie scolaire, passé entre l&apos;établissement, les parents ou personnes responsables de l&apos;enfant et les élèves qui s&apos;engagent à le respecter.
              </p>
            </div>
          </div>

          {/* Contenu du Règlement */}
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Section 1 */}
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#8C1515] mb-4">
                1/ PRÉSENCE ET ABSENCE DES ÉLÈVES
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · La présence des élèves à tous les cours prévus à l&apos;emploi du temps de leur division est obligatoire. L&apos;inscription à une option facultative (latin, DP3, Accompagnement éducatif...) entraîne l&apos;obligation d&apos;assiduité pendant tout le cycle concerné.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Toute absence prévisible doit faire l&apos;objet d&apos;une information écrite des parents. En cas d&apos;absence imprévisible (maladie, accident...), le bureau des surveillants doit être informé le matin avant 09h et l&apos;après-midi 15h (téléphone : <a href="tel:0382259928" className="text-[#8C1515] hover:underline">03 82 25 99 28</a>). Pour toutes autres demandes, téléphoner au secrétariat du collège (téléphone : <a href="tel:0382259920" className="text-[#8C1515] hover:underline">03 82 25 99 20</a>).
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Dans tous les cas, dès son retour, l&apos;élève présentera aux surveillants un billet d&apos;absence signé par les parents dans le carnet de correspondance indiquant le motif de l&apos;absence.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · En cas de manquement à ces règles, des sanctions sont prévues par le règlement de l&apos;ensemble scolaire.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#8C1515] mb-4">
                2/ RÉGIME DES SORTIES
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les demi-pensionnaires qui ne mangent pas exceptionnellement à la cantine doivent montrer un mot aux surveillants avant midi.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · En cas d&apos;absence prévue d&apos;un professeur, l&apos;emploi du temps habituel pourra être modifié ou les élèves libérés. Les parents en seront informés par le biais du carnet de correspondance. Seuls les élèves autorisés par les parents (mot signé et vérifié avant le changement) pourront quitter l&apos;établissement.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Le collège se réserve le droit de tous changements dans l&apos;emploi du temps au cours de l&apos;année (dans la grille d&apos;horaires d&apos;ouverture de l&apos;établissement 8h00 à 11h50 et 13h à 16h50). Les activités extrascolaires ne peuvent pas faire l&apos;objet d&apos;un motif d&apos;absence valable.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les sorties non autorisées seront sanctionnées.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Avant de rentrer en classe, tout élève en retard passe au bureau des surveillants avec son carnet de correspondance. Des retards injustifiés et fréquents seront sanctionnés.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les autorisations de sorties peuvent à tous moments être supprimées en cas de manquements répétés au règlement.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#8C1515] mb-4">
                3/ DISCIPLINE GÉNÉRALE
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Chaque membre de la communauté scolaire est responsable de l&apos;ordre et de la propreté de l&apos;établissement (papières, rangement des salles, respect du matériel, propreté des toilettes...). Si la dégradation est volontaire ou la conséquence d&apos;un acte d&apos;indiscipline ou d&apos;une négligence caractérisée, la réparation financière sera totale ou partielle par la famille, sans exclusion d&apos;éventuelles sanctions disciplinaires.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · En cas de perte ou de dégradation des manuels scolaires prêtés par l&apos;établissement, la responsabilité de l&apos;élève est engagée. Des sanctions pourront être appliquées (remboursement ou remplacement de l&apos;ouvrage).
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les élèves doivent se présenter dans une tenue vestimentaire propre et décente. Une tenue incorrecte ou trop dénudée, de même qu&apos;un maquillage à outrance ne sera pas acceptée au sein de l&apos;établissement.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Le port de couvre-chef (casquette, bonnet, bandana...) est interdit dans les bâtiments (couloirs, classes, restaurant scolaire, gymnase...).
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les téléphones portables, les baladeurs audio ou autres appareils électroniques comme consoles de jeu ne sont pas autorisés dans le collège. Les élèves n&apos;apporteront pas de sommes importantes ou d&apos;objets de valeur ne présentant pas d&apos;utilité scolaire. En cas de manquement au règlement ils pourront être confisqués quelques jours.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · L&apos;enregistrement d&apos;un cours ainsi que la prise de photographies dans l&apos;établissement d&apos;élèves, de professeurs ou personnel est interdit et peut être puni par la loi.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les cours d&apos;EPS sont obligatoires au même titre que les autres cours. Une tenue correcte est exigée pour le cours d&apos;EPS. Tout oubli de tenue sportive sera sanctionné.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#8C1515] mb-4">
                4/ RESPECT
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Chacun fera preuve de politesse à l&apos;égard d&apos;autrui (élèves et adultes de l&apos;établissement, quelque soit sa fonction). Il sera interdit toute violence verbale ou physique.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · L&apos;élève ne pourra en aucun cas fumer ni introduire de tabac ou autres produits illicites à l&apos;intérieur du collège. Le chewing-gum est interdit en classe.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les jeux dangereux, les bousculades sont également à proscrire. L&apos;introduction dans l&apos;établissement de tout objet sans relation avec les activités pédagogiques est interdite.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Aucun médicament ne doit être laissé à la libre disposition des élèves. Les élèves suivant un traitement médical déposent obligatoirement, chez les surveillants, leurs médicaments ainsi qu&apos;une copie de l&apos;ordonnance.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#8C1515] mb-4">
                5/ RESPECT DE L&apos;OBLIGATION DE TRAVAIL
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Tout travail donné à un élève doit être exécuté et présenté par celui-ci à la date fixée. Le retard non motivé dans la remise d&apos;un travail sera sanctionné.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Toute fraude à l&apos;occasion d&apos;un devoir ou d&apos;un contrôle sera également punie.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les élèves devront être en possession du matériel scolaire nécessaire aux activités prévues à l&apos;emploi du temps.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Le carnet de correspondance est par excellence le lien entre les professeurs, la direction, les élèves et leur famille. Il est indispensable que l&apos;élève puisse à tout moment le présenter.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#8C1515] mb-4">
                6/ NON RESPECT DU RÈGLEMENT
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Le non respect du règlement et de la discipline sera sanctionné.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les heures de retenue sont fixées par les surveillants ou les professeurs et non par les parents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
