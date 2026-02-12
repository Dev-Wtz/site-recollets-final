/**
 * Script pour générer le PDF du règlement intérieur du collège
 * Exécuter : node scripts/generate-reglement-college-pdf.js
 */

const fs = require('fs');
const path = require('path');

// Contenu du règlement intérieur (texte brut, sans balises HTML)
const REGLEMENT = {
  titre: 'Règlement Intérieur',
  intro: {
    sousTitre: 'Vivre Ensemble',
    paragraphes: [
      "L'ensemble des règles qui suivent a pour but de favoriser la vie en communautaire dans l'établissement, d'instaurer un climat de confiance et de dialogue, en pleine connaissance de ses droits et de ses devoirs, de garantir la tolérance et le respect d'autrui, ainsi que la protection de chacun contre toute agression physique ou morale.",
      "Ce règlement constitue un contrat de vie scolaire, passé entre l'établissement, les parents ou personnes responsables de l'enfant et les élèves qui s'engagent à le respecter.",
    ],
  },
  sections: [
    {
      titre: '1/ PRÉSENCE ET ABSENCE DES ÉLÈVES',
      points: [
        "La présence des élèves à tous les cours prévus à l'emploi du temps de leur division est obligatoire. L'inscription à une option facultative (latin, DP3, Accompagnement éducatif...) entraîne l'obligation d'assiduité pendant tout le cycle concerné.",
        "Toute absence prévisible doit faire l'objet d'une information écrite des parents. En cas d'absence imprévisible (maladie, accident...), le bureau des surveillants doit être informé le matin avant 09h et l'après-midi 15h (téléphone : 03 82 25 99 28). Pour toutes autres demandes, téléphoner au secrétariat du collège (téléphone : 03 82 25 99 20).",
        "Dans tous les cas, dès son retour, l'élève présentera aux surveillants un billet d'absence signé par les parents dans le carnet de correspondance indiquant le motif de l'absence.",
        "En cas de manquement à ces règles, des sanctions sont prévues par le règlement de l'ensemble scolaire.",
      ],
    },
    {
      titre: '2/ RÉGIME DES SORTIES',
      points: [
        "Les demi-pensionnaires qui ne mangent pas exceptionnellement à la cantine doivent montrer un mot aux surveillants avant midi.",
        "En cas d'absence prévue d'un professeur, l'emploi du temps habituel pourra être modifié ou les élèves libérés. Les parents en seront informés par le biais du carnet de correspondance. Seuls les élèves autorisés par les parents (mot signé et vérifié avant le changement) pourront quitter l'établissement.",
        "Le collège se réserve le droit de tous changements dans l'emploi du temps au cours de l'année (dans la grille d'horaires d'ouverture de l'établissement 8h00 à 11h50 et 13h à 16h50). Les activités extrascolaires ne peuvent pas faire l'objet d'un motif d'absence valable.",
        "Les sorties non autorisées seront sanctionnées.",
        "Avant de rentrer en classe, tout élève en retard passe au bureau des surveillants avec son carnet de correspondance. Des retards injustifiés et fréquents seront sanctionnés.",
        "Les autorisations de sorties peuvent à tous moments être supprimées en cas de manquements répétés au règlement.",
      ],
    },
    {
      titre: "3/ DISCIPLINE GÉNÉRALE",
      points: [
        "Chaque membre de la communauté scolaire est responsable de l'ordre et de la propreté de l'établissement (papières, rangement des salles, respect du matériel, propreté des toilettes...). Si la dégradation est volontaire ou la conséquence d'un acte d'indiscipline ou d'une négligence caractérisée, la réparation financière sera totale ou partielle par la famille, sans exclusion d'éventuelles sanctions disciplinaires.",
        "En cas de perte ou de dégradation des manuels scolaires prêtés par l'établissement, la responsabilité de l'élève est engagée. Des sanctions pourront être appliquées (remboursement ou remplacement de l'ouvrage).",
        "Les élèves doivent se présenter dans une tenue vestimentaire propre et décente. Une tenue incorrecte ou trop dénudée, de même qu'un maquillage à outrance ne sera pas acceptée au sein de l'établissement.",
        "Le port de couvre-chef (casquette, bonnet, bandana...) est interdit dans les bâtiments (couloirs, classes, restaurant scolaire, gymnase...).",
        "Les téléphones portables, les baladeurs audio ou autres appareils électroniques comme consoles de jeu ne sont pas autorisés dans le collège. Les élèves n'apporteront pas de sommes importantes ou d'objets de valeur ne présentant pas d'utilité scolaire. En cas de manquement au règlement ils pourront être confisqués quelques jours.",
        "L'enregistrement d'un cours ainsi que la prise de photographies dans l'établissement d'élèves, de professeurs ou personnel est interdit et peut être puni par la loi.",
        "Les cours d'EPS sont obligatoires au même titre que les autres cours. Une tenue correcte est exigée pour le cours d'EPS. Tout oubli de tenue sportive sera sanctionné.",
      ],
    },
    {
      titre: "4/ RESPECT",
      points: [
        "Chacun fera preuve de politesse à l'égard d'autrui (élèves et adultes de l'établissement, quelque soit sa fonction). Il sera interdit toute violence verbale ou physique.",
        "L'élève ne pourra en aucun cas fumer ni introduire de tabac ou autres produits illicites à l'intérieur du collège. Le chewing-gum est interdit en classe.",
        "Les jeux dangereux, les bousculades sont également à proscrire. L'introduction dans l'établissement de tout objet sans relation avec les activités pédagogiques est interdite.",
        "Aucun médicament ne doit être laissé à la libre disposition des élèves. Les élèves suivant un traitement médical déposent obligatoirement, chez les surveillants, leurs médicaments ainsi qu'une copie de l'ordonnance.",
      ],
    },
    {
      titre: "5/ RESPECT DE L'OBLIGATION DE TRAVAIL",
      points: [
        "Tout travail donné à un élève doit être exécuté et présenté par celui-ci à la date fixée. Le retard non motivé dans la remise d'un travail sera sanctionné.",
        "Toute fraude à l'occasion d'un devoir ou d'un contrôle sera également punie.",
        "Les élèves devront être en possession du matériel scolaire nécessaire aux activités prévues à l'emploi du temps.",
        "Le carnet de correspondance est par excellence le lien entre les professeurs, la direction, les élèves et leur famille. Il est indispensable que l'élève puisse à tout moment le présenter.",
      ],
    },
    {
      titre: "6/ NON RESPECT DU RÈGLEMENT",
      points: [
        "Le non respect du règlement et de la discipline sera sanctionné.",
        "Les heures de retenue sont fixées par les surveillants ou les professeurs et non par les parents.",
      ],
    },
  ],
};

