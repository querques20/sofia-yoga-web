"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useSyncExternalStore } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { esIdioma, type Idioma, rutaEn } from "@/lib/idiomas";
import { guardarIdioma, idiomaGuardado } from "@/lib/preferencia-idioma";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useRuta } from "@/lib/useRuta";
import { abreAparte, cambiarIdioma } from "./cambiar-idioma";

// en el idioma que se sugiere: es el que la persona entiende
const TEXTOS: Record<Idioma, { aviso: string; ir: string; cerrar: string }> = {
  fr: { aviso: "Ce site existe aussi en français.", ir: "Voir en français", cerrar: "Non merci" },
  en: { aviso: "This site is also available in English.", ir: "Switch to English", cerrar: "No thanks" },
  es: { aviso: "Este sitio también está en español.", ir: "Ver en español", cerrar: "No, gracias" },
};

// cuánto espera antes de aparecer, así no compite con la entrada del sitio
const ESPERA_S = 2.4;

// ni el idioma del navegador ni la cookie avisan cuando cambian: se leen al dibujar
const sinCambios = () => () => {};

/** el primer idioma del navegador que la web tiene, si no es el de la página */
function idiomaDelNavegador(actual: Idioma) {
  for (const preferido of navigator.languages ?? [navigator.language]) {
    const codigo = preferido.slice(0, 2).toLowerCase();
    if (esIdioma(codigo)) return codigo === actual ? null : codigo;
  }
  return null;
}

/**
 * La detección del idioma, sin redirigir: si el navegador está en otro idioma de la web y la persona todavía no
 * eligió ninguno, un aviso le ofrece cambiar. Elija lo que elija, queda guardado y no se vuelve a mostrar. Google
 * nunca lo ve (no ejecuta esto como una persona ni manda cookies), así que no toca el SEO
 */
export function SugerenciaDeIdioma() {
  const { idioma, ruta } = useRuta();
  const router = useRouter();
  const [cerrado, setCerrado] = useState(false);
  const caja = useRef<HTMLDivElement>(null);
  const quieto = useReducedMotion();
  // se decide en el navegador: en el servidor no hay idioma del navegador ni cookie. Una vez que la persona
  // elige, la cookie existe y no se vuelve a sugerir
  const detectado = useSyncExternalStore(
    sinCambios,
    () => (idiomaGuardado() ? null : idiomaDelNavegador(idioma)),
    () => null,
  );
  const sugerido = cerrado ? null : detectado;

  useGSAP(
    () => {
      if (!sugerido || !caja.current) return;
      if (quieto) gsap.set(caja.current, { autoAlpha: 1 });
      else gsap.fromTo(caja.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, delay: ESPERA_S, ease: "power3.out" });
    },
    { dependencies: [sugerido, quieto] },
  );

  if (!sugerido) return null;
  const t = TEXTOS[sugerido];

  const cerrar = (guardar: Idioma) => {
    guardarIdioma(guardar);
    if (quieto || !caja.current) return setCerrado(true);
    gsap.to(caja.current, { autoAlpha: 0, y: 16, duration: 0.35, ease: "power2.in", onComplete: () => setCerrado(true) });
  };

  return (
    <div
      ref={caja}
      role="region"
      aria-label={t.aviso}
      lang={sugerido}
      data-fuera-del-menu
      className="invisible fixed bottom-4 left-4 z-40 flex max-w-[calc(100vw-2rem)] flex-wrap items-center gap-x-4 gap-y-2 rounded-3xl border border-verde/10 bg-pagina/90 py-3 pr-3 pl-5 shadow-[0_18px_40px_-20px_rgba(57,70,58,0.55)] backdrop-blur-xl max-lg:bottom-22 sm:max-w-[26rem]"
    >
      <p className="text-[0.98rem]">{t.aviso}</p>
      <div className="flex items-center gap-2">
        <Link
          href={rutaEn(sugerido, ruta)}
          hrefLang={sugerido}
          onClick={(evento) => {
            if (abreAparte(evento)) return;
            evento.preventDefault();
            setCerrado(true);
            cambiarIdioma(router, sugerido, rutaEn(sugerido, ruta));
          }}
          className="rounded-xl bg-terracota px-4 py-2 text-[0.95rem] font-bold text-white transition-colors duration-300 hover:bg-[#9e5441]"
        >
          {t.ir}
        </Link>
        <button
          type="button"
          onClick={() => cerrar(idioma)}
          className="rounded-xl px-3 py-2 text-[0.95rem] font-bold transition-colors duration-300 hover:bg-salvia-clara"
        >
          {t.cerrar}
        </button>
      </div>
    </div>
  );
}
