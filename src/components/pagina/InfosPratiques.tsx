"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Dato = { dato: string; valor: ReactNode };

type Props = {
  datos: Dato[];
  id?: string;
  titulo?: string;
  nota?: ReactNode;
  /** lo que va al pie del recuadro, por ejemplo el botón para preguntar */
  children?: ReactNode;
};

/**
 * El recuadro de información de cada página, en celeste (es su función en la paleta), escrito en texto
 * y no en imagen, para que lo lea también Google. Al llegar se dibuja el borde y después las líneas
 */
export function InfosPratiques({ datos, id = "infos", titulo = "Infos pratiques", nota, children }: Props) {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      gsap
        .timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: q(".infos-recuadro")[0], start: "top 78%" } })
        .from(q(".infos-borde"), { scaleY: 0, transformOrigin: "50% 0%", duration: 1.1 }, 0)
        .from(q(".infos-linea"), { scaleX: 0, transformOrigin: "0% 50%", duration: 1, stagger: 0.07 }, 0.15);
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id={id} className="py-[clamp(4rem,10vw,7rem)]">
      <div className="contenedor">
        <div className="infos-recuadro relative overflow-hidden rounded-[1.75rem] bg-celeste-clara py-9 pr-6 pl-8 lg:py-14 lg:pr-14 lg:pl-16">
          <span className="infos-borde absolute inset-y-0 left-0 w-[6px] bg-celeste" aria-hidden="true" />
          <h2 className="titre text-[clamp(2.2rem,5vw,3.8rem)]">{titulo}</h2>
          <dl className="mt-8 grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:mt-10">
            {datos.map((d) => (
              <div key={d.dato} className="relative pt-4">
                <span className="infos-linea absolute inset-x-0 top-0 h-px bg-verde/20" aria-hidden="true" />
                <dt className="font-bold">{d.dato}</dt>
                <dd className="mt-1 text-[1.08rem]">{d.valor}</dd>
              </div>
            ))}
          </dl>
          {nota && <p className="mt-9 max-w-[40rem] text-[1rem] opacity-80">{nota}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
