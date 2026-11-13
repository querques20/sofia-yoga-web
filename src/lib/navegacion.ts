import type { Idioma } from "./idiomas";

// The three ways to take a class, under Classes in the sitemap. They are three of the Home's doors
// (components/hero/puertas.ts has where each one goes and its photo); their names live here, once, for the
// Home's doors and for the menus
export type ClaveDeClase = "groupe" | "prives" | "parc";
export const CLASES: readonly { clave: ClaveDeClase; texto: Record<Idioma, string> }[] = [
  { clave: "groupe", texto: { fr: "Cours en groupe", en: "Group classes", es: "Clases en grupo" } },
  { clave: "prives", texto: { fr: "Cours privés", en: "Private classes", es: "Clases privadas" } },
  { clave: "parc", texto: { fr: "Au parc", en: "In the park", es: "En el parque" } },
];

export function nombreDeClase(clave: ClaveDeClase, idioma: Idioma) {
  return CLASES.find((clase) => clase.clave === clave)?.texto[idioma] ?? "";
}

export type Pagina = { href: string; texto: Record<Idioma, string>; submenu?: typeof CLASES };

// las páginas de la etapa 1, con las URLs del sitemap v3 (la ruta francesa: cada idioma la traduce con rutaEn)
export const PAGINAS: Pagina[] = [
  { href: "/yoga-prenatal-geneve", texto: { fr: "Yoga prénatal", en: "Prenatal yoga", es: "Yoga prenatal" } },
  { href: "/yoga-post-partum-geneve", texto: { fr: "Post-partum", en: "Postnatal", es: "Posparto" } },
  { href: "/cours-de-yoga-geneve", texto: { fr: "Cours", en: "Classes", es: "Clases" }, submenu: CLASES },
  { href: "/ateliers-evenements", texto: { fr: "Ateliers", en: "Workshops", es: "Talleres" } },
  { href: "/a-propos", texto: { fr: "À propos", en: "About", es: "Sobre mí" } },
];

export const CONTACTO_PAGINA = { href: "/contact", texto: { fr: "Contact", en: "Contact", es: "Contacto" } as Record<Idioma, string> };

export function esActual(ruta: string, href: string) {
  return ruta === href || ruta.startsWith(`${href}/`);
}
