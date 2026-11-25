"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Pregunta } from "./DialogoDeConfirmacion";
import { useConfirmar } from "./useConfirmar";

const SALIR: Pregunta = { titulo: "Tenés cambios sin guardar", detalle: "Si salís ahora, se pierden.", si: "Salir sin guardar", no: "Seguir editando" };
const RECARGAR: Pregunta = { titulo: "Tenés cambios sin guardar", detalle: "Si recargás ahora, se pierden.", si: "Recargar sin guardar", no: "Seguir editando" };

/** Adónde va un clic que navega a otra pantalla del admin: ni una sección de esta misma, ni otra pestaña, ni una descarga. Si no, `null`. */
function destinoDelClic(e: MouseEvent): string | null {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const enlace = e.target instanceof Element ? e.target.closest("a[href]") : null;
  if (!(enlace instanceof HTMLAnchorElement) || enlace.target === "_blank" || enlace.hasAttribute("download")) return null;
  const destino = new URL(enlace.href, window.location.href);
  // Otro sitio: lo frena `beforeunload`, que es una navegación completa.
  if (destino.origin !== window.location.origin) return null;
  const otra = destino.pathname !== window.location.pathname || destino.search !== window.location.search;
  return otra ? `${destino.pathname}${destino.search}${destino.hash}` : null;
}

/** Un botón que sale de la pantalla sin ser un link (cerrar la sesión): lo marca `data-sale`. */
const botonQueSale = (e: MouseEvent) => (e.target instanceof Element ? e.target.closest<HTMLElement>("[data-sale]") : null);

/**
 * Mientras `activo`, frena la salida del editor:
 *
 * - **Un link a otra pantalla** (de la página o de la sidebar), o un botón
 *   marcado con `data-sale` (cerrar la sesión): pregunta con el diálogo del
 *   kit y, si sale, navega con el router o vuelve a tocar el botón. El clic
 *   se escucha en la fase de captura del `document`, antes que el `Link`.
 * - **Cerrar la pestaña o recargar**: `beforeunload`, el diálogo del
 *   navegador. Ninguno deja poner uno propio ahí.
 *
 * Atrás del navegador no se frena: una guarda en el historial chocaba con el
 * router (los links de una sección, el primer guardado, salir; DECISIONS de
 * `work/qa-de-la-pasada-de-ux/`).
 *
 * Devuelve `soltar`, para cuando el propio editor sale a propósito (descartar
 * recarga la página); `recargar`, que con cambios pregunta antes; `confirmar`,
 * para otras preguntas de la pantalla; y `dialogo`, que quien lo usa dibuja.
 */
export function useFrenarSalida(activo: boolean) {
  const suelto = useRef(false);
  const router = useRouter();
  const { confirmar, dialogo } = useConfirmar();
  useEffect(() => {
    if (!activo) return;
    const alCerrar = (e: BeforeUnloadEvent) => {
      if (suelto.current) return;
      e.preventDefault();
      // Los navegadores que todavía no leen `preventDefault` acá piden esto.
      e.returnValue = "";
    };
    const alClic = (e: MouseEvent) => {
      if (suelto.current) return;
      const destino = destinoDelClic(e);
      const boton = destino ? null : botonQueSale(e);
      if (!destino && !boton) return;
      e.preventDefault();
      e.stopPropagation();
      void confirmar(SALIR).then((si) => {
        if (!si) return;
        suelto.current = true;
        if (destino) router.push(destino);
        else boton?.click();
      });
    };
    window.addEventListener("beforeunload", alCerrar);
    document.addEventListener("click", alClic, true);
    return () => {
      window.removeEventListener("beforeunload", alCerrar);
      document.removeEventListener("click", alClic, true);
    };
  }, [activo, confirmar, router]);
  const soltar = useCallback(() => {
    suelto.current = true;
  }, []);
  const recargar = useCallback(async () => {
    if (activo && !(await confirmar(RECARGAR))) return;
    suelto.current = true;
    window.location.reload();
  }, [activo, confirmar]);
  return { soltar, recargar, confirmar, dialogo };
}
