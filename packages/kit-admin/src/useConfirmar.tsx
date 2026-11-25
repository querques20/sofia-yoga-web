"use client";

import { useCallback, useRef, useState } from "react";
import { DialogoDeConfirmacion, type Pregunta } from "./DialogoDeConfirmacion";

/**
 * Preguntar antes de algo que no se deshace, con el diálogo del kit
 * (`DialogoDeConfirmacion`) en vez del `confirm` del navegador. `confirmar`
 * abre la pregunta y devuelve una promesa: `true` si tocó el botón que lo
 * hace; `false` si tocó el otro, apretó Escape o cerró. Quien lo usa dibuja
 * `dialogo` en cualquier lugar de su pantalla: abierto, va encima de todo.
 * Una pregunta nueva contesta «no» a la que estaba abierta.
 */
export function useConfirmar() {
  const [pregunta, setPregunta] = useState<Pregunta | null>(null);
  const resolver = useRef<((si: boolean) => void) | null>(null);
  const confirmar = useCallback(
    (nueva: Pregunta) =>
      new Promise<boolean>((resolve) => {
        resolver.current?.(false);
        resolver.current = resolve;
        setPregunta(nueva);
      }),
    [],
  );
  const responder = useCallback((si: boolean) => {
    resolver.current?.(si);
    resolver.current = null;
    setPregunta(null);
  }, []);
  return { confirmar, dialogo: <DialogoDeConfirmacion pregunta={pregunta} alResponder={responder} /> };
}
