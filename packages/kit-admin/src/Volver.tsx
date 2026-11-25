import Link from "next/link";
import { FlechaIzquierda } from "./iconos";

export type DestinoDeVolver = { href: string; etiqueta: string };

// Un botón compacto y no un link de texto: 36 px de alto, con fondo propio,
// así se ve que se toca. Sobre blanco, `azul-medio` sobre `gris-fondo`
// (4,65:1) y en hover `azul-principal` sobre `azul-claro/30` (11,63:1); sobre
// el encabezado navy, `azul-claro` sobre `white/10` y en hover blanco.
const SOBRE_BLANCO = "bg-gris-fondo text-azul-medio hover:bg-azul-claro/30 hover:text-azul-principal focus-visible:outline-azul-medio";
const SOBRE_AZUL = "bg-white/10 text-azul-claro hover:bg-white/20 hover:text-white focus-visible:outline-azul-claro";

/**
 * «← Productos»: la vuelta de un detalle a su lista (DESIGN.md §11,
 * «Volver»). Va arriba del título, adentro del encabezado, en el mismo lugar
 * en todas las pantallas de detalle. Sigue siendo un link: se abre en otra
 * pestaña y vuelve con «atrás». La flecha es decorativa: el link se lee
 * «Productos». No sabe de ED.
 */
export function Volver({ href, etiqueta, resaltado = false }: DestinoDeVolver & { resaltado?: boolean }) {
  return (
    <Link
      href={href}
      className={`mb-1 inline-flex h-9 items-center gap-1.5 rounded-lg pr-3 pl-2 text-admin-meta font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${resaltado ? SOBRE_AZUL : SOBRE_BLANCO}`}
    >
      <FlechaIzquierda size={16} aria-hidden="true" className="shrink-0" />
      {etiqueta}
    </Link>
  );
}
