"use client";

import { ChevronDown, Clock, ExternalLink, Phone, Mail, Link2, FileText } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ContactCard from "@/app/components/ContactCard";
import { useShowMoreText } from "@/app/hooks/useShowMoreText";
import { CONTAINER_CLASS, SECTION_PADDING, STRUCTURE_CONTACTS } from "@/app/lib/constants";

const CLASSES_ECOLE = ['Petite Section', 'Moyenne Section', 'Grande Section', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'];

export default function EcolePage() {
  const {
    ref: descriptionRef,
    expanded: showMoreDescription,
    needsShowMore,
    toggle: toggleShowMore,
  } = useShowMoreText(8);

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/structures/ecole" />

      <section className={`bg-white ${SECTION_PADDING} animate-fade-in`}>
        <div className={CONTAINER_CLASS}>
          {/* Titre */}
          <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4">
              École Notre-Dame
            </h1>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto" aria-hidden="true"></div>
          </div>

          {/* Image Hero */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <div className="relative w-full h-40 sm:h-52 md:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-2xl">
              <NextImage
                src="/Ecole.png"
                alt="École Notre-Dame des Récollets"
                width={1200}
                height={384}
                className="w-full h-full object-cover"
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true"></div>
            </div>
          </div>

          {/* Contact + Règlement */}
          <div className="mb-8 sm:mb-12 lg:mb-16 flex flex-col lg:flex-row gap-6 items-stretch">
            <div className="flex-1 min-w-0">
              <ContactCard 
                secretariat={STRUCTURE_CONTACTS.ecole.secretariat}
                vieScolaire={STRUCTURE_CONTACTS.ecole.vieScolaire}
              />
            </div>
            <Link
              href="/charte-elementaire-2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:w-64 flex-shrink-0 bg-[#8C1515] text-white rounded-xl p-6 shadow-lg border border-gray-200 hover:bg-[#a01919] transition-colors flex flex-col items-center justify-center text-center group focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2"
            >
              <FileText className="w-10 h-10 mb-3 opacity-90" aria-hidden="true" />
              <h3 className="font-[var(--font-inter)] font-bold text-base mb-1">Règlement intérieur</h3>
              <p className="font-[var(--font-inter)] text-xs opacity-90 mb-2">Charte élémentaire 2024</p>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          {/* Description */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl font-bold text-[#8C1515] mb-4 sm:mb-6">
                De la Maternelle au CM2
              </h2>
              <div 
                ref={descriptionRef}
                className={`space-y-4 text-gray-700 ${!showMoreDescription && needsShowMore ? 'line-clamp-[5]' : ''}`}
              >
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg leading-relaxed">
                  L&apos;école Notre-Dame de l&apos;Ensemble Scolaire Privé des Récollets accueille les enfants de la Petite Section au CM2 dans un environnement sûr, chaleureux et stimulant. Elle favorise l&apos;apprentissage et le bien-être de chaque enfant à travers un projet éducatif solide.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg leading-relaxed">
                  En maternelle, l&apos;approche pédagogique stimule la curiosité, la créativité et le développement social des élèves, les préparant progressivement à l&apos;école élémentaire. Les horaires sont conçus pour favoriser l&apos;apprentissage et le bien-être, avec des cours du lundi au vendredi, de 8h15 à 16h30. Un service de garderie est proposé de 7h15 à 18h30.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg leading-relaxed">
                  En primaire, l&apos;établissement vise l&apos;excellence académique tout en transmettant des valeurs essentielles comme la fraternité et l&apos;ouverture à autrui. Grâce à une liberté pédagogique, l&apos;enseignement est adapté aux besoins de chaque élève, respectant leur rythme individuel et encourageant le développement de leurs talents.
                </p>
              </div>
              {needsShowMore && (
                <button
                  type="button"
                  onClick={toggleShowMore}
                  className="mt-4 text-[#8C1515] hover:text-[#a01919] font-[var(--font-inter)] font-semibold text-sm transition-colors flex items-center gap-1"
                  aria-expanded={showMoreDescription}
                >
                  {showMoreDescription ? "Voir moins" : "Voir plus"}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${showMoreDescription ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
          </div>

          {/* Liste des classes */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <div className="bg-gray-50 rounded-xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-200">
              <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl font-bold text-[#8C1515] mb-6 sm:mb-8">
                Liste des classes
              </h2>
              <ul className="space-y-4 font-[var(--font-inter)] text-gray-700">
                {CLASSES_ECOLE.map((classe) => (
                  <li key={classe} className="border-l-2 border-[#8C1515] pl-4 py-2.5 text-sm sm:text-base leading-relaxed">
                    {classe}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Liens utiles */}
          <div className="max-w-4xl mx-auto flex flex-col items-center w-full">
            <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl font-bold text-[#8C1515] mb-6 sm:mb-8 text-center">
              Liens utiles
            </h2>
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-2xl">
              <Link 
                href="/administration/tarif"
                className="bg-[#8C1515] text-white rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 shadow hover:bg-[#a01919] transition-colors flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2"
              >
                <div>
                  <h3 className="font-[var(--font-inter)] text-sm sm:text-base font-bold mb-0.5">Tarifs</h3>
                  <p className="font-[var(--font-inter)] text-xs opacity-90">Consulter les tarifs de l&apos;établissement</p>
                </div>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
