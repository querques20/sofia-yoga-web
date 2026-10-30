"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useInterfaz } from "@/lib/useInterfaz";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  id?: string;
  titulo: ReactNode;
  intro: ReactNode;
  signaux: string[];
  cierre: ReactNode;
  fuente?: string;
};

// la marca de cada señal: un trazo de alerta hecho a mano (un palito y un punto), nada de íconos de banco
function Marca() {
  return (
    <svg viewBox="0 0 20 32" className="signal-marca mt-1 h-6 w-4 shrink-0 text-violeta" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" aria-hidden="true">
      <path d="M10.4 4 C 10 10 10.6 15 10 20" />
      <path d="M10 27.4 L 10.1 27.6" strokeWidth={3.4} />
    </svg>
  );
}

/**
 * Las señales para parar y consultar: es información, así que va en el recuadro celeste.
 * Las marcas se dibujan una tras otra cuando el recuadro aparece
 */
export function Signaux({ id, titulo, intro, signaux, cierre, fuente }: Props) {
  const t = useInterfaz();
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      gsap.fromTo(
        q(".signal-marca path"),
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.45, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: q(".signaux")[0], start: "top 75%" } },
      );
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id={id} className="pb-[clamp(4rem,10vw,7rem)]">
      <div className="contenedor">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-celeste-clara py-9 pr-6 pl-8 lg:grid lg:grid-cols-12 lg:gap-10 lg:py-14 lg:pr-14 lg:pl-16">
          <span className="absolute inset-y-0 left-0 w-[6px] bg-celeste" aria-hidden="true" />
          <div className="lg:col-span-5">
            <h2 className="titre text-[clamp(2.2rem,5vw,3.8rem)]">{titulo}</h2>
            <div className="mt-5 max-w-[26rem] text-[1.12rem] leading-relaxed">{intro}</div>
          </div>
          <div className="mt-8 lg:col-span-7 lg:mt-0">
            <ul className="signaux grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {signaux.map((signal) => (
                <li key={signal} className="flex gap-3 text-[1.08rem] leading-snug">
                  <Marca />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-verde/20 pt-6 text-[1.12rem] leading-relaxed font-bold">{cierre}</div>
            {fuente && <p className="mt-3 text-[0.92rem] opacity-70">{t.fuente} {fuente}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
