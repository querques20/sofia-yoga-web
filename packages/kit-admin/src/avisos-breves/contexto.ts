"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import type { Breve } from "./cola";

/** Lo que reparte `AvisosBreves`: mostrar uno (da su id) y cerrarlo. */
export const Avisar = createContext<{ avisar: (breve: Breve) => number; cerrar: (id: number) => void } | null>(null);

/**
 * Mostrar un aviso breve desde cualquier pantalla de adentro de
 * `AvisosBreves`. Un aviso con una acción («Reintentar», «Copiar») es de
 * quien lo mostró: se cierra cuando ese componente se va, así nadie corre la
 * acción de una pantalla que ya no está. Los demás siguen a la próxima.
 */
export function useAvisoBreve(): (breve: Breve) => number {
  const contexto = useContext(Avisar);
  if (!contexto) throw new Error("useAvisoBreve va adentro de <AvisosBreves>.");
  const { avisar, cerrar } = contexto;
  const conAccion = useRef<Set<number> | null>(null);
  useEffect(() => {
    const ids = new Set<number>();
    conAccion.current = ids;
    return () => ids.forEach((id) => cerrar(id));
  }, [cerrar]);
  return useCallback(
    (breve: Breve) => {
      const id = avisar(breve);
      if (breve.accion) conAccion.current?.add(id);
      return id;
    },
    [avisar],
  );
}
