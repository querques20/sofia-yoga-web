"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

// su bio del 18/7, párrafo por párrafo, con las correcciones sugeridas (falta que ella las valide).
// El párrafo de las escuelas no va hasta que confirme si quiere contarlo en la web
const ETAPAS = [
  {
    etapa: "Le sport",
    texto:
      "Intéressée par le sport et la santé dès mon plus jeune âge, j’ai pratiqué la gymnastique artistique, la natation et le hockey sur gazon avant de me tourner vers le yoga.",
  },
  {
    etapa: "Le marketing",
    texto:
      "Parallèlement, j’ai étudié le marketing et travaillé dans ce domaine pendant quelques années, jusqu’au jour où je me suis rendu compte que cela ne me correspondait pas et ne me rendait pas heureuse.",
  },
  {
    etapa: "2019",
    texto:
      "En 2019, j’ai quitté la ville où je suis née pour me consacrer à mon épanouissement personnel, prendre le temps de voyager et me redécouvrir.",
  },
  {
    etapa: "L’Inde",
    texto:
      "Un voyage en Inde m’a menée à approfondir ma pratique de yoga, me conduisant à me former en Ashtanga-Vinyasa, et cela m’a permis de comprendre à quel point le bien-être physique et le spirituel étaient liés.",
  },
  {
    etapa: "La Suisse",
    texto:
      "J’ai continué à alimenter ma soif d’apprendre avec une formation en thérapie des fascias et en yin yoga en Suisse, ce qui m’a permis d’explorer une dimension plus profonde de ma pratique.",
  },
  {
    etapa: "Aujourd’hui",
    texto:
      "Aujourd’hui, je propose un enseignement dynamique alliant pranayama, mouvement fonctionnel et système myofascial, dans un cadre bienveillant et inclusif, car je crois fermement que le yoga est pour touxtes ! Nul besoin d’être fort.e ou souple, viens comme tu es :)",
  },
];

/**
 * Su historia: en compu, a la izquierda queda fija la etapa que estás leyendo, que se arma letra por letra
 * (como los trimestres del inicio), con el índice abajo. Cada párrafo se enciende mientras lo leés
 */
export function Histoire() {
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
        <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)]">Mon histoire</h2>
        <div className="mt-6 grid gap-12 lg:mt-0 lg:grid-cols-12">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[30vh]">
              {/* con menos movimiento no hay etapa que se arme: queda solo el índice */}
              {!quieto && (
                <div className="marco-titulos titre text-[clamp(3rem,5.2vw,4.8rem)] text-violeta" aria-hidden="true">
                  {ETAPAS.map((e) => (
                    <p key={e.etapa} className="historia-titulo">
                      {e.etapa}
                    </p>
                  ))}
                </div>
              )}
              <ol className="historia-indice mt-10 space-y-2 text-[1.05rem] font-bold" aria-hidden="true">
                {ETAPAS.map((e) => (
                  <li key={e.etapa}>{e.etapa}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className="lg:col-span-7">
            {ETAPAS.map((e) => (
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
