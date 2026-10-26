import type { ReactNode } from "react";
import { CONTACTO, enlaceWhatsApp } from "@/lib/contacto";
import { IconoWhatsApp } from "../Iconos";
import { Magnetique } from "../Magnetique";

type Props = {
  /** la frase, que sale de lo que se acaba de leer */
  texto: ReactNode;
  /** el mensaje que ya aparece escrito en WhatsApp */
  mensaje: string;
  /** el asunto del mail, para quien prefiera escribir por ahí */
  asunto: string;
  /** adentro de la banda que cierra una pila de pasos: sin línea arriba y con la frase más grande */
  enBanda?: boolean;
};

/**
 * El botón del medio de las páginas de clases. Va al final de la sección donde la persona se reconoce,
 * con su WhatsApp ya escrito y el mail al lado. Uno solo por página: arriba y al final ya hay otros
 */
export function InvitarAEscribir({ texto, mensaje, asunto, enBanda = false }: Props) {
  const correo = `mailto:${CONTACTO.email}?subject=${encodeURIComponent(asunto)}`;
  const contenido = (
    <div className={`flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between ${enBanda ? "" : "border-t border-verde/20 pt-8"}`}>
      <p className={`max-w-[34rem] leading-relaxed ${enBanda ? "text-[1.25rem] font-bold lg:text-[1.45rem]" : "text-[1.15rem]"}`}>{texto}</p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <Magnetique>
          <a className="boton" href={enlaceWhatsApp(mensaje)} target="_blank" rel="noopener noreferrer">
            <IconoWhatsApp className="h-5 w-5" />
            Écrire sur WhatsApp
          </a>
        </Magnetique>
        <a className="enlace" href={correo}>
          ou par e-mail
        </a>
      </div>
    </div>
  );
  return enBanda ? contenido : <div className="contenedor mt-[clamp(3rem,7vw,5rem)]">{contenido}</div>;
}
