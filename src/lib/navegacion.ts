import type { Idioma } from "./idiomas";

// las páginas de la etapa 1, con las URLs del sitemap v3 (la ruta francesa: cada idioma la traduce con rutaEn)
export const PAGINAS: { href: string; texto: Record<Idioma, string> }[] = [
  { href: "/yoga-prenatal-geneve", texto: { fr: "Yoga prénatal", en: "Prenatal yoga", es: "Yoga prenatal" } },
  { href: "/yoga-post-partum-geneve", texto: { fr: "Post-partum", en: "Postnatal", es: "Posparto" } },
  { href: "/cours-de-yoga-geneve", texto: { fr: "Cours", en: "Classes", es: "Clases" } },
  { href: "/ateliers-evenements", texto: { fr: "Ateliers", en: "Workshops", es: "Talleres" } },
  { href: "/a-propos", texto: { fr: "À propos", en: "About", es: "Sobre mí" } },
];

export const CONTACTO_PAGINA = { href: "/contact", texto: { fr: "Contact", en: "Contact", es: "Contacto" } as Record<Idioma, string> };

export function esActual(ruta: string, href: string) {
  return ruta === href || ruta.startsWith(`${href}/`);
}
