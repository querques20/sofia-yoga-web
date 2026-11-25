"use client";

import { Alerta } from "./iconos";
import { abrirHasta } from "./indice-de-la-ficha/bloques";
import { useIndiceDeLaFicha } from "./useIndiceDeLaFicha";

/**
 * Un bloque del formulario: el `id` de su título (o de su `details`), cómo se
 * llama y, si hace falta, una marca («Sin guardar»). Con `alTocar` no lleva a
 * un bloque: hace algo (abrir un panel, «Qué cambió»), y nunca se marca a la vista.
 */
export type EntradaDelIndice = { id: string; etiqueta: string; marca?: string; alTocar?: () => void };

// El link a la vista, con la barra de 2 px en `azul-principal` (13,63:1 ·
// 13,59:1) y el texto igual; los demás en `gris-texto` (4,83:1 · 7,08:1), que
// pasan a `azul-principal` en hover. La barra de los demás es transparente:
// así el texto no salta al cambiar.
const LINK =
  "-ml-px flex min-h-8 items-center gap-2 rounded-r-sm border-l-2 py-1 pl-3 text-admin-meta transition-colors hover:text-azul-principal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-medio";
const A_LA_VISTA = "border-azul-principal font-medium text-azul-principal";
const OTRO = "border-transparent text-gris-texto";

/** Una entrada que hace algo (abrir un panel): va aparte de las anclas, con «Ver», así no se lee como un bloque al que hay que llegar. */
function Accion({ entrada }: { entrada: EntradaDelIndice }) {
  return (
    <button
      type="button"
      onClick={entrada.alTocar}
      className="flex min-h-8 w-full items-center gap-2 rounded-sm py-1 text-left text-admin-meta text-gris-texto transition-colors hover:text-azul-principal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-medio"
    >
      <span className="min-w-0 flex-1">
        {entrada.etiqueta}
        {entrada.marca ? ` · ${entrada.marca}` : ""}
      </span>
      <span className="shrink-0 font-medium text-azul-medio">Ver</span>
    </button>
  );
}

/**
 * «En esta ficha» (DESIGN.md §11, «Ficha de una entidad»): un link por
 * bloque del formulario, en el riel. Sin JavaScript es una lista de anclas;
 * con él, el bloque a la vista se marca (`aria-current="location"`), el que
 * tiene un campo con error lo dice con el ícono y «Con error», y si el bloque
 * está plegado (una sección del editor), se abre antes de ir. Una entrada
 * con `alTocar` («Qué cambió») no es un bloque: va aparte, debajo, con «Ver».
 * No sabe de ED.
 */
export function IndiceDeLaFicha({ titulo = "En esta ficha", entradas }: { titulo?: string; entradas: readonly EntradaDelIndice[] }) {
  const anclas = entradas.filter((e) => !e.alTocar);
  const acciones = entradas.filter((e) => e.alTocar);
  const { enVista, conError, marcar } = useIndiceDeLaFicha(anclas.map((e) => e.id));
  return (
    <nav aria-labelledby="indice-de-la-ficha">
      <h2 id="indice-de-la-ficha" className="border-b border-azul-claro/60 pb-2 font-display text-admin-seccion font-bold">
        {titulo}
      </h2>
      <ol className="mt-2 border-l border-azul-claro/60">
        {anclas.map((e) => {
          const aLaVista = enVista === e.id;
          return (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                aria-current={aLaVista ? "location" : undefined}
                onClick={() => {
                  abrirHasta(e.id);
                  marcar(e.id);
                }}
                className={`${LINK} ${aLaVista ? A_LA_VISTA : OTRO}`}
              >
                <span className="min-w-0 flex-1">{e.etiqueta}</span>
                {conError.has(e.id) ? (
                  <span className="flex shrink-0 items-center gap-1 font-medium text-rojo-error">
                    <Alerta size={16} className="shrink-0" />
                    Con error
                  </span>
                ) : e.marca ? (
                  <span className="shrink-0 text-gris-texto">{e.marca}</span>
                ) : null}
              </a>
            </li>
          );
        })}
      </ol>
      {acciones.length > 0 ? (
        <div className="mt-2 border-t border-azul-claro/60 pt-1">
          {acciones.map((e) => (
            <Accion key={e.id} entrada={e} />
          ))}
        </div>
      ) : null}
    </nav>
  );
}
