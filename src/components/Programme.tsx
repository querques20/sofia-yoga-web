"use client";

import { useRef } from "react";
import { enlaceWhatsApp, MENSAJES } from "@/lib/contacto";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { escucharSouffle } from "@/lib/souffle";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useRuta } from "@/lib/useRuta";
import { Magnetique } from "./Magnetique";
import { Parte } from "./programme/Parte";
import { aparecerPanza, crecerPanza, PanzaQueCrece, respirarPanza } from "./programme/PanzaQueCrece";

export type TextosProgramme = {
  intro: [string, string];
  // el ordinal va en superíndice, como se escribe en cada idioma (1er, 1st, 1.er)
  trimestre: string;
  trimestres: { n: string; sufijo: string; mois: string }[];
  trimestresAria: string;
  yang: string;
  yin: string;
  juntas: string;
  formato: string;
  accord: string;
  cierre: { antes: string; mano: string };
  avisar: string;
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
  const { idioma } = useRuta();
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      const titulos = q(".marco-titulo");
      const partes = q(".marco-nombre").map((t) => SplitText.create(t, { type: "chars", mask: "chars" }));
      const letras = partes.map((p) => p.chars);
      const meses = q(".marco-mois");
      const lineas = q(".indice-linea");
      const items = q(".indice-item");
      const [yang] = q(".forma-yang");
      const [yin] = q(".forma-yin");

      // arranca con el primer trimestre armado y los otros esperando abajo
      gsap.set(titulos, { visibility: "visible" });
      gsap.set([...letras[1], ...letras[2]], { yPercent: 115 });
      gsap.set(meses.slice(1), { opacity: 0, y: 8 });
      gsap.set(lineas, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(items.slice(1), { opacity: 0.38 });
      gsap.set([yang, yin], { transformOrigin: "50% 50%" });
      gsap.set(q(".juntas"), { opacity: 0, y: 8 });

      const sale = { yPercent: -115, stagger: 0.03, duration: 0.4, ease: "power2.in" };
      const entra = { yPercent: 0, stagger: 0.03, duration: 0.45, ease: "power2.out" };
      const seVa = { opacity: 0, y: -8, duration: 0.3, ease: "power2.in" };
      const llega = { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" };

      const tl = gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q(".fijo")[0],
            start: "top top",
            end: () => "+=" + window.innerHeight * 2.8,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
        .to(lineas[0], { scaleX: 1, duration: 1 }, 0)
        // del primero al segundo: cambian las letras y los meses, y crece la panza
        .to(letras[0], sale, 1)
        .to(meses[0], seVa, 1)
        .to(letras[1], entra, 1.2)
        .to(meses[1], llega, 1.35)
        .to(items[0], { opacity: 0.38, duration: 0.2 }, 1)
        .to(items[1], { opacity: 1, duration: 0.2 }, 1)
        .to(lineas[1], { scaleX: 1, duration: 1 }, 1.25)
        // del segundo al tercero
        .to(letras[1], sale, 2.3)
        .to(meses[1], seVa, 2.3)
        .to(letras[2], entra, 2.5)
        .to(meses[2], llega, 2.65)
        .to(items[1], { opacity: 0.38, duration: 0.2 }, 2.3)
        .to(items[2], { opacity: 1, duration: 0.2 }, 2.3)
        .to(lineas[2], { scaleX: 1, duration: 1 }, 2.55)
        // al final se dice lo que tienen en común los tres
        .to(q(".juntas"), { opacity: 1, y: 0, duration: 0.4 }, 3.5)
        .to({}, { duration: 0.35 });

      // la embarazada: llega cuando aparece el marco, cambia de trimestre con las letras y respira con la web
      const plantaAlPrincipio = crecerPanza(tl, q, [1, 2.3], 0.8);
      aparecerPanza(q, q(".marco")[0]);
      const dejarDeRespirar = respirarPanza(q);

      // las dos partes respiran a contratiempo
      const escalaYang = gsap.quickSetter(yang, "scale");
      const escalaYin = gsap.quickSetter(yin, "scale");
      const dejar = escucharSouffle((v) => {
        escalaYang(0.88 + v * 0.18);
        escalaYin(1.08 - v * 0.14);
      });

      return () => {
        dejar();
        dejarDeRespirar();
        plantaAlPrincipio();
        partes.forEach((p) => p.revert());
      };
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  const encabezado = (
    <>
      <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)]">
        Grossesse en <span className="mano inline-block text-[1.1em]">mouvement</span>
      </h2>
      <p className="mt-6 max-w-[30rem] text-[1.1rem] leading-relaxed">
        {t.intro[0]}
      </p>
      <p className="mt-3 max-w-[30rem] text-[1.1rem] leading-relaxed">{t.intro[1]}</p>
    </>
  );

  return (
    <section ref={raiz} id="grossesse" className="relative bg-salvia-clara">
      <div className="contenedor pt-[clamp(5rem,12vw,8rem)] lg:hidden">{encabezado}</div>

      <div className="fijo contenedor grid min-h-svh content-center gap-6 py-8 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-0">
        <div className="lg:col-span-5">
          <div className="hidden lg:block">{encabezado}</div>
          <ol className="grid grid-cols-3 gap-3 lg:mt-12 lg:grid-cols-1 lg:gap-5" aria-label={t.trimestresAria}>
            {t.trimestres.map((tri) => (
              <li key={tri.n} className="indice-item">
                <span className="titre block text-[1.15rem] lg:text-[1.7rem]">
                  <Trimestre n={tri.n} sufijo={tri.sufijo} palabra={t.trimestre} />
                  <span className="sr-only">, {tri.mois.toLowerCase()}</span>
                </span>
                <span className="mt-2 block h-[3px] overflow-hidden rounded-full bg-verde/15" aria-hidden="true">
                  <span className="indice-linea block h-full bg-verde" />
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-7">
          <div className="marco relative grid h-[min(64svh,38rem)] grid-cols-[1fr_auto] grid-rows-[auto_1fr_auto] gap-x-4 overflow-hidden rounded-[2rem] bg-arena p-6 lg:h-[min(76svh,40rem)] lg:p-10">
            <div className="marco-titulos titre col-span-2 text-[clamp(2.6rem,7.6vw,6rem)]" aria-hidden="true">
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
            <div className="flex flex-col justify-end gap-3 pb-2">
              <Parte clase="forma-yang" color="var(--color-salvia)" texto={t.yang} />
              <Parte clase="forma-yin" color="var(--color-celeste)" texto={t.yin} />
              <p className="juntas mt-1 text-[1.02rem]">{t.juntas}</p>
            </div>
            <div className="min-h-0 w-[min(40vw,10.5rem)] lg:w-[min(17vw,15.5rem)]">
              <PanzaQueCrece />
            </div>
            <p className="col-span-2 text-[1rem] leading-snug lg:text-[1.1rem]">{t.formato}</p>
          </div>
          <p className="mt-4 text-[0.95rem] opacity-80">{t.accord}</p>
        </div>
      </div>

      <div className="contenedor flex flex-col items-start gap-8 pt-6 pb-[clamp(5rem,12vw,8rem)] lg:flex-row lg:items-end lg:justify-between">
        <p className="titre text-[clamp(2.2rem,5.6vw,4.2rem)]">
          {t.cierre.antes} <span className="mano inline-block text-[1.1em]">{t.cierre.mano}</span>
        </p>
        <Magnetique>
          {/* va directo al WhatsApp con el pedido ya escrito, en lugar de bajar al bloque de contacto */}
          <a className="boton" href={enlaceWhatsApp(MENSAJES[idioma].programme)} target="_blank" rel="noopener noreferrer">
            {t.avisar}
          </a>
        </Magnetique>
      </div>
    </section>
  );
}
