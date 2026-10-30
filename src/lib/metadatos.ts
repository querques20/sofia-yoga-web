import type { Metadata } from "next";
import { IDIOMA_BASE, IDIOMAS, type Idioma, rutaEn } from "./idiomas";

/**
 * El título, la descripción, el canonical y las versiones en los otros idiomas (hreflang) de una página. El
 * canonical apunta a la página en su propio idioma, nunca a la francesa; x-default es la francesa
 */
export function metadatos(idioma: Idioma, ruta: string, { title, description }: { title?: string; description: string }): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: rutaEn(idioma, ruta),
      languages: {
        ...Object.fromEntries(IDIOMAS.map((otro) => [otro, rutaEn(otro, ruta)])),
        "x-default": rutaEn(IDIOMA_BASE, ruta),
      },
    },
    openGraph: { locale: { fr: "fr_CH", en: "en_GB", es: "es_ES" }[idioma] },
  };
}
