import { site, contact, reseaux } from './site';

// Donnée structurée Organization, réutilisée sur toutes les pages.
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.nomComplet,
  alternateName: site.nom,
  url: site.url,
  description: site.description,
  email: contact.email,
  telephone: contact.tel,
  slogan: site.baseline,
  sameAs: reseaux.map((r) => r.url),
  areaServed: 'FR',
  knowsLanguage: 'fr-FR',
};

// FAQPage : passe un tableau de { question, reponse }.
export function faqSchema(items: { question: string; reponse: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.reponse },
    })),
  };
}

// Fil d'Ariane
export function breadcrumbSchema(items: { nom: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nom,
      item: new URL(it.url, site.url).href,
    })),
  };
}
