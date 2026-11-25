import { NextResponse, type NextRequest } from "next/server";
import { hayCookieDeSesion } from "@sofia/auth";
import { nuevoNonce, politicaDeContenido, ponerCabeceras } from "@/lib/seguridad/cabeceras";
import { esLlegadaDeOtroSitio, paginaDeRebote } from "@/lib/seguridad/rebote";

/**
 * La guarda de sesión del admin y sus cabeceras de seguridad
 * (lib/seguridad/cabeceras.ts).
 *
 * Va en el proxy (el que en Next 15 se llamaba `middleware.ts`) y no en
 * `headers()` de `next.config.ts` porque el admin necesita un nonce distinto
 * en cada respuesta y porque acá mismo se monta la guarda de sesión: una sola
 * pasada por request.
 *
 * **Solo corre en `/admin`** (el `matcher` de abajo). El sitio público es
 * estático y no pasa por acá: nada de esto le cambia una cabecera ni le suma
 * una invocación.
 */

const ADMIN = "/admin";
const ENTRAR = "/admin/entrar";

/** Las del admin que se ven SIN sesión: si no, no habría por dónde entrar. */
const ABIERTAS = [ENTRAR, "/admin/olvide-mi-contrasena", "/admin/nueva-contrasena"];

/**
 * Adónde mandar a quien no tiene sesión. El `volver` es **solo la ruta**: con
 * una URL completa esto sería un redirect abierto de manual.
 */
function aEntrar(req: NextRequest, ruta: string): URL {
  const destino = req.nextUrl.clone();
  destino.pathname = ENTRAR;
  destino.search = ruta === ADMIN ? "" : `?volver=${encodeURIComponent(ruta)}`;
  return destino;
}

/** Los headers del pedido con la CSP puesta: Next saca el nonce de ahí. */
function conLaPolitica(cabeceras: Headers, csp: string): Headers {
  const copia = new Headers(cabeceras);
  copia.set("Content-Security-Policy", csp);
  return copia;
}

export function proxy(req: NextRequest) {
  const ruta = req.nextUrl.pathname;

  // Del admin sin sesión no sale ni una página a medio renderizar: se corta
  // acá y se redirige. Es un filtro optimista —solo mira que la cookie
  // esté, sin ir a la base—; la comprobación de verdad la hace el layout.
  const cerrada = !ABIERTAS.some((a) => ruta === a || ruta.startsWith(`${a}/`));
  // Una Server Action sin cookie no se redirige: un redirect no es una
  // respuesta válida para una acción y el cliente se rompe con «unexpected
  // response». La acción verifica la sesión ella misma —toda acción del admin
  // lo hace, porque el layout no las cubre— y contesta en llano.
  const esAccion = req.headers.has("next-action");
  const sinSesion = cerrada && !esAccion && !hayCookieDeSesion(req);
  const csp = politicaDeContenido({ nonce: nuevoNonce(), desarrollo: process.env.NODE_ENV === "development" });
  // Sin cookie puede ser que no haya sesión, o que la cookie (`Strict`) no
  // haya viajado porque el link estaba en otro sitio: esa navegación se
  // rebota a la misma URL antes de mandarla a «entrar» (lib/seguridad/rebote.ts).
  const res = !sinSesion
    ? // Next saca el nonce de la CSP del *pedido* y se lo pone a sus scripts:
      // por eso la política viaja también hacia adentro, no solo en la respuesta.
      NextResponse.next({ request: { headers: conLaPolitica(req.headers, csp) } })
    : esLlegadaDeOtroSitio(req)
      ? paginaDeRebote(req.nextUrl)
      : NextResponse.redirect(aEntrar(req, ruta));

  ponerCabeceras(res.headers, csp);
  return res;
}

export const config = {
  // El admin y nada más: `/admin` y todo lo que cuelga de él.
  matcher: ["/admin", "/admin/:ruta*"],
};
