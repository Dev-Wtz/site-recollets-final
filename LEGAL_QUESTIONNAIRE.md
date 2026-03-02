# Questionnaire légal – Pages légales du site Les Récollets

Répondez à ces questions puis mettez à jour le fichier `app/lib/constants.ts` (objet `LEGAL`) pour que les pages légales affichent les bonnes informations. Cela limite les risques juridiques (LCEN, RGPD, droit à l’image).

---

## 1. Éditeur du site (Mentions légales – LCEN)

- **Dénomination exacte de l’entité** qui édite le site (ex. « OGEC Les Récollets », « Ensemble Scolaire Privé Les Récollets »).  
  → Variable : `LEGAL.editorName`

- **Forme juridique** (Association loi 1901, OGEC, GIP, etc.).  
  → Variable : `LEGAL.legalForm`

- **Siège social** (adresse complète). Déjà renseigné : 44 rue du Général Pershing, 54400 Longwy. À modifier si différent.  
  → Variable : `LEGAL.headquarters`

- **Numéro SIRET** (14 chiffres). Obligatoire pour tout éditeur en France.  
  → Variable : `LEGAL.siret`

- **RCS** (si l’entité est inscrite au Registre du commerce, ex. « Nancy B 123 456 789 »). Sinon laisser vide.  
  → Variable : `LEGAL.rcs`

- **Capital social** (si société commerciale). Sinon laisser vide.  
  → Variable : `LEGAL.capital`

---

## 2. Directeur de la publication (LCEN)

- **Nom et qualité** de la personne responsable de la publication (ex. « M. Dupont, Chef d’établissement » ou « Mme Martin, Présidente de l’OGEC »).  
  → Variable : `LEGAL.publicationDirector`

---

## 3. Hébergeur

- Déjà renseigné : Vercel Inc., adresse aux USA. À modifier dans `LEGAL.host` si vous changez d’hébergeur.

---

## 4. Données personnelles et RGPD

- **Contact pour les demandes RGPD** (accès, rectification, opposition, etc.). Déjà renseigné : `accueil.ensemblescolaire@lesrecollets.org`.  
  → Variable : `LEGAL.privacyContact`

- **Délégué à la Protection des Données (DPO)** : avez-vous désigné un DPO ? Si oui, indiquer son nom et/ou adresse e-mail. Optionnel mais recommandé pour un établissement scolaire.  
  → Variable : `LEGAL.dpo`

---

## 5. Cookies et outils tiers

- Utilisez-vous des cookies d’analyse (ex. Google Analytics), des cookies publicitaires ou d’autres traceurs tiers ?  
  - Si oui : mettez à jour la **Politique des cookies** (`app/legal/cookies/page.tsx`) pour les lister (nom, finalité, durée, consentement).  
  - Si vous ajoutez un bandeau de consentement cookies, pensez à ne déposer les cookies non essentiels qu’après consentement.

---

## 6. Contenus utilisateurs (UGC)

- Le site ou les comptes officiels (réseaux sociaux) permettent-ils aujourd’hui de publier des contenus par les utilisateurs (commentaires, témoignages, envoi de photos/vidéos) ?  
  - Si oui : la **Charte UGC** créée couvre déjà les règles. Vérifiez que la modération (a priori ou a posteriori) et les autorisations droit à l’image sont bien appliquées en pratique.  
  - Si non : la charte reste utile pour le jour où vous ouvrirez ces fonctionnalités ; aucun changement obligatoire.

---

## 7. Vérifications recommandées

- [ ] Renseigner **SIRET** et **directeur de la publication** au minimum (obligations LCEN).
- [ ] Vérifier que l’**adresse de contact** et l’**hébergeur** sont à jour dans `constants.ts`.
- [ ] Si vous utilisez des **formulaires** (contact, inscription), s’assurer qu’une mention renvoie vers la Politique de confidentialité et, si besoin, une case de consentement.
- [ ] Relire les textes des pages légales après personnalisation (notamment les durées de conservation et les finalités) pour qu’ils correspondent à vos usages réels.

---

Une fois les réponses portées dans `app/lib/constants.ts`, les pages **Mentions légales**, **Politique de confidentialité**, **CGU**, **Cookies** et **Charte UGC** afficheront les bonnes informations. En cas de doute sur un point juridique, consulter un avocat ou la CNIL (www.cnil.fr).
