"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { escucharSouffle } from "@/lib/souffle";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Fleur } from "./Fleur";

/** la flor chiquita del menú: se abre y se cierra con la misma respiración que el inicio */
export function FleurQuiRespire({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto || !ref.current) return;
      const petalos = ref.current.querySelector(".petalos");
      gsap.set(petalos, { transformOrigin: "50% 50%" });
      const escala = gsap.quickSetter(petalos, "scale");
      const giro = gsap.quickSetter(petalos, "rotation", "deg");
      return escucharSouffle((v) => {
        escala(0.86 + v * 0.16);
        giro(v * 14);
      });
    },
    { dependencies: [quieto], revertOnUpdate: true },
  );

  return <Fleur ref={ref} className={className} trazo={9} />;
}
