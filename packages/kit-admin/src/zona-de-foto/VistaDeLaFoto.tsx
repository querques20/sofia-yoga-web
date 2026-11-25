import Image from "next/image";
import { useState } from "react";
import { claseDeBoton } from "../clases";
import { extension, peso } from "./formato";

type Props = {
  /** El `id` del input de la zona: «Elegir otra…» es su label. */
  idDelInput: string;
  archivo: File;
  /** La URL local del archivo (`URL.createObjectURL`): la crea y la suelta la zona. */
  url: string;
};

/**
 * La foto elegida, antes de subirla: entera en un marco 4/3, con su nombre,
 * sus medidas, su peso y su formato, y «Elegir otra…». Las medidas se leen al
 * cargar la imagen: el archivo no las trae.
 */
export function VistaDeLaFoto({ idDelInput, archivo, url }: Props) {
  const [medidas, setMedidas] = useState<{ url: string; ancho: number; alto: number } | null>(null);
  // Las de otra foto no valen: se leen de nuevo al cargar esta.
  const deEsta = medidas?.url === url ? medidas : null;
  return (
    <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
      <div className="relative aspect-4/3 w-full max-w-xs overflow-hidden rounded-lg border border-azul-claro/60 bg-gris-fondo">
        <Image
          src={url}
          alt=""
          fill
          unoptimized
          sizes="320px"
          className="object-contain"
          onLoad={(e) => setMedidas({ url, ancho: e.currentTarget.naturalWidth, alto: e.currentTarget.naturalHeight })}
        />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <p className="truncate font-medium" title={archivo.name}>
          {archivo.name}
        </p>
        <p className="text-admin-meta text-gris-texto">
          {deEsta ? `${deEsta.ancho} × ${deEsta.alto} px · ` : ""}
          {peso(archivo.size)} · {extension(archivo.type)}
        </p>
        <label htmlFor={idDelInput} className={`${claseDeBoton("secundario")} mt-2 cursor-pointer`}>
          Elegir otra…
        </label>
      </div>
    </div>
  );
}
