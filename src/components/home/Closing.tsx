"use client";

import { CONTACTO } from "@/lib/contacto";
import { useInterfaz } from "@/lib/useInterfaz";
import { Magnetique } from "../Magnetique";

export type TextosClosing = { texto: string };

/**
 * The Home's last scene, before the footer: how to write to Sofia. One button (WhatsApp, her main channel) and
 * the two other ways as plain links. It stays still: the page's entrances are the hero's and the invitation's.
 * The WhatsApp button goes to her real number: when testing, do not send the message
 */
export function Closing({ t }: { t: TextosClosing }) {
  const ui = useInterfaz();
  return (
    <section id="ecris-moi" className="contenedor py-[clamp(4.5rem,11vw,8.5rem)]">
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 className="titre text-[clamp(3.6rem,12vw,9.5rem)]">{ui.escribime}</h2>
          <p className="mt-6 max-w-[32rem] text-[1.15rem] leading-relaxed">{t.texto}</p>
        </div>
        <div className="flex flex-col items-start gap-5 lg:col-span-5 lg:items-end lg:pb-2">
          <Magnetique>
            <a className="boton" href={CONTACTO.whatsapp} target="_blank" rel="noopener noreferrer">
              {ui.escribirWhatsApp}
            </a>
          </Magnetique>
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            <a className="enlace" href={`mailto:${CONTACTO.email}`}>
              {ui.porMail}
            </a>
            <a className="enlace" href={CONTACTO.instagram} target="_blank" rel="noopener noreferrer">
              {CONTACTO.instagramUsuario}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
