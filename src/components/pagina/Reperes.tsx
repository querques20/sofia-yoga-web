"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type Repere = {
  /** lo que se lee primero: una cifra o una idea corta */
  clave: ReactNode;
  texto: ReactNode;
  /** de dónde sale, en corto (la lista completa va en «Sources») */
  fuente?: string;
};

type Props = {
  id?: string;
  titulo: ReactNode;
  intro?: ReactNode;
  reperes: Repere[];
  /** el fondo de la sección: crema o salvia clara (las secciones van en salvia) */
  fondo?: "pagina" | "salvia";
};

/**
 * Datos de salud con su fuente al lado, para leer de un vistazo: a la izquierda el título fijo,
 * a la derecha cada dato con su línea, que se dibuja al llegar
 */
export function Reperes({ id, titulo, intro, reperes, fondo = "pagina" }: Props) {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      gsap.utils.toArray<HTMLElement>(".repere", raiz.current).forEach((repere) => {
        gsap.fromTo(
          repere.querySelector(".repere-linea"),
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: repere, start: "top 90%", end: "top 62%", scrub: 0.6 } },
        );
      });
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id={id} className={`py-[clamp(5rem,12vw,9rem)] ${fondo === "salvia" ? "bg-salvia-clara" : ""}`}>
      <div className="contenedor grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)]">{titulo}</h2>
            {intro && <div className="mt-6 max-w-[28rem] space-y-4 text-[1.15rem] leading-relaxed">{intro}</div>}
          </div>
        </div>
        <ul className="lg:col-span-7">
          {reperes.map((repere, i) => (
            <li key={i} className="repere relative grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[minmax(0,13rem)_1fr]">
              <span className="repere-linea absolute inset-x-0 top-0 h-px origin-left bg-verde/25" aria-hidden="true" />
              <p className="titre text-[clamp(1.9rem,3.6vw,2.8rem)] text-violeta">{repere.clave}</p>
              <div>
                <p className="text-[1.12rem] leading-relaxed">{repere.texto}</p>
                {repere.fuente && <p className="mt-2 text-[0.92rem] opacity-70">Source&nbsp;: {repere.fuente}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
