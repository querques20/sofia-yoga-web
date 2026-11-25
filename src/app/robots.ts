import type { MetadataRoute } from "next";
import { urlDe } from "@/lib/sitio";

// todo el sitio se puede indexar por ahora; el admin y la API, no (el admin además contesta `noindex` en cada
// respuesta, que es la negativa de verdad). Cuando llegue la etapa 2, acá se bloquean /espace/ y el flujo de compra
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: urlDe("/sitemap.xml"),
  };
}
