import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Puerta as DatosDePuerta } from "./puertas";

type Props = {
  puerta: DatosDePuerta;
  href: string;
  nombre: string;
  alt: string;
};

/** una puerta del Inicio: la foto en su marco orgánico y el cartel con el nombre. Hero la mide y la anima */
export function Puerta({ puerta, href, nombre, alt }: Props) {
  // dónde queda en compu y qué parte de la foto se ve: lo lee el CSS de [data-hero]
  const medidas = {
    "--cx": puerta.cx,
    "--cy": puerta.cy,
    "--w": puerta.w,
    "--ar": puerta.ar,
    "--pos": puerta.pos,
    "--zoom": puerta.zoom ?? 1,
  } as CSSProperties;

  return (
    <Link href={href} className="puerta" aria-label={nombre} data-puerta={puerta.clave} style={medidas}>
      {/* el cuerpo es lo que GSAP mueve (parallax, fundido): la puerta queda centrada por CSS y no se pisan */}
      <span className="puerta-cuerpo" data-cuerpo>
        <span className="puerta-marco" data-marco>
          <span className="puerta-foto" data-foto>
            <Image src={puerta.archivo} alt={alt} fill priority sizes="(min-width: 64rem) 30vw, 34vw" />
          </span>
        </span>
        <span className="puerta-cartel" data-cartel>
          {nombre} <i aria-hidden="true">→</i>
        </span>
      </span>
    </Link>
  );
}
