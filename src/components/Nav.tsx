"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { rutaEn } from "@/lib/idiomas";
import { CONTACTO_PAGINA, esActual, PAGINAS } from "@/lib/navegacion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useRuta } from "@/lib/useRuta";
import { FleurQuiRespire } from "./FleurQuiRespire";
import { SelectorDeIdioma } from "./idioma/SelectorDeIdioma";
import { MenuMovil } from "./nav/MenuMovil";
import { crearIntroPildora, introPildoraHecha, saltarIntroPildora } from "./nav/intro-pildora";

/**
 * El menú con la forma del de ED: en escritorio, una píldora flotante centrada (crema translúcida y desenfocada)
 * con la flor, los links y el botón de contacto. En el Inicio arranca cerrada con el nombre y se abre.
 * En el celular la marca va suelta y el botón es una islita. Queda siempre a la vista, también al bajar.
 */
export function Nav() {
  const ref = useRef<HTMLElement>(null);
  const { idioma, ruta } = useRuta();
  const enInicio = ruta === "/";
  const quieto = useReducedMotion();

  useGSAP(
    (context) => {
      const nav = ref.current;
      // si se llegó por otra página, o si la entrada ya se vio en esta visita, el menú arranca abierto
      if (!enInicio || document.documentElement.classList.contains("entrada-vista")) {
        saltarIntroPildora();
        return;
      }
      if (!nav || quieto || introPildoraHecha()) return;
      // solo en compu. El matchMedia se arma por afuera del contexto de useGSAP: anidado, GSAP deshacía
      // la bienvenida dos veces y los links quedaban escondidos al pasar a otra página
      let mm: gsap.MatchMedia | null = null;
      context.ignore(() => {
        mm = gsap.matchMedia().add("(min-width: 64rem)", (contexto) => crearIntroPildora(nav, contexto));
      });
      return () => mm?.revert();
    },
    // si se cambia de página a mitad de la bienvenida, se deshace y el menú queda abierto
    { dependencies: [quieto, enInicio], revertOnUpdate: true },
  );

  return (
    <nav
      ref={ref}
      aria-label="Navigation principale"
      className="fixed top-4 right-4 left-4 z-50 flex items-center justify-between gap-3 lg:right-auto lg:left-1/2 lg:w-max lg:max-w-[calc(100vw-2rem)] lg:-translate-x-1/2 lg:justify-start lg:gap-2 lg:rounded-[1.4rem] lg:border lg:border-verde/10 lg:bg-pagina/75 lg:py-2.5 lg:pr-2.5 lg:pl-4 lg:shadow-[0_18px_40px_-28px_rgba(57,70,58,0.55)] lg:backdrop-blur-xl"
    >
      {/* en el celular la marca es otra islita, como el botón: así no se pisa con los títulos al bajar */}
      <Link
        href={rutaEn(idioma, "/")}
        data-fuera-del-menu
        aria-label="Sofia Yoga, accueil"
        className="flex h-12 shrink-0 items-center gap-2 rounded-3xl border border-verde/10 bg-pagina/90 pr-4 pl-1.5 shadow-[0_8px_24px_-12px_rgba(57,70,58,0.45)] backdrop-blur-md lg:h-auto lg:gap-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none"
      >
        <FleurQuiRespire className="h-9 w-9 text-violeta" />
        {/* en el celular el nombre queda siempre; en escritorio solo lo muestra la entrada del Inicio */}
        <span className="titre text-[1.35rem] tracking-[0.02em] lg:hidden">Sofia Yoga</span>
        <span data-nav-marca className="hidden overflow-hidden whitespace-nowrap lg:block" style={{ width: 0, opacity: 0 }}>
          <span className="titre inline-block pl-2.5 text-[1.4rem] tracking-[0.02em]">Sofia Yoga</span>
        </span>
      </Link>

      <div data-nav-links data-fuera-del-menu className="hidden items-center overflow-hidden whitespace-nowrap lg:flex">
        <ul className="flex items-center gap-0.5 pr-2 pl-3 text-[15px] font-bold">
          {PAGINAS.map((pagina) => (
            <li key={pagina.href} data-nav-item>
              <Link
                href={rutaEn(idioma, pagina.href)}
                aria-current={esActual(ruta, pagina.href) ? "page" : undefined}
                className="block rounded-xl px-3 py-2 transition-colors duration-300 hover:bg-salvia-clara aria-[current=page]:bg-salvia-clara"
              >
                {pagina.texto}
              </Link>
            </li>
          ))}
        </ul>
        <div data-nav-item className="mr-2">
          <SelectorDeIdioma variante="pildora" />
        </div>
        <Link
          data-nav-item
          href={rutaEn(idioma, CONTACTO_PAGINA.href)}
          aria-current={esActual(ruta, CONTACTO_PAGINA.href) ? "page" : undefined}
          className="rounded-xl bg-terracota px-5 py-2.5 text-[15px] font-bold text-white transition-colors duration-300 hover:bg-[#9e5441]"
        >
          {CONTACTO_PAGINA.texto}
        </Link>
      </div>

      <MenuMovil />
    </nav>
  );
}
