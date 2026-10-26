"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import Link from "next/link";
import { CONTACTO } from "@/lib/contacto";
import { CONTACTO_PAGINA, PAGINAS } from "@/lib/navegacion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Fleur } from "./Fleur";
import { FleurQuiRespire } from "./FleurQuiRespire";
import { IconoCorreo, IconoInstagram, IconoWhatsApp } from "./Iconos";

const NAV = [...PAGINAS, CONTACTO_PAGINA];

// sus formaciones, confirmadas el 30/9: van donde ED pone la tira de aliados. Yoga Alliance es un registro
// (no certifica), por eso «enregistrée»
const FORMACIONES = [
  "Enregistrée auprès de Yoga Alliance",
  "Ashtanga Vinyasa, en Inde",
  "Yin yoga et fascias, en Suisse",
  "Yoga pré et postnatal",
];

// las páginas que no están en el menú: van chiquitas abajo, al lado de los legales
const SECUNDARIAS = [
  { href: "/cours-prives-yoga-geneve", texto: "Cours privés" },
  { href: "/faq", texto: "Questions fréquentes" },
];

const CONTACTOS = [
  { href: CONTACTO.whatsapp, texto: CONTACTO.telefono, Icono: IconoWhatsApp, afuera: true },
  { href: `mailto:${CONTACTO.email}`, texto: CONTACTO.email, Icono: IconoCorreo, afuera: false },
  { href: CONTACTO.instagram, texto: CONTACTO.instagramUsuario, Icono: IconoInstagram, afuera: true },
];

export function Pied() {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);

      // el pie sube un poco más lento que la página, como si estuviera debajo
      gsap.fromTo(
        q(".pie-interior"),
        { yPercent: -14 },
        { yPercent: 0, ease: "none", scrollTrigger: { trigger: raiz.current, start: "top bottom", end: "top 25%", scrub: 0.6 } },
      );
      // las líneas de la navegación se dibujan una por una
      gsap.fromTo(
        q(".pie-linea"),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: q(".pie-nav")[0], start: "top 85%", toggleActions: "play none none reverse" },
        },
      );
      // y el nombre gigante se arma letra por letra al llegar al final
      const partido = SplitText.create(q(".pie-marca")[0], { type: "chars", mask: "chars" });
      gsap.fromTo(
        partido.chars,
        { yPercent: 105 },
        {
          yPercent: 0,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: { trigger: q(".pie-banda")[0], start: "top bottom", end: "bottom bottom", scrub: 0.6 },
        },
      );
      return () => partido.revert();
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <footer ref={raiz} className="relative overflow-hidden rounded-t-[2.5rem] bg-verde text-pagina lg:rounded-t-[4.5rem]">
      <div className="pie-interior">
        <div className="contenedor grid gap-x-12 gap-y-12 pt-16 lg:grid-cols-12 lg:pt-24">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <Link href="/" className="flex w-fit items-center gap-3" aria-label="Sofia Yoga, accueil">
              <FleurQuiRespire className="h-11 w-11 text-salvia" />
              <span className="titre text-[2.1rem] tracking-[0.02em]">Sofia Yoga</span>
            </Link>
            <p className="max-w-[24rem] text-[1.08rem] leading-relaxed text-pagina/85">
              Yoga prénatal, post-partum et cours de yoga dynamique à Genève, en groupe, en privé ou au parc.
            </p>
            <p className="max-w-[24rem] text-[1.08rem] text-salvia-clara">Ateliers et cours de yoga pour toutes et tous.</p>
            <ul className="mt-auto space-y-3">
              {CONTACTOS.map(({ href, texto, Icono, afuera }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(afuera ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center gap-3 text-pagina/85 transition-colors duration-300 hover:text-pagina"
                  >
                    <Icono className="h-5 w-5 text-salvia transition-transform duration-500 ease-souple group-hover:-rotate-6" />
                    <span>{texto}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="pie-nav lg:col-span-7" aria-label="Navigation du pied de page">
            <ul>
              {NAV.map((enlace) => (
                <li key={enlace.href} className="relative">
                  <span className="pie-linea absolute inset-x-0 top-0 block h-px origin-left bg-pagina/20" aria-hidden="true" />
                  <Link href={enlace.href} className="group flex items-center justify-between gap-6 py-4 lg:py-5">
                    <span className="titre text-[clamp(2rem,4.2vw,3.4rem)] transition-transform duration-700 ease-souple group-hover:translate-x-3">
                      {enlace.texto}
                    </span>
                    <svg
                      viewBox="0 0 48 24"
                      className="h-6 w-12 shrink-0 text-salvia opacity-0 transition-[opacity,translate] duration-500 ease-souple group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100"
                      aria-hidden="true"
                    >
                      <path d="M2 12 C 16 9 30 15 44 12 M36 5 L 45 12 L 36 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="contenedor mt-16 lg:mt-20">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-pagina/15 pt-8 text-center text-[1rem] text-pagina/80">
            {FORMACIONES.map((f, i) => (
              <li key={f} className="flex items-center gap-6">
                {i > 0 && <Fleur className="h-4 w-4 text-salvia" trazo={10} />}
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="contenedor mt-10 flex flex-col items-center gap-4 border-t border-pagina/15 py-6 text-center text-[0.92rem] text-pagina/65 lg:flex-row lg:justify-between lg:text-left">
          <p>© 2026 Sofia Yoga, Genève</p>
          <p>Version de test&nbsp;: les textes et les infos pratiques sont à confirmer.</p>
          {/* los legales todavía no existen: quedan como texto hasta tener sus páginas */}
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {SECUNDARIAS.map((enlace) => (
              <li key={enlace.href}>
                <Link className="enlace" href={enlace.href}>
                  {enlace.texto}
                </Link>
              </li>
            ))}
            <li>Mentions légales</li>
            <li>Confidentialité</li>
          </ul>
        </div>

        {/* la banda final: el nombre gigante, como el de ED, con la flor respirando */}
        <div className="pie-banda relative mt-4 overflow-hidden px-3 pb-6 lg:px-6">
          <div className="flex items-end justify-center gap-[1.5vw]" aria-hidden="true">
            <FleurQuiRespire className="mb-[2.2vw] h-[11vw] w-[11vw] shrink-0 text-salvia" />
            <p className="pie-marca titre whitespace-nowrap text-[19.5vw] leading-[0.8] text-salvia-clara">Sofia Yoga</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
