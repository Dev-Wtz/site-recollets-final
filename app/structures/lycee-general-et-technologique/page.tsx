import { ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PageHeader from "@/app/components/PageHeader";
import ContactCard from "@/app/components/ContactCard";
import DescriptionSection from "@/app/components/DescriptionSection";
import ClassList from "@/app/components/ClassList";
import QuickLinks from "@/app/components/QuickLinks";
import { CONTAINER_CLASS, SECTION_PADDING, STRUCTURE_CONTACTS } from "@/app/lib/constants";

const CLASSES_LGT = ['2nd', '1ère', '1ère STMG', 'Tle', 'Tle STMG'] as const;

export default function LyceeGeneralEtTechnologiquePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/structures/lycee-general-et-technologique" />

      <section className={`bg-white ${SECTION_PADDING} animate-fade-in`}>
        <div className={CONTAINER_CLASS}>
          <PageHeader 
            title="Lycée Général et Technologique"
            imageSrc="/Lycée.png"
            imageAlt="Lycée Général et Technologique des Récollets"
          />

          {/* Contact + Règlement */}
          <div className="mb-8 sm:mb-12 lg:mb-16 flex flex-col lg:flex-row gap-6 items-stretch">
            <div className="flex-1 min-w-0">
              <ContactCard 
                secretariat={STRUCTURE_CONTACTS.lycee.secretariat}
                vieScolaire={STRUCTURE_CONTACTS.lycee.vieScolaire}
                vieScolaireLabel="Vie scolaire du lycée"
                address="7 rue Alfred Mézières, 54400 Longwy"
              />
            </div>
            <Link
              href="/Images/reglements/RI_Lycee.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:w-64 flex-shrink-0 bg-[#8C1515] text-white rounded-xl p-6 shadow-lg border border-gray-200 hover:bg-[#a01919] transition-colors flex flex-col items-center justify-center text-center group focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2"
            >
              <FileText className="w-10 h-10 mb-3 opacity-90" aria-hidden="true" />
              <h3 className="font-[var(--font-inter)] font-bold text-base mb-1">Règlement intérieur du lycée</h3>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          {/* Description */}
          <DescriptionSection title="Un environnement stimulant pour l'excellence">
            <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg leading-relaxed">
              Le lycée général et technologique des Récollets, une institution de taille modeste, accueille les élèves du secondaire. Les cours se déroulent du lundi au vendredi et le mercredi matin, avec des horaires adaptés pour le bien-être des élèves.
            </p>
            <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg leading-relaxed">
              L&apos;équipe pédagogique se dédie à équiper les élèves pour comprendre leur monde et à trouver leur place dans la société. Une variété d&apos;options et de spécialités est proposée à partir de la seconde. Le lycée organise également des sorties et des voyages pédagogiques pour enrichir l&apos;expérience éducative et préparer les élèves à l&apos;avenir.
            </p>
          </DescriptionSection>

          <ClassList classes={CLASSES_LGT} />
          <QuickLinks />
        </div>
      </section>

      <Footer />
    </div>
  );
}
