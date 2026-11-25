"use client";

import { useState, useSyncExternalStore } from "react";
import { ChevronAbajo } from "./iconos";

/** `xl` de Tailwind: desde acá el riel va al lado del formulario. */
const AL_LADO = "(min-width: 80rem)";

function suscribir(avisar: () => void) {
  const consulta = window.matchMedia(AL_LADO);
  consulta.addEventListener("change", avisar);
  return () => consulta.removeEventListener("change", avisar);
}

/**
 * El riel de una ficha (DESIGN.md §11, «Ficha de una entidad»): el estado,
 * el índice y el panel del módulo. Desde `xl`, al lado del formulario, fijo
 * debajo del encabezado y con scroll propio si es más alto que la pantalla
 * (las variables las mide `useRielFijo`). Por debajo, después del formulario
 * —el orden del DOM, el mismo que en la pantalla ancha— y plegado en un solo
 * `details` con su resumen: el encabezado ya dice el estado y la barra de abajo
 * lleva las acciones.
 *
 * Es un `details` y no un estado escondido para que «revisar errores» lo abra
 * como abre cualquier otro, si el campo con error vive acá. El servidor lo
 * dibuja abierto (sin JavaScript se ve todo); en el navegador, por debajo de
 * `xl` arranca cerrado, y en `xl` queda abierto y sin resumen.
 */
export function RielDeLaFicha({ resumen, children }: { resumen: React.ReactNode; children: React.ReactNode }) {
  const alLado = useSyncExternalStore(suscribir, () => window.matchMedia(AL_LADO).matches, () => true);
  const [abiertoAbajo, setAbiertoAbajo] = useState(false);
  return (
    <details
      open={alLado || abiertoAbajo}
      onToggle={(e) => {
        if (!alLado) setAbiertoAbajo(e.currentTarget.open);
      }}
      data-riel=""
      className="rounded-xl border border-azul-claro/60 xl:sticky xl:top-(--tope-del-riel) xl:max-h-(--alto-del-riel) xl:min-w-72 xl:max-w-80 xl:flex-1 xl:basis-72 xl:overflow-y-auto xl:rounded-none xl:border-0 xl:barra-discreta"
    >
      <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 rounded-xl px-4 py-2 text-admin-meta font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-medio xl:hidden [&::-webkit-details-marker]:hidden">
        <ChevronAbajo size={16} className="shrink-0 -rotate-90 text-azul-medio motion-safe:transition-transform [details[open]>summary>&]:rotate-0" />
        {resumen}
      </summary>
      {/* El `p-1` en `xl` deja lugar al foco de lo de adentro: el scroll del riel lo cortaría. */}
      <div className="space-y-6 border-t border-azul-claro/60 p-4 xl:border-0 xl:p-1">{children}</div>
    </details>
  );
}
