'use client';

import { ChevronDown } from 'lucide-react';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BlogArticle from "@/app/components/BlogArticle";
import { parseDate } from "@/app/lib/dateUtils";
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import CategoryFilter, { CATEGORIES, type Category } from "@/app/components/CategoryFilter";

export default function SortiesScolairesPage() {
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
      titre: 'Rentrée scolaire',
      date: '01 Septembre 2025',
      dateSort: parseDate('01 Septembre 2025'),
      image: '/rentree.jpeg',
      images: [],
      category: 'Collège',
      texte: 'Rentrée scolaire pour tous les élèves de l\'établissement. Un moment important qui marque le début d\'une nouvelle année scolaire riche en apprentissages et en découvertes.',
    },
    {
      id: 2,
      titre: 'Baden Baden - Marché de Noël en Allemagne',
      date: '17 Octobre 2025',
      dateSort: parseDate('17 Octobre 2025'),
      image: '/Images/College/Baden/baden.jpeg',
      images: [],
      category: 'Collège',
      texte: 'Sortie à Baden-Baden pour découvrir le marché de Noël en Allemagne. Une expérience culturelle et linguistique qui permet aux élèves de s\'immerger dans les traditions allemandes et de pratiquer la langue dans un contexte authentique.',
    },
    {
      id: 3,
      titre: 'Festival du film italien',
      date: '06 Novembre 2025',
      dateSort: parseDate('06 Novembre 2025'),
      image: '/Images/College/Festival%20italien/festival.png',
      images: [],
      category: 'Collège',
      texte: 'Participation au festival du film italien. Les élèves découvrent la richesse du cinéma transalpin et explorent différentes formes d\'expression artistique à travers le 7e art.',
    },
    {
      id: 4,
      titre: 'Séjour au ski',
      date: '07 Décembre 2025',
      dateSort: parseDate('07 Décembre 2025'),
      image: '/Images/College/Ski/ski.jpeg',
      images: [],
      category: 'Collège',
      texte: 'Séjour au ski pour les élèves. Une expérience sportive et conviviale qui permet de découvrir les sports d\'hiver, de renforcer la cohésion de groupe et de vivre des moments inoubliables en montagne.',
    },
    {
      id: 5,
      titre: 'Journée espagnole',
      date: '30 Avril 2026',
      dateSort: parseDate('30 Avril 2026'),
      image: '/hero.jpg',
      images: [],
      category: 'Collège',
      texte: 'Journée dédiée à la langue et à la culture espagnoles : ateliers, échanges et découvertes pour célébrer le vivre ensemble et l\'ouverture culturelle au sein du collège.',
    },
    {
      id: 6,
      titre: 'Sorties scolaires du Lycée Professionnel',
      dateSort: parseDate('01 Décembre 2025'),
      image: '/Images/LP/Sortie/Metz_1.jpeg',
      images: [
        '/Images/LP/Sortie/Metz_2.jpeg',
        '/Images/LP/Sortie/Cous_assise_1.jpeg',
        '/Images/LP/Sortie/March%C3%A9_de_No%C3%ABl_1.jpeg',
        '/Images/LP/Sortie/March%C3%A9_de_No%C3%ABl_2.jpeg',
        '/Images/LP/Sortie/March%C3%A9_de_No%C3%ABl_3.jpeg',
      ],
      category: 'Lycée Professionnel',
      texte: 'Certaines sorties sont culturelles, comme les visites de musées, d\'autres s\'inscrivent davantage dans le cadre pédagogique, comme l\'assistance à des cours d\'assises, et d\'autres sont simplement conviviales, comme les sorties au marché de Noël.',
    },
    {
      id: 7,
      titre: 'Sortie au Fort de Fermont — Classes de 6ème',
      date: '12 Mars 2026',
      dateSort: parseDate('12 Mars 2026'),
      image: '/Images/College/Fort%20de%20Fermont/Fermont_1.jpg',
      images: [
        '/Images/College/Fort%20de%20Fermont/Fermont_2.jpg',
        '/Images/College/Fort%20de%20Fermont/Fermont_3.jpg',
        '/Images/College/Fort%20de%20Fermont/Fermont_4.jpg',
        '/Images/College/Fort%20de%20Fermont/Fermont_5.jpg',
        '/Images/College/Fort%20de%20Fermont/Fermont_6.jpg',
        '/Images/College/Fort%20de%20Fermont/Fermont_7.jpg',
      ],
      category: 'Collège',
      texte: 'Les 5 classes de 6èmes ont vécu une belle journée de découverte en se rendant au Fort de Fermont. Pendant plus de deux heures, les élèves ont suivi une visite guidée qui leur a permis de mieux comprendre le rôle de la Ligne Maginot durant la Seconde Guerre mondiale. La visite d\'un petit musée a complété ce moment d\'histoire en illustrant concrètement la vie des soldats et les événements de l\'époque.\n\nLa journée s\'est poursuivie avec une séance de cinéma. Une sortie variée et enrichissante qui a beaucoup plu à tous nos élèves de sixième.',
    },
  ].sort((a, b) => b.dateSort.getTime() - a.dateSort.getTime());

  const filteredArticles = useMemo(
    () => articles.filter((a) => selectedCategories.has(a.category as Category)),
    [articles, selectedCategories],
  );

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
                  images={article.images}
                  texte={article.texte}
                  category={article.category}
                  expanded={expandedArticles[article.id]}
                  onToggle={() => toggleArticle(article.id)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 font-[var(--font-inter)] py-12">
                Aucune sortie scolaire pour cette sélection.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

