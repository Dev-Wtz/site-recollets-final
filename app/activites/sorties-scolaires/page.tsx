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
    {
      id: 8,
      titre: 'Voyage en Allemagne',
      date: '7 au 10 avril 2026',
      dateSort: parseDate('7 au 10 avril'),
      image: '/Images/College/Allemagne/IMG_20260407_222447.jpg',
      images: [
        '/Images/College/Allemagne/IMG_20260407_222955.jpg',
        '/Images/College/Allemagne/IMG_20260408_214605.jpg',
        '/Images/College/Allemagne/IMG_20260408_214857.jpg',
        '/Images/College/Allemagne/IMG_20260408_215047.jpg',
        '/Images/College/Allemagne/IMG_20260409_172915.jpg',
        '/Images/College/Allemagne/IMG_20260409_173211.jpg',
        '/Images/College/Allemagne/IMG_20260409_174035.jpg',
        '/Images/College/Allemagne/IMG_20260412_002635.jpg',
        '/Images/College/Allemagne/IMG_20260412_102439.jpg',
        '/Images/College/Allemagne/IMG_20260511_082300.jpg',
      ],
      category: 'Collège',
      texte: 'Du 7 au 10 avril, 36 élèves germanistes de 5ème et de 4ème sont partis à la découverte de la Bavière en Allemagne et de la région de Salzbourg en Autriche. Un voyage exceptionnel durant lequel les élèves ont pu admirer l\'Allianz Arena de Munich. Ils ont également appris à fabriquer un fromage frais et à confectionner des chocolats. Ils sont aussi montés à plus de 3000 m d\'altitude pour admirer un splendide panorama sur les Alpes.',
    },
    {
      id: 9,
      titre: 'Voyage en Normandie',
      date: 'Avril 2026',
      dateSort: parseDate('Avril 2026'),
      image: '/Images/College/Normandie/25829.jpeg',
      images: [
        '/Images/College/Normandie/IMG_2766.jpeg',
        '/Images/College/Normandie/IMG_2792.jpeg',
        '/Images/College/Normandie/IMG_2886.jpeg',
        '/Images/College/Normandie/IMG_2919.jpeg',
        '/Images/College/Normandie/IMG_3012.jpeg',
        '/Images/College/Normandie/IMG_3036.jpeg',
        '/Images/College/Normandie/IMG_3082.jpeg',
        '/Images/College/Normandie/IMG_6391.jpeg',
        '/Images/College/Normandie/IMG_6397.jpeg',
        '/Images/College/Normandie/IMG_6447.jpeg',
        '/Images/College/Normandie/IMG_6481.jpeg',
        '/Images/College/Normandie/IMG_6538.jpeg',
      ],
      category: 'Collège',
      texte: 'Les Récollets débarquent en Normandie.\n\n45 élèves de 3ème pour l\'essentiel et quelques élèves de 4ème ont participé du 6 avril au 10 avril 2026 à un séjour en Normandie sur les principaux lieux de mémoire du Débarquement du 6 juin 1944. Au programme, les plages du Débarquement dont Omaha Beach, les cimetières de Colleville (cimetière américain) et de la Cambe (cimetière allemand), la pointe du Hoc, le Mémorial de Caen, le musée du Débarquement d\'Arromanches ainsi que son cinéma 360°, Sainte-Mère-Église et son musée sur les parachutistes américains de l\'Airborne.\n\nDans le cadre du programme de géographie, une visite en bateau du port du Havre a permis de découvrir les infrastructures portuaires et des porte-conteneurs gigantesques.\n\nLe groupe a profité également de moments de détente sur les plages ainsi qu\'à une matinée d\'initiation au char à voile. Soleil et températures printanières étaient au rendez-vous.',
    },
    {
      id: 10,
      titre: 'Voyage Paris',
      date: 'Mai 2026',
      dateSort: parseDate('Mai 2026'),
      image: '/Images/College/Paris/IMG_6967.jpeg',
      images: [
        '/Images/College/Paris/IMG_6960.jpeg',
        '/Images/College/Paris/IMG_6961.jpeg',
        '/Images/College/Paris/IMG_6962.jpeg',
        '/Images/College/Paris/IMG_6963.jpeg',
        '/Images/College/Paris/IMG_6964.jpeg',
        '/Images/College/Paris/IMG_6965.jpeg',
        '/Images/College/Paris/IMG_6966.jpeg',
        '/Images/College/Paris/IMG_6968.jpeg',
        '/Images/College/Paris/IMG_6969.jpeg',
        '/Images/College/Paris/IMG_6970.jpeg',
      ],
      category: 'Collège et Lycée',
      texte: 'Lors de ce séjour à Paris, cinq enseignants ont accompagné 43 élèves de la 6e à la classe de 2nde durant 3 jours.\n\nUn programme spécial avait été concocté pour nos élèves : le premier jour nous avons débuté par la visite de la cathédrale Notre-Dame avant un pique-nique en plein air. L’après-midi, une promenade pour admirer la ville des lumières s’est achevée par un moment reposant au jardin des tuileries avant de s’installer à l’hôtel.\n\nLe second jour a démarré par une visite libre du cimetière du Père Lachaise avec un jeu de piste organisé par les professeurs afin que les élèves retrouvent les tombes les plus prestigieuses (au programme : Balzac, Apollinaire, Proust, Oscar Wilde, Jim Morrison, Edith Piaf …). Après le déjeuner nous avons pu profiter d’une croisière sur la Seine en bateau mouche pour admirer les plus beaux monuments de la capitale.\n\nLa journée s’est terminée par un quartier libre à la Tour Eiffel pour le plus grand bonheur de nos élèves.\n\nLe troisième et dernier jour, sans doute le plus attendu, a été consacré au parc Disneyland : manèges, photos, parade et féerie garantis !\n\nC’est donc avec des souvenirs plein la tête et une bonne fatigue que nous sommes rentrés le mercredi dans la nuit, pour un repos bien mérité.',
    },
    {
      id: 11,
      titre: "Journée au Zoo d'Amnéville",
      date: '26 Mai 2026',
      dateSort: parseDate('26 Mai 2026'),
      image: '/Images/College/Zoo%20amneville/IMG_6948.jpeg',
      images: [
        '/Images/College/Zoo%20amneville/IMG_6939.jpeg',
        '/Images/College/Zoo%20amneville/IMG_6940.jpeg',
        '/Images/College/Zoo%20amneville/IMG_6945.jpeg',
        '/Images/College/Zoo%20amneville/IMG_6949.jpeg',
        '/Images/College/Zoo%20amneville/IMG_6951.jpeg',
      ],
      category: 'Collège',
      texte: 'Dans le cadre du parcours orientation, dix professeurs ont accompagné les 150 élèves de 5e au zoo d’Amnéville dans le but de découvrir les différents métiers, connus ou pas, dans le monde des parcs animaliers.\n\nDe 10h30 à 12h, les élèves ont pu assister à une présentation complète des métiers les plus évidents puis poser leurs questions à des soigneurs, des animateurs pédagogiques, des graphistes, des vétérinaires et autres dans un magnifique cadre : face aux ours polaires.\n\nAprès le repas, ils ont bénéficié d’un « quartier libre » dans l’enceinte du zoo pour compléter un livret de questions d’orientation fourni par les professeurs mais aussi profiter d’une visite libre au milieu des animaux.\n\nUne journée ensoleillée et enrichissante qui a permis d’allier découverte, orientation et plaisir.',
    },
  ].sort((a, b) => b.dateSort.getTime() - a.dateSort.getTime());

  const filteredArticles = useMemo(
    () => articles.filter((a) => {
      if (a.category === 'Collège et Lycée') {
        return selectedCategories.has('Collège') || selectedCategories.has('Lycée');
      }
      return selectedCategories.has(a.category as Category);
    }),
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

