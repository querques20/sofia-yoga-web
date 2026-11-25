"use client";

import { useEffect, useId, useRef } from "react";
import { Boton } from "./Boton";

/** Lo que pregunta el diálogo: qué pasa, y los dos botones. */
export type Pregunta = {
  /** Qué se va a perder: «Tenés cambios sin guardar». */
  titulo: string;
  /** La consecuencia, en una línea: «Si salís ahora, se pierden». */
  detalle?: string;
  /** El botón que lo hace: «Salir sin guardar». */
  si: string;
  /** El que vuelve, lo seguro: «Seguir editando». */
  no: string;
};

type Props = {
  /** La pregunta abierta, o `null`: el diálogo se abre y se cierra con ella. */
  pregunta: Pregunta | null;
  alResponder: (si: boolean) => void;
};

/**
 * Confirmar lo que no se deshace (DESIGN.md §11), cuando no hay un botón en
 * cuyo lugar preguntar: salir con cambios sin guardar, recargar, restaurar.
 * Un `<dialog>` nativo con `showModal`, así el foco queda adentro y el resto
 * no se toca; Escape es «no», y al cerrarse el foco vuelve a lo que lo abrió.
 * La pregunta en `rojo-error` (6,57:1) con su borde izquierdo, como en el
 * lugar; el botón que lo hace es el destructivo, y el foco arranca en el
 * otro, lo seguro, que va primero. Nunca el `confirm` del navegador, que no
 * se puede estilar. No sabe de ED.
 */
export function DialogoDeConfirmacion({ pregunta, alResponder }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const idTitulo = useId();
  const idDetalle = useId();
  useEffect(() => {
    const dialogo = ref.current;
    if (!dialogo) return;
    if (pregunta && !dialogo.open) dialogo.showModal();
    if (!pregunta && dialogo.open) dialogo.close();
  }, [pregunta]);
  return (
    <dialog
      ref={ref}
      aria-labelledby={idTitulo}
      aria-describedby={pregunta?.detalle ? idDetalle : undefined}
      onClose={() => alResponder(false)}
      className="m-auto w-full max-w-md rounded-2xl bg-white p-6 text-azul-principal shadow-lg backdrop:bg-azul-principal/40"
    >
      {pregunta ? (
        <>
          <div className="border-l-4 border-rojo-error pl-3">
            <h2 id={idTitulo} className="font-display text-admin-seccion font-bold text-rojo-error">
              {pregunta.titulo}
            </h2>
            {pregunta.detalle ? (
              <p id={idDetalle} className="mt-1 text-admin-meta text-gris-texto">
                {pregunta.detalle}
              </p>
            ) : null}
          </div>
          {/* Primero lo seguro: `showModal` lleva el foco al primer botón. */}
          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <Boton variante="terciario" onClick={() => alResponder(false)}>
              {pregunta.no}
            </Boton>
            <Boton variante="destructivo" onClick={() => alResponder(true)}>
              {pregunta.si}
            </Boton>
          </div>
        </>
      ) : null}
    </dialog>
  );
}
