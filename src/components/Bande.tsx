"use client";

import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Fleur } from "./Fleur";

// solo lo que da hoy (confirmado el 30/9 y en su tarjeta)
const PALABRAS = ["Yoga prénatal", "Post-partum", "Vinyasa", "Yoga flow", "En groupe", "En privé", "Au parc"];

function Tira({ oculta }: { oculta?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-[3vw] pr-[3vw]" aria-hidden={oculta || undefined}>
      {PALABRAS.map((palabra, i) => (
        <Fragment key={palabra}>
          {/* una sí, una no: la palabra va calada, solo con el contorno */}
          <span className={`titre whitespace-nowrap text-[clamp(3rem,8vw,7.5rem)] ${i % 2 ? "texto-calado" : ""}`}>{palabra}</span>
          <Fleur className="h-[clamp(1.6rem,3.4vw,3rem)] w-[clamp(1.6rem,3.4vw,3rem)] shrink-0 text-violeta" trazo={8} />
        </Fragment>
      ))}
    </div>
  );
}

/** la franja que se desliza sola: si bajás rápido se acelera, y si subís cambia de sentido */
export function Bande() {
  const raiz = useRef<HTMLDivElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const pista = raiz.current?.querySelector(".pista");
      if (!pista) return;
      const vuelta = gsap.to(pista, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
      let sentido = 1;
      const vigia = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          sentido = self.direction;
          const empuje = 1 + Math.min(5, Math.abs(self.getVelocity()) / 500);
          gsap.to(vuelta, { timeScale: empuje * sentido, duration: 0.25, overwrite: true });
          // y vuelve despacio a su ritmo de siempre
          gsap.to(vuelta, { timeScale: sentido, duration: 1.4, delay: 0.25, ease: "power2.out" });
        },
      });
      return () => vigia.kill();
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <div ref={raiz} className="overflow-hidden border-y border-salvia py-[clamp(1.2rem,3vw,2.4rem)]" role="presentation">
      <div className="pista flex w-max">
        <Tira />
        <Tira oculta />
      </div>
    </div>
  );
}
