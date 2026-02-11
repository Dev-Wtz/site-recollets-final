'use client';

import { ChevronDown } from 'lucide-react';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BlogArticle from "@/app/components/BlogArticle";
import { parseDate } from "@/app/lib/dateUtils";
import { useEffect, useState, useRef, useCallback } from 'react';

export default function SortiesScolairesPage() {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [needsShowMore, setNeedsShowMore] = useState(false);
  const [expandedArticles, setExpandedArticles] = useState<Record<number, boolean>>({});
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

  const toggleArticle = useCallback((id: number) => {
    setExpandedArticles(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const articles = [
    {
      id: 1,
      titre: 'Rentrée scolaire',
      date: '01 Septembre 2024',
      dateSort: parseDate('01 Septembre 2024'),
      image: '/rentree.jpeg',
      images: [],
      texte: 'Rentrée scolaire pour tous les élèves de l\'établissement. Un moment important qui marque le début d\'une nouvelle année scolaire riche en apprentissages et en découvertes.',
    },
    {
      id: 2,
      titre: 'Baden Baden - Marché de Noël en Allemagne',
      date: '17 Octobre 2024',
      dateSort: parseDate('17 Octobre 2024'),
      image: '/baden.jpeg',
      images: [],
      texte: 'Sortie à Baden Baden pour découvrir le marché de Noël en Allemagne. Une expérience culturelle et linguistique qui permet aux élèves de s&apos;immerger dans les traditions allemandes et de pratiquer la langue dans un contexte authentique.',
    },
    {
      id: 3,
      titre: 'Festival du film italien',
      date: '06 Novembre 2024',
      dateSort: parseDate('06 Novembre 2024'),
      image: '/festival.png',
      images: [],
      texte: 'Participation au festival du film italien. Les élèves découvrent la richesse du cinéma transalpin et explorent différentes formes d\'expression artistique à travers le 7ème art.',
    },
    {
      id: 4,
      titre: 'Séjour au ski',
      date: '07 Décembre 2024',
      dateSort: parseDate('07 Décembre 2024'),
      image: '/ski.jpeg',
      images: [],
      texte: 'Séjour au ski pour les élèves. Une expérience sportive et conviviale qui permet de découvrir les sports d&apos;hiver, de renforcer la cohésion de groupe et de vivre des moments inoubliables en montagne.',
    },
    {
      id: 5,
      titre: 'Musée Pompidou',
      date: '11 Décembre 2024',
      dateSort: parseDate('11 Décembre 2024'),
      image: '/pompidou.jpg',
      images: [],
      texte: 'Visite du Musée Pompidou. Les élèves découvrent les collections d\'art moderne et contemporain, enrichissant leur culture artistique et leur sensibilité esthétique.',
    },
  ].sort((a, b) => b.dateSort.getTime() - a.dateSort.getTime());

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/activites/sorties-scolaires" />

      {/* Section Sorties Scolaires avec animation de fondu */}
      <section className="bg-white py-8 sm:py-12 lg:py-16 pt-20 sm:pt-24 lg:pt-32 animate-fade-in">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Sorties Scolaires
            </h2>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8"></div>
            
            {/* Texte descriptif */}
            <div className="max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 text-center">
              <div 
                ref={descriptionRef}
                className={`space-y-4 ${!showMoreDescription && needsShowMore ? 'line-clamp-[5]' : ''}`}
              >
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  Les sorties scolaires sont des moments privilégiés d&apos;apprentissage et de découverte. Elles permettent aux élèves de sortir du cadre traditionnel de la classe pour explorer, apprendre et s&apos;enrichir culturellement.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                  Découvrez ci-dessous les différentes sorties organisées tout au long de l&apos;année scolaire.
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

          {/* Articles */}
          <div className="max-w-6xl mx-auto space-y-8">
            {articles.map((article) => (
              <BlogArticle
                key={article.id}
                id={article.id}
                titre={article.titre}
                date={article.date}
                image={article.image}
                images={article.images}
                texte={article.texte}
                expanded={expandedArticles[article.id]}
                onToggle={() => toggleArticle(article.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

