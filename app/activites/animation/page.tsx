'use client';

import { ChevronDown } from 'lucide-react';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BlogArticle from "@/app/components/BlogArticle";
import { parseDate } from "@/app/lib/dateUtils";
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import CategoryFilter, { CATEGORIES, type Category } from "@/app/components/CategoryFilter";

export default function AnimationPage() {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [needsShowMore, setNeedsShowMore] = useState(false);
  const [expandedArticles, setExpandedArticles] = useState<Record<number, boolean>>({});
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(() => new Set(CATEGORIES));
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
      titre: 'Marché de Noël interne et Vente de chocolat',
      date: '12 Décembre 2025',
      dateSort: parseDate('12 Décembre 2025'),
      image: 'https://images.unsplash.com/photo-1544212415-85fec3f52087?auto=format&fit=crop&w=1200&q=80',
      category: 'Collège',
      texte: 'Marché de Noël interne le 12 décembre avec la vente des créations de Mme SACCHET. Également, vente de chocolat pour financer les sorties scolaires. Ces événements permettent de renforcer l\'esprit de communauté et de soutenir les projets pédagogiques de l\'établissement.',
    },
    {
      id: 2,
      titre: 'Décoration de Noël',
      date: '01 Décembre 2025',
      dateSort: parseDate('01 Décembre 2025'),
      image: 'https://images.unsplash.com/photo-1543598098-622a5e218f43?auto=format&fit=crop&w=1200&q=80',
      category: 'Collège',
      texte: 'Les élèves de l\'ensemble scolaire des Récollets se sont mobilisés pour décorer l\'établissement aux couleurs de Noël. Cette activité a permis de renforcer l\'esprit de communauté et de partage, tout en créant une ambiance festive et chaleureuse pour tous.',
    },
  ].sort((a, b) => b.dateSort.getTime() - a.dateSort.getTime());

  const filteredArticles = useMemo(
    () => articles.filter((a) => selectedCategories.has(a.category as Category)),
    [articles, selectedCategories],
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/activites/animation" />

      {/* Section Animation avec animation de fondu */}
      <section className="bg-white py-8 sm:py-12 lg:py-16 pt-20 sm:pt-24 lg:pt-32 animate-fade-in">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Animations
            </h2>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8"></div>
            
            {/* Texte descriptif */}
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <div 
                ref={descriptionRef}
                className={`space-y-4 ${!showMoreDescription && needsShowMore ? 'line-clamp-[5]' : ''}`}
              >
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  Découvrez les différentes animations organisées tout au long de l'année scolaire à l'Ensemble Scolaire Privé des Récollets. Ces moments de convivialité et de partage renforcent les liens entre les élèves et contribuent à créer une ambiance chaleureuse au sein de l'établissement.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                  Chaque animation est l'occasion pour nos élèves de s'impliquer, de créer et de partager des moments inoubliables ensemble.
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

          <div className="max-w-6xl mx-auto mb-8">
            <CategoryFilter selected={selectedCategories} onChange={setSelectedCategories} />
          </div>

          {/* Articles */}
          <div className="max-w-6xl mx-auto space-y-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <BlogArticle
                  key={article.id}
                  id={article.id}
                  titre={article.titre}
                  date={article.date}
                  image={article.image}
                  texte={article.texte}
                  category={article.category}
                  expanded={expandedArticles[article.id]}
                  onToggle={() => toggleArticle(article.id)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 font-[var(--font-inter)] py-12">
                Aucune animation pour cette sélection.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

