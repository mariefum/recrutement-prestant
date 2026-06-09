import { defineCollection, z } from 'astro:content';

// --- Offres d'emploi → alimente la page /offres-emploi + JobPosting Schema.org ---
const offres = defineCollection({
  type: 'content',
  schema: z.object({
    titre: z.string(),
    region: z.string(),
    ville: z.string().optional(),
    secteur: z.string().default('Immobilier de prestige'),
    typeContrat: z.string().default('Agent commercial indépendant'),
    statut: z.string().default('Indépendant / Mandataire'),
    resume: z.string(),
    /** URL de la page de candidature Beetween (ATS) */
    applyUrl: z.string().url().optional(),
    datePublication: z.coerce.date(),
    dateValidite: z.coerce.date().optional(),
    remunerationMin: z.number().optional(),
    remunerationMax: z.number().optional(),
    remunerationTexte: z.string().optional(),
    missions: z.array(z.string()).default([]),
    profil: z.array(z.string()).default([]),
    avantages: z.array(z.string()).default([]),
    actif: z.boolean().default(true),
    ordre: z.number().default(0),
  }),
});

// --- Témoignages vidéo → grille + VideoObject Schema.org ---
const temoignages = defineCollection({
  type: 'content',
  schema: z.object({
    prenom: z.string(),
    nom: z.string().optional(),
    role: z.string().default('Agent commercial Prestant'),
    secteur: z.string(),
    titre: z.string(), // titre de la vidéo
    /** Thème de regroupement : parcours | formation | statut | liberte */
    theme: z.enum(['parcours', 'formation', 'statut', 'liberte']).default('parcours'),
    // ID YouTube (Short non répertorié). Laisser vide tant que non fourni.
    youtubeId: z.string().optional(),
    duree: z.string().optional(), // format ISO 8601, ex "PT2M30S"
    description: z.string(),
    datePublication: z.coerce.date().optional(),
    ordre: z.number().default(0),
  }),
});

// --- Actualités / blog → contenu éditorial SEO + Article Schema.org ---
// L'image est un chemin public (ex: /uploads/mon-image.jpg) pour être gérée
// par le CMS (upload dans public/uploads).
const actualites = defineCollection({
  type: 'content',
  schema: z.object({
    titre: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    dateMaj: z.coerce.date().optional(),
    auteur: z.string().default('L’équipe Prestant'),
    categorie: z.enum(['Conseils', 'Le métier', 'Rémunération', 'Actualité']).default('Conseils'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { offres, temoignages, actualites };
