"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Una acción que se repite con lo de ahora: devuelve una función que no
 * cambia y corre siempre la última versión de `accion`, la del render de
 * ahora. `accion` recibe `otraVez`, que la vuelve a correr, para dársela a un
 * «Reintentar»: así repite con lo que hay en pantalla al tocarlo, no con lo
 * que había cuando falló. La acción no se nombra a sí misma: el compilador de
 * React lo lee como usarla antes de declararla. No sabe de ED.
 */
export function useLaUltima<R>(accion: (otraVez: () => void) => R): () => R {
  const ultima = useRef(accion);
  useEffect(() => {
    ultima.current = accion;
  });
  return useCallback(() => {
    const correr = (): R => ultima.current(() => void correr());
    return correr();
  }, []);
}
