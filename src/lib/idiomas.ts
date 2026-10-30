// los idiomas de la web. El francés es la base y va sin prefijo (/yoga-prenatal-geneve); los otros llevan el
// suyo (/en/…, /es/…). Por dentro todas las páginas viven en app/[lang] con la URL francesa como nombre de
// carpeta, y next.config arma con esta tabla los rewrites y redirects que conectan las URLs públicas
export const IDIOMAS = ["fr", "en", "es"] as const;
export type Idioma = (typeof IDIOMAS)[number];
export const IDIOMA_BASE: Idioma = "fr";

// la URL de cada página en cada idioma. La clave es la ruta francesa (la carpeta); si un idioma no tiene
// slug propio, usa el francés. PRUEBA: solo prenatal tiene slugs traducidos
export const SLUGS: Record<string, Partial<Record<Idioma, string>>> = {
  "/yoga-prenatal-geneve": { en: "/prenatal-yoga-geneva", es: "/yoga-prenatal-ginebra" },
};

/** la URL pública de una página (ruta francesa) en un idioma */
export function rutaEn(idioma: Idioma, ruta: string) {
  if (idioma === IDIOMA_BASE) return ruta;
  const propia = SLUGS[ruta]?.[idioma] ?? ruta;
  return propia === "/" ? `/${idioma}` : `/${idioma}${propia}`;
}
