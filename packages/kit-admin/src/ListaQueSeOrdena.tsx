import { FlechasDeMover } from "./lista-variable/FlechasDeMover";
import type { Hacia } from "./useMoverEnOrden";

// Las dos piezas de una lista que se ordena (DESIGN.md §11, «Lista que se
// ordena») que se ven: los botones de cada fila y lo que se anuncia arriba de
// la lista. El movimiento lo lleva `useMoverEnOrden`.

type PropsDeLosBotones = {
  /** El mismo que se le pasó a `useMoverEnOrden`: arma el id de cada botón. */
  prefijo: string;
  id: string;
  /** Para el lector: «Subir Iván Pérez en su nivel». */
  nombre: string;
  donde: string;
  primero: boolean;
  ultimo: boolean;
  pendiente: boolean;
  alMover: (hacia: Hacia) => void;
};

/** «Subir» y «Bajar» de una fila: las flechas del kit, siempre en su lugar; en una punta, la que no va deja el suyo vacío. */
export function BotonesDeOrden({ prefijo, id, nombre, donde, primero, ultimo, pendiente, alMover }: PropsDeLosBotones) {
  return (
    <FlechasDeMover
      idSubir={`${prefijo}-${id}-subir`}
      idBajar={`${prefijo}-${id}-bajar`}
      subir={`Subir ${nombre} ${donde}`}
      bajar={`Bajar ${nombre} ${donde}`}
      alSubir={primero ? undefined : () => alMover("antes")}
      alBajar={ultimo ? undefined : () => alMover("despues")}
      deshabilitadas={pendiente}
    />
  );
}

/** El anuncio de cada paso para el lector de pantalla. Si no salió, lo dice un aviso breve (`useMoverEnOrden`). */
export function AvisosDelOrden({ anuncio }: { anuncio: string }) {
  return (
    <p role="status" className="sr-only">
      {anuncio}
    </p>
  );
}
