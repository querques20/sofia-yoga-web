"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { rutaEn } from "@/lib/idiomas";
import { escucharSouffle } from "@/lib/souffle";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useRuta } from "@/lib/useRuta";
import { arriveAsDome } from "./programme/arrival";
import { leaveAsDome } from "./programme/departure";
import { Parte } from "./programme/Parte";
import { aparecerPanza, crecerPanza, respirarPanza } from "./programme/panza";
import { PanzaQueCrece } from "./programme/PanzaQueCrece";

export type TextosProgramme = {
  /** the title in two parts: the second is written by hand */
  titulo: [string, string];
  intro: [string, string];
  /** the link to the prenatal page, at the end of the intro */
  masInfo: string;
  // el ordinal va en superíndice, como se escribe en cada idioma (1er, 1st, 1.er)
  trimestre: string;
  /** the labels of the frame's two texts: what changes in the body, how the practice adapts */
  cuerpo: string;
  practica: string;
  trimestres: { n: string; sufijo: string; mois: string; cuerpo: string; practica: string }[];
  trimestresAria: string;
  /** why moving is good, said once the three trimesters are told */
  porque: string;
};

function Trimestre({ n, sufijo, palabra }: { n: string; sufijo: string; palabra: string }) {
  return (
    <>
      {n}
      <sup className="sufijo">{sufijo}</sup> {palabra}
    </>
  );
}

