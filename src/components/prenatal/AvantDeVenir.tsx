"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Souligne } from "../pagina/Souligne";

// lo que pide Sofía antes de venir (contexto maestro, sección 7), con la palabra clave marcada a mano
const AVISOS: { texto: ReactNode; detalle?: string }[] = [
  {
    texto: (
      <>
        Avec l’<Souligne forma="rond">accord</Souligne> de ta sage-femme ou de ta gynécologue.
      </>
    ),
    detalle: "Je ne te demande aucun document.",
  },
  {
    texto: (
      <>
        Je ne suis pas <Souligne>physiothérapeute</Souligne>.
      </>
    ),
    detalle: "Je suis professeure de yoga, formée en yoga pré et postnatal (60 h).",
  },
  {
    texto: (
      <>
        En cas de placenta prævia ou de grossesse <Souligne>à risque</Souligne>, je ne peux pas t’accompagner.
      </>
    ),
  },
];

/** lo de seguridad, en grande y en su voz: cada frase se enciende al leerla y la palabra clave se marca en violeta */
export function AvantDeVenir() {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      gsap.utils.toArray<HTMLElement>(".aviso", raiz.current).forEach((aviso) => {
        gsap.fromTo(
          aviso,
          { opacity: 0.22 },
          { opacity: 1, ease: "none", scrollTrigger: { trigger: aviso, start: "top 84%", end: "top 60%", scrub: 0.5 } },
        );
        // la marca se dibuja cuando la frase ya terminó de encenderse
        gsap.fromTo(
          aviso.querySelectorAll(".souligne-trazo path"),
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 0.9,
            ease: "power2.inOut",
            scrollTrigger: { trigger: aviso, start: "top 60%", toggleActions: "play none none reverse" },
          },
        );
      });
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="avant" className="bg-salvia-clara py-[clamp(5rem,12vw,9rem)]">
      <div className="contenedor grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)] lg:sticky lg:top-32">Avant de venir</h2>
        </div>
        <ul className="space-y-12 lg:col-span-8 lg:space-y-16">
          {AVISOS.map((aviso, i) => (
            <li key={i} className="aviso">
              <p className="text-[clamp(1.7rem,3.6vw,2.7rem)] leading-[1.2]">{aviso.texto}</p>
              {aviso.detalle && <p className="mt-3 text-[1.1rem] opacity-80">{aviso.detalle}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
