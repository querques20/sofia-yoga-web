"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Ejemplo = { cita: string; de: string; clase: string };

export type TextosTestimonials = {
  titulo: string;
  /** the word on each sample: it says the card is not a real testimonial */
  ejemplo: string;
  ejemplos: Ejemplo[];
};

// the cards take the palette's three light colours, in an order that never puts two alike side by side, the
// place where a row starts again included; the second row starts on another colour
const COLOURS = ["bg-pagina", "bg-celeste-clara", "bg-arena", "bg-celeste-clara"];
const COLOURS_BACK = ["bg-arena", "bg-pagina", "bg-celeste-clara", "bg-pagina"];
// each row is written this many times over, so that it has no end as it goes round (.voix-rang, globals.css)
const COPIES = [0, 1, 2];
// how far to each side the rows wait before they come in, in px
const COME_FROM = 220;

function Row({ ejemplos, ejemplo, back }: { ejemplos: Ejemplo[]; ejemplo: string; back: boolean }) {
  const colours = back ? COLOURS_BACK : COLOURS;
  return (
    <div data-row className="pt-2 pb-10">
      <ul className="voix-rang" data-back={back || undefined}>
        {COPIES.map((copy) =>
          ejemplos.map((e, i) => (
            // the copies are there for the eye only: a screen reader gets each card once
            <li key={`${copy}-${e.cita}`} data-copy={copy > 0 || undefined} aria-hidden={copy > 0 || undefined} className="mr-6 shrink-0 lg:mr-10">
              <figure className={`flex h-full min-h-[13.5rem] w-[min(80vw,25rem)] overflow-hidden rounded-[0.5rem] text-verde shadow-[8px_12px_24px_rgba(0,0,0,0.24)] ${colours[i % colours.length]}`}>
                <span className="flex w-14 shrink-0 items-start justify-center border-r border-verde/20 pt-10 lg:w-16 lg:pt-12">
                  <span className="rotate-180 text-[0.72rem] font-bold tracking-[0.1em] whitespace-nowrap uppercase [writing-mode:vertical-rl]">{e.clase}</span>
                </span>
                <span className="flex flex-1 flex-col p-5 lg:p-6">
                  <blockquote className="text-[1.02rem] leading-normal">{e.cita}</blockquote>
                  <figcaption className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 text-[0.95rem]">
                    <span className="font-bold">{e.de}</span>
                    <span className="rounded-full border border-dashed border-verde/45 px-2.5 py-px text-[0.86rem] whitespace-nowrap">{ejemplo}</span>
                  </figcaption>
                </span>
              </figure>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

/**
 * What her students say, at the top of the closing band (Closing), laid out as on lottiemurphy.com, with its
 * measures (cards of 25 by 13.5rem with the class on a side tab, 2.5rem apart, a centred title well clear of
 * the band's top): two rows of cards in three colours that go round slowly, one each way, off both edges
 * (docs/research/2026-11-24-testimonials-and-closing.md). No card is ever taken away to show another, and the
 * rows stop under the pointer, so a quote can be read to its end. With reduced motion they stand still and are
 * moved by hand (globals.css). There is no pause button (the owner's word, 2026-11-24).
 *
 * Sofia has not given any testimonial yet. Until she does, the cards are SAMPLES, written by us so that the
 * page can be seen with its shape: each one is marked as an example and they name no one. They are not to be published as they are: hers replace these
 */
export function Testimonials({ t }: { t: TextosTestimonials }) {
  const raiz = useRef<HTMLDivElement>(null);
  const quieto = useReducedMotion();
  const half = Math.ceil(t.ejemplos.length / 2);

  // the rows come in from the two sides, once, when the band has brought them into view
  useGSAP(
    () => {
      if (quieto) return;
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]", raiz.current);
      gsap.from(rows, {
        x: (i) => (i % 2 ? -COME_FROM : COME_FROM),
        opacity: 0,
        duration: 1.3,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: raiz.current, start: "top 58%", once: true },
      });
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <div ref={raiz} id="temoignages">
      <div className="contenedor text-center">
        <h2 className="titre mx-auto max-w-[17ch] text-[clamp(2.4rem,4.6vw,3.6rem)] text-balance">{t.titulo}</h2>
      </div>

      <div className="voix mt-[clamp(2.25rem,5vw,4rem)] grid">
        <Row ejemplos={t.ejemplos.slice(0, half)} ejemplo={t.ejemplo} back={false} />
        <Row ejemplos={t.ejemplos.slice(half)} ejemplo={t.ejemplo} back />
      </div>
    </div>
  );
}
