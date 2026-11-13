"use client";

import { useLayoutEffect } from "react";
import { INTRO_KEY, INTRO_TTL_MS, introSeen } from "@/lib/intro-seen";

// Marks that there is JS, so what enters animated does not show and then hide. And if the intro still counts as
// seen (this visit, this language, within its time to live: lib/intro-seen), marks that too, so the curtain is
// never painted
function marcar(seen: typeof introSeen, key: string, ttl: number) {
  document.documentElement.classList.add("js");
  try {
    if (seen(sessionStorage.getItem(key), document.documentElement.lang, Date.now(), ttl)) document.documentElement.classList.add("entrada-vista");
  } catch {
    // sin almacenamiento la entrada se ve en cada carga, nada más
  }
}

function marcarJs() {
  document.documentElement.classList.add("js");
}

// the script has no imports: the check and its values go in as arguments, the check as its own source
const MARCAR = `(${marcar.toString()})(${introSeen.toString()},${JSON.stringify(INTRO_KEY)},${INTRO_TTL_MS})`;

/**
 * Las marcas de <html> que dependen del navegador. En la carga inicial las pone el script antes de pintar. Al
 * cambiar de idioma cambia el layout raíz: <html> pierde las clases y el script no se repite, así que el efecto
 * vuelve a poner «js» antes de pintar. «entrada-vista» no: en el idioma nuevo la entrada se vuelve a ver.
 *
 * El script corre mientras el navegador lee el HTML. Cuando React vuelve a dibujar el layout en el navegador sale
 * como text/plain, así no se ejecuta de nuevo ni React avisa por el <script>. Es el patrón de la guía de Next
 * (preventing-flash-before-hydration)
 */
export function MarcasDelDocumento() {
  useLayoutEffect(marcarJs, []);
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: MARCAR }}
    />
  );
}
