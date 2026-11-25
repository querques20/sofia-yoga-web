/**
 * Las cabeceras de seguridad del admin. Las pone el proxy en cada respuesta
 * (`proxy.ts`), que solo corre en `/admin`: el sitio público es estático y no
 * lleva ninguna de estas.
 */

/** Un nonce por respuesta: 16 bytes al azar, en base64. */
export function nuevoNonce(): string {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString("base64");
}

/**
 * La política de contenido del admin, con nonce y `'strict-dynamic'`: solo
 * corre el script que lleva el nonce de esta respuesta (Next se lo pone a los
 * suyos) y lo que ese script cargue. Un script inyectado no tiene cómo
 * adivinarlo. Pide renderizar en cada pedido, y el admin ya lo hace
 * (`app/(admin)/layout.tsx`).
 *
 * `'unsafe-eval'` solo en `next dev`: React lo usa para rearmar las pilas de
 * los errores; en producción nunca. No entra ninguna imagen de otro origen.
 */
export function politicaDeContenido({ nonce, desarrollo }: { nonce: string; desarrollo: boolean }): string {
  const eval_ = desarrollo ? " 'unsafe-eval'" : "";
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${eval_}`,
    // Los estilos siguen abiertos: Next y los componentes ponen `style` en
    // línea, y un estilo inyectado no ejecuta nada.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    // Nadie nos mete en un iframe: es lo que frena un clickjacking sobre los
    // botones del admin.
    "frame-ancestors 'none'",
  ].join("; ");
}

export function ponerCabeceras(cabeceras: Headers, csp: string): void {
  cabeceras.set("Content-Security-Policy", csp);
  // Dos años y subdominios: el valor que pide la lista de precarga de HSTS.
  cabeceras.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  cabeceras.set("X-Content-Type-Options", "nosniff");
  // Se manda el origen a otros sitios, nunca la ruta: una URL del admin no
  // tiene por qué viajar en el Referer.
  cabeceras.set("Referrer-Policy", "strict-origin-when-cross-origin");
  cabeceras.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()");
  // `robots.txt` es un pedido, no una regla: esto es la negativa de verdad, y
  // viaja en la respuesta aunque alguien llegue por un link directo.
  cabeceras.set("X-Robots-Tag", "noindex, nofollow");
  // Nada del admin se guarda en ningún cache, ni intermedio ni del navegador:
  // cada respuesta es de una sesión (`private`). Pisa la de la ruta, así que
  // esta es la que viaja.
  cabeceras.set("Cache-Control", "private, no-store, max-age=0");
  // Una ventana que el admin abre, o que abre al admin, no se pueden tocar
  // (`window.opener`), y nada del admin se carga desde otro sitio.
  cabeceras.set("Cross-Origin-Opener-Policy", "same-origin");
  cabeceras.set("Cross-Origin-Resource-Policy", "same-origin");
  // Lo mismo que `frame-ancestors 'none'`, para los navegadores que no leen CSP.
  cabeceras.set("X-Frame-Options", "DENY");
}
