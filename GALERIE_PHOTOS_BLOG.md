# 📸 Galerie Photos des Blogs

## Fonctionnalité

Chaque article de blog permet maintenant de **voir toutes les photos** associées via une galerie lightbox professionnelle.

## Comment accéder aux photos

### 1. **Clic sur l'image principale**
- Cliquez sur l'image de l'article pour ouvrir la galerie
- Survol : effet de zoom + indication "X photo(s)"

### 2. **Bouton "Images"**
- Bouton visible sous le texte de chaque article
- Affiche le nombre si plusieurs photos : "Images (3)"
- Toujours visible pour une navigation rapide

## Fonctionnalités de la galerie

- ✅ **Plein écran** : Vue immersive
- ✅ **Navigation** : Flèches ← → ou boutons
- ✅ **Thumbnails** : Miniatures en bas pour accès rapide
- ✅ **Compteur** : "2 / 5" pour savoir où on en est
- ✅ **Clavier** : Échap pour fermer, flèches pour naviguer
- ✅ **Clic extérieur** : Cliquer en dehors de la galerie pour fermer

## Comment ajouter des photos

### Structure des données

Dans chaque page d'activité (animation, sorties-scolaires, les-choucas, ateliers) et sport (resultats-sportifs), ajoutez le tableau `images` à vos articles :

```typescript
{
  id: 1,
  titre: "Musée Pompidou",
  date: "11 Décembre 2024",
  image: "/pompidou.jpg",           // Image principale (obligatoire)
  images: [                         // Photos supplémentaires (optionnel)
    "/photos/pompidou-eleves.jpg",
    "/photos/pompidou-lieu.jpg",
    "/photos/pompidou-organisation.jpg",
  ],
  texte: "...",
}
```

### Types de photos à ajouter

- **Photos des élèves** : Moments de la sortie/activité
- **Photos des lieux** : Le musée, la station de ski, etc.
- **Photos de l'organisation** : Préparation, encadrement
- **Photos de groupe** : Souvenirs collectifs

### Où placer les fichiers

1. Déposez vos images dans le dossier `public/`
2. Créez un sous-dossier si besoin : `public/photos/activites/`
3. Référencez avec le chemin : `"/photos/activites/mon-image.jpg"`

### Exemple complet

```typescript
// app/activites/sorties-scolaires/page.tsx

{
  id: 5,
  titre: "Musée Pompidou",
  date: "11 Décembre 2024",
  dateSort: parseDate("11 Décembre 2024"),
  image: "/pompidou.jpg",
  images: [
    "/photos/sorties/pompidou-1.jpg",
    "/photos/sorties/pompidou-2.jpg",
    "/photos/sorties/pompidou-3.jpg",
  ],
  texte: "Visite du Musée Pompidou...",
},
```

## Design

Pattern inspiré des grands sites (Le Monde, NY Times, Airbnb) :
- Image cliquable avec feedback visuel au survol
- Bouton "Images" toujours accessible
- Lightbox pleine page professionnelle
- Navigation intuitive