async function main() {
  let PDFDocument;
  try {
    PDFDocument = require('pdfkit');
  } catch {
    console.log('Installation de pdfkit...');
    const { execSync } = require('child_process');
    execSync('npm install pdfkit --no-save', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
    PDFDocument = require('pdfkit');
  }

  try {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const outputPath = path.join(__dirname, '..', 'public', 'reglement-interieur-college.pdf');
    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    // Titre
    doc.fontSize(24).fillColor('#8C1515').text(REGLEMENT.titre, { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(18).text(REGLEMENT.intro.sousTitre, { align: 'center' });
    doc.moveDown(1);

    // Introduction
    doc.fontSize(11).fillColor('#333333');
    for (const p of REGLEMENT.intro.paragraphes) {
      doc.text(p, { align: 'justify' });
      doc.moveDown(0.5);
    }
    doc.moveDown(0.5);

    // Sections
    for (const section of REGLEMENT.sections) {
      doc.fontSize(14).fillColor('#8C1515').text(section.titre);
      doc.moveDown(0.3);
      doc.fontSize(11).fillColor('#333333');
      for (const point of section.points) {
        doc.text('· ' + point, { align: 'justify', indent: 0, paragraphGap: 4 });
        doc.moveDown(0.3);
      }
      doc.moveDown(0.5);
    }

    doc.end();

    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    console.log('PDF généré :', outputPath);
  } catch (e) {
    throw e;
  }
}

main().catch(console.error);
