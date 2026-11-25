"use client";

import { useRef, useState } from "react";
import type { Cambio } from "../cambio";

type Opciones<T> = {
  nombre: string;
  etiquetaItem: string;
  valor: readonly T[];
  alCambiar: (valor: Cambio<T[]>) => void;
  itemVacio: () => T;
  claveDe: (item: T) => string;
};

/**
 * Lo que hace una `ListaVariable`: agregar, quitar y mover con su anuncio y su
 * foco, y qué ítems están abiertos. Los que ya estaban arrancan cerrados; uno
 * nuevo, abierto. El abierto se guarda por clave (no por lugar): mover un
 * ítem no le pasa su estado a otro.
 */
export function useListaVariable<T>({ nombre, etiquetaItem, valor, alCambiar, itemVacio, claveDe }: Opciones<T>) {
  const [anuncio, setAnuncio] = useState("");
  const [abiertos, setAbiertos] = useState<ReadonlySet<string>>(() => new Set());
  const refLista = useRef<HTMLOListElement>(null);
  const item = etiquetaItem.toLowerCase();

  // Después de dibujar: el ítem nuevo, o el botón, todavía no existen en este render.
  const enfocar = (buscar: (lista: HTMLOListElement) => HTMLElement | null) =>
    requestAnimationFrame(() => {
      if (refLista.current) buscar(refLista.current)?.focus();
    });

  const abrirOCerrar = (clave: string, abierto: boolean) =>
    setAbiertos((actuales) => {
      if (actuales.has(clave) === abierto) return actuales;
      const nuevos = new Set(actuales);
      if (abierto) nuevos.add(clave);
      else nuevos.delete(clave);
      return nuevos;
    });

  const agregar = () => {
    // Armado afuera del `alCambiar`: así se sabe su clave para abrirlo.
    const nuevo = itemVacio();
    alCambiar((actual) => [...actual, nuevo]);
    abrirOCerrar(claveDe(nuevo), true);
    setAnuncio(`Agregaste ${item} ${valor.length + 1}.`);
    enfocar((lista) => lista.querySelector<HTMLElement>(":scope > li:last-child :is(input, textarea, select)"));
  };
  const quitar = (i: number) => {
    // Sin su clave en los abiertos: si no, «Cerrar todos» quedaría a la vista sin nada abierto.
    abrirOCerrar(claveDe(valor[i]), false);
    alCambiar((actual) => actual.filter((_, j) => j !== i));
    setAnuncio(`Quitaste ${item} ${i + 1}.`);
    enfocar(() => document.getElementById(`${nombre}-agregar`));
  };
  const mover = (i: number, a: number) => {
    const clave = claveDe(valor[i]);
    const [igual, contrario] = a < i ? ["subir", "bajar"] : ["bajar", "subir"];
    alCambiar((actual) => {
      const nuevo = [...actual];
      [nuevo[i], nuevo[a]] = [nuevo[a], nuevo[i]];
      return nuevo;
    });
    setAnuncio(`Moviste ${item} ${i + 1} al lugar ${a + 1}.`);
    // El ítem se movió con su botón, pero en una punta ese botón ya no está: el foco pasa al otro.
    enfocar(() => document.getElementById(`${nombre}-${clave}-${igual}`) ?? document.getElementById(`${nombre}-${clave}-${contrario}`));
  };
  const todos = (abrir: boolean) => setAbiertos(abrir ? new Set(valor.map(claveDe)) : new Set());

  return { anuncio, abiertos, abrirOCerrar, refLista, agregar, quitar, mover, todos };
}
