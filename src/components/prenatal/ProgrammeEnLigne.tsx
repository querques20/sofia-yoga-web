"use client";

import { useRef, type ReactNode } from "react";
import { enlaceWhatsApp, MENSAJES } from "@/lib/contacto";
import { gsap, useGSAP } from "@/lib/gsap";
import { escucharSouffle } from "@/lib/souffle";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useRuta } from "@/lib/useRuta";
import { Magnetique } from "../Magnetique";
import { Parte } from "../programme/Parte";

export type TextosProgrammeEnLigne = {
  titulo: string;
  texto: ReactNode;
  /** su texto del programa, tal cual lo escribió (contexto maestro, sección 7) */
  cita: string;
  firma: string;
  etiquetaTrimestres: string;
  /** la etiqueta de cada trimestre (1.º, 2.º, 3.º) */
  trimestres: ReactNode[];
  yang: string;
  yin: string;
  boton: string;
};

// las dos partes de cada trimestre, chiquitas: la yang en salvia y la yin en celeste
function Formas() {
  return (
    <svg viewBox="0 0 110 50" className="h-9 w-20 overflow-visible" aria-hidden="true">
      <g className="forma-yang-mes" fill="var(--color-salvia)">
        <ellipse cx="30" cy="24" rx="22" ry="17" transform="rotate(-16 30 24)" />
        <ellipse cx="36" cy="30" rx="15" ry="12" transform="rotate(28 36 30)" />
      </g>
      <g className="forma-yin-mes" fill="var(--color-celeste)">
        <ellipse cx="80" cy="26" rx="20" ry="16" transform="rotate(14 80 26)" />
        <ellipse cx="74" cy="31" rx="14" ry="11" transform="rotate(-24 74 31)" />
      </g>
    </svg>
  );
}

/** para quien no puede venir: el programa en línea que viene, con los nueve meses que se recorren al bajar */
export function ProgrammeEnLigne({ t }: { t: TextosProgrammeEnLigne }) {
  const { idioma } = useRuta();
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      const tramos = q(".mes-tramo");
      const etiquetas = q(".mes-etiqueta");

      // la línea de los nueve meses avanza mientras bajás, y cada trimestre se enciende cuando llega
      gsap.set(etiquetas, { opacity: 0.35 });
      const recorrido = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: q(".meses")[0], start: "top 82%", end: "bottom 48%", scrub: 0.6 },
      });
      tramos.forEach((tramo, i) => {
        recorrido.to(etiquetas[i], { opacity: 1, duration: 0.15 }, i).fromTo(tramo, { scaleX: 0 }, { scaleX: 1, duration: 1 }, i);
      });

      // yang y yin respiran a contratiempo, como en el programa del inicio
      const yang = q(".forma-yang-mes");
      const yin = q(".forma-yin-mes");
      gsap.set([...yang, ...yin], { transformOrigin: "50% 50%" });
      const escalasYang = yang.map((forma) => gsap.quickSetter(forma, "scale"));
      const escalasYin = yin.map((forma) => gsap.quickSetter(forma, "scale"));
      return escucharSouffle((v) => {
        escalasYang.forEach((escala) => escala(0.88 + v * 0.18));
        escalasYin.forEach((escala) => escala(1.08 - v * 0.14));
      });
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="programme" className="py-[clamp(5rem,12vw,9rem)]">
      <div className="contenedor">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)]">{t.titulo}</h2>
            <p className="mt-6 max-w-[30rem] text-[1.1rem] leading-relaxed">{t.texto}</p>
          </div>
          <blockquote className="lg:col-span-7">
            <p className="text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.32]">{t.cita}</p>
            <footer className="mt-7 flex items-end gap-3">
              <span className="mano text-[clamp(2.4rem,4.6vw,3.4rem)]">{t.firma}</span>
              <svg viewBox="0 0 24 24" className="mb-[0.35em] h-8 w-8 shrink-0 text-violeta" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 21.2s-7.6-4.7-9.7-9.3C.8 8.6 2.6 4.5 6.4 4.1c2.2-.2 3.9 1 5.6 3.1 1.7-2.1 3.4-3.3 5.6-3.1 3.8.4 5.6 4.5 4.1 7.8-2.1 4.6-9.7 9.3-9.7 9.3z"
                />
              </svg>
            </footer>
          </blockquote>
        </div>

        <ol className="meses mt-16 grid grid-cols-3 gap-3 lg:mt-24 lg:gap-6" aria-label={t.etiquetaTrimestres}>
          {t.trimestres.map((etiqueta, i) => (
            <li key={i}>
              <span className="mes-etiqueta titre block text-[clamp(1.15rem,2.6vw,2rem)]">
                {etiqueta}
              </span>
              <span className="relative mt-3 block h-[3px] rounded-full bg-verde/15" aria-hidden="true">
                <span className="mes-tramo absolute inset-0 origin-left rounded-full bg-verde" />
              </span>
              {/* los tres meses de cada trimestre */}
              <span className="mt-2 flex justify-between" aria-hidden="true">
                {[0, 1, 2].map((mes) => (
                  <span key={mes} className="h-2 w-px bg-verde/35" />
                ))}
              </span>
              <span className="mt-4 block">
                <Formas />
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-8 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Parte clase="leyenda-yang" color="var(--color-salvia)" texto={t.yang} />
            <Parte clase="leyenda-yin" color="var(--color-celeste)" texto={t.yin} />
          </div>
          <Magnetique>
            <a className="boton" href={enlaceWhatsApp(MENSAJES[idioma].programme)} target="_blank" rel="noopener noreferrer">
              {t.boton}
            </a>
          </Magnetique>
        </div>
      </div>
    </section>
  );
}
