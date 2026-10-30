"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { rutaEn } from "@/lib/idiomas";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useRuta } from "@/lib/useRuta";
import { Fleur } from "./Fleur";

// cada puerta dice para quién es, lo único que sabemos seguro de cada cosa, y su ilustración (el texto viene en t)
const PUERTAS = [
  { href: "/yoga-prenatal-geneve", imagen: "/ilustraciones/embarazada.svg", ancho: 400, alto: 520 },
  { href: "/yoga-post-partum-geneve", imagen: "/ilustraciones/posparto.svg", ancho: 400, alto: 520 },
  { href: "/cours-de-yoga-geneve", imagen: "/ilustraciones/cours.svg", ancho: 560, alto: 420 },
];

export type TextosPourQui = {
  titulo: string;
  puertas: { frase: string; detalle: string; alt: string }[];
};

export function PourQui({ t }: { t: TextosPourQui }) {
  const { idioma } = useRuta();
  const raiz = useRef<HTMLElement>(null);
  const vista = useRef<HTMLDivElement>(null);
  const quieto = useReducedMotion();

  // las líneas que separan las puertas se dibujan mientras bajás
  useGSAP(
    () => {
      if (quieto) return;
      gsap.utils.toArray<HTMLElement>(".puerta-linea", raiz.current).forEach((linea) => {
        gsap.fromTo(
          linea,
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: linea, start: "top 92%", end: "top 55%", scrub: 0.6 } },
        );
      });
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  // con mouse: la ilustración de cada puerta flota, sigue al cursor y se inclina según cómo lo movés
  useGSAP(
    (_, contextSafe) => {
      const lista = raiz.current?.querySelector<HTMLElement>(".puertas");
      const el = vista.current;
      if (!lista || !el || quieto || !window.matchMedia("(pointer: fine)").matches) return;
      gsap.set(el, { autoAlpha: 0, scale: 0.7, yPercent: -50 });
      const imagenes = el.querySelectorAll(".vista-imagen");
      let ultimoX = 0;

      const mostrar = contextSafe!((indice: number) => {
        gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power3.out", overwrite: "auto" });
        gsap.to(imagenes, {
          opacity: (i: number) => (i === indice ? 1 : 0),
          scale: (i: number) => (i === indice ? 1 : 0.94),
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
      const esconder = contextSafe!(() => {
        gsap.to(el, { autoAlpha: 0, scale: 0.7, rotation: 0, duration: 0.45, ease: "power2.inOut", overwrite: "auto" });
      });
      const seguir = contextSafe!((e: PointerEvent) => {
        const giro = gsap.utils.clamp(-9, 9, (e.clientX - ultimoX) * 0.7);
        ultimoX = e.clientX;
        gsap.to(el, { x: e.clientX + 40, y: e.clientY, rotation: giro, duration: 0.7, ease: "power3.out", overwrite: "auto" });
      });

      const filas = Array.from(lista.querySelectorAll<HTMLElement>(":scope > li"));
      const alEntrar = filas.map((_fila, i) => () => mostrar(i));
      filas.forEach((fila, i) => fila.addEventListener("pointerenter", alEntrar[i]));
      lista.addEventListener("pointermove", seguir);
      lista.addEventListener("pointerleave", esconder);
      return () => {
        filas.forEach((fila, i) => fila.removeEventListener("pointerenter", alEntrar[i]));
        lista.removeEventListener("pointermove", seguir);
        lista.removeEventListener("pointerleave", esconder);
      };
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="pour-qui" className="py-[clamp(5rem,12vw,9rem)]">
      <div className="contenedor">
        <h2 className="titre text-[clamp(2.4rem,6vw,4.4rem)]">{t.titulo}</h2>
        <ul className="puertas mt-10 lg:mt-14">
          {PUERTAS.map((puerta, i) => (
            <li key={puerta.href} className="relative">
              <span className="puerta-linea absolute inset-x-0 top-0 block h-px origin-left bg-salvia" aria-hidden="true" />
              <Link
                href={rutaEn(idioma, puerta.href)}
                className="group relative flex items-center justify-between gap-6 overflow-hidden py-7 lg:py-10"
              >
                {/* la banda salvia que entra al pasar el mouse */}
                <span
                  className="absolute inset-0 origin-left scale-x-0 bg-salvia-clara transition-transform duration-700 ease-souple group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  aria-hidden="true"
                />
                <span className="relative transition-transform duration-700 ease-souple group-hover:translate-x-4 lg:pl-1">
                  <span className="titre block text-[clamp(1.9rem,4.6vw,3.6rem)]">{t.puertas[i].frase}</span>
                  <span className="mt-2 block max-w-[38rem] text-[1.05rem] opacity-80">{t.puertas[i].detalle}</span>
                </span>
                {/* en el celular no hay mouse: la ilustración va chiquita en la misma fila */}
                <Image
                  src={puerta.imagen}
                  alt=""
                  width={puerta.ancho}
                  height={puerta.alto}
                  unoptimized
                  className="relative h-24 w-auto shrink-0 pointer-fine:hidden"
                />
                <Fleur
                  className="relative h-11 w-11 shrink-0 text-violeta transition-transform duration-700 ease-souple group-hover:rotate-60 pointer-coarse:hidden lg:mr-4"
                  trazo={7}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* la ilustración que flota con el mouse */}
      <div ref={vista} className="pointer-events-none fixed top-0 left-0 z-30 h-[24rem] w-[23rem]" aria-hidden="true">
        {PUERTAS.map((puerta, i) => (
          <Image
            key={puerta.href}
            src={puerta.imagen}
            alt={t.puertas[i].alt}
            fill
            unoptimized
            loading="eager"
            className="vista-imagen object-contain opacity-0"
          />
        ))}
      </div>
    </section>
  );
}
