"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Fleur } from "./Fleur";

// todo sale de su bio y de los audios del 30/9; solo 2019 tiene fecha confirmada
const ETAPAS = [
  { titulo: "Le sport, depuis toute petite", texto: "Gymnastique artistique, natation et hockey sur gazon." },
  {
    titulo: "Le marketing",
    texto: "Quelques années d’études et de travail, jusqu’au jour où je me suis rendu compte que cela ne me rendait pas heureuse.",
  },
  { titulo: "2019, le départ", texto: "J’ai quitté la ville où je suis née pour voyager et me redécouvrir." },
  { titulo: "L’Inde", texto: "Ma formation de 200 h en Ashtanga-Vinyasa." },
  {
    titulo: "La Suisse",
    texto: "100 h de yin yoga et de thérapie des fascias, puis une formation continue sur les fascias.",
  },
  { titulo: "Pré et postnatal", texto: "Une formation de 60 h. Je suis enregistrée auprès de Yoga Alliance." },
  { titulo: "Aujourd’hui", texto: "Des cours de yoga dynamique à Genève, en groupe, en privé et au parc." },
];

export function Parcours() {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      const [lista] = q(".etapas");

      // la línea baja a medida que leés, y cada etapa se enciende cuando la línea llega
      gsap.fromTo(
        q(".etapas-progreso"),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: { trigger: lista, start: "top 62%", end: "bottom 62%", scrub: 0.4 },
        },
      );
      q(".etapa").forEach((etapa) => {
        gsap.fromTo(
          etapa,
          { opacity: 0.3 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: etapa, start: "top 66%", end: "top 54%", scrub: 0.4 },
          },
        );
        // la flor del nodo se dibuja y gira un poco al abrirse
        const flor = etapa.querySelector(".nodo");
        gsap.set(flor, { transformOrigin: "50% 50%" });
        gsap
          .timeline({ scrollTrigger: { trigger: etapa, start: "top 62%", toggleActions: "play none none reverse" } })
          .fromTo(flor?.querySelectorAll("ellipse") ?? [], { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.9, stagger: 0.05, ease: "power2.out" })
          .fromTo(flor, { rotation: -60, scale: 0.6 }, { rotation: 0, scale: 1, duration: 1, ease: "power3.out" }, 0);
      });
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="parcours" className="pt-[clamp(5rem,12vw,9rem)] pb-[clamp(6rem,14vw,11rem)]">
      <div className="contenedor grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)]">Mon parcours</h2>
            {/* espacio para su foto: la sesión de fotos todavía no se hizo */}
            <div
              className="mt-8 grid aspect-[4/5] w-[min(100%,24rem)] place-items-center bg-arena p-8 text-center"
              style={{ borderRadius: "58% 42% 46% 54% / 52% 44% 56% 48%" }}
            >
              <p className="max-w-[13rem] text-[1.05rem] opacity-75">La photo de Sofia arrivera ici après sa séance photo.</p>
            </div>
            <p className="mt-6 max-w-[24rem] text-[1.05rem]">Sofia Costa, professeure de yoga à Genève.</p>
          </div>
        </div>

        <ol className="etapas relative lg:col-span-7 lg:pt-4">
          <span className="absolute top-2 bottom-2 left-[0.4rem] w-px bg-salvia" aria-hidden="true" />
          <span className="etapas-progreso absolute top-2 bottom-2 left-[0.4rem] w-[2px] -translate-x-[0.5px] bg-verde" aria-hidden="true" />
          {ETAPAS.map((etapa) => (
            <li key={etapa.titulo} className="etapa relative pb-12 pl-10 last:pb-0 lg:pb-16">
              {/* el nodo es una flor que se abre cuando la línea llega */}
              <span
                className="absolute top-[0.2rem] -left-[0.55rem] grid h-[1.9rem] w-[1.9rem] place-items-center bg-pagina"
                style={{ borderRadius: "55% 45% 50% 50% / 50% 55% 45% 50%" }}
                aria-hidden="true"
              >
                <Fleur className="nodo h-[1.6rem] w-[1.6rem] text-violeta" trazo={9} />
              </span>
              <h3 className="titre text-[clamp(1.7rem,3.4vw,2.6rem)]">{etapa.titulo}</h3>
              <p className="mt-2 max-w-[34rem] text-[1.1rem] leading-relaxed">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
