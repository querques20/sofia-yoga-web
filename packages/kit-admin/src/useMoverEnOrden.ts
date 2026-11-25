"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useAvisoBreve } from "./avisos-breves/contexto";

export type Hacia = "antes" | "despues";

/** Lo que contesta la acción que mueve: el `ok` y, si no salió, qué decir. */
type Resultado = { ok: true } | { ok: false; detalle: string };

/**
 * Mover una fila en una lista que se ordena (DESIGN.md §11, «Lista que se
 * ordena»): un paso por clic, aplicado en el momento. Mientras se mueve, los
 * botones quedan deshabilitados y pierden el foco; la fila recién está en su
 * lugar nuevo cuando termina el refresco, y ahí el foco vuelve al mismo botón,
 * o al otro si quedó en una punta. Los botones se llaman
 * `${prefijo}-${id}-subir` y `-bajar` (`BotonesDeOrden`).
 */
export function useMoverEnOrden(prefijo: string) {
  const router = useRouter();
  const [pendiente, empezar] = useTransition();
  const avisar = useAvisoBreve();
  const [anuncio, setAnuncio] = useState("");
  const enfocarAlTerminar = useRef<{ id: string; hacia: Hacia } | null>(null);

  useEffect(() => {
    const destino = enfocarAlTerminar.current;
    if (pendiente || !destino) return;
    enfocarAlTerminar.current = null;
    const [igual, contrario] = destino.hacia === "antes" ? ["subir", "bajar"] : ["bajar", "subir"];
    (document.getElementById(`${prefijo}-${destino.id}-${igual}`) ?? document.getElementById(`${prefijo}-${destino.id}-${contrario}`))?.focus();
  }, [pendiente, prefijo]);

  /** Corre la acción; si sale, anuncia `hecho` y refresca la lista. */
  const mover = (id: string, hacia: Hacia, accion: () => Promise<Resultado>, hecho: string) =>
    empezar(async () => {
      enfocarAlTerminar.current = { id, hacia };
      try {
        const r = await accion();
        // Un error es un aviso breve; lo que salió se ve en la lista y lo oye el lector.
        if (!r.ok) {
          avisar({ tono: "error", texto: r.detalle });
          return;
        }
        setAnuncio(hecho);
        router.refresh();
      } catch {
        avisar({ tono: "error", texto: "No hubo respuesta del servidor. Fijate la conexión y probá de nuevo." });
      }
    });

  return { pendiente, anuncio, mover };
}
