"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { rutaEn } from "@/lib/idiomas";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useRuta } from "@/lib/useRuta";
import { FleurQuiRespire } from "../FleurQuiRespire";

export type TextosInvitation = {
  /** her sentence, in the lines of the title, and its ending in handwriting */
  lineas: [string, string];
  mano: string;
  presentacion: string;
  ensenanza: string;
  /** the link to her story, on the About page */
  historia: string;
};

/**
 * The Home's third scene, after the programme: Sofia's invitation, in her own words («viens comme tu es»), and
 * who is speaking. A light band, as the programme's is the dark one. The sentence rises line by line
 * when it comes into view and its ending writes itself, as «à Genève» does in the hero; that is the scene's one
 * entrance. The long version of all this lives on the About page: here it is three sentences and a link
 */
export function Invitation({ t }: { t: TextosInvitation }) {
  const raiz = useRef<HTMLElement>(null);
  const { idioma } = useRuta();
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      const q = gsap.utils.selector(raiz);
      // with reduced motion everything stays in its place, as the CSS leaves it
      if (quieto) return;
      const lineas = q("[data-linea] > span");
      const [mano] = q("[data-mano]");
      const resto = q("[data-resto]");

      gsap.set(lineas, { yPercent: 112 });
      gsap.set(mano, { clipPath: "inset(-30% 100% -30% -5%)" });
      gsap.set(resto, { opacity: 0, y: 16 });
      gsap.set(q(".entra"), { visibility: "visible" });

      gsap
        .timeline({ scrollTrigger: { trigger: raiz.current, start: "top 68%", once: true } })
        .to(lineas, { yPercent: 0, duration: 1.05, stagger: 0.09, ease: "power3.out", clearProps: "transform" })
        // the ending does not rise: it writes itself from left to right
        .to(mano, { clipPath: "inset(-30% -5% -30% -5%)", duration: 1.1, ease: "power2.inOut", clearProps: "clipPath" }, 0.4)
        .to(resto, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", clearProps: "opacity,transform" }, 0.7);
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="sofia" className="px-3 lg:px-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-salvia-clara lg:rounded-[2.75rem]">
        {/* the site's flower, breathing with the rest of the page: mostly out of the band, barely there. The
            opacity is on the whole drawing, not on its stroke: petals that cross would add up and show */}
        <FleurQuiRespire className="pointer-events-none absolute -top-[34%] -right-[20%] h-[min(48rem,96vw)] w-[min(48rem,96vw)] text-verde opacity-[0.06]" />

        <div className="contenedor relative py-[clamp(4.5rem,11vw,9rem)]">
          <h2 className="titre entra text-[clamp(2.6rem,9vw,8.25rem)]">
            {/* each line is its own mask: the entrance raises them one by one. The space is for whoever reads
                the HTML without styles: the lines are blocks */}
            {t.lineas.map((linea) => (
              <span key={linea} data-linea className="-mt-[0.14em] block overflow-hidden pt-[0.14em]">
                <span className="block">{linea}</span>{" "}
              </span>
            ))}
            <span className="block pb-[0.12em]">
              <span data-mano className="mano inline-block text-[1.14em] leading-[0.95]">
                {t.mano}
              </span>
            </span>
          </h2>

          <div className="entra mt-[clamp(2.75rem,7vw,5.5rem)] grid gap-x-12 gap-y-6 border-t border-verde/15 pt-8 lg:grid-cols-12">
            <p data-resto className="text-[1.2rem] leading-[1.45] font-bold lg:col-span-4">
              {t.presentacion}
            </p>
            <div data-resto className="lg:col-span-6 lg:col-start-6">
              <p className="max-w-[36rem] text-[1.12rem] leading-relaxed">{t.ensenanza}</p>
              <p className="mt-6">
                <Link className="enlace font-bold" href={rutaEn(idioma, "/a-propos")}>
                  {t.historia}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
