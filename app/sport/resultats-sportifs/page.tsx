'use client';

import { ChevronDown } from 'lucide-react';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BlogArticle from "@/app/components/BlogArticle";
import { parseDate } from "@/app/lib/dateUtils";
import { useEffect, useState, useRef, useCallback } from 'react';

interface SportResultArticle {
  id: number;
  titre: string;
  date: string;
  dateSort: Date;
  image: string;
  texte: string;
  category?: string;
  images?: string[];
}

export default function ResultatsSportifsPage() {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [needsShowMore, setNeedsShowMore] = useState(false);
  const [expandedArticles, setExpandedArticles] = useState<Record<number, boolean>>({});
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDescriptionHeight = () => {
      if (descriptionRef.current) {
        const lineHeight = parseFloat(getComputedStyle(descriptionRef.current).lineHeight) || 28;
        const maxHeight = lineHeight * 8;
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

  const articles: SportResultArticle[] = [
    {
      id: 7,
      titre: 'Championnat de France de Judo',
      date: '2026',
      dateSort: parseDate('2026'),
      category: 'Collège',
      image: '/Images/Sport/Judo/Judo.jpg',
      texte:
        'Un très beau championnat de France pour les judokas des Récollets qui décrochent les 3 couleurs de médailles à Wasquehal à côté de Lille.\n\n' +
        'Simon termine 3eme, Thibault est vice champion de France et Lana termine championne de France avec l\'équipe du grand est!!\n\n' +
        'Bravo à tous les 4, Bravo les Récollets une fois de plus vous nous avez fait vivre de belles émotions!',
    },
    {
      id: 4,
      titre: 'Championnat de France UGSEL de natation',
      date: '2026',
      dateSort: parseDate('2026'),
      category: 'Collège',
      image: '/Images/Sport/Natation/UNSS Nage.jpeg',
      images: ['/Images/Sport/Natation/Article sport.jpeg'],
      texte:
        'Nos nageurs reviennent du championnat de France UGSEL de natation avec un paquet de médailles !\n\n' +
        '🥉 Jade, Shana, Aisling, Louanne, Alexandre terminent 3e par équipe.\n\n' +
        '🥈 Les filles décrochent la médaille d\'argent en relais 4x50m 4 nages.\n\n' +
        '🥉 Le bronze en relais 4x50m Nage Libre pour les filles.\n\n' +
        '🥉 Bronze en 100 m Dos pour Alexandre.\n\n' +
        '🥉 Bronze 200 m 4 nages pour Aisling.\n\n' +
        'Bravo à tous pour ces très belles performances, merci à leur coach et aux enseignants d\'EPS qui ont fait le déplacement à Dunkerque.\n\n' +
        'Les récollets sont fiers de leurs sportifs !',
    },
    {
      id: 5,
      titre: 'Championnat de France Ugsel d\'athlétisme',
      date: '2026',
      dateSort: parseDate('2026'),
      category: 'Collège',
      image: '/Images/Sport/Athletisme/UNSS Athle.jpg',
      texte:
        'Une belle aventure se termine pour nos athlètes en déplacement au championnat de France Ugsel d\'athlétisme à St Brieuc.\n\n' +
        'Les benjamins terminent 16e par équipe, Matéo 12e sur 36 de son triathlon, Clémence arrache une 5e place sur 200 m et Alexandre a décroché le bronze en sautant 1,86 m !\n\n' +
        'Bravo à tous !!',
    },
    {
      id: 6,
      titre: 'Vice-champions départementaux de futsal',
      date: '2026',
      dateSort: parseDate('2026'),
      category: 'Collège',
      image: '/Images/Sport/Futsal/UNSS Futsal.JPG',
      texte:
        'Bravo à nos petits benjamins, vice-champions départementaux de futsal UNSS !\n\n' +
        'Nous sommes fiers de nos élèves !',
    },
    {
      id: 1,
      titre: 'Championnat Grand Est UGSEL de bad',
      date: '30 mars 2023',
      dateSort: parseDate('30 Mars 2023'),
      image: '/Images/Sport/championnat.jpg',
      texte: 'Hier, une délégation de 9 collégiens et lycéens a participé au championnat Grand Est UGSEL de badminton à Pont-à-Mousson. Nos filles ont brillé en décrochant 5 qualifications pour le championnat de France en mai prochain. En benjamine : Stella Bourgeois termine 4ème. En minime : Stella est 1ère 🥇, Loriane est 2ème 🥈. En lycée : Élodie est 3ème 🥉. Bravo à tous !',
    },
    {
      id: 2,
      titre: 'Olympiades UNSS LYCÉE',
      date: '30 mars 2023',
      dateSort: parseDate('30 Mars 2023'),
      image: '/Images/Sport/olympiade.jpg',
      texte: 'Une délégation de 26 lycéens a participé à la 3ème journée des olympiades UNSS LYCÉE à Jarny. Bravo à tous pour leurs belles performances.',
    },
    {
      id: 3,
      titre: 'Championnats de France de natation (UGSEL)',
      date: '17 mars 2023',
      dateSort: parseDate('17 Mars 2023'),
      image: '/Images/Sport/natations.jpg',
      texte: 'Notre établissement est à présent connu dans le Nord ! Nos 12 nageurs ont disputé le championnat de France de natation Ugsel durant ces deux derniers jours à Cambrai et le moins qu\'on puisse dire c\'est qu\'ils ne sont pas passés inaperçus. D\'abord déclarés CHAMPIONS DE FRANCE 🇫🇷 par équipe mardi, ils ont enchaîné les appels au podium avec 2 nouveaux titres ce matin : Lou sur 100m Nage libre et Guillaume sur 100m Dos. 3 médailles d\'argent 🥈🥈🥈 : en relais, Lou 200m 4 nages et Guillaume 100m nage libre. 3 médailles de Bronze 🥉🥉🥉 : en relais, Romane sur 100m dos et 200m 4 nages. Encore bravo à tous !',
    },
  ].sort((a, b) => {
    const byDate = b.dateSort.getTime() - a.dateSort.getTime();
    if (byDate !== 0) return byDate;
    return b.id - a.id;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/sport/resultats-sportifs" />

      <section className="bg-white py-8 sm:py-12 lg:py-16 pt-20 sm:pt-24 lg:pt-32 animate-fade-in">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Résultats Sportifs
            </h2>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8"></div>
            
            <div className="max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 text-center">
              <div 
                ref={descriptionRef}
                className={`space-y-4 ${!showMoreDescription && needsShowMore ? 'line-clamp-[5]' : ''}`}
              >
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  Retrouvez ici les résultats des compétitions sportives UNSS auxquelles participent nos élèves. Les performances de nos équipes et de nos sportifs sont régulièrement mises à jour.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                  Le sport est un vecteur d&apos;excellence et de dépassement de soi. Nous sommes fiers de suivre et de partager les résultats de nos élèves dans les différentes disciplines sportives.
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

          {/* Articles des résultats sportifs */}
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
                category={article.category}
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
