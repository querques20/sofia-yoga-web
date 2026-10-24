"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { guardarLenis, lenisActual } from "@/lib/lenis";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** scroll suave en toda la página, enganchado a ScrollTrigger. Si se pidió menos movimiento, queda el scroll normal */
export function LenisProvider({ children }: { children: ReactNode }) {
  const quieto = useReducedMotion();
  const ruta = usePathname();
  const rutaAnterior = useRef(ruta);

  // al cambiar de página se arranca arriba de todo (aunque Lenis venga frenando un scroll de la anterior),
  // y las escenas de la página nueva se miden con todo ya armado
  useEffect(() => {
    if (rutaAnterior.current === ruta) return;
    rutaAnterior.current = ruta;
    lenisActual()?.scrollTo(0, { immediate: true, force: true });
    const cuadro = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(cuadro);
  }, [ruta]);

  useEffect(() => {
    if (quieto) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      anchors: { offset: -88 },
    });
    guardarLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    // Lenis corre en el mismo cuadro que GSAP, así no se pelean los dos
    const avanzar = (tiempo: number) => lenis.raf(tiempo * 1000);
    gsap.ticker.add(avanzar);
    gsap.ticker.lagSmoothing(0);

    // si cambia el alto de la página, Lenis se entera en el próximo cuadro. Las escenas de ScrollTrigger se
    // recalculan solo si el cambio es grande (una sección que aparece), porque recalcularlas congela un instante
    const UMBRAL = 240;
    let altoMedido = document.body.scrollHeight;
    let reloj = 0;
    const observador = new ResizeObserver(() => {
      lenis.resize();
      const alto = document.body.scrollHeight;
      if (Math.abs(alto - altoMedido) < UMBRAL) return;
      window.clearTimeout(reloj);
      reloj = window.setTimeout(() => {
        altoMedido = alto;
        ScrollTrigger.refresh();
      }, 150);
    });
    observador.observe(document.body);
    // las fuentes cambian el alto de los títulos: cuando terminan de llegar, se vuelve a medir todo
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      window.clearTimeout(reloj);
      observador.disconnect();
      gsap.ticker.remove(avanzar);
      lenis.destroy();
      guardarLenis(null);
    };
  }, [quieto]);

  return <>{children}</>;
}
