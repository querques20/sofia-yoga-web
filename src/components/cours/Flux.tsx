"use client";

import { Fragment, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** lo que la página le pasa: título, frases y los tres estilos con su definición (los estilos son los que da hoy, confirmado el 30/9) */
export type TextosFlux = {
  titulo: string;
  principal: string;
  secundario: string;
  definiciones: { estilo: string; texto: string }[];
};

// la ola por donde corren las palabras: arranca y termina afuera de la pantalla
const CAMINO = "M-260 236 C -60 96 140 96 360 216 S 780 336 1000 206 S 1400 96 1700 196";

/**
 * Los estilos corren sobre una ola, como un flow: el texto avanza solo, se apura si bajás rápido y
 * cambia de sentido si subís (igual que la franja del inicio). Abajo, su forma de enseñar en sus palabras
 */
export function Flux({ t, children }: { t: TextosFlux; children?: ReactNode }) {
  const estilos = t.definiciones.map((d) => d.estilo);
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
                {estilos.map((estilo) => (
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
        <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)] lg:col-span-5">{t.titulo}</h2>
        {/* sus palabras de los audios del 30/9: las tiene que revisar ella */}
        <div className="space-y-6 lg:col-span-7">
          <p className="text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.22]">
            {t.principal}
          </p>
          <p className="max-w-[36rem] text-[1.15rem] leading-relaxed">
            {t.secundario}
          </p>
        </div>
      </div>

      {/* los tres nombres, explicados: el que llega sin saber qué es cada uno entiende qué va a hacer */}
      <dl className="contenedor mt-[clamp(3rem,7vw,5rem)] grid gap-8 sm:grid-cols-3 sm:gap-6">
        {t.definiciones.map((d) => (
          <div key={d.estilo} className="border-t border-verde/25 pt-5">
            <dt className="titre text-[clamp(1.7rem,3vw,2.3rem)] text-violeta">{d.estilo}</dt>
            <dd className="mt-3 text-[1.08rem] leading-relaxed">{d.texto}</dd>
          </div>
        ))}
      </dl>
      {/* lo que va al cierre de la sección, por ejemplo el botón para escribirle */}
      {children}
    </section>
  );
}
