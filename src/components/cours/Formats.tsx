"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { AConfirmer } from "../pagina/AConfirmer";

type Icono = { className?: string };

// las esterillas vistas desde arriba, en línea: tres para el grupo, una para el privado, y una bajo un árbol para el parque
function Esterilla({ x }: { x: number }) {
  return <path d={`M${x + 4} 10 C ${x + 4} 8 ${x + 6} 7 ${x + 8} 7 L ${x + 18} 7 C ${x + 20} 7 ${x + 22} 8 ${x + 22} 10 L ${x + 22} 56 C ${x + 22} 58 ${x + 20} 59 ${x + 18} 59 L ${x + 8} 59 C ${x + 6} 59 ${x + 4} 58 ${x + 4} 56 Z`} />;
}

function IconoGrupo({ className }: Icono) {
  return (
    <svg viewBox="0 0 96 64" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <Esterilla x={8} />
      <Esterilla x={36} />
      <Esterilla x={64} />
    </svg>
  );
}

function IconoPrivado({ className }: Icono) {
  return (
    <svg viewBox="0 0 96 64" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <Esterilla x={22} />
      <g transform="translate(68 32) scale(0.17)">
        {Array.from({ length: 6 }, (_, i) => (
          <ellipse key={i} cx="0" cy="-52" rx="24" ry="52" transform={`rotate(${i * 60})`} strokeWidth={11} />
        ))}
      </g>
    </svg>
  );
}

function IconoParque({ className }: Icono) {
  return (
    <svg viewBox="0 0 96 64" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* la copa del árbol: elipses encimadas, nada de círculos */}
      <ellipse cx="24" cy="20" rx="15" ry="12" transform="rotate(-12 24 20)" />
      <ellipse cx="36" cy="16" rx="13" ry="11" transform="rotate(16 36 16)" />
      <path d="M30 28 C 30 38 29 48 30 59" />
      <Esterilla x={56} />
    </svg>
  );
}

const FORMATS: { titulo: string; texto: ReactNode; Icono: (props: Icono) => ReactNode }[] = [
  { titulo: "En groupe", texto: "Le cours collectif, pour pratiquer avec d’autres.", Icono: IconoGrupo },
  { titulo: "En privé", texto: "Un cours rien que pour toi.", Icono: IconoPrivado },
  {
    titulo: "Au parc",
    texto: (
      <>
        Le yoga en plein air. La saison et les lieux sont <AConfirmer />
      </>
    ),
    Icono: IconoParque,
  },
];

/** los tres formatos (en grupo, en privado, en el parque): las líneas y los dibujos se trazan al bajar */
export function Formats() {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      gsap.utils.toArray<HTMLElement>(".formato", raiz.current).forEach((formato) => {
        gsap.fromTo(
          formato.querySelector(".formato-linea"),
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: formato, start: "top 92%", end: "top 58%", scrub: 0.6 } },
        );
        gsap.fromTo(
          formato.querySelectorAll(".formato-icono path, .formato-icono ellipse"),
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 1.1,
            stagger: 0.08,
            ease: "power2.inOut",
            scrollTrigger: { trigger: formato, start: "top 72%", toggleActions: "play none none reverse" },
          },
        );
      });
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="formats" className="pb-[clamp(4rem,10vw,7rem)]">
      <div className="contenedor">
        <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)]">Trois façons de pratiquer</h2>
        <ul className="mt-10 lg:mt-14">
          {FORMATS.map(({ titulo, texto, Icono }) => (
            <li key={titulo} className="formato relative grid gap-x-8 gap-y-3 py-8 lg:grid-cols-12 lg:items-center lg:py-10">
              <span className="formato-linea absolute inset-x-0 top-0 h-px origin-left bg-verde/25" aria-hidden="true" />
              <Icono className="formato-icono h-14 w-20 text-violeta lg:col-span-2" />
              <h3 className="titre text-[clamp(2.6rem,6vw,4.6rem)] lg:col-span-5">{titulo}</h3>
              <p className="max-w-[28rem] text-[1.15rem] leading-relaxed lg:col-span-5">{texto}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 border-t border-verde/25 pt-8 text-[1.15rem]">
          Tu es enceinte&nbsp;?{" "}
          <Link className="enlace font-bold" href="/yoga-prenatal-geneve">
            Le yoga prénatal est fait pour toi
          </Link>
        </p>
      </div>
    </section>
  );
}
