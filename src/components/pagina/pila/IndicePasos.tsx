"use client";

import type { MouseEvent } from "react";
import { lenisActual } from "@/lib/lenis";
import { flujoDesdeSeccion, topeDePanel } from "./medidas";

/**
 * El paso a paso arriba a la derecha de la pila: dice en cuál vas, y al apretar uno viaja hasta donde ese
 * panel queda trabado (los del medio se apilan en el camino, así el recorrido se ve). El estado lo mueve
 * pila.ts con `data-estado`, no React: el scroll no dispara renders. Sin JS queda marcado el primero
 */
function irAlPaso(indice: number) {
  return (e: MouseEvent<HTMLButtonElement>) => {
    const seccion = e.currentTarget.closest<HTMLElement>("[data-pila]");
    const panel = seccion?.querySelectorAll<HTMLElement>("[data-pila-panel]")[indice];
    if (!seccion || !panel) return;
    const arriba = seccion.getBoundingClientRect().top + window.scrollY;
    // los 4px de más: justo en el borde, ScrollTrigger todavía no lo cuenta como cruzado
    const destino = Math.max(arriba, arriba + flujoDesdeSeccion(panel) - topeDePanel(panel)) + 4;
    const lenis = lenisActual();
    if (lenis) lenis.scrollTo(destino, { force: true });
    else window.scrollTo({ top: destino, behavior: "smooth" });
  };
}

export function IndicePasos({ pasos }: { pasos: readonly string[] }) {
  return (
    <ol aria-label="Les étapes" className="hidden items-end gap-6 lg:ml-auto lg:flex">
      {pasos.map((paso, i) => (
        <li key={paso}>
          <button
            type="button"
            data-pila-paso
            data-estado={i === 0 ? "activo" : "pendiente"}
            onClick={irAlPaso(i)}
            className="group/paso flex cursor-pointer flex-col gap-2 rounded-sm text-left"
          >
            <span className="flex items-baseline gap-1.5 text-[0.98rem] leading-none transition-opacity duration-500 group-hover/paso:opacity-100 group-data-[estado=activo]/paso:font-bold group-data-[estado=pendiente]/paso:opacity-55 group-data-[estado=recorrido]/paso:opacity-75 motion-reduce:transition-none">
              <span className="titre text-[1.05rem]" aria-hidden="true">
                {i + 1}
              </span>
              {paso}
            </span>
            {/* el riel: se pinta cuando el paso ya pasó */}
            <span className="h-[3px] w-full rounded-full bg-verde/15 transition-colors duration-500 group-hover/paso:bg-verde/50 group-data-[estado=activo]/paso:bg-verde group-data-[estado=recorrido]/paso:bg-verde/45 motion-reduce:transition-none" />
          </button>
        </li>
      ))}
    </ol>
  );
}
