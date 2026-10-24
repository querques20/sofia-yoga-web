"use client";

import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

// los estilos que da hoy (confirmado el 30/9)
const ESTILOS = ["Vinyasa", "Yoga flow", "Yoga dynamique"];

// qué es cada uno, en una línea (definiciones generales; la del yoga dinámico es la de ella)
const DEFINICIONES = [
  { estilo: "Vinyasa", texto: "Les postures s’enchaînent de façon fluide, et chaque mouvement suit la respiration." },
  { estilo: "Yoga flow", texto: "Un nom souvent donné au vinyasa : on passe d’une posture à l’autre sans s’arrêter, au rythme du souffle." },
  { estilo: "Yoga dynamique", texto: "Un yoga en mouvement, plus tonique, pour te concentrer sur ton corps et bouger en conscience." },
];

// la ola por donde corren las palabras: arranca y termina afuera de la pantalla
const CAMINO = "M-260 236 C -60 96 140 96 360 216 S 780 336 1000 206 S 1400 96 1700 196";

/**
 * Los estilos corren sobre una ola, como un flow: el texto avanza solo, se apura si bajás rápido y
 * cambia de sentido si subís (igual que la franja del inicio). Abajo, su forma de enseñar en sus palabras
 */
export function Flux() {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    (_, contextSafe) => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      const [texto] = q(".flux-texto");
      const [tanda] = q(".flux-tanda") as unknown as SVGTextContentElement[];
      let vigia: ScrollTrigger | null = null;
      let vivo = true;

      // el largo de una tanda depende de la fuente: se mide cuando ya llegó
      const arrancar = contextSafe!(() => {
        if (!vivo) return;
        const largo = tanda.getComputedTextLength();
        // corre exactamente una tanda y vuelve a empezar: como las tandas son iguales, el empalme no se ve.
        // Arranca adelantada para que también pueda ir para atrás cuando subís
        const vuelta = gsap.fromTo(texto, { attr: { startOffset: 0 } }, { attr: { startOffset: -largo }, duration: 26, ease: "none", repeat: -1 });
        vuelta.totalTime(vuelta.duration() * 50);
        let sentido = 1;
        vigia = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            sentido = self.direction;
            const empuje = 1 + Math.min(5, Math.abs(self.getVelocity()) / 500);
            gsap.to(vuelta, { timeScale: empuje * sentido, duration: 0.25, overwrite: true });
            gsap.to(vuelta, { timeScale: sentido, duration: 1.4, delay: 0.25, ease: "power2.out" });
          },
        });
      });
      document.fonts.ready.then(arrancar);

      return () => {
        vivo = false;
        vigia?.kill();
      };
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="styles" className="overflow-hidden pb-[clamp(5rem,12vw,9rem)]">
      <svg viewBox="0 0 1440 340" className="block h-auto w-full overflow-visible" aria-hidden="true">
        <defs>
          <path id="flux-camino" d={CAMINO} />
        </defs>
        <path d={CAMINO} fill="none" stroke="var(--color-salvia)" strokeWidth={1.5} strokeDasharray="2 12" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <text className="titre" fontSize={112} fill="var(--color-verde)">
          <textPath href="#flux-camino" className="flux-texto" startOffset="0">
            {[0, 1, 2].map((tanda) => (
              <tspan key={tanda} className="flux-tanda">
                {ESTILOS.map((estilo) => (
                  <Fragment key={estilo}>
                    {estilo}
                    <tspan className="mano" fill="var(--color-violeta)" fontSize={128}>
                      {" ~ "}
                    </tspan>
                  </Fragment>
                ))}
              </tspan>
            ))}
          </textPath>
        </text>
      </svg>

      <div className="contenedor mt-[clamp(3rem,8vw,6rem)] grid gap-8 lg:grid-cols-12">
        <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)] lg:col-span-5">Ma façon d’enseigner</h2>
        {/* sus palabras de los audios del 30/9, pasadas al francés: las tiene que revisar ella */}
        <div className="space-y-6 lg:col-span-7">
          <p className="text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.22]">
            Une pratique dynamique, différente et joyeuse, pour te concentrer sur ton corps et surtout bouger en conscience.
          </p>
          <p className="max-w-[36rem] text-[1.15rem] leading-relaxed">
            Le plus important, c’est de t’amuser et d’y prendre du plaisir. Le résultat physique n’est qu’une conséquence.
          </p>
        </div>
      </div>

      {/* los tres nombres, explicados: el que llega sin saber qué es cada uno entiende qué va a hacer */}
      <dl className="contenedor mt-[clamp(3rem,7vw,5rem)] grid gap-8 sm:grid-cols-3 sm:gap-6">
        {DEFINICIONES.map((d) => (
          <div key={d.estilo} className="border-t border-verde/25 pt-5">
            <dt className="titre text-[clamp(1.7rem,3vw,2.3rem)] text-violeta">{d.estilo}</dt>
            <dd className="mt-3 text-[1.08rem] leading-relaxed">{d.texto}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
