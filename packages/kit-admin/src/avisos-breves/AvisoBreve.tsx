"use client";

import { useEffect, useState } from "react";
import { Alerta, Check, X } from "../iconos";
import { duracionDe, type BreveEnCola } from "./cola";

// Lo de `Aviso`, sobre una superficie que tapa lo de atrás (va flotando): la
// confirmación en `azul-principal` sobre `azul-claro/30` (11,63:1), el error
// en `rojo-error` sobre su tinte al 8 % (5,75:1). Los tokens los cambia cada
// tema: en el oscuro, la superficie es la oscura y el texto, el claro.
const TINTE = {
  exito: "border-azul-medio bg-azul-claro/30 text-azul-principal",
  info: "border-azul-medio bg-azul-claro/30 text-azul-principal",
  error: "border-rojo-error bg-rojo-error/8 text-rojo-error",
} as const;

/**
 * Un aviso breve: entra con opacidad y un desplazamiento chico (nada con
 * `prefers-reduced-motion`), y lo que salió bien se va solo a los cinco
 * segundos, salvo mientras el mouse o el foco están encima. Un error, o uno
 * con una acción, se queda hasta que se cierra. Nunca toma el foco (F8 lo
 * lleva, desde `AvisosBreves`); con el foco adentro, Escape lo cierra. Al
 * lector lo dicen las regiones de `AvisosBreves`, que existen desde el
 * montaje: este no lleva rol.
 */
export function AvisoBreve({ breve, alCerrar }: { breve: BreveEnCola; alCerrar: (id: number) => void }) {
  const [pausado, setPausado] = useState(false);
  const { id, tono } = breve;
  const ms = duracionDe(breve);
  useEffect(() => {
    if (pausado || ms === null) return;
    const reloj = setTimeout(() => alCerrar(id), ms);
    return () => clearTimeout(reloj);
  }, [pausado, ms, id, alCerrar]);

  const Icono = tono === "error" ? Alerta : Check;
  return (
    <div
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={(e) => {
        if (!(e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget))) setPausado(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") alCerrar(id);
      }}
      className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-azul-claro/60 transition-[opacity,translate] duration-200 ease-out starting:translate-y-2 starting:opacity-0 motion-reduce:transition-none"
    >
      <div className={`flex items-start gap-2 border-l-4 py-3 pr-2 pl-3 text-admin-meta ${TINTE[tono]}`}>
        <Icono size={20} className="mt-px shrink-0" />
        <div className="min-w-0 flex-1">
          <div>
            <p className="font-medium">{breve.texto}</p>
            {/* En el color del aviso, sin el peso: `gris-texto` sobre el tinte daría 4,1:1. */}
            {breve.detalle ? <p className="mt-0.5">{breve.detalle}</p> : null}
          </div>
          {/* Debajo del texto, así el texto no se angosta. */}
          {breve.accion ? (
            <button
              type="button"
              onClick={() => {
                breve.accion?.alHacer();
                alCerrar(id);
              }}
              className="-ml-1 mt-1 rounded-sm px-1 py-0.5 font-medium underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-medio"
            >
              {breve.accion.etiqueta}
            </button>
          ) : null}
        </div>
        <button
          type="button"
          aria-label="Cerrar el aviso"
          onClick={() => alCerrar(id)}
          className="-my-1 inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-gris-texto transition-colors hover:bg-azul-claro/30 hover:text-azul-principal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-medio"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
