"use client";

import { isValidElement, useCallback, useState } from "react";
import type { AvisoDelEditor } from "./AvisoDelEditor";
import { VistaPreviaFrenada } from "./VistaPreviaFrenada";
import { partir } from "./avisos-breves/breve";
import type { Breve } from "./avisos-breves/cola";
import { useAvisoBreve } from "./avisos-breves/contexto";

/** El aviso de una acción del editor, como aviso breve: lo que salió bien, nombrado; un error, con «Reintentar» si se puede. */
function breveDelEditor(aviso: AvisoDelEditor): Breve {
  const accion = aviso.reintentar ? { etiqueta: "Reintentar", alHacer: aviso.reintentar } : undefined;
  // La vista previa que el navegador frenó: en vez del link en el texto, el botón que la abre.
  if (isValidElement<{ url: string }>(aviso.detalle) && aviso.detalle.type === VistaPreviaFrenada) {
    const { url } = aviso.detalle.props;
    return { tono: "info", texto: "El navegador frenó la pestaña nueva", accion: { etiqueta: "Abrir la vista previa", alHacer: () => void window.open(url, "_blank", "noopener") } };
  }
  // Algo que no es una frase (lleva un link): el título lo nombra y va debajo.
  if (typeof aviso.detalle !== "string") return { tono: aviso.ok ? "exito" : "error", texto: aviso.titulo ?? (aviso.ok ? "Listo" : "No se pudo"), detalle: aviso.detalle, accion };
  if (!aviso.ok) return { tono: "error", ...partir(aviso.detalle), accion };
  return { tono: "exito", ...partir(aviso.detalle) };
}

/**
 * El aviso de la última acción de un editor, repartido (DESIGN.md §11,
 * «Avisos breves»): lo que salió bien y los errores de una acción van en un
 * aviso breve, que se va; en el encabezado quedan solo los que se quedan
 * hasta resolverse, el choque (otra persona guardó, con «Recargar») y el
 * resumen de los errores de los campos. Un aviso breve limpia el del
 * encabezado: lo que pasó después lo resolvió. Un «Reintentar» se cierra
 * cuando se va la ficha (`useAvisoBreve`), y `reintentar` tiene que ser la
 * acción al día (`useLaUltima`): repite con lo que hay en pantalla ahora.
 */
export function useAvisoDelEditor(inicial: AvisoDelEditor | null = null) {
  const avisar = useAvisoBreve();
  // El inicial (lo que la app ya sabe que hay que resolver al abrir) se queda en el encabezado.
  const [aviso, setQueQueda] = useState<AvisoDelEditor | null>(() => inicial);
  const setAviso = useCallback(
    (nuevo: AvisoDelEditor | null) => {
      if (!nuevo || nuevo.choque || (!nuevo.ok && nuevo.errores?.length)) return setQueQueda(nuevo);
      setQueQueda(null);
      avisar(breveDelEditor(nuevo));
    },
    [avisar],
  );
  return [aviso, setAviso] as const;
}
