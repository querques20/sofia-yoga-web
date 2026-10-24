"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Fleur } from "../Fleur";
import { AConfirmer } from "../pagina/AConfirmer";

// el orden para volver a moverse después del parto (contexto maestro, sección 7: seguridad), con los datos
// generales de los HUG, de la OPAS y de las recomendaciones suizas de actividad física
const PASOS: { titulo: string; texto: ReactNode }[] = [
  {
    titulo: "Le contrôle post-partum",
    texto: (
      <>
        Entre la 6<sup>e</sup> et la 10<sup>e</sup> semaine après la naissance. C’est le bon moment pour parler de la
        rééducation du périnée, qui se fait sur ordonnance.
      </>
    ),
  },
  {
    titulo: "La rééducation du périnée",
    texto:
      "Avec une physio. Elle est indispensable, et le yoga ne la remplace pas. Aux HUG, elle commence en général deux à trois mois après l’accouchement et compte six à neuf séances.",
  },
  {
    titulo: "L’accord, puis le mouvement",
    texto: (
      <>
        Avec l’accord de ta sage-femme ou de ta gynécologue (je ne te demande aucun document), on reprend&nbsp;: tout
        en douceur, puis de plus en plus, comme le conseillent les recommandations suisses. Combien de semaines après
        l’accouchement&nbsp;? <AConfirmer />
      </>
    ),
  },
];

/** los tres pasos, en orden: la línea baja mientras leés y cada paso se abre como una flor cuando llega */
export function QuandReprendre() {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      gsap.fromTo(
        q(".pasos-progreso"),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: { trigger: q(".pasos")[0], start: "top 62%", end: "bottom 62%", scrub: 0.4 },
        },
      );
      q(".paso").forEach((paso) => {
        const flor = paso.querySelector(".nodo");
        gsap.set(flor, { transformOrigin: "50% 50%" });
        gsap
          .timeline({ scrollTrigger: { trigger: paso, start: "top 62%", toggleActions: "play none none reverse" } })
          .fromTo(flor?.querySelectorAll("ellipse") ?? [], { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.9, stagger: 0.05, ease: "power2.out" })
          .fromTo(flor, { rotation: -60, scale: 0.6 }, { rotation: 0, scale: 1, duration: 1, ease: "power3.out" }, 0)
          .fromTo(paso.querySelector(".paso-numero"), { opacity: 0.25 }, { opacity: 1, duration: 0.6 }, 0.1);
      });
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="quand" className="pb-[clamp(5rem,12vw,9rem)]">
      <div className="contenedor grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)]">Quand reprendre&nbsp;?</h2>
            <p className="mt-6 max-w-[26rem] text-[1.15rem] leading-relaxed">Après l’accouchement, trois étapes, dans cet ordre.</p>
          </div>
        </div>

        <ol className="pasos relative lg:col-span-7 lg:pt-4">
          <span className="absolute top-2 bottom-2 left-[0.4rem] w-px bg-salvia" aria-hidden="true" />
          <span className="pasos-progreso absolute top-2 bottom-2 left-[0.4rem] w-[2px] -translate-x-[0.5px] bg-verde" aria-hidden="true" />
          {PASOS.map((paso, i) => (
            <li key={paso.titulo} className="paso relative pb-14 pl-12 last:pb-0 lg:pb-20">
              <span
                className="absolute top-[0.35rem] -left-[0.55rem] grid h-[1.9rem] w-[1.9rem] place-items-center bg-pagina"
                style={{ borderRadius: "55% 45% 50% 50% / 50% 55% 45% 50%" }}
                aria-hidden="true"
              >
                <Fleur className="nodo h-[1.6rem] w-[1.6rem] text-violeta" trazo={9} />
              </span>
              <span className="paso-numero titre block text-[clamp(3rem,6vw,4.6rem)] text-salvia">{i + 1}</span>
              <h3 className="titre mt-1 text-[clamp(1.8rem,3.6vw,2.8rem)]">{paso.titulo}</h3>
              <p className="mt-3 max-w-[32rem] text-[1.12rem] leading-relaxed">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
