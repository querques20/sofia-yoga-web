"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Fleur } from "../Fleur";

const ETAPAS = ["Tout en douceur", "Un peu plus", "Plus exigeant"];

// la onda de la intensidad: arranca casi quieta y hacia la derecha se vuelve más alta y más seguida.
// Se calcula una sola vez y da lo mismo en el servidor que en el navegador
const ANCHO = 1000;
const ALTO = 300;
function trazarOnda() {
  const pasos = 260;
  let fase = 0;
  let d = "";
  for (let i = 0; i <= pasos; i++) {
    const t = i / pasos;
    const amplitud = 6 + 128 * t ** 1.5;
    fase += 0.045 + 0.17 * t;
    d += `${i ? "L" : "M"}${(t * ANCHO).toFixed(1)} ${(ALTO / 2 - Math.sin(fase) * amplitud).toFixed(1)}`;
  }
  return d;
}
const ONDA = trazarOnda();

/**
 * Cómo se vuelve a moverse en el post-partum: por intensidad progresiva (lo dijo Sofía el 30/9).
 * La escena queda fija: la onda se dibuja mientras bajás, la flor la recorre y el nombre de la etapa
 * se arma letra por letra, como los trimestres del inicio
 */
export function Intensite() {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      const [svg] = q(".onda-svg") as unknown as SVGSVGElement[];
      const [onda] = q(".onda") as unknown as SVGPathElement[];
      const [flor] = q(".onda-flor");
      const titulos = q(".etapa-titulo");
      const partes = titulos.map((t) => SplitText.create(t, { type: "chars", mask: "chars" }));
      const letras = partes.map((p) => p.chars);

      gsap.set(titulos, { visibility: "visible" });
      gsap.set([...letras[1], ...letras[2]], { yPercent: 115 });

      // la flor va montada sobre la onda: se ubica en el punto del recorrido, pasado a píxeles
      // (si el dibujo quedara más chico que su caja, va centrado: de ahí la escala menor y el corrimiento)
      const largo = onda.getTotalLength();
      const ponerX = gsap.quickSetter(flor, "x", "px");
      const ponerY = gsap.quickSetter(flor, "y", "px");
      const girar = gsap.quickSetter(flor, "rotation", "deg");
      const avance = { p: 0 };
      const ponerFlor = () => {
        const punto = onda.getPointAtLength(avance.p * largo);
        const escala = Math.min(svg.clientWidth / ANCHO, svg.clientHeight / ALTO);
        ponerX((svg.clientWidth - ANCHO * escala) / 2 + punto.x * escala);
        ponerY((svg.clientHeight - ALTO * escala) / 2 + punto.y * escala);
        girar(avance.p * 300);
      };
      ponerFlor();

      const sale = { yPercent: -115, stagger: 0.03, duration: 0.35, ease: "power2.in" };
      const entra = { yPercent: 0, stagger: 0.03, duration: 0.4, ease: "power2.out" };

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q(".fijo")[0],
            start: "top top",
            end: () => "+=" + window.innerHeight * 2.2,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onRefresh: ponerFlor,
          },
        })
        .fromTo(onda, { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 3 }, 0)
        .to(avance, { p: 1, duration: 3, onUpdate: ponerFlor }, 0)
        .to(letras[0], sale, 0.9)
        .to(letras[1], entra, 1.05)
        .to(letras[1], sale, 1.9)
        .to(letras[2], entra, 2.05)
        .to({}, { duration: 0.3 });

      return () => partes.forEach((p) => p.revert());
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="intensite" className="relative overflow-x-clip bg-salvia-clara">
      <div className="fijo contenedor flex min-h-svh flex-col justify-center gap-8 py-12 lg:gap-10 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)]">Une intensité progressive</h2>
            <p className="mt-5 max-w-[30rem] text-[1.15rem] leading-relaxed">
              On commence par le plus doux, et l’intensité monte petit à petit, jusqu’au plus exigeant.
            </p>
          </div>
          <div className="marco-titulos titre text-[clamp(2.2rem,5.4vw,4.4rem)] text-violeta lg:col-span-6 lg:text-right" aria-hidden="true">
            {ETAPAS.map((etapa) => (
              <p key={etapa} className="etapa-titulo">
                {etapa}
              </p>
            ))}
          </div>
        </div>

        {/* en pantallas bajas la onda se angosta (sin deformarse) para que la escena entre entera */}
        <div className="mx-auto w-full max-w-[120svh]">
          <div className="relative">
            <svg viewBox={`0 0 ${ANCHO} ${ALTO}`} className="onda-svg block h-auto w-full overflow-visible" aria-hidden="true">
              <path d={ONDA} fill="none" stroke="var(--color-verde)" strokeOpacity={0.14} strokeWidth={2} vectorEffect="non-scaling-stroke" />
              <path d={ONDA} className="onda" fill="none" stroke="var(--color-violeta)" strokeWidth={3} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
            {!quieto && (
              <span className="onda-flor absolute top-0 left-0 -mt-[1.2rem] -ml-[1.2rem] grid h-[2.4rem] w-[2.4rem] place-items-center" aria-hidden="true">
                <Fleur className="h-full w-full text-verde" trazo={9} />
              </span>
            )}
          </div>
          <div className="mt-6 flex justify-between text-[1rem] font-bold">
            <span>Le plus doux</span>
            <span>Le plus exigeant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
