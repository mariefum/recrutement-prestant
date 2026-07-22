// =============================================================
//  CONFIGURATION CENTRALE DU SITE
//  Édite ce fichier pour remplacer les placeholders par les
//  contenus réels. Tout le site lit ces valeurs.
// =============================================================

export const site = {
  nom: 'Prestant',
  nomComplet: 'Prestant Luxury Realty',
  baseline: "L'immobilier de prestige, autrement.",
  url: 'https://recrutementprestant.com',
  description:
    "Rejoignez Prestant, réseau d'agents commerciaux en immobilier de prestige en France. Statut indépendant, accompagnement, outils premium et rémunération attractive.",
  langue: 'fr',
  locale: 'fr_FR',
};

// --- Coordonnées de contact (fournies) ---
export const contact = {
  email: 'sandy.miranda@prestant.com',
  // WhatsApp : ligne directe de Sandy (recrutement).
  whatsapp: '+33632914464',
  whatsappAffiche: '+33 6 32 91 44 64',
  // Téléphone affiché et appelé sur le site : ligne de l'agence.
  tel: '+33582806080',
  telAffiche: '05 82 80 60 80',
  prenomContact: 'Sandy Miranda',
  messageWhatsappPredefini:
    "Bonjour, je souhaite des informations pour rejoindre Prestant en tant qu'agent commercial.",
};

// Liens utilitaires dérivés
export const liens = {
  mailto: `mailto:${contact.email}`,
  tel: `tel:${contact.tel}`,
  whatsapp: `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    contact.messageWhatsappPredefini,
  )}`,
};

// --- Réseaux sociaux (depuis le site existant) ---
export const reseaux = [
  { nom: 'LinkedIn', url: 'https://www.linkedin.com/company/prestant-luxury-realty/' },
  { nom: 'Instagram', url: 'https://www.instagram.com/prestant.realty/' },
  { nom: 'Facebook', url: 'https://www.facebook.com/prestantrealty/' },
  { nom: 'YouTube', url: 'https://www.youtube.com/@prestantrealty' },
];

// --- Navigation principale (ordre = parcours de conversion) ---
export const navigation = [
  { label: 'Métier', href: '/metier-lifestyle' },
  { label: 'Rémunération', href: '/remuneration' },
  { label: 'Accompagnement', href: '/outils-formation' },
  { label: 'Offres', href: '/offres-emploi' },
  { label: 'Témoignages', href: '/temoignages' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Contact', href: '/contact' },
];

// --- Chiffres clés (validés avec le client) ---
export const chiffres = [
  { valeur: '25', suffixe: 'ans', label: "d'expertise dans l'immobilier de prestige" },
  { valeur: '10', suffixe: 'ans', label: "d'existence de la marque Prestant" },
  { valeur: '30', suffixe: '', label: 'talents qui composent le réseau' },
  { valeur: '5', suffixe: 'régions', label: 'parmi les plus belles de France' },
];

// --- Secteurs où Prestant recrute (alignés sur les annonces Beetween) ---
export const regions = [
  'Paris & Île-de-France',
  "Bassin d'Arcachon",
  'Bordeaux & Gironde',
  "Côte d'Azur & Provence",
  'Landes & Côte sud',
  'La Rochelle & littoral',
];

// --- Performances commerciales (preuve de dynamisme) ---
// Source : bilan « Premier semestre 2026 en quelques chiffres ».
export const performances = {
  periode: 'Premier semestre 2026',
  // Chiffre phare mis en avant
  phare: { valeur: '25,9 M€', label: 'de transactions réalisées sur le semestre' },
  chiffres: [
    { valeur: '180', label: 'mandats signés', precision: 'soit environ 1 mandat par jour' },
    { valeur: '43', label: 'mandats exclusifs' },
    { valeur: '19', label: 'compromis signés' },
    { valeur: '22', label: 'actes authentiques' },
  ],
};
