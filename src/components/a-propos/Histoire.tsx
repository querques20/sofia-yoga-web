"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type TextosHistoire = { titulo: string; etapas: { etapa: string; texto: string }[] };

/**
 * Su historia: en compu, a la izquierda queda fija la etapa que estás leyendo, que se arma letra por letra
 * (como los trimestres del inicio), con el índice abajo. Cada párrafo se enciende mientras lo leés
 */
export function Histoire({ t }: { t: TextosHistoire }) {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    (context) => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      // el matchMedia va por afuera del contexto de useGSAP (anidado, GSAP lo deshace dos veces) y se deshace abajo
      let mm: gsap.MatchMedia | null = null;
      context.ignore(() => {
        mm = gsap.matchMedia().add("(min-width: 64rem)", () => {
          const titulos = q(".historia-titulo");
          const partes = titulos.map((t) => SplitText.create(t, { type: "chars", mask: "chars" }));
          const letras = partes.map((p) => p.chars);
          const indice = q(".historia-indice li");
          gsap.set(titulos, { visibility: "visible" });
          letras.slice(1).forEach((l) => gsap.set(l, { yPercent: 115 }));
          gsap.set(indice.slice(1), { opacity: 0.38 });

          let actual = 0;
          const mostrar = (i: number) => {
            if (i === actual) return;
            // si bajás, la etapa vieja sale por arriba; si subís, por abajo
            const baja = i > actual ? 1 : -1;
            gsap.to(letras[actual], { yPercent: -115 * baja, stagger: 0.02, duration: 0.35, ease: "power2.in", overwrite: true });
            gsap.fromTo(letras[i], { yPercent: 115 * baja }, { yPercent: 0, stagger: 0.02, duration: 0.45, delay: 0.12, ease: "power2.out", overwrite: true });
            gsap.to(indice[actual], { opacity: 0.38, duration: 0.3, overwrite: true });
            gsap.to(indice[i], { opacity: 1, duration: 0.3, overwrite: true });
            actual = i;
          };
          q(".historia-parrafo").forEach((parrafo, i) => {
            ScrollTrigger.create({
              trigger: parrafo,
              start: "top 55%",
              end: "bottom 55%",
              onToggle: (self) => {
                if (self.isActive) mostrar(i);
              },
            });
          });
          return () => partes.forEach((p) => p.revert());
        });
      });

      q(".historia-parrafo p").forEach((p) => {
        gsap.fromTo(
          p,
          { opacity: 0.25 },
          { opacity: 1, ease: "none", scrollTrigger: { trigger: p, start: "top 86%", end: "top 56%", scrub: 0.5 } },
        );
      });

      return () => mm?.revert();
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="histoire" className="py-[clamp(3rem,8vw,6rem)]">
      <div className="contenedor">
        <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)]">{t.titulo}</h2>
        <div className="mt-6 grid gap-12 lg:mt-0 lg:grid-cols-12">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[30vh]">
              {/* con menos movimiento no hay etapa que se arme: queda solo el índice */}
              {!quieto && (
                <div className="marco-titulos titre text-[clamp(3rem,5.2vw,4.8rem)] text-violeta" aria-hidden="true">
                  {t.etapas.map((e) => (
                    <p key={e.etapa} className="historia-titulo">
                      {e.etapa}
                    </p>
                  ))}
                </div>
              )}
              <ol className="historia-indice mt-10 space-y-2 text-[1.05rem] font-bold" aria-hidden="true">
                {t.etapas.map((e) => (
                  <li key={e.etapa}>{e.etapa}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className="lg:col-span-7">
            {t.etapas.map((e) => (
              <article key={e.etapa} className="historia-parrafo py-6 lg:flex lg:min-h-[52vh] lg:flex-col lg:justify-center lg:py-[8vh]">
                <h3 className="titre text-[1.9rem] text-violeta lg:sr-only">{e.etapa}</h3>
                <p className="mt-3 text-[clamp(1.3rem,2.2vw,1.65rem)] leading-[1.45] lg:mt-0">{e.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
