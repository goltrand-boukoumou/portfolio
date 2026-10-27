# Goltrand Boukoumou — Portfolio développeur

Portfolio responsive développé avec Vite + React. Pour lancer le projet en local :

```bash
npm install
npm run dev
```

La version de production est générée dans `dist/` via `npm run build`.
Les images du hero adaptées à chaque écran se trouvent dans `public/Documents/HeroPortfolio01.webp`, `public/Documents/HeroPortfolio02.webp` et `public/Documents/HeroPortfolio03.webp`.

## Référencement inclus

- Titres distincts, descriptions, URL canoniques et métadonnées Open Graph / Twitter pour les pages indexables.
- `public/robots.txt`, `public/sitemap.xml` et `public/llms.txt` servis directement par Vite.
- Données structurées Schema.org `Person`, reliées au profil GitHub et à l’URL publique.
- Descriptions alternatives pour l’image principale, navigation interne, parcours, FAQ et CTA de contact fixe sur mobile.
- Page 404 personnalisée et page de confidentialité adaptées à un site statique sans formulaire ni outil d’analyse d’audience.
- Les projets Atlas, Mono et Cobalt sont explicitement présentés comme des concepts visuels, pas comme des références client.

## Déploiement GitHub Pages

Un workflow GitHub Actions est présent dans `.github/workflows/deploy.yml` pour publier automatiquement le site sur GitHub Pages à partir du dossier `dist/`.

## Avant la mise en ligne

- Vérifiez que GitHub Pages publie bien ce dossier à `https://goltrand-boukoumou.github.io/portfolio/`. Les URL canoniques, le sitemap, `robots.txt`, les métadonnées sociales et les liens supposent cette adresse.
- Après publication, ouvrez `https://goltrand-boukoumou.github.io/portfolio/robots.txt`, `/portfolio/sitemap.xml`, `/portfolio/llms.txt` et `/portfolio/404.html` pour vérifier leur disponibilité.
- Testez l’aperçu social avec les outils de prévisualisation des plateformes : l’image Open Graph utilise l’image desktop du hero.
- Pour Google Search Console, ajoutez le site comme propriété préfixe d’URL et suivez la méthode de vérification proposée par Google. Soumettez ensuite `https://goltrand-boukoumou.github.io/portfolio/sitemap.xml`. Aucun jeton de vérification n’est inclus sans accès au compte propriétaire.
- Le parcours ne revendique pas de dates ou d’employeurs non confirmés ; complétez-le avec les expériences réelles lorsque vous souhaitez les partager.

## Éléments volontairement écartés

Pas de page de remerciement sans formulaire, d’avis clients non fournis, de fil d’Ariane pour une page unique, de carte sans adresse précise, de données de performance inventées, d’outil d’analyse sans besoin explicite, de schéma `LocalBusiness` pour une personne, ni de photo d’équipe. Les études de cas sont remplacées par des concepts clairement identifiés.

Les polices Google Fonts sont chargées depuis un service tiers ; la page de confidentialité le signale. Des polices système servent de remplacement.
