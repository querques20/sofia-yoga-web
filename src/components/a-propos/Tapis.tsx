"use client";

import { useRef } from "react";
import { AConfirmer } from "@/components/pagina/AConfirmer";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type TextosTapis = {
  titulo: string;
  leyenda: string;
  /** `donde` es lo que ya sabemos de cada una: atrás le va la pastilla de lo que falta (la escuela, y a veces el lugar) */
  formaciones: { titulo: string; donde: string; texto: string }[];
  extras: { titulo: string; texto: string }[];
};

/** las formaciones como esterillas que se desenrollan al bajar, todas del mismo largo */
export function Tapis({ t }: { t: TextosTapis }) {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      gsap.utils.toArray<HTMLElement>(".tapis-fila", raiz.current).forEach((fila) => {
        const tapis = fila.querySelector<HTMLElement>(".tapis");
        const rollo = fila.querySelector<HTMLElement>(".tapis-rollo");
        if (!tapis || !rollo) return;
        // el rollo arranca a la izquierda, gordo, y llega al final más finito: se le fue desenrollando la esterilla
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: fila, start: "top 84%", end: "top 50%", scrub: 0.6, invalidateOnRefresh: true },
          })
          .fromTo(tapis, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)" }, 0)
          .fromTo(rollo, { x: () => -tapis.offsetWidth, scale: 1.3 }, { x: 0, scale: 1 }, 0);
      });
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="formations" className="py-[clamp(5rem,12vw,9rem)]">
      <div className="contenedor">
        <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)]">{t.titulo}</h2>
        <p className="mt-5 max-w-[32rem] text-[1.15rem] leading-relaxed">{t.leyenda}</p>
        <ul className="mt-12 space-y-10 lg:mt-16 lg:space-y-12">
          {t.formaciones.map((f) => (
            <li key={f.titulo} className="tapis-fila">
              <h3 className="titre text-[clamp(2rem,4.4vw,3.2rem)]">{f.titulo}</h3>
              <p className="mt-1 text-[1.05rem] opacity-80">
                {f.donde} <AConfirmer />
              </p>
              <p className="mt-2 max-w-[40rem] text-[1.05rem] leading-relaxed opacity-85">{f.texto}</p>
              <div className="relative mt-4 pr-[clamp(0.8rem,1.4vw,1.1rem)]">
                <div
                  className="tapis h-[clamp(2.2rem,4.4vw,3.4rem)] rounded-[0.8rem] bg-celeste"
                  style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(57,70,58,0.08) 0 2px, transparent 2px 16px)" }}
                />
                {/* el rollo, con la espiral de la esterilla enrollada */}
                <span
                  className="tapis-rollo absolute top-1/2 right-0 grid h-[clamp(2.8rem,5.6vw,4.3rem)] w-[clamp(1.6rem,2.8vw,2.2rem)] -translate-y-1/2 place-items-center rounded-[45%] bg-celeste shadow-[inset_0_0_0_999px_rgba(57,70,58,0.14)]"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 20 40" className="h-[70%] w-[70%]" fill="none" stroke="var(--color-pagina)" strokeWidth={1.6} strokeLinecap="round" opacity={0.7}>
                    <path d="M10 20 C 10 17 13 17 13 20 C 13 25 7 25 7 20 C 7 12 16 12 16 20 C 16 30 4 30 4 20 C 4 8 18 8 18 20" />
                  </svg>
                </span>
              </div>
            </li>
          ))}
        </ul>
        <ul className="mt-14 grid gap-6 border-t border-verde/20 pt-8 text-[1.12rem] leading-relaxed sm:grid-cols-2">
          {t.extras.map((e) => (
            <li key={e.titulo}>
              <span className="block font-bold">{e.titulo}</span>
              {e.texto}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
