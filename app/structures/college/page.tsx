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

const CLASSES_COLLEGE = ['6ème', '5ème', '4ème', '3ème', '3ème Prépa Pro'] as const;

export default function CollegePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/structures/college" />

      <section className={`bg-white ${SECTION_PADDING} animate-fade-in`}>
        <div className={CONTAINER_CLASS}>
          <PageHeader 
            title="Collège"
            imageSrc="/CollegeVueCour.png"
            imageAlt="Collège des Récollets"
          />

          {/* Contact + Règlement */}
          <div className="mb-8 sm:mb-12 lg:mb-16 flex flex-col lg:flex-row gap-6 items-stretch">
            <div className="flex-1 min-w-0">
              <ContactCard 
                secretariat={STRUCTURE_CONTACTS.college.secretariat}
                vieScolaire={STRUCTURE_CONTACTS.college.vieScolaire}
                vieScolaireLabel="Vie scolaire du collège"
                address="44 Rue du Général Pershing, 54400 Longwy"
              />
            </div>
            <Link
              href="/reglement-interieur-college.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:w-64 flex-shrink-0 bg-[#8C1515] text-white rounded-xl p-6 shadow-lg border border-gray-200 hover:bg-[#a01919] transition-colors flex flex-col items-center justify-center text-center group focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2"
            >
              <FileText className="w-10 h-10 mb-3 opacity-90" aria-hidden="true" />
              <h3 className="font-[var(--font-inter)] font-bold text-base mb-1">Règlement intérieur du collège</h3>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          {/* Description */}
          <DescriptionSection title="Un collège dynamique et moderne">
            <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg leading-relaxed">
              Le collège des Récollets accueille les élèves de la 6e à la 3e, proposant un environnement propice à l&apos;apprentissage et à l&apos;épanouissement. Les cours sont organisés du lundi au vendredi et le mercredi matin, et offrent des horaires adaptés à la concentration des élèves.
            </p>
            <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg leading-relaxed">
              L&apos;équipe pédagogique se dédie à équiper les élèves pour comprendre leur monde et à trouver leur place dans la société. L&apos;enseignement des langues est fortement valorisé. Deux filières sont proposées pour le brevet des collèges : général et professionnel. L&apos;établissement enrichit l&apos;expérience éducative à travers des sorties et des voyages pédagogiques en lien avec les études des élèves.
            </p>
          </DescriptionSection>

          <ClassList classes={CLASSES_COLLEGE} />
          <QuickLinks />
        </div>
      </section>

      <Footer />
    </div>
  );
}

