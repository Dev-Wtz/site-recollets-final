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

const CLASSES_LP = ['Seconde Professionnelle', 'Première Professionnelle', 'Terminale Professionnelle'] as const;

export default function LyceeProfessionnelPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/structures/lycee-professionnel" />

      <section className={`bg-white ${SECTION_PADDING} animate-fade-in`}>
        <div className={CONTAINER_CLASS}>
          <PageHeader 
            title="Lycée Professionnel"
            imageSrc="/LyceePro.png"
            imageAlt="Lycée Professionnel des Récollets"
          />

          {/* Contact + Règlement */}
          <div className="mb-8 sm:mb-12 lg:mb-16 flex flex-col lg:flex-row gap-6 items-stretch">
            <div className="flex-1 min-w-0">
              <ContactCard 
                secretariat={STRUCTURE_CONTACTS.lyceePro.secretariat}
                vieScolaire={STRUCTURE_CONTACTS.lyceePro.vieScolaire}
              />
            </div>
            <Link
              href="/reglement-interieur-lycee-pro-2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:w-64 flex-shrink-0 bg-[#8C1515] text-white rounded-xl p-6 shadow-lg border border-gray-200 hover:bg-[#a01919] transition-colors flex flex-col items-center justify-center text-center group focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2"
            >
              <FileText className="w-10 h-10 mb-3 opacity-90" aria-hidden="true" />
              <h3 className="font-[var(--font-inter)] font-bold text-base mb-1">Règlement intérieur</h3>
              <p className="font-[var(--font-inter)] text-xs opacity-90 mb-2">Règlement rentrée 2025</p>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          {/* Description */}
          <DescriptionSection title="Une formation professionnelle de qualité">
            <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg leading-relaxed">
              Le Lycée Professionnel des Récollets offre une formation professionnelle de qualité, préparant les élèves à l&apos;entrée dans la vie active ou à la poursuite d&apos;études supérieures. L&apos;établissement propose des formations adaptées aux besoins du marché du travail et aux aspirations des jeunes.
            </p>
            <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg leading-relaxed">
              Les cours se déroulent du lundi au vendredi et le mercredi matin, avec des horaires adaptés pour le bien-être des élèves. L&apos;enseignement professionnel allie théorie et pratique, avec des périodes de formation en entreprise qui permettent aux élèves de découvrir le monde professionnel et d&apos;acquérir de l&apos;expérience.
            </p>
            <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg leading-relaxed">
              L&apos;équipe pédagogique accompagne chaque élève dans son parcours, l&apos;aidant à développer ses compétences professionnelles et à construire son projet d&apos;avenir. Le lycée professionnel des Récollets offre un environnement stimulant et des formations reconnues qui ouvrent de nombreuses perspectives professionnelles.
            </p>
          </DescriptionSection>

          <ClassList classes={CLASSES_LP} />
          <QuickLinks />
        </div>
      </section>

      <Footer />
    </div>
  );
}

