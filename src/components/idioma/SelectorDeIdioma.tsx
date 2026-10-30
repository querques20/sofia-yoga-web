"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IDIOMAS, type Idioma, NOMBRES, rutaEn } from "@/lib/idiomas";
import { guardarIdioma } from "@/lib/preferencia-idioma";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useRuta } from "@/lib/useRuta";

export const ETIQUETA: Record<Idioma, string> = { fr: "Langue", en: "Language", es: "Idioma" };

const ESTILOS = {
  // en la píldora del menú de escritorio: las siglas, con el resaltado salvia como los links
  pildora: {
    lista: "rounded-xl bg-verde/[0.06] p-1 text-[13px] tracking-[0.06em]",
    link: "px-2.5 py-1.5",
    indicador: "rounded-lg bg-pagina shadow-[0_4px_12px_-6px_rgba(57,70,58,0.5)]",
  },
  // en el panel verde del celular: los nombres enteros, en grande
  menu: {
    lista: "rounded-2xl border border-pagina/15 p-1 text-[1.02rem]",
    link: "px-4 py-2.5",
    indicador: "rounded-xl bg-pagina/15",
  },
};

/**
 * El cambio de idioma: un link por idioma a la misma página en ese idioma (rastreables, con hreflang). Al
 * elegir uno, el resaltado se desliza hasta él, se guarda la elección y recién ahí se navega
 */
export function SelectorDeIdioma({ variante, className = "" }: { variante: keyof typeof ESTILOS; className?: string }) {
  const { idioma, ruta } = useRuta();
  const router = useRouter();
  const quieto = useReducedMotion();
  const lista = useRef<HTMLDivElement>(null);
  const indicador = useRef<HTMLSpanElement>(null);
  const estilos = ESTILOS[variante];

  // el resaltado se para debajo del idioma actual (también al cambiar el tamaño de la letra o de la ventana)
  useGSAP(
    () => {
      const ubicar = () => {
        const actual = lista.current?.querySelector<HTMLElement>(`[data-idioma="${idioma}"]`);
        if (actual) gsap.set(indicador.current, { x: actual.offsetLeft, width: actual.offsetWidth, autoAlpha: 1 });
      };
      ubicar();
      const observador = new ResizeObserver(ubicar);
      if (lista.current) observador.observe(lista.current);
      return () => observador.disconnect();
    },
    { dependencies: [idioma], scope: lista },
  );

  const elegir = (evento: React.MouseEvent<HTMLAnchorElement>, destino: Idioma, href: string) => {
    // con Ctrl/Cmd o la rueda se abre en otra pestaña, como cualquier link
    if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.button !== 0) return;
    evento.preventDefault();
    if (destino === idioma) return;
    guardarIdioma(destino);
    const elegido = lista.current?.querySelector<HTMLElement>(`[data-idioma="${destino}"]`);
    if (quieto || !elegido) {
      router.push(href);
      return;
    }
    gsap.to(indicador.current, {
      x: elegido.offsetLeft,
      width: elegido.offsetWidth,
      duration: 0.45,
      ease: "power3.inOut",
      onComplete: () => router.push(href),
    });
  };

  return (
    <div ref={lista} role="group" aria-label={ETIQUETA[idioma]} className={`relative flex w-fit items-center font-bold ${estilos.lista} ${className}`}>
      <span ref={indicador} aria-hidden="true" className={`invisible absolute inset-y-1 left-0 ${estilos.indicador}`} />
      <ul className="flex items-center">
        {IDIOMAS.map((opcion) => {
          const href = rutaEn(opcion, ruta);
          return (
            <li key={opcion} data-idioma={opcion} className="relative z-[1]">
              <Link
                href={href}
                // sin precarga: con la cookie del idioma actual, la precarga de otro idioma volvería redirigida
                prefetch={false}
                hrefLang={opcion}
                lang={opcion}
                aria-current={opcion === idioma ? "true" : undefined}
                aria-label={variante === "pildora" ? NOMBRES[opcion].nombre : undefined}
                title={variante === "pildora" ? NOMBRES[opcion].nombre : undefined}
                onClick={(evento) => elegir(evento, opcion, href)}
                className={`block rounded-lg transition-opacity duration-300 ${estilos.link} ${opcion === idioma ? "" : "opacity-60 hover:opacity-100"}`}
              >
                {variante === "pildora" ? NOMBRES[opcion].sigla : NOMBRES[opcion].nombre}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
