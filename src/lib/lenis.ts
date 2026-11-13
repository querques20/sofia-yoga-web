import type Lenis from "lenis";

// how far below the top edge an anchor lands: the room the nav takes
export const ANCLA_ARRIBA = -88;

// guardamos la instancia para poder frenar el scroll cuando se abre el menú
let actual: Lenis | null = null;

export function guardarLenis(lenis: Lenis | null) {
  actual = lenis;
}

export function lenisActual() {
  return actual;
}