export function Programme({ t }: { t: TextosProgramme }) {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();
  const { idioma } = useRuta();

  useGSAP(
    () => {
      if (quieto) return;
      // On a computer the panel is a card that stays inside the screen, under the menu, and the card itself is
      // what gets pinned; on a phone the scene needs the whole screen, so only the scene is pinned and the panel
      // scrolls behind it. The setup runs again when the window crosses from one to the other
      const mm = gsap.matchMedia();
      // undoing a pinned scene sends the page to the top: when the window crosses over (a tablet turned
      // around), the page goes back to where the reader was
      let lastScroll = 0;
      let crossedAt: number | null = null;
      const remember = () => {
        lastScroll = window.scrollY;
      };
      window.addEventListener("scroll", remember, { passive: true });
      mm.add({ wide: "(min-width: 64rem)", narrow: "(max-width: 63.999rem)" }, (context) => {
        const wide = Boolean(context.conditions?.wide);
        const panel = raiz.current?.querySelector<HTMLElement>(".programme-panel");
        if (!panel) return;
        // where the card rests on a computer: the 6rem of `lg:h-[calc(100svh-7.5rem)]` that go above it
        const restTop = () => (wide ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 6 : 0);
        const q = gsap.utils.selector(raiz);
        const backTo = crossedAt;
        crossedAt = null;
        const titulos = q(".marco-titulo");
        const partes = q(".marco-nombre").map((t) => SplitText.create(t, { type: "chars", mask: "chars" }));
        const letras = partes.map((p) => p.chars);
        const meses = q(".marco-mois");
        const lineas = q(".indice-linea");
        const items = q(".indice-item");
        const [yang] = q(".forma-yang");
        const [yin] = q(".forma-yin");
        const cuerpos = q(".pila-cuerpo > *");
        const practicas = q(".pila-practica > *");

        // arranca con el primer trimestre armado y los otros esperando abajo
        gsap.set(titulos, { visibility: "visible" });
        gsap.set([...letras[1], ...letras[2]], { yPercent: 115 });
        gsap.set(meses.slice(1), { opacity: 0, y: 8 });
        gsap.set(lineas, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(items.slice(1), { opacity: 0.38 });
        gsap.set([yang, yin], { transformOrigin: "50% 50%" });
        gsap.set([...cuerpos.slice(1), ...practicas.slice(1)], { autoAlpha: 0, y: 8 });
        gsap.set(q(".marco-porque"), { opacity: 0, y: 8 });

        const sale = { yPercent: -115, stagger: 0.03, duration: 0.4, ease: "power2.in" };
        const entra = { yPercent: 0, stagger: 0.03, duration: 0.45, ease: "power2.out" };
        const seVa = { opacity: 0, y: -8, duration: 0.3, ease: "power2.in" };
        const llega = { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" };
        // the two texts change with the trimester, a little after its name
        const seApaga = { autoAlpha: 0, y: -8, duration: 0.3, ease: "power2.in" };
        const aparece = { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" };

        const tl = gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: wide ? panel : q(".fijo")[0],
              start: () => `top ${restTop()}px`,
              end: () => "+=" + window.innerHeight * 2.8,
              pin: true,
              // measured before every scene below it, whatever the order they were set up in (this one is set
              // up again when the window crosses from phone to computer): they all count on the room it takes
              refreshPriority: 1,
              scrub: 0.7,
              invalidateOnRefresh: true,
              // pinning a little early hides the late pin of a touch scroll, but it moves what it pins to its
              // place in one frame: the card would jump the last stretch of its way up. Only the phone's scene
              anticipatePin: wide ? 0 : 1,
            },
          })
          .to(lineas[0], { scaleX: 1, duration: 1 }, 0)
          // del primero al segundo: cambian las letras y los meses, y crece la panza
          .to(letras[0], sale, 1)
          .to(meses[0], seVa, 1)
          .to(letras[1], entra, 1.2)
          .to(meses[1], llega, 1.35)
          .to([cuerpos[0], practicas[0]], seApaga, 1.05)
          .to([cuerpos[1], practicas[1]], { ...aparece, stagger: 0.08 }, 1.4)
          .to(items[0], { opacity: 0.38, duration: 0.2 }, 1)
          .to(items[1], { opacity: 1, duration: 0.2 }, 1)
          .to(lineas[1], { scaleX: 1, duration: 1 }, 1.25)
          // del segundo al tercero
          .to(letras[1], sale, 2.3)
          .to(meses[1], seVa, 2.3)
          .to(letras[2], entra, 2.5)
          .to(meses[2], llega, 2.65)
          .to([cuerpos[1], practicas[1]], seApaga, 2.35)
          .to([cuerpos[2], practicas[2]], { ...aparece, stagger: 0.08 }, 2.7)
          .to(items[1], { opacity: 0.38, duration: 0.2 }, 2.3)
          .to(items[2], { opacity: 1, duration: 0.2 }, 2.3)
          .to(lineas[2], { scaleX: 1, duration: 1 }, 2.55)
          // at the end, what holds for the three: why moving is good
          .to(q(".marco-porque"), { opacity: 1, y: 0, duration: 0.4 }, 3.5)
          .to({}, { duration: 0.35 });

        // la embarazada: llega cuando aparece el marco, cambia de trimestre con las letras y respira con la web
        const plantaAlPrincipio = crecerPanza(tl, q, [1, 2.3], 0.8);
        aparecerPanza(q, q(".marco")[0]);
        const dejarDeRespirar = respirarPanza(q);

        // the panel takes the screen from the cover as a dome that swells (programme/arrival.ts). The cover is
        // what comes before this section on the Home
        const cover = raiz.current?.previousElementSibling?.querySelector<HTMLElement>("[data-hero]") ?? null;
        const body = panel.querySelector<HTMLElement>(".programme-body");
        if (!body) return;
        const copy = cover?.querySelector<HTMLElement>("[data-hero-copy]") ?? null;
        const riders = q("[data-arrive]") as HTMLElement[];
        const leaveArrival = arriveAsDome(body, { box: panel, riders, restTop, cover, copy, lands: wide });
        // and gives it back the same way, once its scene is told: the next scene waits under it (departure.ts)
        const leaveDeparture = raiz.current ? leaveAsDome(body, { box: raiz.current, riders, takesOff: wide }) : () => {};

        // las dos partes respiran a contratiempo
        const escalaYang = gsap.quickSetter(yang, "scale");
        const escalaYin = gsap.quickSetter(yin, "scale");
        const dejar = escucharSouffle((v) => {
          escalaYang(0.88 + v * 0.18);
          escalaYin(1.08 - v * 0.14);
        });

        if (backTo !== null) {
          ScrollTrigger.refresh();
          window.scrollTo({ top: backTo, behavior: "instant" });
        }

        return () => {
          crossedAt = lastScroll;
          dejar();
          leaveDeparture();
          leaveArrival();
          dejarDeRespirar();
          plantaAlPrincipio();
          partes.forEach((p) => p.revert());
        };
      });
      return () => {
        window.removeEventListener("scroll", remember);
        mm.revert();
      };
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  // On a computer the card is as tall as the screen, so what it holds is sized by the screen's height as well as
  // its width (the svh in each clamp): on a short laptop screen it all gets smaller and still fits the card
  const encabezado = (
    <>
      <h2 className="titre text-[clamp(2.4rem,5.4vw,4.4rem)] lg:text-[clamp(2.2rem,min(5.4vw,7.6svh),4.4rem)]">
        {t.titulo[0]} <span className="mano inline-block text-[1.1em] text-salvia">{t.titulo[1]}</span>
      </h2>
      <p className="mt-6 max-w-[30rem] text-[1.1rem] leading-relaxed text-pagina/85 lg:mt-[clamp(0.9rem,2.6svh,1.5rem)] lg:text-[clamp(0.98rem,2.1svh,1.1rem)]">{t.intro[0]}</p>
      <p className="mt-3 max-w-[30rem] text-[1.1rem] leading-relaxed text-pagina/85 lg:text-[clamp(0.98rem,2.1svh,1.1rem)]">
        {t.intro[1]}{" "}
        {/* a link in the sentence and not a button: the card is as tall as the screen and has no room for a row
            of its own. The prenatal page has the whole of it, with each source */}
        <Link className="enlace font-bold whitespace-nowrap text-pagina" href={rutaEn(idioma, "/yoga-prenatal-geneve")}>
          {t.masInfo}
        </Link>
      </p>
    </>
  );

  return (
    // The Home's dark band: a panel with the page showing around it. On a computer it is a card as tall as the
    // screen less the menu above and some air below (6rem + 1.5rem). It goes above the cover, which waits behind
    // it on a computer (`.hero-stage` in globals.css). The panel is the box that gets pinned on a computer; its
    // body is what is seen, and what the arrival moves and clips (programme/arrival.ts). On a phone the scene is
    // pinned inside the body (`position: fixed`), so there no transform or filter may stay on the body
    <section ref={raiz} id="grossesse" className="relative z-10 px-3 pb-3 lg:px-6 lg:pb-6">
      <div className="programme-panel lg:h-[calc(100svh-7.5rem)]">
        <div className="programme-body rounded-[2rem] bg-verde text-pagina lg:h-full lg:rounded-[2.75rem]">
          <div data-arrive className="contenedor pt-[clamp(5rem,12vw,8rem)] lg:hidden">{encabezado}</div>

          <div className="fijo contenedor grid min-h-svh content-center gap-6 py-8 lg:h-full lg:min-h-0 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-0">
            <div data-arrive className="lg:col-span-5">
              <div className="hidden lg:block">{encabezado}</div>
              <ol className="grid grid-cols-3 gap-3 lg:mt-[clamp(1.25rem,4.5svh,3rem)] lg:grid-cols-1 lg:gap-[clamp(0.6rem,2svh,1.25rem)]" aria-label={t.trimestresAria}>
                {t.trimestres.map((tri) => (
                  <li key={tri.n} className="indice-item">
                    <span className="titre block text-[1.15rem] lg:text-[clamp(1.25rem,3.2svh,1.7rem)]">
                      <Trimestre n={tri.n} sufijo={tri.sufijo} palabra={t.trimestre} />
                      {/* a screen reader gets each trimester whole here: the frame is for the eye */}
                      <span className="sr-only">
                        , {tri.mois.toLowerCase()}. {t.cuerpo}. {tri.cuerpo} {t.practica}. {tri.practica}
                      </span>
                    </span>
                    <span className="mt-2 block h-[3px] overflow-hidden rounded-full bg-pagina/20" aria-hidden="true">
                      <span className="indice-linea block h-full bg-pagina" />
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div data-arrive className="min-w-0 lg:col-span-7">
              <div className="marco relative -mx-2 grid h-[min(64svh,38rem)] grid-cols-[minmax(0,1fr)_auto] grid-rows-[auto_1fr_auto] gap-x-3 overflow-hidden rounded-[1.6rem] bg-arena p-5 text-verde lg:mx-0 lg:h-[min(calc(100svh-7.5rem-clamp(3rem,17.3svh,9.5rem)),40rem)] lg:gap-x-4 lg:rounded-[2rem] lg:p-[clamp(1.5rem,4svh,2.5rem)]">
                <div className="marco-titulos titre col-span-2 text-[clamp(2.6rem,7.6vw,6rem)] lg:text-[clamp(2.6rem,min(7.6vw,9svh),6rem)]" aria-hidden="true">
                  {t.trimestres.map((tri) => (
                    <div key={tri.n} className="marco-titulo">
                      <p className="marco-nombre">
                        <Trimestre n={tri.n} sufijo={tri.sufijo} palabra={t.trimestre} />
                      </p>
                      <p className="marco-mois mt-2 font-sans text-[1rem] font-normal leading-snug tracking-normal normal-case opacity-80 lg:mt-3 lg:text-[1.1rem]">
                        {tri.mois}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-end gap-3 pb-2 lg:gap-[clamp(0.75rem,2svh,1.25rem)]">
                  <Parte clase="forma-yang" color="var(--color-salvia)" etiqueta={t.cuerpo} pila="pila-cuerpo" lineas={t.trimestres.map((tri) => ({ cual: <Trimestre n={tri.n} sufijo={tri.sufijo} palabra={t.trimestre} />, texto: tri.cuerpo }))} />
                  <Parte clase="forma-yin" color="var(--color-celeste)" etiqueta={t.practica} pila="pila-practica" lineas={t.trimestres.map((tri) => ({ cual: <Trimestre n={tri.n} sufijo={tri.sufijo} palabra={t.trimestre} />, texto: tri.practica }))} />
                </div>
                <div className="min-h-0 w-[min(32vw,10.5rem)] lg:w-[min(17vw,15.5rem)]">
                  <PanzaQueCrece />
                </div>
                <p className="marco-porque col-span-2 border-t border-verde/20 pt-2.5 text-[0.95rem] leading-snug lg:pt-[clamp(0.6rem,1.8svh,1rem)] lg:text-[clamp(0.84rem,min(2.05svh,1.25vw),1.05rem)]">{t.porque}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
