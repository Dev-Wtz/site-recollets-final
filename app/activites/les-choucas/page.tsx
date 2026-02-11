'use client';

import { ChevronDown } from 'lucide-react';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BlogArticle from "@/app/components/BlogArticle";
import { parseDate } from "@/app/lib/dateUtils";
import { useEffect, useState, useRef, useCallback } from 'react';

export default function LesChoucasPage() {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [needsShowMore, setNeedsShowMore] = useState(false);
  const [expandedProjets, setExpandedProjets] = useState<Record<number, boolean>>({});
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

  const toggleProjet = useCallback((id: number) => {
    setExpandedProjets(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const projets = [
    {
      id: 1,
      titre: '2 nouveaux projets',
      date: '15 Mars 2023',
      dateSort: parseDate('15 Mars 2023'),
      image: '/decoration.jpeg',
      texte: 'Bravo aux jeunes des Récollets qui ont œuvré pour offrir du matériel adapté à Ilyana et à Karim. Ainsi la tradition des Choucas se perpétue. Merci à tous.',
    },
    {
      id: 2,
      titre: 'Jus de pomme de la solidarité',
      date: '29 Septembre 2022',
      dateSort: parseDate('29 Septembre 2022'),
      image: '/rentree.jpeg',
      texte: '29 septembre 2022 : Ramassage des pommes au profit de l\'opération « Jus de pomme de la solidarité ». Les élèves de la classe de 3ème Newton, accompagnés de leurs professeurs, sont allés ramasser les pommes dans les vergers à Baslieux. Une fois les pommes ramassées, ils ont pu découvrir le pressoir dans le village afin de découvrir comment est fabriqué le jus de pomme et goûter du jus fraîchement pressé. Cette sortie a permis aux élèves de récolter 1,2 tonnes de pommes permettant au final de faire 785 litres. Le jus de pomme sera prochainement proposé à la vente au profit de l\'association « Les Choucas » qui a pour projet cette année de financer un fauteuil pivotant afin de permettre à un enfant en situation de handicap d\'accéder à l\'automobile familiale.',
    },
    {
      id: 3,
      titre: 'Coup de Cœur Facebook APJ',
      date: '01 Juillet 2022',
      dateSort: parseDate('01 Juillet 2022'),
      image: '/hero.jpg',
      texte: 'Participe au prix « Coup de Cœur facebook – APJ » en soutenant ton projet favori ! Le projet le plus soutenu remporte une belle récompense par la MSA pour la réalisation de son projet !',
    },
  ].sort((a, b) => b.dateSort.getTime() - a.dateSort.getTime());

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/activites/les-choucas" />

      {/* Section Les Choucas avec animation de fondu */}
      <section className="bg-white py-8 sm:py-12 lg:py-16 pt-20 sm:pt-24 lg:pt-32 animate-fade-in">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Les Choucas
            </h2>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8"></div>
            
            {/* Texte descriptif */}
            <div className="max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 text-center">
              <div 
                ref={descriptionRef}
                className={`space-y-4 ${!showMoreDescription && needsShowMore ? 'line-clamp-[5]' : ''}`}
              >
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  L'association « Les Choucas » est un projet de solidarité porté par les élèves de l'Ensemble Scolaire Privé des Récollets. Elle a pour vocation de venir en aide aux personnes en situation de handicap en finançant du matériel adapté et en organisant des actions de solidarité.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                  Cette association permet aux élèves de s'engager dans des projets concrets, de développer leur sens de la solidarité et de contribuer à améliorer le quotidien de personnes en situation de handicap.
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

          {/* Projets */}
          <div className="max-w-6xl mx-auto space-y-8">
            {projets.map((projet) => (
              <BlogArticle
                key={projet.id}
                id={projet.id}
                titre={projet.titre}
                date={projet.date}
                image={projet.image}
                texte={projet.texte}
                expanded={expandedProjets[projet.id]}
                onToggle={() => toggleProjet(projet.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

