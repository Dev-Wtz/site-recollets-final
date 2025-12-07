// Script pour ajouter le menu hamburger sur toutes les pages
const fs = require('fs');
const path = require('path');

const files = [
  'app/structures/lycee-general-et-technologique/page.tsx',
  'app/structures/lycee-professionnel/page.tsx',
  'app/administration/tarif/page.tsx',
  'app/administration/reglement/page.tsx',
  'app/administration/taux-reussite/page.tsx',
  'app/restauration/maternelle/page.tsx',
  'app/restauration/cantine/page.tsx',
  'app/restauration/cafeteria/page.tsx',
  'app/fournitures-scolaires/ecole/page.tsx',
  'app/fournitures-scolaires/college/page.tsx',
  'app/fournitures-scolaires/lycee-pro/page.tsx',
  'app/sport/calendrier-sportif/page.tsx',
  'app/sport/resultats-sportifs/page.tsx',
  'app/sport/inscription-unss/page.tsx',
  'app/activites/animation/page.tsx',
  'app/activites/sorties-scolaires/page.tsx',
  'app/activites/les-choucas/page.tsx',
];

// Lire le template de la page primaire
const templatePath = 'app/structures/primaire/page.tsx';
const template = fs.readFileSync(templatePath, 'utf8');

// Extraire les parties nécessaires du template
const importsMatch = template.match(/import \{([^}]+)\} from 'lucide-react';/);
const reactImportsMatch = template.match(/import \{([^}]+)\} from 'react';/);
const statesMatch = template.match(/(const \[isMobileMenuOpen[^}]+useEffect[^}]+}, \[\]);)/s);
const hamburgerMenuMatch = template.match(/(\{showMobileMenu && \([\s\S]*?Menu mobile déroulant[\s\S]*?<\/div>\s*\)\s*\}\s*)/);

console.log('Template chargé. Extraction des parties...');
console.log('Imports lucide:', importsMatch ? 'OK' : 'MANQUANT');
console.log('Imports react:', reactImportsMatch ? 'OK' : 'MANQUANT');
console.log('States:', statesMatch ? 'OK' : 'MANQUANT');
console.log('Hamburger menu:', hamburgerMenuMatch ? 'OK' : 'MANQUANT');

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`Fichier non trouvé: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Vérifier si déjà modifié
  if (content.includes('showMobileMenu')) {
    console.log(`Déjà modifié: ${file}`);
    return;
  }
  
  console.log(`Traitement de ${file}...`);
  
  // Ajouter Menu, X aux imports lucide-react
  if (content.includes("from 'lucide-react'")) {
    content = content.replace(
      /import \{([^}]+)\} from 'lucide-react';/,
      (match, imports) => {
        if (!imports.includes('Menu') || !imports.includes('X')) {
          return `import {${imports}, Menu, X} from 'lucide-react';`;
        }
        return match;
      }
    );
  }
  
  // Ajouter les imports React
  if (!content.includes("from 'react'")) {
    content = content.replace(
      /import Link from 'next\/link';/,
      "import Link from 'next/link';\nimport { useEffect, useState, useRef } from 'react';"
    );
  } else {
    content = content.replace(
      /import \{([^}]+)\} from 'react';/,
      (match, imports) => {
        const needed = ['useState', 'useEffect', 'useRef'].filter(imp => !imports.includes(imp));
        if (needed.length > 0) {
          return `import {${imports}, ${needed.join(', ')}} from 'react';`;
        }
        return match;
      }
    );
  }
  
  // Ajouter les états après la déclaration de fonction
  if (!content.includes('const [isMobileMenuOpen')) {
    const functionMatch = content.match(/(export default function \w+\(\) \{)/);
    if (functionMatch) {
      const insertPos = functionMatch.index + functionMatch[0].length;
      const states = `
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  // Détecter si navbar1 dépasse 75% de la largeur
  useEffect(() => {
    const checkNavbarWidth = () => {
      if (navRef.current) {
        const navWidth = navRef.current.offsetWidth;
        const windowWidth = window.innerWidth;
        const percentage = (navWidth / windowWidth) * 100;
        setShowMobileMenu(percentage > 75 || windowWidth < 1024);
      }
    };

    checkNavbarWidth();
    window.addEventListener('resize', checkNavbarWidth);
    return () => window.removeEventListener('resize', checkNavbarWidth);
  }, []);

`;
      content = content.slice(0, insertPos) + states + content.slice(insertPos);
    }
  }
  
  // Modifier le JSX pour ajouter le menu hamburger
  // Cette partie nécessite une modification manuelle car chaque page a une structure légèrement différente
  // On va juste ajouter un commentaire pour indiquer où faire les modifications
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`  ✓ ${file} mis à jour (imports et états)`);
});

console.log('\nTous les fichiers ont été mis à jour avec les imports et états.');
console.log('Note: Les modifications JSX doivent être faites manuellement pour chaque page.');
