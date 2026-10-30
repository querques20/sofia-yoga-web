"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IDIOMAS, NOMBRES, rutaEn } from "@/lib/idiomas";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useRuta } from "@/lib/useRuta";
import { abreAparte, cambiarIdioma } from "./cambiar-idioma";
import { ETIQUETA } from "./SelectorDeIdioma";

/**
 * El idioma en el celular, a la vista sin abrir el menú: una islita con la sigla actual, al lado del
 * botón del menú. Al tocarla se despliega la lista con los nombres de los tres idiomas
 */
export function SelectorDeIdiomaCompacto() {
  const { idioma, ruta } = useRuta();
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [rutaPrevia, setRutaPrevia] = useState(ruta);
  const caja = useRef<HTMLDivElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const id = useId();
  const quieto = useReducedMotion();

  // al cambiar de página (o de idioma) se cierra sola
  if (ruta !== rutaPrevia) {
    setRutaPrevia(ruta);
    setAbierto(false);
  }

  useGSAP(
    () => {
      const el = lista.current;
      if (!el) return;
      const dura = quieto ? 0 : 1;
      if (abierto) {
        gsap.set(el, { visibility: "visible" });
        gsap.fromTo(el, { autoAlpha: 0, y: -8, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35 * dura, ease: "power3.out" });
        gsap.fromTo(el.children, { autoAlpha: 0, x: 6 }, { autoAlpha: 1, x: 0, duration: 0.3 * dura, stagger: 0.05 * dura, delay: 0.08 * dura, ease: "power2.out" });
      } else {
        gsap.to(el, { autoAlpha: 0, y: -6, duration: 0.2 * dura, ease: "power2.in" });
      }
    },
    { dependencies: [abierto, quieto] },
  );

  // abierta: un toque afuera o Escape la cierran (con Escape el foco vuelve al botón)
  useEffect(() => {
    if (!abierto) return;
    const afuera = (e: PointerEvent) => {
      if (!caja.current?.contains(e.target as Node)) setAbierto(false);
    };
    const tecla = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setAbierto(false);
      boton.current?.focus();
    };
    document.addEventListener("pointerdown", afuera);
    window.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("pointerdown", afuera);
      window.removeEventListener("keydown", tecla);
    };
  }, [abierto]);

  return (
    <div ref={caja} data-fuera-del-menu className="relative">
      <button
        ref={boton}
        type="button"
        aria-expanded={abierto}
        aria-controls={id}
        aria-label={`${ETIQUETA[idioma]} : ${NOMBRES[idioma].nombre}`}
        onClick={() => setAbierto((antes) => !antes)}
        className="inline-flex h-12 min-w-12 items-center justify-center rounded-3xl border border-verde/10 bg-pagina px-3.5 text-[13px] font-bold tracking-[0.06em] shadow-[0_8px_24px_-12px_rgba(57,70,58,0.45)] transition-colors hover:bg-salvia-clara"
      >
        {NOMBRES[idioma].sigla}
      </button>
      <ul
        id={id}
        ref={lista}
        aria-label={ETIQUETA[idioma]}
        className="invisible absolute top-[calc(100%+0.5rem)] right-0 min-w-40 origin-top-right rounded-2xl border border-verde/10 bg-pagina p-1.5 shadow-[0_18px_40px_-20px_rgba(57,70,58,0.55)]"
      >
        {IDIOMAS.map((opcion) => (
          <li key={opcion}>
            <Link
              href={rutaEn(opcion, ruta)}
              // sin precarga: con la cookie del idioma actual, la precarga de otro idioma volvería redirigida
              prefetch={false}
              hrefLang={opcion}
              lang={opcion}
              aria-current={opcion === idioma ? "true" : undefined}
              onClick={(evento) => {
                if (abreAparte(evento)) return;
                evento.preventDefault();
                setAbierto(false);
                if (opcion !== idioma) cambiarIdioma(router, opcion, rutaEn(opcion, ruta));
              }}
              className="flex items-center justify-between gap-4 rounded-xl px-3.5 py-2.5 text-[1rem] font-bold transition-colors duration-300 hover:bg-salvia-clara aria-[current=true]:bg-salvia-clara"
            >
              {NOMBRES[opcion].nombre}
              <span className="text-[12px] tracking-[0.06em] opacity-50">{NOMBRES[opcion].sigla}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
