import type Lenis from "lenis";

// guardamos la instancia para poder frenar el scroll cuando se abre el menú
let actual: Lenis | null = null;

export function guardarLenis(lenis: Lenis | null) {
  actual = lenis;
}

export function lenisActual() {
  return actual;
}
