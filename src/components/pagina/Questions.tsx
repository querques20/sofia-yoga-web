"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import type { Pregunta } from "@/contenido/preguntas";
import { ScrollTrigger } from "@/lib/gsap";
import { rutaEn } from "@/lib/idiomas";
import { useInterfaz } from "@/lib/useInterfaz";
import { useRuta } from "@/lib/useRuta";

type Props = {
  preguntas: Pregunta[];
  titulo?: string;
  id?: string;
  /** lo que va debajo del título; si no se pasa, la salida para escribirle */
  nota?: ReactNode;
};

// el más se vuelve menos: la rayita vertical gira hasta quedar acostada sobre la otra
function MasMenos({ abierto }: { abierto: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-violeta" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
      <path d="M5 12.4 C 9 11.6 15 12.6 19 11.8" />
      <path
        d="M12.2 5 C 11.6 9 12.6 15 11.8 19"
        className={`origin-center transition-transform duration-500 ease-souple motion-reduce:transition-none ${abierto ? "rotate-90" : ""}`}
      />
    </svg>
  );
}

/** las preguntas frecuentes: se abre una por vez y la respuesta se despliega con su altura justa */
export function Questions({ preguntas, titulo, id = "questions", nota }: Props) {
  const t = useInterfaz();
  const { idioma } = useRuta();
  const [abierta, setAbierta] = useState<number | null>(null);
  const base = useId();

  return (
    <section id={id} className="py-[clamp(4rem,10vw,7rem)]">
      <div className="contenedor grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="titre text-[clamp(2.4rem,5.6vw,4.4rem)]">{titulo ?? t.preguntasFrecuentes}</h2>
          {/* si la duda no está en la lista, la salida queda a mano */}
          <p className="mt-5 max-w-[20rem] text-[1.05rem] leading-relaxed">
            {nota ?? (
              <>
                {t.sinRespuesta}{" "}
                <Link className="enlace font-bold" href={rutaEn(idioma, "/contact")}>
                  {t.escribime}
                </Link>
              </>
            )}
          </p>
        </div>
        <ul className="lg:col-span-8">
          {preguntas.map((p, i) => {
            const abierto = abierta === i;
            const idBoton = `${base}-pregunta-${i}`;
            const idRespuesta = `${base}-respuesta-${i}`;
            return (
              <li key={p.pregunta} className="border-t border-verde/20 last:border-b">
                <h3>
                  <button
                    id={idBoton}
                    type="button"
                    aria-expanded={abierto}
                    aria-controls={idRespuesta}
                    onClick={() => setAbierta(abierto ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-[1.18rem] font-bold leading-snug lg:py-6 lg:text-[1.3rem]"
                  >
                    <span>{p.pregunta}</span>
                    <MasMenos abierto={abierto} />
                  </button>
                </h3>
                {/* la altura pasa de 0 a la del texto con la grilla; al terminar se vuelven a medir las escenas de abajo */}
                <div
                  id={idRespuesta}
                  role="region"
                  aria-labelledby={idBoton}
                  inert={!abierto}
                  onTransitionEnd={(e) => {
                    if (e.target === e.currentTarget) ScrollTrigger.refresh();
                  }}
                  className={`grid transition-[grid-template-rows] duration-500 ease-souple motion-reduce:transition-none ${abierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="max-w-[40rem] pb-6 text-[1.1rem] leading-relaxed">{p.respuesta}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
