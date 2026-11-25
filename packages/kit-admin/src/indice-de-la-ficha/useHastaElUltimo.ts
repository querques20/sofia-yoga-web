"use client";

import { useCallback, useEffect, useRef } from "react";
import { loQueScrollea, ultimaAlFondo } from "./bloques";

/** Cuánto tiene que quedarse quieto lo que scrollea después de tocar una entrada para contar que el salto terminó. */
const QUIETO_MS = 150;

/**
 * Que el índice llegue a sus últimas entradas: los últimos bloques suelen ser
 * cortos y nunca suben hasta la franja que marca el que está a la vista.
 *
 * - `marcar(id)` (tocar una entrada) la marca al instante y la deja fijada:
 *   `fijada` le dice a la franja que no la pise. Se suelta con cualquier
 *   scroll de la persona —la rueda, el teclado, el dedo o la barra
 *   arrastrada—, que se distingue del salto del ancla porque llega después de
 *   que ese salto se quedó quieto.
 * - Con lo que scrollea abajo de todo, se marca la última entrada cuyo bloque
 *   está a la vista (si scrollea: una ficha que entra entera marca la primera).
 */
export function useHastaElUltimo(clave: string, setEnVista: (id: string) => void) {
  const fijada = useRef(false);
  // Dónde quedó lo que scrollea cuando el salto del ancla terminó; `null` mientras salta.
  const base = useRef<number | null>(null);
  const reloj = useRef(0);
  const marcar = useCallback(
    (id: string) => {
      fijada.current = true;
      base.current = null;
      setEnVista(id);
      window.clearTimeout(reloj.current);
      reloj.current = window.setTimeout(() => {
        base.current = (loQueScrollea() ?? document.documentElement).scrollTop;
      }, QUIETO_MS);
    },
    [setEnVista],
  );

  useEffect(() => {
    const lista = clave.split(" ").filter(Boolean);
    const raiz = loQueScrollea();
    const caja = raiz ?? document.documentElement;
    // El reloj que arma este efecto: el mismo que `reloj` (así `marcar` lo corta), y a mano para limpiarlo acá.
    let espera = 0;
    const alScrollear = () => {
      if (fijada.current && base.current === null) {
        // Todavía salta hacia el ancla: se espera a que se quede quieto.
        window.clearTimeout(reloj.current);
        window.clearTimeout(espera);
        espera = window.setTimeout(() => {
          base.current = caja.scrollTop;
        }, QUIETO_MS);
        reloj.current = espera;
        return;
      }
      if (fijada.current && base.current !== null && Math.abs(caja.scrollTop - base.current) > 4) fijada.current = false;
      if (fijada.current) return;
      const ultima = ultimaAlFondo(lista, raiz);
      if (ultima) setEnVista(ultima);
    };
    const scrolleador = raiz ?? window;
    scrolleador.addEventListener("scroll", alScrollear, { passive: true });
    return () => {
      scrolleador.removeEventListener("scroll", alScrollear);
      window.clearTimeout(espera);
      window.clearTimeout(reloj.current);
    };
  }, [clave, setEnVista]);

  return { fijada, marcar };
}
