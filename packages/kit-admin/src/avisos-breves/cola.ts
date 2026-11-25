import type { ReactNode } from "react";

// La cola de los avisos breves, sin React: qué se ve, cuánto dura y qué se va
// cuando llega uno de más. La lee `AvisosBreves`; la prueba cola.test.ts.

export type TonoBreve = "exito" | "error" | "info";

/** Un aviso breve: lo que pasó con una acción, en una línea, y si hace falta, una segunda y algo para hacer («Reintentar»). */
export type Breve = {
  tono: TonoBreve;
  /** Lo que pasó, nombrado como la acción: «Borrador guardado», «Foto subida». En un error, qué falló. */
  texto: string;
  detalle?: ReactNode;
  accion?: { etiqueta: string; alHacer: () => void };
};

export type BreveEnCola = Breve & { id: number };

/** Cuántos se ven a la vez, apilados: el más nuevo arriba. */
export const A_LA_VISTA = 3;

/** Cuánto queda a la vista uno que salió bien. */
export const DURACION_MS = 5000;

/**
 * Cuánto dura: un error no se va solo, hasta que alguien lo cierra; uno con
 * una acción tampoco, porque puede ser el único camino («Abrir la vista
 * previa») y con el teclado no se llega en cinco segundos (WCAG 2.2.1).
 */
export const duracionDe = (breve: Pick<Breve, "tono" | "accion">): number | null => (breve.tono === "error" || breve.accion ? null : DURACION_MS);

/**
 * Suma uno arriba de todo. Si pasan de tres, se va el más viejo de los que se
 * van solos: un error o una acción que nadie cerró no se pierde porque
 * llegaron otros. Solo si ninguno se va solo, se va el más viejo.
 */
export function sumar(cola: readonly BreveEnCola[], nuevo: BreveEnCola): BreveEnCola[] {
  const lista = [nuevo, ...cola];
  if (lista.length <= A_LA_VISTA) return lista;
  const viejoQueSeVa = lista.findLastIndex((b) => duracionDe(b) !== null);
  const fuera = viejoQueSeVa > 0 ? viejoQueSeVa : lista.length - 1;
  return lista.filter((_, i) => i !== fuera);
}

export const quitar = (cola: readonly BreveEnCola[], id: number): BreveEnCola[] => cola.filter((b) => b.id !== id);
