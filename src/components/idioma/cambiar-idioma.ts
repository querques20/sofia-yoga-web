import type { useRouter } from "next/navigation";
import { cerrarYSeguir } from "@/lib/entrada";
import type { Idioma } from "@/lib/idiomas";
import { guardarIdioma } from "@/lib/preferencia-idioma";

/** con Ctrl/Cmd, Mayús o la rueda, el link se abre en otra pestaña como cualquiera: no se intercepta */
export function abreAparte(evento: React.MouseEvent) {
  return evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey || evento.button !== 0;
}

/**
 * El cambio de idioma desde cualquier lado (selector, sugerencia): guarda la elección, la página se cierra por la
 * flor y recién ahí se navega. Mientras se cierra, la página nueva ya se va pidiendo (con la cookie nueva, por eso
 * después de guardar)
 */
export function cambiarIdioma(router: ReturnType<typeof useRouter>, destino: Idioma, href: string) {
  guardarIdioma(destino);
  router.prefetch(href);
  cerrarYSeguir(() => router.push(href));
}
