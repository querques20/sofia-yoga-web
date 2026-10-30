"use client";

import { useRef } from "react";
import { telonAbierto } from "@/lib/entrada";
import { gsap, useGSAP } from "@/lib/gsap";
import { escucharSouffle } from "@/lib/souffle";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FleurQuiRespire } from "../FleurQuiRespire";

// las dos formas entre las que respira el marco: bordes orgánicos, ningún círculo
const FORMA_A = [58, 42, 46, 54, 52, 44, 56, 48];
const FORMA_B = [50, 50, 56, 44, 46, 54, 48, 52];
const radio = (r: number[]) => `${r[0]}% ${r[1]}% ${r[2]}% ${r[3]}% / ${r[4]}% ${r[5]}% ${r[6]}% ${r[7]}%`;

export type TextosPortrait = { texto: string };

/** el lugar de su foto mientras no haya sesión de fotos: el marco cambia de forma al ritmo de la respiración */
export function Portrait({ t }: { t: TextosPortrait }) {
  const raiz = useRef<HTMLDivElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    (_, contextSafe) => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      const [marco] = q(".portrait-marco");

      gsap.set(marco, { visibility: "visible" });
      const entrada = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .from(marco, { scale: 0.88, opacity: 0, duration: 1.3 })
        .fromTo(q(".portrait-flor ellipse"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.2, stagger: 0.05, ease: "power2.inOut" }, 0.3)
        .from(q(".portrait-texto"), { opacity: 0, y: 10, duration: 0.8 }, 0.7);
      entrada.progress(0.001).pause();
      let vivo = true;
      telonAbierto().then(
        contextSafe!(() => {
          if (vivo) entrada.play(0);
        }),
      );

      const dejar = escucharSouffle((v) => {
        marco.style.borderRadius = radio(FORMA_A.map((a, i) => +(a + (FORMA_B[i] - a) * v).toFixed(2)));
      });
      return () => {
        vivo = false;
        dejar();
        marco.style.borderRadius = radio(FORMA_A);
      };
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <div ref={raiz} className="mx-auto w-[min(100%,24rem)] lg:mr-0">
      <div className="portrait-marco entra grid aspect-[4/5] place-items-center bg-arena p-10 text-center" style={{ borderRadius: radio(FORMA_A) }}>
        <div className="flex flex-col items-center">
          <FleurQuiRespire className="portrait-flor h-20 w-20 text-violeta" />
          <p className="portrait-texto mt-6 max-w-[14rem] text-[1.05rem] opacity-75">{t.texto}</p>
        </div>
      </div>
    </div>
  );
}
