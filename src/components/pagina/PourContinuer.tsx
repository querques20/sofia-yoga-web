"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { rutaEn } from "@/lib/idiomas";
import { useInterfaz } from "@/lib/useInterfaz";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useRuta } from "@/lib/useRuta";

// a dónde se puede seguir desde cada página (los textos, en cada idioma, están en la interfaz)
const DESTINOS = {
  prenatal: "/yoga-prenatal-geneve",
  postPartum: "/yoga-post-partum-geneve",
  cours: "/cours-de-yoga-geneve",
  prives: "/cours-prives-yoga-geneve",
  ateliers: "/ateliers-evenements",
  aPropos: "/a-propos",
};

type Destino = keyof typeof DESTINOS;

/** al final de cada página, las que tienen que ver con ella: las líneas se dibujan y al pasar se corre el título */
export function PourContinuer({ destinos }: { destinos: Destino[] }) {
  const t = useInterfaz().seguir;
  const { idioma } = useRuta();
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      gsap.fromTo(
        q(".seguir-linea"),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: q(".seguir")[0], start: "top 84%" } },
      );
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} className="pt-[clamp(2rem,6vw,4rem)] pb-[clamp(4rem,10vw,7rem)]">
      <div className="contenedor">
        <h2 className="titre text-[clamp(2.2rem,5vw,3.6rem)]">{t.titulo}</h2>
        <ul className="seguir mt-8 lg:mt-10">
          {destinos.map((clave) => {
            const destino = { href: rutaEn(idioma, DESTINOS[clave]), ...t.destinos[clave] };
            return (
              <li key={clave} className="relative">
                <span className="seguir-linea absolute inset-x-0 top-0 h-px origin-left bg-verde/25" aria-hidden="true" />
                <Link href={destino.href} className="group grid items-center gap-x-10 gap-y-1 py-6 sm:grid-cols-[1fr_auto] lg:grid-cols-[minmax(0,24rem)_1fr_auto] lg:py-7">
                  <span className="titre text-[clamp(1.9rem,4vw,3rem)] transition-transform duration-700 ease-souple group-hover:translate-x-3">
                    {destino.titulo}
                  </span>
                  <span className="max-w-[34rem] text-[1.08rem] leading-relaxed opacity-80 sm:col-start-1 lg:col-start-auto">{destino.texto}</span>
                  <svg
                    viewBox="0 0 48 24"
                    className="hidden h-6 w-12 text-violeta transition-transform duration-500 ease-souple group-hover:translate-x-1 sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:block lg:col-start-auto lg:row-span-1 lg:row-start-auto"
                    aria-hidden="true"
                  >
                    <path d="M2 12 C 16 9 30 15 44 12 M36 5 L 45 12 L 36 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
