"use client";

import { useRef } from "react";
import { CONTACTO } from "@/lib/contacto";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { IconoCorreo, IconoInstagram, IconoWhatsApp } from "../Iconos";

export type TextosCanaux = { titulo: string; mail: string };

/** sus datos, grandes, como la navegación del pie: las líneas se dibujan al llegar y al pasar se corre el texto */
export function Canaux({ t }: { t: TextosCanaux }) {
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      gsap.fromTo(
        q(".canal-linea"),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: q(".canales")[0], start: "top 84%" } },
      );
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  // los datos de su tarjeta (contexto maestro, confirmados)
  const canales = [
    { nombre: "WhatsApp", valor: CONTACTO.telefono, href: CONTACTO.whatsapp, Icono: IconoWhatsApp, afuera: true },
    { nombre: t.mail, valor: CONTACTO.email, href: `mailto:${CONTACTO.email}`, Icono: IconoCorreo, afuera: false },
    { nombre: "Instagram", valor: CONTACTO.instagramUsuario, href: CONTACTO.instagram, Icono: IconoInstagram, afuera: true },
  ];

  return (
    <section ref={raiz} className="pb-[clamp(3rem,8vw,5rem)]">
      <div className="contenedor">
        <h2 className="titre text-[clamp(2.4rem,5.6vw,4.4rem)]">{t.titulo}</h2>
        <ul className="canales mt-8 lg:mt-12">
          {canales.map(({ nombre, valor, href, Icono, afuera }) => (
            <li key={nombre} className="relative">
              <span className="canal-linea absolute inset-x-0 top-0 h-px origin-left bg-verde/25" aria-hidden="true" />
              <a
                href={href}
                {...(afuera ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group grid items-center gap-x-8 gap-y-2 py-6 sm:grid-cols-[11rem_1fr_auto] lg:py-8"
              >
                <span className="flex items-center gap-3 text-[1.05rem] font-bold">
                  <Icono className="h-6 w-6 text-violeta" />
                  {nombre}
                </span>
                <span className="font-display text-[clamp(1.9rem,4.8vw,3.8rem)] leading-none font-bold break-words transition-transform duration-700 ease-souple group-hover:translate-x-3">
                  {valor}
                </span>
                <svg
                  viewBox="0 0 48 24"
                  className="hidden h-6 w-12 text-violeta opacity-0 transition-[opacity,translate] duration-500 ease-souple group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
                  aria-hidden="true"
                >
                  <path d="M2 12 C 16 9 30 15 44 12 M36 5 L 45 12 L 36 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
