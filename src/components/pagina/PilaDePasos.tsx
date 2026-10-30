"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { IndicePasos } from "./pila/IndicePasos";
import { PanelPaso, type Paso } from "./pila/PanelPaso";
import { animarPila } from "./pila/pila";

// la misma condición que en globals.css: con menos movimiento o una pantalla baja, la pila se apaga
const PILA_PRENDIDA = "(prefers-reduced-motion: no-preference) and (min-height: 42rem)";

type Props = {
  id: string;
  titulo: ReactNode;
  intro: ReactNode;
  pasos: Paso[];
  /** cómo se lee el índice de pasos para un lector de pantalla (en el idioma de la página) */
  etiquetaPasos: string;
  /** la banda que cierra: sube por encima de la pila y se la come entera, título incluido (el barrido de ED) */
  cierre?: ReactNode;
  /** el fondo de la sección que viene después (una clase de Tailwind): va detrás de la mitad de abajo de la banda */
  fondoSiguiente?: string;
};

/**
 * Unos pasos que van en orden, como paneles que se apilan al bajar (como «Cómo trabajamos» en la web de ED):
 * cada uno se traba arriba, el siguiente sube y lo tapa, y del anterior queda la pestaña con su título.
 * El título de la sección queda trabado arriba con el paso a paso, y al terminar se despega todo junto.
 * Las medidas están en globals.css (`[data-pila]`)
 */
export function PilaDePasos({ id, titulo, intro, pasos, etiquetaPasos, cierre, fondoSiguiente = "bg-pagina" }: Props) {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    (contexto) => {
      const seccion = raiz.current;
      if (quieto || !seccion) return;
      let mm: gsap.MatchMedia | null = null;
      // el matchMedia va afuera del contexto de useGSAP: adentro se deshace dos veces y deja estilos viejos
      contexto.ignore(() => {
        mm = gsap.matchMedia();
        mm.add({ pila: PILA_PRENDIDA, compu: "(min-width: 64rem)" }, (c) => {
          const { pila, compu } = c.conditions as { pila: boolean; compu: boolean };
          if (pila) return animarPila(seccion, compu);
        });
      });
      return () => mm?.revert();
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section
      ref={raiz}
      id={id}
      data-pila
      data-pila-con-banda={cierre ? "" : undefined}
      // cuánto suman las pestañas de todos menos el último: de ahí salen el alto de los paneles y el de la pila
      style={{ "--pila-solapas": `calc(${pasos.length - 1} * var(--pila-solapa))` } as CSSProperties}
      className="relative pb-[clamp(5rem,12vw,9rem)]"
    >
      <div className="contenedor">
        <div data-pila-escena>
          {/* el título se traba arriba y mide (invisible) lo mismo que la pila: así se despega con los paneles */}
          <header data-pila-titulo>
            <div data-pila-franja className="flex flex-wrap items-end gap-x-10 gap-y-4 bg-pagina">
              <div>
                <h2 className="titre text-[clamp(2.2rem,4.6vw,3.6rem)]">{titulo}</h2>
                <p data-pila-intro className="mt-2 text-[1.05rem] opacity-80 lg:text-[1.12rem]">
                  {intro}
                </p>
              </div>
              <IndicePasos etiqueta={etiquetaPasos} pasos={pasos.map((p) => p.corto)} />
            </div>
          </header>
          <ol data-pila-lista className="mt-8 flex flex-col gap-6">
            {pasos.map((paso, i) => (
              <PanelPaso key={paso.titulo} paso={paso} numero={i + 1} total={pasos.length} />
            ))}
          </ol>
        </div>

        {/* EL BARRIDO, como en ED: con la pila prendida, la banda retrocede (margen negativo) todo el alto de la
            pila trabada, así sube desde el pie de la pantalla mientras la pila está trabada y llega al título justo
            cuando todo se despega. Pinta por encima porque es `relative` y viene después; lo que queda debajo lo
            tapa la sección siguiente, que también va por encima (ver la página). El margen y el colchón que lo
            hacen posible están en globals.css; no hay JS */}
        {cierre && (
          <div data-pila-banda className="relative mt-14">
            {/* detrás de la mitad de abajo, el fondo de la sección que sigue: por las esquinas redondeadas
                asomaba el panel de abajo, y así la banda se continúa con lo que viene */}
            <span data-pila-telon aria-hidden="true" className={`absolute inset-x-0 top-1/2 bottom-0 hidden ${fondoSiguiente}`} />
            <div className="relative rounded-[2rem] bg-verde px-6 py-9 text-pagina lg:px-12 lg:py-12">{cierre}</div>
          </div>
        )}
      </div>
    </section>
  );
}
