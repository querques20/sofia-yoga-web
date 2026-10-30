"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type TextosCommentCaMarche = { titulo: string; pasos: { titulo: string; texto: string }[] };

/** los tres pasos, en orden: la línea de arriba se dibuja de un paso al otro mientras bajás */
export function CommentCaMarche({ t }: { t: TextosCommentCaMarche }) {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      const recorrido = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: q(".pasos-atelier")[0], start: "top 80%", end: "bottom 60%", scrub: 0.6 },
      });
      q(".paso-atelier").forEach((paso, i) => {
        recorrido
          .fromTo(paso.querySelector(".paso-linea"), { scaleX: 0 }, { scaleX: 1, duration: 1 }, i)
          .fromTo(paso.querySelector(".paso-numero"), { opacity: 0.25 }, { opacity: 1, duration: 0.3 }, i);
      });
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} className="pb-[clamp(5rem,12vw,9rem)]">
      <div className="contenedor">
        <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)]">{t.titulo}</h2>
        <ol className="pasos-atelier mt-10 grid gap-10 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {t.pasos.map((paso, i) => (
            <li key={paso.titulo} className="paso-atelier relative pt-6">
              <span className="paso-linea absolute inset-x-0 top-0 h-[2px] origin-left bg-verde" aria-hidden="true" />
              <span className="paso-numero titre block text-[clamp(3rem,6vw,4.6rem)] text-salvia">{i + 1}</span>
              <h3 className="titre mt-2 text-[clamp(1.7rem,3vw,2.3rem)]">{paso.titulo}</h3>
              <p className="mt-3 text-[1.12rem] leading-relaxed">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
