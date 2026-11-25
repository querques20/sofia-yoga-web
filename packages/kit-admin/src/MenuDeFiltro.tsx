"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { OpcionDeFiltro } from "./Filtro";
import { ChevronAbajo } from "./iconos";
import { Numero, type Cuenta } from "./Numero";

type Props = {
  /** Qué filtra: «Tipo». Va en el botón («Tipo: Artículos») y nombra la lista para el lector. */
  etiqueta: string;
  /** La primera es la de «todos», la que saca el filtro. */
  opciones: readonly OpcionDeFiltro[];
  /** El `href` de la opción elegida: sale del query, así que la dice quien lo usa. */
  activa: string;
  /** Lo que pide atención aunque el menú esté cerrado («Link roto 3»): se ve en el botón. */
  numero?: Cuenta;
};

// El botón con el borde de un control (`gris-texto`, 4,83:1) y el texto en
// `azul-principal`; con un filtro elegido, el borde también en
// `azul-principal` (13,63:1), como la píldora activa de `Filtro`.
const BOTON =
  "inline-flex h-10 cursor-pointer list-none items-center gap-2 whitespace-nowrap rounded-full border px-4 text-admin-meta font-medium text-azul-principal transition-colors hover:bg-azul-claro/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-medio [&::-webkit-details-marker]:hidden";
const OPCION =
  "flex min-h-10 items-center justify-between gap-3 rounded-lg px-3 text-admin-meta transition-colors hover:bg-azul-claro/30 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-azul-medio";

/**
 * Un filtro de más de una lista, plegado en un menú (DESIGN.md §11, «Barra de
 * una lista»): «Tipo: Artículos ▾», y al abrirlo las opciones, que son links
 * como las de `Filtro` (se comparten, vuelven con «atrás», filtran en el
 * servidor). Es un `details`: anda sin JavaScript. Su `key` es la opción
 * elegida, así al elegir otra el menú vuelve cerrado. Con JavaScript, además,
 * se cierra con Escape (el foco vuelve al botón) y al tocar afuera, como
 * cualquier menú. No sabe de ED.
 */
export function MenuDeFiltro({ etiqueta, opciones, activa, numero }: Props) {
  const refMenu = useRef<HTMLDetailsElement>(null);
  // El menú se lee en cada evento, no al montar: elegir una opción cambia
  // `activa`, y con ella la `key`, así que el `details` de ahora es otro.
  useEffect(() => {
    const alTeclear = (e: KeyboardEvent) => {
      const menu = refMenu.current;
      if (e.key !== "Escape" || !menu?.open) return;
      menu.open = false;
      menu.querySelector("summary")?.focus();
    };
    const alTocar = (e: PointerEvent) => {
      const menu = refMenu.current;
      if (menu?.open && e.target instanceof Node && !menu.contains(e.target)) menu.open = false;
    };
    document.addEventListener("keydown", alTeclear);
    document.addEventListener("pointerdown", alTocar);
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.removeEventListener("pointerdown", alTocar);
    };
  }, []);
  const elegida = opciones.find((o) => o.href === activa) ?? opciones[0];
  const filtrado = elegida !== opciones[0];
  return (
    // `data-menu`: la animación de lo que se despliega solo lo funde, sin moverlo (la lista es absoluta).
    <details key={activa} ref={refMenu} data-menu="" className="relative">
      <summary className={`${BOTON} ${filtrado ? "border-azul-principal" : "border-gris-texto"}`}>
        <span>
          {etiqueta}: <span className={filtrado ? "" : "font-normal"}>{elegida?.etiqueta}</span>
        </span>
        {numero ? <Numero {...numero} /> : null}
        <ChevronAbajo size={16} className="shrink-0 text-azul-medio motion-safe:transition-transform [details[open]>summary>&]:rotate-180" />
      </summary>
      <nav aria-label={etiqueta} className="absolute top-full left-0 z-20 mt-1 min-w-56 rounded-xl border border-azul-claro/60 bg-white p-1 shadow-sm">
        <ul>
          {opciones.map((o) => {
            const encendida = o.href === elegida?.href;
            return (
              <li key={o.href}>
                <Link href={o.href} aria-current={encendida ? "page" : undefined} className={`${OPCION} ${encendida ? "font-medium text-azul-principal" : "text-gris-texto hover:text-azul-principal"}`}>
                  {o.etiqueta}
                  {o.numero ? <Numero {...o.numero} /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </details>
  );
}
