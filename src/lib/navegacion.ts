// las páginas de la etapa 1, con las URLs del sitemap v3 (en francés, sin acentos)
export const PAGINAS = [
  { href: "/yoga-prenatal-geneve", texto: "Yoga prénatal" },
  { href: "/yoga-post-partum-geneve", texto: "Post-partum" },
  { href: "/cours-de-yoga-geneve", texto: "Cours" },
  { href: "/ateliers-evenements", texto: "Ateliers" },
  { href: "/a-propos", texto: "À propos" },
] as const;

export const CONTACTO_PAGINA = { href: "/contact", texto: "Contact" } as const;

export function esActual(ruta: string, href: string) {
  return ruta === href || ruta.startsWith(`${href}/`);
}
