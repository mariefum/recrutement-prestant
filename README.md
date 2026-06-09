# Recrutement Prestant — site Astro

Site statique de recrutement d'agents commerciaux en immobilier de prestige pour
**Prestant Luxury Realty**. Conçu pour la performance (Lighthouse 95+), le SEO et la
conversion. Mobile-first, esthétique luxe sobre et minérale (beige / pierre / bronze,
encre bleu nuit), typographie Montserrat exclusivement.

## Stack

- **Astro 5** (sortie 100 % statique) + **Tailwind CSS 3**
- Montserrat self-hosté (`@fontsource`) — RGPD + perf
- Images optimisées WebP/AVIF responsive via `astro:assets` (sharp)
- Sitemap + robots.txt, données structurées Schema.org (Organization, JobPosting, VideoObject, FAQPage, BreadcrumbList)
- Vidéos témoignages en façade légère type `lite-youtube` (chargées au clic)
- Formulaires traités par des **fonctions serverless Vercel** (`/api`)

## Démarrer

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # génère /dist (statique) + images OG
npm run preview    # prévisualise le build
```

> Node 18+ requis.

## Où éditer le contenu

| Quoi | Fichier |
|---|---|
| Coordonnées, nav, chiffres clés, régions, réseaux | `src/data/site.ts` |
| Offres d'emploi (1 fichier = 1 offre) | `src/content/offres/*.md` |
| Témoignages vidéo (1 fichier = 1 vidéo) | `src/content/temoignages/*.md` |
| Articles actualités / blog (1 fichier = 1 article) | `src/content/actualites/*.md` |
| Grille de rémunération, exemples, FAQ | `src/pages/remuneration.astro` |
| Outils & parcours de formation | `src/pages/outils-formation.astro` |
| Le métier & lifestyle | `src/pages/metier-lifestyle.astro` |
| Photos | `src/assets/photos/` |
| Logos | `src/assets/brand/` |

### Ajouter une offre
Créer `src/content/offres/mon-offre.md` (voir les exemples). L'URL devient
`/offres-emploi/mon-offre`, la carte et le JSON-LD JobPosting sont générés
automatiquement. Mettre `actif: false` pour masquer une offre.

### Ajouter un article au blog
Créer `src/content/actualites/mon-article.md` (voir les exemples). L'URL devient
`/actualites/mon-article`, la carte, le maillage interne et le JSON-LD BlogPosting sont
générés automatiquement. Mettre `draft: true` pour le masquer. **Important :** un blog
n'apporte au SEO que s'il est alimenté régulièrement — viser au moins 1 article/mois.

### Brancher une vidéo témoignage
Uploader la vidéo sur **YouTube (non répertorié)**, puis renseigner `youtubeId`
(l'identifiant après `watch?v=`) dans le `.md` du témoignage. La vignette, le lecteur
et le schéma VideoObject se branchent automatiquement.

## Candidatures

Deux chemins complémentaires :

1. **Candidature à une offre → ATS Beetween.** Chaque offre porte un champ `applyUrl`
   (page de candidature Beetween). Les boutons « Postuler » y renvoient : CV, upload et
   création de fiche candidat sont gérés nativement par Beetween. Aucun backend requis.
2. **Candidature spontanée / contact → email.** Les formulaires (candidature spontanée
   sur `/offres-emploi` et `/contact`, formulaire court sur les CTA) postent vers
   `/api/candidature` et `/api/contact` (fonctions Vercel) qui envoient un email formaté
   (CV en pièce jointe) via **Resend** vers `CONTACT_EMAIL` (+ `BETWEEN_INTAKE_EMAIL` si défini).

Variables d'environnement à définir dans Vercel (voir `.env.example`) :

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY` | Clé API Resend |
| `RESEND_FROM` | Expéditeur vérifié, ex. `Recrutement Prestant <recrutement@prestant.com>` |
| `CONTACT_EMAIL` | Destinataire des candidatures spontanées / contacts (`sandy.miranda@prestant.com`) |
| `BETWEEN_INTAKE_EMAIL` | *(optionnel)* adresse d'intake Beetween pour aussi y router les candidatures spontanées |

Tant que ces variables ne sont pas définies, **seuls** les formulaires spontané/contact
renvoient un message d'erreur propre (les candidatures aux offres via Beetween fonctionnent
indépendamment).

## Déploiement Vercel

1. Pousser le repo sur GitHub et l'importer dans Vercel (framework détecté : Astro).
2. Définir les variables d'environnement ci-dessus.
3. Brancher le domaine `recrutementprestant.com`.

`vercel.json` configure les URLs propres et le runtime Node des fonctions `/api`.

## À finaliser

- [x] **6 offres réelles** branchées sur les pages de candidature Beetween.
- [x] **14 vidéos témoignages** (Shorts) intégrées et regroupées par thème.
- [ ] **Clés Resend + `CONTACT_EMAIL`** (variables d'env Vercel) pour les formulaires spontané/contact.
- [ ] **Vérifier le mapping des vidéos** : agent / secteur / thème / titre sont éditables dans
      `src/content/temoignages/*.md`. Les titres des Shorts d'Adrien et d'Armand étaient des
      identifiants techniques → titres rédigés par défaut, à ajuster si besoin.
- [ ] **Numéro d'appel** : seul le WhatsApp a été fourni ; `contact.tel` pointe dessus par
      défaut — à ajuster dans `src/data/site.ts` si le numéro d'appel diffère.
- [ ] **Grille de rémunération** et **détail outils/formation** : textes actuels = placeholders
      crédibles, à valider/remplacer.
- [ ] **Descriptions d'offres** : résumés génériques crédibles ; le détail complet vit sur Beetween.
- [ ] **Images OG** : `public/og/*.jpg` générées depuis une photo de bien
      (`scripts/generate-og.mjs`). Remplacer par des visuels brandés (texte + logo) si souhaité.
```
