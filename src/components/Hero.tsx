"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { CONTACTO } from "@/lib/contacto";
import { telonAbierto } from "@/lib/entrada";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Magnetique } from "./Magnetique";
import { Respiration, type TextosRespiration } from "./Respiration";

export type TextosHero = {
  // el título: «antes» + palabra manuscrita + «despues», y en otro renglón el lugar (la búsqueda local)
  antes: string;
  mano: string;
  despues: string;
  lugar: string;
  sub: string;
  whatsapp: string;
  buscar: string;
  respiracion: TextosRespiration;
};

// si las fuentes tardan, no dejamos el título escondido más de esto
const ESPERA_FUENTES = 500;

export function Hero({ t }: { t: TextosHero }) {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    (_, contextSafe) => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      let partido: SplitText | null = null;
      let arranco = false;

      const animar = contextSafe!(() => {
        if (arranco) return;
        arranco = true;
        const [titulo] = q(".hero-titulo");
        const [palabra] = q(".hero-titulo .mano");
        partido = SplitText.create(titulo, { type: "lines", mask: "lines" });
        gsap.set(q(".hero-texto .entra"), { visibility: "visible" });

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(partido.lines, { yPercent: 108, duration: 1.1, stagger: 0.12 }, 0.1)
          // la palabra en manuscrita se escribe de izquierda a derecha
          .fromTo(
            palabra,
            { clipPath: "inset(-60% 100% -60% -5%)" },
            { clipPath: "inset(-60% -5% -60% -5%)", duration: 1.2, ease: "power2.inOut", clearProps: "clipPath" },
            0.6,
          )
          .from(q(".hero-sub, .hero-acciones"), { opacity: 0, y: 16, duration: 0.9, stagger: 0.12 }, 0.55)
          .add(() => partido?.revert());
      });

      // al bajar, la ilustración se queda un poco atrás: da profundidad
      gsap.to(q(".hero-ilustracion"), {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: raiz.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });

      // arranca cuando se abre el telón de la entrada; si las fuentes tardan, no espera más de la cuenta.
      // «vivo» evita que una promesa de un montaje anterior (React monta dos veces en desarrollo) anime de nuevo
      let reloj = 0;
      let vivo = true;
      telonAbierto().then(() => {
        if (!vivo) return;
        reloj = window.setTimeout(animar, ESPERA_FUENTES);
        document.fonts.ready.then(() => {
          window.clearTimeout(reloj);
          if (vivo) animar();
        });
      });
      return () => {
        vivo = false;
        window.clearTimeout(reloj);
        partido?.revert();
      };
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="inicio" className="relative overflow-hidden pt-24 pb-20 lg:flex lg:min-h-svh lg:items-center lg:pt-28 lg:pb-24">
      {/* en el celular va arriba del texto; en compu queda grande, a la derecha */}
      <div className="hero-ilustracion relative mx-auto aspect-[400/520] w-[min(58vw,15.5rem)] lg:absolute lg:top-1/2 lg:right-[2vw] lg:mx-0 lg:h-[min(90svh,54rem)] lg:w-auto lg:-translate-y-1/2">
        <Respiration t={t.respiracion} />
      </div>
      <div className="contenedor relative z-10 mt-12 lg:mt-0">
        <div className="hero-texto max-w-[54rem]">
          <h1 className="hero-titulo titre entra text-[clamp(3.2rem,10.5vw,6rem)]">
            {/* «à Genève» va en el H1: es la búsqueda local que pide el sitemap (frente on-page). Va en su renglón
                y con espacio fijo, así nunca queda la «à» sola al final de una línea */}
            {t.antes} <span className="mano mr-[0.12em] inline-block text-[1.12em]">{t.mano}</span> {t.despues}
            <br />
            {t.lugar}
          </h1>
          <p className="hero-sub entra mt-7 max-w-[34rem] text-[1.15rem] leading-relaxed lg:text-[1.25rem]">
            {t.sub}
          </p>
          <div className="hero-acciones entra mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Magnetique>
              <a className="boton" href={CONTACTO.whatsapp} target="_blank" rel="noopener noreferrer">
                {t.whatsapp}
              </a>
            </Magnetique>
            <a className="enlace font-bold" href="#pour-qui">
              {t.buscar}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
