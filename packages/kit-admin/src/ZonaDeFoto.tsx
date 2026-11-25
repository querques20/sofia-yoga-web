"use client";

import { useEffect, useState, type DragEvent } from "react";
import { Subir } from "./iconos";
import { enLista, megas, motivoParaNoTomarla } from "./zona-de-foto/formato";
import { VistaDeLaFoto } from "./zona-de-foto/VistaDeLaFoto";

type Props = {
  /** El `id` del input: un error del formulario lleva el foco acá. */
  id: string;
  /** Los tipos que toma, como MIME («image/jpeg»…): se nombran por su extensión. */
  tipos: readonly string[];
  maximoBytes: number;
  /** Solo con un archivo que sirve: el tipo y el peso los chequea la zona, que se queda con él para la vista previa. */
  alElegir: (archivo: File) => void;
  /** Lo que dijo quien sube (falta elegirla): va en la zona, como los de tipo y peso. */
  error?: string;
  deshabilitada?: boolean;
};

// El borde dice qué pasa: punteado mientras espera, en `azul-medio` con un
// tinte si se arrastra algo encima, en `rojo-error` con un problema, y liso
// con la foto elegida.
function bordeDe(arrastrando: boolean, aviso: string | null | undefined, conFoto: boolean) {
  if (arrastrando) return "border-dashed border-azul-medio bg-azul-claro/20";
  if (aviso) return "border-dashed border-rojo-error";
  return conFoto ? "border-solid border-azul-claro/60" : "border-dashed border-gris-texto";
}

/**
 * Elegir una foto para subir (DESIGN.md §11, «Subir una foto»): una zona
 * donde se suelta un archivo o que abre el selector al tocarla, y con la foto
 * elegida, su vista previa (`VistaDeLaFoto`). El input nativo queda oculto
 * pero enfocable: Tab llega a la zona y Enter abre el selector. El tipo y el
 * peso se chequean al elegir, y lo que no sirve se dice en la zona, en una
 * línea. La vista previa es una URL local, creada al elegir, que se suelta al
 * cambiar de foto o al irse. No sabe de ED.
 */
export function ZonaDeFoto({ id, tipos, maximoBytes, alElegir, error, deshabilitada = false }: Props) {
  const [arrastrando, setArrastrando] = useState(false);
  const [rechazo, setRechazo] = useState<string | null>(null);
  const [vista, setVista] = useState<{ archivo: File; url: string } | null>(null);
  useEffect(() => {
    if (!vista) return;
    const { url } = vista;
    return () => URL.revokeObjectURL(url);
  }, [vista]);

  const tomar = (elegido: File | undefined) => {
    if (!elegido) return;
    const motivo = motivoParaNoTomarla(elegido, tipos, maximoBytes);
    setRechazo(motivo);
    if (motivo) return;
    const url = URL.createObjectURL(elegido);
    setVista({ archivo: elegido, url });
    alElegir(elegido);
  };
  const encima = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!deshabilitada) setArrastrando(true);
  };
  const afuera = (e: DragEvent<HTMLDivElement>) => {
    if (!(e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget))) setArrastrando(false);
  };
  const soltar = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setArrastrando(false);
    if (!deshabilitada) tomar(e.dataTransfer.files[0]);
  };

  const aviso = rechazo ?? error;
  const idAviso = `${id}-aviso`;
  const idTopes = `${id}-topes`;
  const describe = [vista ? null : idTopes, aviso ? idAviso : null].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <div
        onDragEnter={encima}
        onDragOver={encima}
        onDragLeave={afuera}
        onDrop={soltar}
        className={`rounded-xl border-2 transition-colors has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-azul-medio ${bordeDe(arrastrando, aviso, vista !== null)}`}
      >
        <input
          id={id}
          type="file"
          accept={tipos.join(",")}
          disabled={deshabilitada}
          aria-invalid={aviso ? true : undefined}
          aria-describedby={describe}
          onChange={(e) => {
            tomar(e.target.files?.[0]);
            // Vacío, así se puede volver a elegir el mismo archivo.
            e.target.value = "";
          }}
          className="peer sr-only"
        />
        {vista ? (
          <div className="p-4">
            <VistaDeLaFoto idDelInput={id} archivo={vista.archivo} url={vista.url} />
          </div>
        ) : (
          <label
            htmlFor={id}
            className="flex min-h-48 cursor-pointer flex-col items-center justify-center gap-2 px-6 py-10 text-center peer-disabled:cursor-not-allowed peer-disabled:opacity-60"
          >
            <Subir size={28} className="text-azul-medio" />
            <span className="font-medium">Arrastrá una foto o elegila</span>
            <span id={idTopes} className="text-admin-meta text-gris-texto">
              {enLista(tipos)} · hasta {megas(maximoBytes)} MB
            </span>
          </label>
        )}
      </div>
      {aviso ? (
        <p id={idAviso} className="mt-2 text-admin-meta text-rojo-error">
          {aviso}
        </p>
      ) : null}
    </div>
  );
}
