// dónde vive la web. El dominio todavía no está decidido (sitemap v3, §1: conviene un .ch), así que sale de
// NEXT_PUBLIC_SITIO_URL; si no está, de la URL de producción de Vercel (si la web se publica ahí); y si
// tampoco, del servidor local. Con esto se arman los canonicals, el sitemap.xml y los datos estructurados
const VERCEL = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITIO_URL = (process.env.NEXT_PUBLIC_SITIO_URL ?? (VERCEL ? `https://${VERCEL}` : "http://localhost:3010")).replace(/\/$/, "");

/** la dirección completa de una página del sitio */
export function urlDe(ruta: string) {
  return ruta === "/" ? SITIO_URL : `${SITIO_URL}${ruta}`;
}

// las páginas que se indexan (sitemap v3, §3). Las legales, Tarifs y el Journal se suman cuando existan
export const PAGINAS_INDEXABLES = [
  "/",
  "/yoga-prenatal-geneve",
  "/yoga-post-partum-geneve",
  "/cours-de-yoga-geneve",
  "/cours-prives-yoga-geneve",
  "/ateliers-evenements",
  "/a-propos",
  "/faq",
  "/contact",
] as const;
