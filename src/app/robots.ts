import type { MetadataRoute } from "next";
import { urlDe } from "@/lib/sitio";

// todo se puede indexar por ahora. Cuando llegue la etapa 2, acá se bloquean /espace/ y el flujo de compra
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: urlDe("/sitemap.xml"),
  };
}
