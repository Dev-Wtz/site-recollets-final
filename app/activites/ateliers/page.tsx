'use client';

import { ChevronDown } from 'lucide-react';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BlogArticle from "@/app/components/BlogArticle";
import { useEffect, useState, useRef, useCallback } from 'react';

export default function AteliersPage() {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [needsShowMore, setNeedsShowMore] = useState(false);
  const [expandedAteliers, setExpandedAteliers] = useState<Record<number, boolean>>({});
  const descriptionRef = useRef<HTMLDivElement>(null);

  // Vérifier si la description fait plus de 8 lignes
  useEffect(() => {
    const checkDescriptionHeight = () => {
      if (descriptionRef.current) {
        const lineHeight = parseFloat(getComputedStyle(descriptionRef.current).lineHeight) || 28;
        const maxHeight = lineHeight * 8; // 8 lignes
        const actualHeight = descriptionRef.current.scrollHeight;
        setNeedsShowMore(actualHeight > maxHeight);
      }
    };

    const timer = setTimeout(checkDescriptionHeight, 100);
    window.addEventListener('resize', checkDescriptionHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkDescriptionHeight);
    };
  }, []);

  const toggleAtelier = useCallback((id: number) => {
    setExpandedAteliers(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const ateliers = [
    {
      id: 1,
      titre: 'Club Rubik\'s Cube',
      image: '/Images/College/Club/rubiks.png',
      texte: 'Le club Rubik\'s Cube permet aux élèves de développer leur logique, leur patience et leur dextérité. Les participants apprennent différentes méthodes de résolution et participent à des compétitions amicales. Un excellent moyen de stimuler l\'esprit tout en s\'amusant.',
    },
    {
      id: 2,
      titre: 'Club Détente',
      image: '/Images/College/Club/detente.png',
      texte: 'Le club détente offre un espace de relaxation et de bien-être aux élèves. Des activités variées sont proposées pour permettre aux jeunes de se ressourcer, de gérer le stress et de développer leur bien-être personnel dans un cadre apaisant et bienveillant.',
    },
    {
      id: 3,
      titre: 'Club Théâtre',
      image: '/Images/College/Club/theatre.jpeg',
      texte: 'Le club théâtre permet aux élèves de développer leur expression orale, leur confiance en soi et leur créativité. Les participants travaillent sur des pièces, des improvisations et des représentations, enrichissant leur culture artistique et leur capacité à s\'exprimer devant un public.',
    },
    {
      id: 4,
      titre: 'Club Jeux Maths',
      image: '/Images/College/Club/maths.jpeg',
      texte: 'Le club jeux maths propose une approche ludique des mathématiques. Les élèves découvrent les mathématiques à travers des jeux, des énigmes et des défis, développant ainsi leur logique et leur goût pour cette discipline de manière amusante et interactive.',
    },
    {
      id: 5,
      titre: 'Club Donjons et Dragons',
      image: '/Images/College/Club/dongon.jpeg',
      texte: 'Le club Donjons et Dragons permet aux élèves de développer leur imagination, leur esprit d\'équipe et leur créativité narrative. Les participants créent des personnages, vivent des aventures épiques et apprennent à collaborer dans un univers fantastique riche en défis et en découvertes.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/activites/ateliers" />

      {/* Section Ateliers avec animation de fondu */}
      <section className="bg-white py-8 sm:py-12 lg:py-16 pt-20 sm:pt-24 lg:pt-32 animate-fade-in">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Ateliers du collège
            </h2>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8"></div>
            
            {/* Texte descriptif */}
            <div className="max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 text-center">
              <div 
                ref={descriptionRef}
                className={`space-y-4 ${!showMoreDescription && needsShowMore ? 'line-clamp-[5]' : ''}`}
              >
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  Les ateliers proposés par l&apos;établissement offrent aux élèves l&apos;opportunité de développer leurs compétences, leurs passions et leurs talents dans un cadre convivial et bienveillant.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                  Découvrez ci-dessous les différents clubs et ateliers disponibles pour enrichir l&apos;expérience éducative de nos élèves.
                </p>
              </div>
              {needsShowMore && (
                <button
                  onClick={() => setShowMoreDescription(!showMoreDescription)}
                  className="mt-4 text-[#8C1515] hover:text-[#a01919] font-[var(--font-inter)] font-semibold text-sm transition-colors flex items-center gap-1 mx-auto"
                >
                  {showMoreDescription ? 'Voir moins' : 'Voir plus'}
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${showMoreDescription ? 'rotate-180' : ''}`}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Ateliers */}
          <div className="max-w-6xl mx-auto space-y-8">
            {ateliers.map((atelier) => (
              <BlogArticle
                key={atelier.id}
                id={atelier.id}
                titre={atelier.titre}
                image={atelier.image}
                texte={atelier.texte}
                expanded={expandedAteliers[atelier.id]}
                onToggle={() => toggleAtelier(atelier.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

