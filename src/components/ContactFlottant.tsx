"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { enlaceWhatsApp, MENSAJES, type Tema } from "@/lib/contacto";
import { IconoWhatsApp } from "./Iconos";

// desde cada página, el mensaje ya viene escrito con su tema
const TEMA_POR_PAGINA: Record<string, Tema> = {
  "/yoga-prenatal-geneve": "prenatal",
  "/yoga-post-partum-geneve": "postPartum",
  "/cours-de-yoga-geneve": "cours",
  "/ateliers-evenements": "atelier",
};

/**
 * En el celular, el botón de WhatsApp acompaña mientras leés: aparece cuando ya pasaste la cabecera
 * y se esconde cuando a la vista está el bloque de contacto o el pie (ahí ya hay botón). En la página
 * de contacto no hace falta
 */
export function ContactFlottant() {
  const ruta = usePathname();
  const [visible, setVisible] = useState(false);
  const [rutaPrevia, setRutaPrevia] = useState(ruta);
  const enContacto = ruta === "/contact";

  // al cambiar de página arranca escondido: si venía visible de la página anterior, no parpadea
  if (ruta !== rutaPrevia) {
    setRutaPrevia(ruta);
    setVisible(false);
  }

  useEffect(() => {
    if (enContacto) return;
    let cuadro = 0;
    const medir = () => {
      cuadro = 0;
      const alto = window.innerHeight;
      const tapado = [...document.querySelectorAll("#contact, footer")].some((el) => el.getBoundingClientRect().top < alto * 0.92);
      setVisible(window.scrollY > alto * 0.8 && !tapado);
    };
    const pedir = () => {
      if (!cuadro) cuadro = requestAnimationFrame(medir);
    };
    // la primera medida también va en el próximo cuadro: así la página nueva ya está armada
    pedir();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
    };
  }, [ruta, enContacto]);

  if (enContacto) return null;
  const tema = TEMA_POR_PAGINA[ruta];

  return (
    <a
      href={enlaceWhatsApp(tema ? MENSAJES[tema] : undefined)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrire à Sofia sur WhatsApp"
      data-fuera-del-menu
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
      className={`fixed right-4 bottom-4 z-40 inline-flex h-14 items-center gap-2 rounded-3xl bg-terracota pr-5 pl-4 font-bold text-white shadow-[0_14px_30px_-12px_rgba(57,70,58,0.6)] transition-[translate,opacity] duration-500 ease-souple motion-reduce:transition-none lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <IconoWhatsApp className="h-6 w-6" />
      WhatsApp
    </a>
  );
}
