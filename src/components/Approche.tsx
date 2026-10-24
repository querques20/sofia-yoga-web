"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

// texto de su bio, tal cual lo escribió ella (con su escritura inclusiva)
const CITA =
  "Aujourd’hui, je propose un enseignement dynamique alliant pranayama, mouvement fonctionnel et système myofascial, dans un cadre bienveillant et inclusif, car je crois fortement que le yoga est pour touxtes ! Nul besoin d’être fort.e ou souple, viens comme tu es :)";

export function Approche() {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      const [cita] = q(".cita");
      const [firma] = q(".firma");
      const partido = SplitText.create(cita, { type: "words" });

      // las palabras se van encendiendo al ritmo de la lectura
      gsap.fromTo(
        partido.words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: cita, start: "top 78%", end: "bottom 55%", scrub: 0.5 },
        },
      );

      // y la firma se escribe cuando aparece
      gsap.fromTo(
        firma,
        { clipPath: "inset(-60% 100% -60% -5%)" },
        {
          clipPath: "inset(-60% -5% -60% -5%)",
          duration: 1.3,
          ease: "power2.inOut",
          clearProps: "clipPath",
          scrollTrigger: { trigger: firma, start: "top 88%" },
        },
      );

      return () => partido.revert();
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="approche" className="py-[clamp(6rem,14vw,11rem)]">
      <div className="contenedor">
        <h2 className="titre text-[clamp(1.5rem,2.6vw,2rem)]">Mon approche</h2>
        <blockquote className="mt-8 lg:mt-10">
          <p className="cita max-w-[25ch] text-[clamp(1.9rem,4.5vw,3.6rem)] leading-[1.14]">{CITA}</p>
          <footer className="mt-8">
            <span className="firma mano inline-block text-[clamp(3rem,6vw,4.4rem)]">Sofia</span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
