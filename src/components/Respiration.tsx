"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { telonAbierto } from "@/lib/entrada";
import { escucharSouffle, expirarAMano, inspirarAMano, type Fase } from "@/lib/souffle";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Embarazada } from "./ilustraciones/Embarazada";

/** la composición del inicio: ella respira sola, y si mantenés apretado respira con vos */
export function Respiration() {
  const raiz = useRef<HTMLDivElement>(null);
  const faseActual = useRef<Fase>("inspire");
  const [aMano, setAMano] = useState(false);
  const [fase, setFase] = useState<Fase>("inspire");
  const quieto = useReducedMotion();

  useGSAP(
    (_, contextSafe) => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      const [salvia, celeste] = q(".ilus-masas > g");
      const [torso] = q(".ilus-torso");
      const [cabeza] = q(".ilus-cabeza");
      const flores = q(".ilus-flores > g > g");

      gsap.set(q(".entra"), { visibility: "visible" });
      gsap.set([salvia, celeste], { transformOrigin: "50% 50%" });
      gsap.set(torso, { svgOrigin: "180 300" });
      flores.forEach((flor) => gsap.set(flor, { transformOrigin: "50% 50%" }));

      // la entrada: el fondo aparece, las ramas crecen, las flores se dibujan y ella llega.
      // Mientras el telón está cerrado queda todo en su punto de partida
      const entrada = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .from(q(".ilus-masas"), { scale: 0.86, opacity: 0, duration: 1.4, transformOrigin: "50% 60%" }, 0)
        .from(q(".ilus-ramas path"), { scale: 0.4, opacity: 0, transformOrigin: "50% 100%", duration: 1.1, stagger: 0.03 }, 0.25)
        .fromTo(q(".ilus-flores ellipse"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.4, stagger: 0.04, ease: "power2.inOut" }, 0.3)
        .from(q(".ilus-figura"), { y: 26, opacity: 0, duration: 1.2 }, 0.35)
        .from(q(".control"), { opacity: 0, y: 10, duration: 0.7 }, 1.2);
      entrada.progress(0.001).pause();
      let vivo = true;
      telonAbierto.then(
        contextSafe!(() => {
          if (vivo) entrada.play(0);
        }),
      );

      const escalaSalvia = gsap.quickSetter(salvia, "scale");
      const escalaCeleste = gsap.quickSetter(celeste, "scale");
      const anchoTorso = gsap.quickSetter(torso, "scaleX");
      const altoTorso = gsap.quickSetter(torso, "scaleY");
      const subeCabeza = gsap.quickSetter(cabeza, "y", "px");
      const giros = flores.map((flor) => gsap.quickSetter(flor, "rotation", "deg"));

      const dejar = escucharSouffle((v, f) => {
        escalaSalvia(0.96 + v * 0.07);
        escalaCeleste(1.04 - v * 0.06);
        anchoTorso(1 + v * 0.03);
        altoTorso(1 + v * 0.008);
        subeCabeza(-v * 1.6);
        giros.forEach((girar, i) => girar(v * (i % 2 ? -14 : 10)));
        if (f !== faseActual.current) {
          faseActual.current = f;
          setFase(f);
        }
      });
      return () => {
        vivo = false;
        dejar();
      };
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  const empezar = () => {
    setAMano(true);
    inspirarAMano();
  };
  const soltar = () => {
    if (!aMano) return;
    expirarAMano(() => setAMano(false));
  };
  const teclaAbajo = (e: KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === " " || e.key === "Enter") && !e.repeat) {
      e.preventDefault();
      empezar();
    }
  };
  const teclaArriba = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      soltar();
    }
  };

  const etiqueta = !aMano ? "Respire avec moi" : fase === "inspire" ? "Inspire…" : "Expire…";

  return (
    <div ref={raiz} className="relative h-full w-full">
      <svg viewBox="0 0 400 520" className="entra h-full w-full overflow-visible" role="img" aria-label="Une femme enceinte de profil, les yeux fermés, une main posée sur le ventre">
        <Embarazada />
      </svg>

      {!quieto && (
        <div className="control entra absolute inset-x-0 -bottom-4 flex flex-col items-center gap-2 lg:bottom-0">
          <button
            type="button"
            className="min-h-11 touch-none select-none rounded-full border border-verde/70 bg-pagina/85 px-5 text-[0.95rem] font-bold backdrop-blur-sm transition-colors duration-300 hover:bg-salvia-clara"
            aria-describedby="respiration-aide"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              empezar();
            }}
            onPointerUp={soltar}
            onPointerCancel={soltar}
            onKeyDown={teclaAbajo}
            onKeyUp={teclaArriba}
            onContextMenu={(e) => e.preventDefault()}
          >
            {etiqueta}
          </button>
          <p id="respiration-aide" className="hidden text-sm opacity-70 lg:block">
            Maintiens appuyé pour inspirer, relâche pour expirer.
          </p>
        </div>
      )}
    </div>
  );
}
