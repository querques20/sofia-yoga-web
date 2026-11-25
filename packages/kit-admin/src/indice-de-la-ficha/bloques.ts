// Los bloques de una ficha, para su índice: encontrarlos, saber si se ven y
// abrir lo que los tapa. No sabe de ED.

/** Lo que scrollea la ficha: el `main` en escritorio (la tarjeta scrollea por dentro); en el celular, la ventana (`null`). */
export function loQueScrollea(): HTMLElement | null {
  const main = document.querySelector("main");
  return main && getComputedStyle(main).overflowY === "auto" ? main : null;
}

/** El bloque de un ancla: la sección de su título, o el `details` que es él mismo (una sección del editor). */
export function bloqueDe(id: string): HTMLElement | null {
  const ancla = document.getElementById(id);
  return ancla?.closest<HTMLElement>("section, details") ?? ancla;
}

/** ¿Se ve algo del bloque de `id` en lo que scrollea? */
export function aLaVista(id: string, raiz: Element | null): boolean {
  const r = bloqueDe(id)?.getBoundingClientRect();
  if (!r) return false;
  const arriba = raiz ? raiz.getBoundingClientRect().top : 0;
  const abajo = raiz ? raiz.getBoundingClientRect().bottom : window.innerHeight;
  return r.bottom > arriba && r.top < abajo;
}

/**
 * Con lo que scrollea abajo de todo, la última entrada cuyo bloque se ve: un
 * bloque corto al final nunca sube hasta la franja. Si no está abajo, o si no
 * scrollea (la ficha entra entera: manda la franja, que marca la primera),
 * `null`.
 */
export function ultimaAlFondo(lista: readonly string[], raiz: HTMLElement | null): string | null {
  const caja = raiz ?? document.documentElement;
  const alto = raiz ? raiz.clientHeight : window.innerHeight;
  if (caja.scrollHeight <= alto + 2) return null;
  if (caja.scrollTop + alto < caja.scrollHeight - 2) return null;
  return lista.findLast((id) => aLaVista(id, raiz)) ?? null;
}

/** Abre el `details` del ancla y los que la tapan, antes de ir: cerrado, no se vería. */
export function abrirHasta(id: string) {
  const ancla = document.getElementById(id);
  for (let d = ancla?.closest("details"); d; d = d.parentElement?.closest("details") ?? null) d.open = true;
}
