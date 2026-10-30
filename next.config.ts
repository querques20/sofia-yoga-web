import type { NextConfig } from "next";
import { IDIOMA_BASE, IDIOMAS, SLUGS } from "./src/lib/idiomas";

const OTROS = IDIOMAS.filter((idioma) => idioma !== IDIOMA_BASE);

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // sin el botoncito de Next abajo a la izquierda, así las pruebas se ven limpias
  devIndicators: false,
  partialPrefetching: true,
  // la 404 de las URLs que no son ninguna página (app/global-not-found.tsx): con el layout dentro de [lang], es
  // la forma que da Next de tener una sola 404 con los estilos de la web
  experimental: { globalNotFound: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // las URLs internas no se publican: /fr/… va a la versión sin prefijo, y /en/<slug francés> al slug traducido
  async redirects() {
    return [
      { source: `/${IDIOMA_BASE}`, destination: "/", permanent: true },
      { source: `/${IDIOMA_BASE}/:ruta*`, destination: "/:ruta*", permanent: true },
      ...Object.entries(SLUGS).flatMap(([ruta, slugs]) =>
        OTROS.filter((idioma) => slugs[idioma]).map((idioma) => ({
          source: `/${idioma}${ruta}`,
          destination: `/${idioma}${slugs[idioma]}`,
          permanent: true,
        })),
      ),
    ];
  },
  // las URLs públicas apuntan a las carpetas de app/[lang]. Van después de los archivos (favicon, sitemap,
  // robots) y antes de las rutas dinámicas, así /yoga-prenatal-geneve no se toma como un idioma
  async rewrites() {
    return [
      ...Object.entries(SLUGS).flatMap(([ruta, slugs]) =>
        OTROS.filter((idioma) => slugs[idioma]).map((idioma) => ({
          source: `/${idioma}${slugs[idioma]}`,
          destination: `/${idioma}${ruta}`,
        })),
      ),
      { source: "/", destination: `/${IDIOMA_BASE}` },
      { source: `/:ruta((?!(?:${IDIOMAS.join("|")})(?:/|$)).+)`, destination: `/${IDIOMA_BASE}/:ruta` },
    ];
  },
};

export default nextConfig;
