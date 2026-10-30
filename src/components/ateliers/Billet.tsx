"use client";

import { useRef, type ReactNode } from "react";
import { enlaceWhatsApp, MENSAJES } from "@/lib/contacto";
import { telonAbierto } from "@/lib/entrada";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useRuta } from "@/lib/useRuta";
import { FleurQuiRespire } from "../FleurQuiRespire";
import { IconoWhatsApp } from "../Iconos";
import { AConfirmer } from "../pagina/AConfirmer";

// del próximo atelier no sabemos nada todavía: el ticket lo dice sin inventar
const FILAS: [string, ReactNode][] = [
  ["Date", <AConfirmer key="fecha" />],
  [
    "Lieu",
    <>
      Genève, <AConfirmer />
    </>,
  ],
  ["Prix", <AConfirmer key="precio" />],
  ["Inscription", "Par message"],
];

/**
 * El ticket del próximo atelier: llega inclinado y se acomoda, se dibuja el corte y el sello es la flor,
 * que respira. Con mouse, el ticket se inclina hacia donde está el cursor y vuelve solo al salir
 */
export function Billet() {
  const { idioma } = useRuta();
  const raiz = useRef<HTMLDivElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    (_, contextSafe) => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      const [billete] = q(".billete") as HTMLElement[];

      gsap.set(billete, { visibility: "visible" });
      const entrada = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .from(billete, { yPercent: 16, rotation: -5, opacity: 0, duration: 1.2 })
        .from(q(".billete-corte"), { scaleY: 0, transformOrigin: "50% 0%", duration: 0.9, ease: "power2.inOut" }, 0.45)
        .fromTo(q(".billete-sello ellipse"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.1, stagger: 0.05, ease: "power2.inOut" }, 0.55);
      entrada.progress(0.001).pause();
      let vivo = true;
      telonAbierto.then(
        contextSafe!(() => {
          if (vivo) entrada.play(0);
        }),
      );

      if (!window.matchMedia("(pointer: fine)").matches) {
        return () => {
          vivo = false;
        };
      }
      const girarX = gsap.quickTo(billete, "rotationX", { duration: 0.8, ease: "power3.out" });
      const girarY = gsap.quickTo(billete, "rotationY", { duration: 0.8, ease: "power3.out" });
      const mover = contextSafe!((e: PointerEvent) => {
        const caja = billete.getBoundingClientRect();
        girarY(((e.clientX - caja.left) / caja.width - 0.5) * 12);
        girarX(-((e.clientY - caja.top) / caja.height - 0.5) * 10);
      });
      const soltar = contextSafe!(() => {
        girarX(0);
        girarY(0);
      });
      billete.addEventListener("pointermove", mover);
      billete.addEventListener("pointerleave", soltar);
      return () => {
        vivo = false;
        billete.removeEventListener("pointermove", mover);
        billete.removeEventListener("pointerleave", soltar);
      };
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <div ref={raiz} className="[perspective:1400px]">
      <article
        aria-label="Prochain atelier"
        className="billete entra relative mx-auto grid w-full max-w-[31rem] grid-cols-[1fr_auto] rounded-[1.6rem] bg-arena shadow-[0_30px_60px_-30px_rgba(57,70,58,0.45)] lg:mr-0"
      >
        <div className="p-7 lg:p-9">
          <p className="titre text-[clamp(2.1rem,4vw,2.9rem)]">Prochain atelier</p>
          <dl className="mt-6 space-y-3 text-[1.05rem]">
            {FILAS.map(([dato, valor]) => (
              <div key={dato} className="flex items-baseline justify-between gap-4 border-t border-verde/20 pt-3">
                <dt className="font-bold">{dato}</dt>
                <dd className="text-right">{valor}</dd>
              </div>
            ))}
          </dl>
          <a className="boton mt-7" href={enlaceWhatsApp(MENSAJES[idioma].atelier)} target="_blank" rel="noopener noreferrer">
            <IconoWhatsApp className="h-5 w-5" />
            Être prévenu.e
          </a>
        </div>
        <div className="relative grid w-[clamp(5.5rem,22vw,8.5rem)] place-items-center">
          {/* la línea de puntos por donde se corta el ticket, y las dos muescas */}
          <span
            className="billete-corte absolute inset-y-6 left-0 w-[2px]"
            style={{ backgroundImage: "radial-gradient(ellipse at center, rgba(57,70,58,0.4) 45%, transparent 55%)", backgroundSize: "2px 10px" }}
            aria-hidden="true"
          />
          <span className="absolute -top-3 -left-3 h-6 w-6 rounded-full bg-pagina" aria-hidden="true" />
          <span className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-pagina" aria-hidden="true" />
          <FleurQuiRespire className="billete-sello h-16 w-16 text-violeta lg:h-20 lg:w-20" />
        </div>
      </article>
    </div>
  );
}
