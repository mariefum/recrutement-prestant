// Génère des images Open Graph 1200x630 (placeholder) + apple-touch-icon.
// À remplacer plus tard par des visuels OG brandés (texte + logo) par page.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ogDir = join(root, 'public', 'og');
mkdirSync(ogDir, { recursive: true });

const source = join(root, 'src', 'assets', 'photos', 'villa-anglet-2.jpg');

const names = [
  'og-default', 'og-accueil', 'og-offres', 'og-remuneration',
  'og-outils', 'og-metier', 'og-temoignages', 'og-contact',
];

// Voile bleu nuit léger pour l'identité de marque.
const overlay = Buffer.from(
  `<svg width="1200" height="630"><rect width="1200" height="630" fill="#14323C" fill-opacity="0.28"/></svg>`,
);

for (const name of names) {
  await sharp(source)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 82 })
    .toFile(join(ogDir, `${name}.jpg`));
}

// Apple touch icon 180x180 (carré encre avec initiale)
const icon = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
     <rect width="180" height="180" rx="28" fill="#14323C"/>
     <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle"
       font-family="Montserrat, Arial, sans-serif" font-size="96" font-weight="300"
       letter-spacing="2" fill="#FCFAF6">P</text>
   </svg>`,
);
await sharp(icon).png().toFile(join(root, 'public', 'apple-touch-icon.png'));

console.log(`OG images (${names.length}) + apple-touch-icon générés.`);
