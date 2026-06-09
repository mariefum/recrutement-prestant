import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// URL de production (domaine final). Sert au sitemap, aux canonicals et aux balises OG.
const SITE = 'https://recrutementprestant.com';

export default defineConfig({
  site: SITE,
  // Sortie 100% statique : zéro runtime serveur, score Lighthouse maximal.
  // Les formulaires sont traités par des fonctions Vercel autonomes dans /api.
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  image: {
    // Formats modernes générés à la compilation (WebP/AVIF) via sharp.
    domains: [],
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
