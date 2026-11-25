"use client";

import { useEffect, useState } from "react";
import { abrirHasta, bloqueDe, loQueScrollea, ultimaAlFondo } from "./indice-de-la-ficha/bloques";
import { useHastaElUltimo } from "./indice-de-la-ficha/useHastaElUltimo";

/**
 * Lo que el índice sabe de los bloques: cuál está a la vista y cuáles tienen
 * un campo con error. A la vista lo dice un `IntersectionObserver` contra lo
 * que scrollea (`main` en escritorio, la ventana en el celular), en una franja
 * arriba, y también el foco (un campo con error enfocado marca su bloque); los
 * errores, los `aria-invalid` del DOM, así ninguna ficha mantiene un mapa de
 * qué campo vive en qué bloque. Al montar, abre el bloque del hash (la lista
 * de Páginas enlaza `…#seccion-hero`). Tocar una entrada (`marcar`) y llegar
 * abajo de todo marcan las últimas, que la franja no alcanza
 * (`useHastaElUltimo`).
 */
export function useIndiceDeLaFicha(ids: readonly string[]) {
  const [enVista, setEnVista] = useState<string | null>(null);
  const [conError, setConError] = useState<ReadonlySet<string>>(() => new Set());
  const clave = ids.join(" ");
  const { fijada, marcar } = useHastaElUltimo(clave, setEnVista);

  useEffect(() => {
    const lista = clave.split(" ").filter(Boolean);
    const raiz = loQueScrollea();
    const visibles = new Set<string>();
    const porBloque = new Map<Element, string>(
      lista.flatMap((id) => {
        const bloque = bloqueDe(id);
        return bloque ? [[bloque, id] as const] : [];
      }),
    );
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const id = porBloque.get(e.target);
          if (!id) continue;
          if (e.isIntersecting) visibles.add(id);
          else visibles.delete(id);
        }
        // Una entrada tocada manda hasta que la persona scrollea; abajo de todo, la última a la vista.
        if (fijada.current) return;
        const primero = ultimaAlFondo(lista, raiz) ?? lista.find((id) => visibles.has(id));
        if (primero) setEnVista(primero);
      },
      // La franja que cuenta como «a la vista»: del 20 al 40 % de lo que scrollea, ya debajo del encabezado fijo.
      { root: raiz, rootMargin: "-20% 0px -60% 0px" },
    );
    for (const bloque of porBloque.keys()) observador.observe(bloque);

    // El foco también dice dónde se está: «revisar errores» lleva a un campo sin scrollear si la ficha entra en la pantalla.
    const alEnfocar = (e: FocusEvent) => {
      if (!(e.target instanceof Element)) return;
      for (const [bloque, id] of porBloque) if (bloque.contains(e.target)) setEnVista(id);
    };
    document.addEventListener("focusin", alEnfocar);

    let cuadro = 0;
    const revisar = () => {
      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(() => setConError(new Set(lista.filter((id) => bloqueDe(id)?.querySelector('[aria-invalid="true"]')))));
    };
    const mutaciones = new MutationObserver(revisar);
    mutaciones.observe(raiz ?? document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["aria-invalid"] });
    revisar();

    // El bloque del hash, al cargar y cuando el hash cambia sin recargar (un link a otra sección de la misma página).
    const abrirElDelHash = () => {
      // Un hash mal escrito (un «%» suelto) no es un ancla de la ficha: no abre nada, y no tira.
      let delHash = "";
      try {
        delHash = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (lista.includes(delHash)) abrirHasta(delHash);
    };
    abrirElDelHash();
    window.addEventListener("hashchange", abrirElDelHash);

    return () => {
      observador.disconnect();
      mutaciones.disconnect();
      cancelAnimationFrame(cuadro);
      window.removeEventListener("hashchange", abrirElDelHash);
      document.removeEventListener("focusin", alEnfocar);
    };
  }, [clave, fijada]);

  return { enVista, conError, marcar };
}
