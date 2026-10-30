"use client";

import { useRef, type ReactNode } from "react";
import { telonAbierto } from "@/lib/entrada";
import { gsap, useGSAP } from "@/lib/gsap";
import { escucharSouffle } from "@/lib/souffle";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  children: ReactNode;
  viewBox: string;
  etiqueta: string;
  className?: string;
  /** dónde se apoya el torso al respirar, si la ilustración lo tiene separado (la embarazada) */
  torso?: string;
};

/**
 * Las ilustraciones de las páginas, armadas igual que la del inicio: el fondo aparece, las ramas crecen,
 * las flores se dibujan y ella llega (si hay esterilla, primero se desenrolla). Después respira con la web
 */
export function IlustracionQueRespira({ children, viewBox, etiqueta, className, torso }: Props) {
  const raiz = useRef<HTMLDivElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    (_, contextSafe) => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      const [salvia, celeste] = q(".ilus-masas > g");
      const flores = q(".ilus-flores > g > g");
      const [esterilla] = q(".ilus-esterilla");
      const [pecho] = q(".ilus-torso");
      const puntos = q(".ilus-puntos ellipse");
      const [cabeza] = q(".ilus-cabeza");

      gsap.set(q(".entra"), { visibility: "visible" });
      gsap.set([salvia, celeste], { transformOrigin: "50% 50%" });
      flores.forEach((flor) => gsap.set(flor, { transformOrigin: "50% 50%" }));
      if (pecho && torso) gsap.set(pecho, { svgOrigin: torso });

      const entrada = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .from(q(".ilus-masas"), { scale: 0.86, opacity: 0, duration: 1.4, transformOrigin: "50% 60%" }, 0)
        .from(q(".ilus-ramas path"), { scale: 0.4, opacity: 0, transformOrigin: "50% 100%", duration: 1.1, stagger: 0.02 }, 0.25)
        .fromTo(q(".ilus-flores ellipse"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.4, stagger: 0.04, ease: "power2.inOut" }, 0.3);
      // los puntitos sueltos (la embarazada no los tiene aparte)
      if (puntos.length) entrada.from(puntos, { scale: 0, transformOrigin: "50% 50%", duration: 0.6, stagger: 0.08 }, 0.9);
      // la esterilla se desenrolla desde la izquierda antes de que ella llegue
      if (esterilla) entrada.from(esterilla, { scaleX: 0, transformOrigin: "0% 50%", duration: 1.1, ease: "power2.inOut" }, 0.25);
      entrada.from(q(".ilus-figura"), { y: 26, opacity: 0, duration: 1.2 }, esterilla ? 0.75 : 0.35);

      // mientras el telón está cerrado queda todo en su punto de partida
      entrada.progress(0.001).pause();
      let vivo = true;
      telonAbierto().then(
        contextSafe!(() => {
          if (vivo) entrada.play(0);
        }),
      );

      const escalaSalvia = gsap.quickSetter(salvia, "scale");
      const escalaCeleste = gsap.quickSetter(celeste, "scale");
      const giros = flores.map((flor) => gsap.quickSetter(flor, "rotation", "deg"));
      const anchoPecho = pecho && torso ? gsap.quickSetter(pecho, "scaleX") : null;
      const altoPecho = pecho && torso ? gsap.quickSetter(pecho, "scaleY") : null;
      const subeCabeza = cabeza ? gsap.quickSetter(cabeza, "y", "px") : null;

      const dejar = escucharSouffle((v) => {
        escalaSalvia(0.96 + v * 0.07);
        escalaCeleste(1.04 - v * 0.06);
        giros.forEach((girar, i) => girar(v * (i % 2 ? -14 : 10)));
        anchoPecho?.(1 + v * 0.03);
        altoPecho?.(1 + v * 0.008);
        subeCabeza?.(-v * 1.6);
      });
      return () => {
        vivo = false;
        dejar();
      };
    },
    { scope: raiz, dependencies: [quieto, torso], revertOnUpdate: true },
  );

  return (
    <div ref={raiz} className={className}>
      <svg viewBox={viewBox} className="entra h-full w-full overflow-visible" role="img" aria-label={etiqueta}>
        {children}
      </svg>
    </div>
  );
}
