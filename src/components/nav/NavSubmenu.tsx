"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import { backToTopIfCurrent, cutToSectionIfHere } from "@/lib/back-to-top";
import { type Idioma, rutaEn } from "@/lib/idiomas";
import { CLASES, type Pagina } from "@/lib/navegacion";
import { useInterfaz } from "@/lib/useInterfaz";
import { useRuta } from "@/lib/useRuta";
import { radioOrganico } from "../hero/geometria";
import { PUERTAS } from "../hero/puertas";

// Passing the pointer over the pill must not fire the menu, and going down to the sheet in a diagonal must not
// close it: a short wait to open, a slightly longer grace to close
const OPEN_DELAY_MS = 120;
const CLOSE_GRACE_MS = 160;

// each destination is one of the Home's doors: same photo, same crop, same place it leads to
const DOORS = CLASES.flatMap((clase, i) => {
  const puerta = PUERTAS.find((p) => p.clave === clase.clave);
  if (!puerta) return [];
  const frame = {
    "--i": i,
    "--shape": radioOrganico(0, 1, i),
    "--shape-breathing": radioOrganico(1, 1, i),
    "--pos": puerta.pos,
    "--zoom": puerta.zoom ?? 1,
  } as CSSProperties;
  return [{ ...puerta, texto: clase.texto as Record<Idioma, string>, frame }];
});

/**
 * A page of the desktop nav with its submenu: the three ways to take a class, as the Home's doors in miniature
 * on a sheet that hangs from the pill. It behaves as Empoderamiento Docente's:
 * - The label always navigates to its page (and on that page, goes back to the top); it never just opens.
 * - The sheet opens on hover with a short wait, and with the chevron, which is a real button for touch and
 *   keyboard. Arrow down opens it and moves the focus to the first door; Escape closes it and gives the focus
 *   back. It also closes on scroll, on a click outside, when the focus leaves and when the page changes.
 * - Its motion is CSS (`.nav-doors` in globals.css): it does not compete with the pill's intro.
 */
export function NavSubmenu({ pagina }: { pagina: Pagina }) {
  const { idioma, ruta } = useRuta();
  const t = useInterfaz();
  const [open, setOpen] = useState(false);
  const [rutaPrevia, setRutaPrevia] = useState(ruta);
  const root = useRef<HTMLLIElement>(null);
  const label = useRef<HTMLAnchorElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  const focusOnOpen = useRef(false);
  const id = useId();
  const texto = pagina.texto[idioma];
  // on any of its doors' pages (Private classes has its own URL) the label reads as "you are in here"
  const here = ruta === pagina.href || DOORS.some((door) => door.ruta === ruta);

  // it closes itself when the page changes
  if (ruta !== rutaPrevia) {
    setRutaPrevia(ruta);
    setOpen(false);
  }

  const later = (doIt: () => void, ms: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(doIt, ms);
  };
  const focusFirstDoor = () => sheet.current?.querySelector<HTMLElement>("a")?.focus();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (!open) return;
    if (focusOnOpen.current) {
      focusOnOpen.current = false;
      focusFirstDoor();
    }
    const close = () => setOpen(false);
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close();
    };
    window.addEventListener("scroll", close, { passive: true });
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("scroll", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <li
      ref={root}
      data-nav-item
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") later(() => setOpen(true), OPEN_DELAY_MS);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") later(() => setOpen(false), CLOSE_GRACE_MS);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          label.current?.focus();
        }
        if (e.key === "ArrowDown" && !sheet.current?.contains(e.target as Node)) {
          e.preventDefault();
          if (open) return focusFirstDoor();
          focusOnOpen.current = true;
          setOpen(true);
        }
      }}
    >
      {/* the label keeps its highlight while its sheet is open: it says whose sheet that is */}
      <div
        data-here={here}
        data-open={open}
        className="flex items-center rounded-xl transition-colors duration-300 hover:bg-salvia-clara data-[here=true]:bg-salvia-clara data-[open=true]:bg-salvia-clara"
      >
        <Link
          ref={label}
          href={rutaEn(idioma, pagina.href)}
          onClick={backToTopIfCurrent(ruta === pagina.href)}
          aria-current={ruta === pagina.href ? "page" : here ? "true" : undefined}
          className="block rounded-xl py-2 pr-1 pl-3"
        >
          {texto}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          aria-label={`${texto}, ${t.nav.submenu}`}
          onClick={() => {
            window.clearTimeout(timer.current);
            setOpen((was) => !was);
          }}
          className="nav-chevron flex h-9 w-7 items-center justify-center rounded-xl pr-1"
        >
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2.5 4.5 6 8l3.5-3.5" />
          </svg>
        </button>
      </div>

      <div ref={sheet} id={id} className="nav-doors" data-open={open}>
        <ul>
          {DOORS.map((door) => {
            const isHere = ruta === door.ruta;
            return (
              <li key={door.clave} style={door.frame}>
                <Link
                  href={rutaEn(idioma, door.ruta) + (door.ancla ? `#${door.ancla}` : "")}
                  // a section is not "the page you are on": only a door with no anchor can be the current page
                  aria-current={isHere && !door.ancla ? "page" : undefined}
                  onClick={(e) => {
                    setOpen(false);
                    if (door.ancla) cutToSectionIfHere(isHere, door.ancla)(e);
                    else backToTopIfCurrent(isHere)(e);
                  }}
                  className="nav-door"
                >
                  <span className="nav-door-frame">
                    {/* decorative: the name under it is the link's text */}
                    <Image src={door.archivo} alt="" fill sizes="7.25rem" />
                  </span>
                  <span className="nav-door-name">{door.texto[idioma]}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}
