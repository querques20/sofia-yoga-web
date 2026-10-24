"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

// lo que dijo Sofía de sus ejercicios (contexto maestro, sección 7): ayudan, pero no curan ni reemplazan a la fisio
const PUEDE = ["Aider à améliorer la mobilité, la stabilité et la force du plancher pelvien.", "Aider à diminuer une diastase."];
const NO_PUEDE = ["Guérir une diastase.", "Remplacer la rééducation du périnée avec une physio."];

function Tilde() {
  return (
    <svg viewBox="0 0 32 32" className="marca mt-1 h-7 w-7 shrink-0 text-verde" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 17 C 9 19 11 22 13 25 C 17 17 22 11 27 6" />
    </svg>
  );
}

function Cruz() {
  return (
    <svg viewBox="0 0 32 32" className="marca mt-1 h-7 w-7 shrink-0 text-verde/55" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" aria-hidden="true">
      <path d="M8 8 C 13 13 19 19 25 25" />
      <path d="M25 7 C 19 13 14 19 8 25" />
    </svg>
  );
}

/** diástasis y suelo pélvico: lo que el yoga puede hacer y lo que no, dicho claro. Las marcas se dibujan a mano */
export function CeQueLeYogaFait() {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      gsap
        .timeline({ scrollTrigger: { trigger: q(".columnas")[0], start: "top 72%" } })
        .fromTo(q(".divisoria path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.1, ease: "power2.inOut" }, 0)
        .fromTo(q(".marca path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.5, stagger: 0.12, ease: "power2.out" }, 0.3);
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="yoga-fait" className="py-[clamp(5rem,12vw,9rem)]">
      <div className="contenedor">
        <h2 className="titre max-w-[16ch] text-[clamp(2.6rem,6.4vw,5rem)]">Ce que mes exercices font, et ne font pas</h2>
        <p className="mt-6 max-w-[32rem] text-[1.15rem] leading-relaxed">
          Pour le périnée et la diastase, ils peuvent aider. Ils ne remplacent pas la physio.
        </p>

        <div className="columnas relative mt-12 grid gap-10 rounded-[2rem] bg-arena px-6 py-10 lg:mt-16 lg:grid-cols-2 lg:gap-0 lg:px-0 lg:py-14">
          <div className="lg:px-14">
            <h3 className="titre text-[clamp(1.8rem,3.4vw,2.6rem)]">Ils peuvent</h3>
            <ul className="mt-6 space-y-5">
              {PUEDE.map((texto) => (
                <li key={texto} className="flex gap-4 text-[1.2rem] leading-snug">
                  <Tilde />
                  <span>{texto}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* la línea del medio, hecha a mano (con alto fijo: un svg suelto toma el alto de su viewBox y no el de top/bottom) */}
          <svg
            viewBox="0 0 12 400"
            preserveAspectRatio="none"
            className="divisoria pointer-events-none absolute top-12 left-1/2 hidden h-[calc(100%-6rem)] w-3 -translate-x-1/2 text-verde/30 lg:block"
            aria-hidden="true"
          >
            <path d="M6 2 C 3 90 9 180 5 270 C 3 320 8 360 6 398" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          </svg>
          <div className="lg:px-14">
            <h3 className="titre text-[clamp(1.8rem,3.4vw,2.6rem)]">Ils ne peuvent pas</h3>
            <ul className="mt-6 space-y-5">
              {NO_PUEDE.map((texto) => (
                <li key={texto} className="flex gap-4 text-[1.2rem] leading-snug">
                  <Cruz />
                  <span>{texto}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 text-[1rem] opacity-80">Je ne suis pas physiothérapeute.</p>
      </div>
    </section>
  );
}
