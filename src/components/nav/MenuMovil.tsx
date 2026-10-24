"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CONTACTO } from "@/lib/contacto";
import { gsap, useGSAP } from "@/lib/gsap";
import { lenisActual } from "@/lib/lenis";
import { CONTACTO_PAGINA, esActual, PAGINAS } from "@/lib/navegacion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FleurQuiRespire } from "../FleurQuiRespire";

/** el menú del celular: el botón es una islita y abre un panel verde a pantalla completa, como en ED */
export function MenuMovil() {
  const ruta = usePathname();
  const hoja = useRef<HTMLDivElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const [abierto, setAbierto] = useState(false);
  const [rutaPrevia, setRutaPrevia] = useState(ruta);
  const quieto = useReducedMotion();
  // si se cerró con la cruz o con Escape, el foco vuelve al botón (si se cerró porque cambió la página, no)
  const devolverFoco = useRef(false);

  // al cambiar de página el menú se cierra solo
  if (ruta !== rutaPrevia) {
    setRutaPrevia(ruta);
    setAbierto(false);
  }

  useGSAP(
    () => {
      const el = hoja.current;
      if (!el) return;
      const dura = quieto ? 0 : 1;
      const lenis = lenisActual();
      if (abierto) {
        lenis?.stop();
        gsap.set(el, { visibility: "visible" });
        gsap.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7 * dura, ease: "power3.inOut" });
        gsap.fromTo(
          el.querySelectorAll(".menu-item"),
          { yPercent: 70, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.6 * dura, stagger: 0.06 * dura, delay: 0.25 * dura, ease: "power3.out" },
        );
        el.querySelector<HTMLElement>(".menu-item a")?.focus({ preventScroll: true });
      } else {
        lenis?.start();
        gsap.to(el, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.55 * dura,
          ease: "power3.inOut",
          onComplete: () => gsap.set(el, { visibility: "hidden" }),
        });
      }
    },
    { dependencies: [abierto, quieto] },
  );

  // mientras el menú está abierto, todo lo de atrás queda inerte: ni el teclado, ni el buscador del navegador,
  // ni un lector de pantalla llegan ahí. Al cerrarse se libera, y recién entonces el foco puede volver al botón
  useEffect(() => {
    if (!abierto) return;
    const atras = [...document.querySelectorAll<HTMLElement>("#contenido, footer, [data-fuera-del-menu]")];
    const botonMenu = boton.current;
    atras.forEach((el) => (el.inert = true));
    return () => {
      atras.forEach((el) => (el.inert = false));
      if (devolverFoco.current) {
        devolverFoco.current = false;
        botonMenu?.focus();
      }
    };
  }, [abierto]);

  // con el menú abierto: Escape lo cierra, y Tab da la vuelta adentro del panel (no se escapa a lo de atrás)
  useEffect(() => {
    if (!abierto) return;
    const conTeclado = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        devolverFoco.current = true;
        setAbierto(false);
        return;
      }
      if (e.key !== "Tab" || !hoja.current) return;
      const enfocables = hoja.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const primero = enfocables[0];
      const ultimo = enfocables[enfocables.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };
    window.addEventListener("keydown", conTeclado);
    return () => window.removeEventListener("keydown", conTeclado);
  }, [abierto]);

  return (
    <>
      <button
        ref={boton}
        type="button"
        data-fuera-del-menu
        aria-expanded={abierto}
        aria-controls="menu-movil"
        aria-label="Ouvrir le menu"
        onClick={() => setAbierto(true)}
        className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-3xl border border-verde/10 bg-pagina shadow-[0_8px_24px_-12px_rgba(57,70,58,0.45)] transition-colors hover:bg-salvia-clara lg:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
          <path d="M5 9 C 9 8 15 10 19 9" />
          <path d="M5 15 C 9 14 15 16 19 15" />
        </svg>
      </button>

      <div
        id="menu-movil"
        ref={hoja}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="invisible fixed inset-0 z-[60] flex flex-col bg-verde px-5 pb-10 text-pagina lg:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div className="flex h-[5rem] items-center justify-between">
          <span className="flex items-center gap-2.5">
            <FleurQuiRespire className="h-9 w-9 text-salvia" />
            <span className="titre text-[1.45rem] tracking-[0.02em]">Sofia Yoga</span>
          </span>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => {
              devolverFoco.current = true;
              setAbierto(false);
            }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-pagina/20 transition-colors hover:bg-pagina/10"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
              <path d="M7 7 L 17 17 M17 7 L 7 17" />
            </svg>
          </button>
        </div>
        <ul className="mt-8 flex flex-col">
          {[{ href: "/", texto: "Accueil" }, ...PAGINAS].map((pagina) => (
            <li key={pagina.href} className="menu-item overflow-hidden border-t border-pagina/15">
              <Link
                href={pagina.href}
                onClick={() => setAbierto(false)}
                aria-current={pagina.href === "/" ? (ruta === "/" ? "page" : undefined) : esActual(ruta, pagina.href) ? "page" : undefined}
                className="titre block py-3 text-[2.4rem] aria-[current=page]:text-salvia"
              >
                {pagina.texto}
              </Link>
            </li>
          ))}
        </ul>
        <div className="menu-item mt-auto flex flex-col gap-5">
          <Link href={CONTACTO_PAGINA.href} onClick={() => setAbierto(false)} className="boton w-fit">
            {CONTACTO_PAGINA.texto}
          </Link>
          <p className="text-[0.98rem] text-pagina/75">
            {CONTACTO.telefono} · {CONTACTO.instagramUsuario}
          </p>
        </div>
      </div>
    </>
  );
}
