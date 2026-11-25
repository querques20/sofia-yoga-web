"use client";

import { useEffect, useRef } from "react";

/** El aire entre el encabezado y el riel, y entre el riel y el pie de la pantalla. */
const AIRE = 24;

/**
 * Mide el encabezado de la ficha y deja en su raíz dos variables CSS: dónde
 * empieza el riel (`--tope-del-riel`, debajo del encabezado fijo) y cuánto
 * puede medir (`--alto-del-riel`, hasta el pie de lo que scrollea). El
 * encabezado no tiene un alto fijo: un aviso lo agranda, y el riel baja con
 * él. Si el encabezado no está fijo (el celular), el tope es solo el aire.
 * Lo usan también los bloques, para su `scroll-margin`.
 */
export function useRielFijo() {
  const refRaiz = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const raiz = refRaiz.current;
    const encabezado = raiz?.querySelector<HTMLElement>(":scope > header");
    if (!raiz || !encabezado) return;
    const medir = () => {
      const fijo = getComputedStyle(encabezado).position === "sticky";
      const tope = (fijo ? encabezado.getBoundingClientRect().height : 0) + AIRE;
      const alto = (raiz.closest("main")?.clientHeight ?? window.innerHeight) - tope - AIRE;
      raiz.style.setProperty("--tope-del-riel", `${Math.round(tope)}px`);
      raiz.style.setProperty("--alto-del-riel", `${Math.round(alto)}px`);
    };
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(encabezado);
    window.addEventListener("resize", medir);
    return () => {
      observador.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, []);
  return refRaiz;
}
