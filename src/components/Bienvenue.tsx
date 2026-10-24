"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { escucharSouffle } from "@/lib/souffle";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** su firma de siempre: «Bienvenue» con el corazón violeta. Se escribe al llegar y el corazón late con la respiración */
export function Bienvenue({ className = "" }: { className?: string }) {
  const raiz = useRef<HTMLDivElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      const [palabra] = q(".bienvenue");
      const [corazon] = q(".corazon");

      gsap.fromTo(
        palabra,
        { clipPath: "inset(-60% 100% -60% -5%)" },
        {
          clipPath: "inset(-60% -5% -60% -5%)",
          duration: 1.5,
          ease: "power2.inOut",
          clearProps: "clipPath",
          scrollTrigger: { trigger: palabra, start: "top 90%" },
        },
      );
      gsap.set(corazon, { transformOrigin: "50% 60%" });
      const latido = gsap.quickSetter(corazon, "scale");
      return escucharSouffle((v) => latido(0.9 + v * 0.16));
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <div ref={raiz} className={`flex items-end gap-4 ${className}`}>
      <p className="bienvenue mano inline-block text-[clamp(3.6rem,11vw,8rem)]">Bienvenue</p>
      <svg viewBox="0 0 24 24" className="corazon mb-[0.6em] h-[clamp(1.8rem,4vw,3rem)] w-[clamp(1.8rem,4vw,3rem)] text-violeta" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 21.2s-7.6-4.7-9.7-9.3C.8 8.6 2.6 4.5 6.4 4.1c2.2-.2 3.9 1 5.6 3.1 1.7-2.1 3.4-3.3 5.6-3.1 3.8.4 5.6 4.5 4.1 7.8-2.1 4.6-9.7 9.3-9.7 9.3z"
        />
      </svg>
    </div>
  );
}
