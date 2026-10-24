"use client";

import { useRef, useState } from "react";
import { abrirTelon } from "@/lib/entrada";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { lenisActual } from "@/lib/lenis";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Fleur } from "./Fleur";

// el tamaño de la flor dibujada: el hueco arranca exactamente de este tamaño para que no se note el cambio
const TAMANO_FLOR = 112;
const INSPIRA = 1.18;

/** la entrada: la flor se dibuja, inspira, y al expirar la página se abre a través de ella */
export function Entrada() {
  const telon = useRef<HTMLDivElement>(null);
  const [termino, setTermino] = useState(false);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      const el = telon.current;
      if (!el) return;
      // con menos movimiento, o si ya se vio en esta visita, el telón se abre enseguida
      if (quieto || document.documentElement.classList.contains("entrada-vista")) {
        abrirTelon();
        setTermino(true);
        return;
      }
      try {
        sessionStorage.setItem("sofia-entrada", "1");
      } catch {
        // sin almacenamiento (navegación privada estricta) se ve en cada carga, nada más
      }
      // Lenis arranca después de este efecto: lo frenamos en el cuadro siguiente para que no se pueda bajar durante la entrada
      requestAnimationFrame(() => lenisActual()?.stop());
      const flor = el.querySelector(".entrada-flor");
      const nombre = el.querySelector(".entrada-nombre");
      // el hueco tiene que abrir toda la pantalla, también las esquinas que caen entre dos pétalos:
      // el centro donde los seis pétalos se tocan mide un 21 % del ancho de la flor
      const final = Math.hypot(window.innerWidth, window.innerHeight) * 2.6;
      gsap.set(flor, { transformOrigin: "50% 50%" });

      gsap
        .timeline({
          onComplete: () => {
            lenisActual()?.start();
            // por las dudas, las escenas fijadas se vuelven a medir con la página ya abierta
            ScrollTrigger.refresh();
            setTermino(true);
          },
        })
        .fromTo(el.querySelectorAll(".entrada-flor ellipse"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.6, stagger: 0.045, ease: "power2.inOut" })
        .from(nombre, { opacity: 0, y: 8, duration: 0.45, ease: "power2.out" }, 0.15)
        // inspira: crece un poco y gira hasta quedar como la flor del hueco
        .to(flor, { scale: INSPIRA, rotation: 30, duration: 0.42, ease: "sine.inOut" }, 0.6)
        .to(nombre, { opacity: 0, y: -6, duration: 0.25, ease: "power2.in" }, 0.8)
        // expira: el hueco aparece justo sobre la flor y crece hasta abrir toda la página
        .set(el, { "--flor": `${TAMANO_FLOR * INSPIRA}px` }, 1.02)
        .add(() => abrirTelon(), 1.04)
        .to(el, { "--flor": `${final}px`, duration: 0.95, ease: "power3.in" }, 1.02)
        .to(flor, { scale: INSPIRA * 2.2, opacity: 0, duration: 0.45, ease: "power2.in" }, 1.02);
    },
    { dependencies: [quieto], revertOnUpdate: true },
  );

  if (termino) return null;

  return (
    <div ref={telon} className="entrada fixed inset-0 z-[70] bg-verde" aria-hidden="true">
      <Fleur
        className="entrada-flor absolute top-1/2 left-1/2 -mt-[3.5rem] -ml-[3.5rem] h-28 w-28 text-salvia-clara"
        trazo={5}
      />
      <p className="entrada-nombre titre absolute top-[calc(50%+4.6rem)] left-0 w-full text-center text-[1.7rem] tracking-[0.05em] text-pagina">
        Sofia Yoga
      </p>
    </div>
  );
}
