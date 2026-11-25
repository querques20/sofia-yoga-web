"use client";

import { useRef } from "react";
import { CONTACTO } from "@/lib/contacto";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useInterfaz } from "@/lib/useInterfaz";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Magnetique } from "../Magnetique";
import { arriveAsDome } from "../programme/arrival";
import { Moments } from "./Moments";
import { Testimonials, type TextosTestimonials } from "./Testimonials";

export type TextosClosing = {
  texto: string;
  /** the title over the strip of class photos */
  momentos: string;
};

// how far down the screen the band's top is when the band has its whole shape, as a share of the screen
const BAND_WHOLE_AT = 0.12;
// what the band holds reaches its edges: it shows once the dome is nearly square, or the dome would cut it
const CONTENTS_FROM = 0.8;

/**
 * The Home's last scene, before the footer, in parts that are read as one: what her students say, photos of
 * classes (Moments), then how to write to Sofia. The voices come right before the ask, where they answer the doubt it raises
 * (docs/research/2026-11-24-testimonials-and-closing.md). A dark band a whole screen tall, as the programme's
 * is, so that the light cards stand out on it; the ask is a sage card at its foot, with one button (WhatsApp,
 * her main channel) and the two other ways as plain links. The band takes the screen as the programme's panel
 * does: on a computer the look at a class before it (PreviewClass) waits in place, and the band rises over it
 * from the foot of the screen as a narrow dome that swells into the band, with what it holds settling into
 * place as it squares (programme/arrival.ts). On a phone the page is a plain column and the dome only passes.
 * The WhatsApp button goes to her real number: when testing, do not send the message
 */
export function Closing({ t, voces }: { t: TextosClosing; voces: TextosTestimonials }) {
  const ui = useInterfaz();
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      // with reduced motion the band is in its place, whole
      if (quieto || !raiz.current) return;
      const q = gsap.utils.selector(raiz);
      const [band] = q("[data-band]") as HTMLElement[];
      if (!band) return;
      const before = raiz.current.previousElementSibling;
      const cover = before instanceof HTMLElement && before.matches("[data-cover]") ? before : null;
      // the cover fills the screen and waits at its top. On a screen too short for it, it waits with its foot at
      // the foot of the screen instead (globals.css reads the measure)
      const placeCover = () => cover?.style.setProperty("--cover-top", `${Math.min(0, window.innerHeight - cover.offsetHeight)}px`);
      placeCover();
      ScrollTrigger.addEventListener("refreshInit", placeCover);
      const leaveArrival = arriveAsDome(band, {
        box: raiz.current,
        riders: q("[data-arrive]") as HTMLElement[],
        restTop: () => window.innerHeight * BAND_WHOLE_AT,
        cover,
        copy: null,
        lands: false,
        contentsFrom: CONTENTS_FROM,
      });
      return () => {
        ScrollTrigger.removeEventListener("refreshInit", placeCover);
        leaveArrival();
        cover?.style.removeProperty("--cover-top");
      };
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    // no space under the band: the word strip that follows brings its own, the same above and below it
    <section ref={raiz} className="relative px-3 lg:px-6">
      <div data-band className="overflow-hidden rounded-[2rem] bg-verde text-pagina lg:rounded-[2.75rem]">
        <div data-arrive className="flex flex-col gap-y-[clamp(2rem,4vw,3rem)] pt-[clamp(5rem,13vw,12rem)] pb-3 lg:min-h-[calc(100svh-1.5rem)] lg:pb-6">
          <Testimonials t={voces} />
          <Moments titulo={t.momentos} />
          {/* the ask is a card of its own inside the band: the sage of the page's other asks, on the dark */}
          <div id="ecris-moi" className="mx-3 mt-auto grid gap-x-12 gap-y-9 rounded-[1.5rem] bg-salvia p-[clamp(1.75rem,5vw,3.75rem)] text-verde lg:mx-6 lg:grid-cols-12 lg:items-end lg:rounded-[2.25rem]">
            <div className="lg:col-span-7">
              <h2 className="titre text-[clamp(3.6rem,10vw,7.5rem)]">{ui.escribime}</h2>
              <p className="mt-5 max-w-[32rem] text-[1.15rem] leading-relaxed">{t.texto}</p>
            </div>
            <div className="flex flex-col items-start gap-5 lg:col-span-5 lg:items-end lg:pb-2">
              <Magnetique>
                <a className="boton" href={CONTACTO.whatsapp} target="_blank" rel="noopener noreferrer">
                  {ui.escribirWhatsApp}
                </a>
              </Magnetique>
              <p className="flex flex-wrap gap-x-6 gap-y-2">
                <a className="enlace" href={`mailto:${CONTACTO.email}`}>
                  {ui.porMail}
                </a>
                <a className="enlace" href={CONTACTO.instagram} target="_blank" rel="noopener noreferrer">
                  {CONTACTO.instagramUsuario}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
