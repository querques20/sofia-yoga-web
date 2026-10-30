import { enlaceWhatsApp } from "@/lib/contacto";
import { interfaz } from "@/lib/idioma-actual";
import { Magnetique } from "../Magnetique";

/** al pie del recuadro de infos: mientras falten datos, la salida es preguntarle a ella directamente */
export async function PedirInfos({ mensaje, texto }: { mensaje: string; texto: string }) {
  const t = await interfaz();
  return (
    <div className="mt-9 flex flex-col gap-5 border-t border-verde/20 pt-8 lg:flex-row lg:items-center lg:justify-between">
      <p className="max-w-[34rem] text-[1.15rem] leading-relaxed">{texto}</p>
      <Magnetique>
        <a className="boton" href={enlaceWhatsApp(mensaje)} target="_blank" rel="noopener noreferrer">
          {t.preguntarWhatsApp}
        </a>
      </Magnetique>
    </div>
  );
}
