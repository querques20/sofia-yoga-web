// los idiomas de la web. El francés es la base y va sin prefijo (/yoga-prenatal-geneve); los otros llevan el
// suyo (/en/…, /es/…). Por dentro todas las páginas viven en app/[lang] con la URL francesa como nombre de
// carpeta, y next.config arma con esta tabla los rewrites y redirects que conectan las URLs públicas
export const IDIOMAS = ["fr", "en", "es"] as const;
export type Idioma = (typeof IDIOMAS)[number];
export const IDIOMA_BASE: Idioma = "fr";

// cada idioma con su nombre en su propio idioma (así lo reconoce quien lo habla) y la sigla del selector
export const NOMBRES: Record<Idioma, { nombre: string; sigla: string }> = {
  fr: { nombre: "Français", sigla: "FR" },
  en: { nombre: "English", sigla: "EN" },
  es: { nombre: "Español", sigla: "ES" },
};

// la cookie con el idioma que la persona eligió (con el selector o con el aviso). Con ella next.config la
// lleva a su idioma en las visitas siguientes; Google no manda cookies, así que siempre ve todas las versiones
export const COOKIE_IDIOMA = "idioma";

// la URL de cada página en cada idioma. La clave es la ruta francesa (la carpeta); si un idioma no tiene
// slug propio, usa el francés. PRUEBA: solo prenatal tiene slugs traducidos
export const SLUGS: Record<string, Partial<Record<Idioma, string>>> = {
  "/yoga-prenatal-geneve": { en: "/prenatal-yoga-geneva", es: "/yoga-prenatal-ginebra" },
};

export function esIdioma(valor: string | undefined): valor is Idioma {
  return IDIOMAS.includes(valor as Idioma);
}

/** la URL pública de una página (ruta francesa) en un idioma */
export function rutaEn(idioma: Idioma, ruta: string) {
  if (idioma === IDIOMA_BASE) return ruta;
  const propia = SLUGS[ruta]?.[idioma] ?? ruta;
  return propia === "/" ? `/${idioma}` : `/${idioma}${propia}`;
}

/**
 * El idioma y la página (su ruta francesa) de una URL. Sirve igual para la URL pública (/en/prenatal-yoga-geneva)
 * que para la interna (/en/yoga-prenatal-geneve): en el servidor usePathname() da la interna y en el navegador
 * la pública, y las dos tienen que dar lo mismo para que no haya diferencias al hidratar
 */
export function leerRuta(pathname: string): { idioma: Idioma; ruta: string } {
  const [, primero, ...resto] = pathname.split("/");
  if (!esIdioma(primero)) return { idioma: IDIOMA_BASE, ruta: pathname };
  const ruta = resto.length ? `/${resto.join("/")}` : "/";
  if (primero === IDIOMA_BASE) return { idioma: primero, ruta };
  const francesa = Object.keys(SLUGS).find((clave) => SLUGS[clave][primero] === ruta);
  return { idioma: primero, ruta: francesa ?? ruta };
}
