"use client";

import type { ReactNode } from "react";
import { Boton } from "./Boton";
import { resolverCambio, type Cambio } from "./cambio";
import { Mas } from "./iconos";
import { ItemPlegable } from "./ItemPlegable";
import { BotonesDelItem } from "./lista-variable/BotonesDelItem";
import { useListaVariable } from "./lista-variable/useListaVariable";
import { TituloDeLista } from "./TituloDeLista";

type Props<T> = {
  /** Único en el formulario: arma los ids de los botones y de cada ítem. */
  nombre: string;
  etiqueta: string;
  /** El nombre de cada ítem: «Sección» → «Sección 1», «Agregar sección». */
  etiquetaItem: string;
  /** Cuántos entran como mucho: se ve siempre, y en el tope «Agregar» deja su lugar a la explicación. */
  maximo: number;
  ayuda?: string;
  /** Lo que dice la lista sin ítems: qué significa que esté vacía. */
  vacia: string;
  valor: readonly T[];
  alCambiar: (valor: Cambio<T[]>) => void;
  /** Un ítem vacío, nuevo en cada llamada. */
  itemVacio: () => T;
  /** Una clave estable por ítem (no el índice): así mover o quitar no le cambia el contenido a otro. */
  claveDe: (item: T) => string;
  /** Una línea que lo nombra en su cabecera, al lado del número: lo que se lee con el ítem cerrado. */
  resumenDe: (item: T) => string;
  /** ¿El último guardado encontró un error adentro de este ítem? Cerrado, lo dice. */
  conError?: (indice: number) => boolean;
  porItem: (indice: number, item: T, cambiar: (valor: Cambio<T>) => void) => ReactNode;
};

/** Desde cuántos ítems aparecen «Abrir todos» y «Cerrar todos»: con menos, se abren de a uno sin buscar. */
const PARA_ABRIR_TODOS = 4;

/**
 * Ítems que se agregan, se quitan y se mueven, hasta un máximo (DESIGN.md
 * §11, «Lista variable»). Cada ítem se pliega (`ItemPlegable`): cerrado, se
 * lee su número y lo que tiene, y se mueve y se quita igual. Los que ya
 * estaban arrancan cerrados; al agregar, el nuevo se abre con el foco en su
 * primer campo; al quitar, el foco va a «Agregar». Se mueve con botones y no
 * arrastrando: el teclado y el lector de pantalla llegan igual, y cada cambio
 * se anuncia.
 */
export function ListaVariable<T>({ nombre, etiqueta, etiquetaItem, maximo, ayuda, vacia, valor, alCambiar, itemVacio, claveDe, resumenDe, conError, porItem }: Props<T>) {
  const { anuncio, abiertos, abrirOCerrar, refLista, agregar, quitar, mover, todos: abrirTodos } = useListaVariable({ nombre, etiquetaItem, valor, alCambiar, itemVacio, claveDe });
  const item = etiquetaItem.toLowerCase();
  const algunoCerrado = valor.some((v) => !abiertos.has(claveDe(v)));
  const todos =
    valor.length >= PARA_ABRIR_TODOS ? (
      <>
        {algunoCerrado ? (
          <Boton variante="terciario" onClick={() => abrirTodos(true)}>
            Abrir todos
          </Boton>
        ) : null}
        {abiertos.size > 0 ? (
          <Boton variante="terciario" onClick={() => abrirTodos(false)}>
            Cerrar todos
          </Boton>
        ) : null}
      </>
    ) : undefined;

  return (
    <div className="space-y-3">
      <TituloDeLista titulo={`${etiqueta} · ${valor.length} de ${maximo}`} ayuda={ayuda} acciones={todos} />
      {valor.length === 0 ? <p className="text-admin-meta text-gris-texto">{vacia}</p> : null}
      <ol ref={refLista} className="space-y-2">
        {valor.map((actual, i) => {
          const clave = claveDe(actual);
          return (
            <ItemPlegable
              key={clave}
              titulo={`${etiquetaItem} ${i + 1}`}
              resumen={resumenDe(actual)}
              conError={conError?.(i)}
              abierto={abiertos.has(clave)}
              alAbrirOCerrar={(abierto) => abrirOCerrar(clave, abierto)}
              acciones={
                <BotonesDelItem
                  id={`${nombre}-${clave}`}
                  cual={`${item} ${i + 1}`}
                  alSubir={i > 0 ? () => mover(i, i - 1) : undefined}
                  alBajar={i < valor.length - 1 ? () => mover(i, i + 1) : undefined}
                  alQuitar={() => quitar(i)}
                />
              }
            >
              {porItem(i, actual, (cambio) =>
                // Contra la lista más fresca (`actual`), no contra `valor` de este render: lo que resuelve tarde no pisa otro ítem.
                alCambiar((actuales) => actuales.map((x, j) => (j === i ? resolverCambio(cambio, x) : x))),
              )}
            </ItemPlegable>
          );
        })}
      </ol>
      {valor.length < maximo ? (
        <Boton id={`${nombre}-agregar`} variante="secundario" onClick={agregar}>
          <Mas size={16} />
          Agregar {item}
        </Boton>
      ) : (
        <p className="text-admin-meta text-gris-texto">
          Llegaste al tope de {maximo}: para agregar, primero hay que quitar.
        </p>
      )}
      <span className="sr-only" aria-live="polite">
        {anuncio}
      </span>
    </div>
  );
}
