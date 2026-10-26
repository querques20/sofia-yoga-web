import type { MetadataRoute } from "next";
import { PAGINAS_INDEXABLES, urlDe } from "@/lib/sitio";

// solo las páginas que se indexan (sitemap v3, frente técnico). Sin fecha de cambio: no hay de dónde sacarla
// todavía, y una fecha inventada es peor que ninguna
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGINAS_INDEXABLES.map((ruta) => ({ url: urlDe(ruta) }));
}
