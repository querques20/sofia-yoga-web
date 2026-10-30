import type { MetadataRoute } from "next";
import { IDIOMA_BASE, IDIOMAS, rutaEn } from "@/lib/idiomas";
import { PAGINAS_INDEXABLES, urlDe } from "@/lib/sitio";

// solo las páginas que se indexan (sitemap v3, frente técnico). Sin fecha de cambio: no hay de dónde sacarla
// todavía, y una fecha inventada es peor que ninguna. Cada página sale una vez por idioma, y cada una lista
// todas sus versiones, la propia incluida (hreflang), con el francés como x-default
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGINAS_INDEXABLES.flatMap((ruta) => {
    const languages = {
      ...Object.fromEntries(IDIOMAS.map((idioma) => [idioma, urlDe(rutaEn(idioma, ruta))])),
      "x-default": urlDe(rutaEn(IDIOMA_BASE, ruta)),
    };
    return IDIOMAS.map((idioma) => ({ url: urlDe(rutaEn(idioma, ruta)), alternates: { languages } }));
  });
}
