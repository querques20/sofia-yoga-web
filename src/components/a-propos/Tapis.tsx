"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

// sus formaciones con horas (confirmadas el 30/9). Cada esterilla mide lo que duró la formación, y abajo va qué
// es cada estilo, con definiciones verificadas (historia del ashtanga y del yin)
const FORMACIONES = [
  {
    horas: 200,
    titulo: "Ashtanga-Vinyasa",
    detalle: "En Inde",
    texto: "Un style popularisé au XXe siècle par K. Pattabhi Jois, à Mysore : des séries de postures enchaînées au rythme du souffle.",
  },
  {
    horas: 100,
    titulo: "Yin yoga et thérapie des fascias",
    detalle: "En Suisse",
    texto: "Le yin yoga est lent : les postures sont tenues longtemps, souvent plusieurs minutes, dans le calme.",
  },
  {
    horas: 60,
    titulo: "Yoga pré et postnatal",
    detalle: null,
    texto: "Pour accompagner la grossesse et l’après-accouchement, avec les précautions propres à chaque étape.",
  },
];
const MAS_LARGA = 200;

/** las formaciones como esterillas que se desenrollan al bajar: el largo de cada una es proporcional a sus horas */
export function Tapis() {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      gsap.utils.toArray<HTMLElement>(".tapis-fila", raiz.current).forEach((fila) => {
        const tapis = fila.querySelector<HTMLElement>(".tapis");
        const rollo = fila.querySelector<HTMLElement>(".tapis-rollo");
        if (!tapis || !rollo) return;
        // el rollo arranca a la izquierda, gordo, y llega al final más finito: se le fue desenrollando la esterilla
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: fila, start: "top 84%", end: "top 50%", scrub: 0.6, invalidateOnRefresh: true },
          })
          .fromTo(tapis, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)" }, 0)
          .fromTo(rollo, { x: () => -tapis.offsetWidth, scale: 1.3 }, { x: 0, scale: 1 }, 0);
      });
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="formations" className="py-[clamp(5rem,12vw,9rem)]">
      <div className="contenedor">
        <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)]">Mes formations</h2>
        <p className="mt-5 max-w-[32rem] text-[1.15rem] leading-relaxed">La longueur de chaque tapis correspond à la durée de la formation.</p>
        <ul className="mt-12 space-y-10 lg:mt-16 lg:space-y-12">
          {FORMACIONES.map((f) => (
            <li key={f.titulo} className="tapis-fila">
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="titre text-[clamp(2.4rem,5vw,3.8rem)]">{f.horas}&nbsp;h</span>
                <span className="text-[1.2rem] font-bold">{f.titulo}</span>
                {f.detalle && <span className="text-[1.05rem] opacity-75">{f.detalle}</span>}
              </div>
              <p className="mt-2 max-w-[40rem] text-[1.05rem] leading-relaxed opacity-85">{f.texto}</p>
              <div className="relative mt-4 pr-[clamp(0.8rem,1.4vw,1.1rem)]" style={{ width: `${(f.horas / MAS_LARGA) * 100}%` }}>
                <div
                  className="tapis h-[clamp(2.2rem,4.4vw,3.4rem)] rounded-[0.8rem] bg-celeste"
                  style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(57,70,58,0.08) 0 2px, transparent 2px 16px)" }}
                />
                {/* el rollo, con la espiral de la esterilla enrollada */}
                <span
                  className="tapis-rollo absolute top-1/2 right-0 grid h-[clamp(2.8rem,5.6vw,4.3rem)] w-[clamp(1.6rem,2.8vw,2.2rem)] -translate-y-1/2 place-items-center rounded-[45%] bg-celeste shadow-[inset_0_0_0_999px_rgba(57,70,58,0.14)]"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 20 40" className="h-[70%] w-[70%]" fill="none" stroke="var(--color-pagina)" strokeWidth={1.6} strokeLinecap="round" opacity={0.7}>
                    <path d="M10 20 C 10 17 13 17 13 20 C 13 25 7 25 7 20 C 7 12 16 12 16 20 C 16 30 4 30 4 20 C 4 8 18 8 18 20" />
                  </svg>
                </span>
              </div>
            </li>
          ))}
        </ul>
        <ul className="mt-14 grid gap-6 border-t border-verde/20 pt-8 text-[1.12rem] leading-relaxed sm:grid-cols-2">
          <li>
            <span className="block font-bold">Une formation continue en thérapie des fascias</span>
            Les fascias sont les tissus qui enveloppent et relient les muscles et les organes, comme un réseau dans tout le
            corps.
          </li>
          <li>
            <span className="block font-bold">Enregistrée auprès de Yoga Alliance</span>
            Yoga Alliance est un registre international de professeur.es et d’écoles de yoga. Il ne délivre pas de diplôme&nbsp;:
            il répertorie les formations qui suivent ses standards.
          </li>
        </ul>
      </div>
    </section>
  );
}
