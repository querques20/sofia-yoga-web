/**
 * La URL del sitio, sin barra final, para armar los links de los correos y
 * decirle a la sesión cuál es su origen: `NEXT_PUBLIC_SITIO_URL` (la misma que
 * lee `lib/sitio.ts`), o la que da Vercel (la de producción en producción, la
 * del deploy en un preview), o `localhost:3010`.
 */
export function urlDelSitio(entorno: Record<string, string | undefined> = process.env): string {
  const cruda =
    entorno.NEXT_PUBLIC_SITIO_URL ??
    (entorno.VERCEL_ENV === "production" && entorno.VERCEL_PROJECT_PRODUCTION_URL ? `https://${entorno.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ??
    (entorno.VERCEL_URL ? `https://${entorno.VERCEL_URL}` : undefined) ??
    "http://localhost:3010";
  // Los links se arman pegando rutas: con barra final quedarían con doble barra.
  return cruda.replace(/\/+$/, "");
}
