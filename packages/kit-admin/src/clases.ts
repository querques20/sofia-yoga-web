// Las clases que comparten los controles: la caja de texto y los botones.
// Viven en un `.ts` para que las usen también los elementos que no son un
// control del kit, como el CTA de una pantalla de acceso. Los contrastes de
// los comentarios son los de los tokens de la app que usa el kit (README).

/**
 * La única caja de texto del admin. El borde es `gris-texto` (4,83:1 sobre
 * blanco; un control pide 3:1 y `azul-claro` daba 1,77:1), el foco
 * `azul-medio` y el error `rojo-error`. Sin margen: lo pone quien la usa.
 */
export const ENTRADA =
  "w-full rounded-lg border border-gris-texto bg-white px-3 py-2 text-admin-cuerpo text-azul-principal outline-none transition-colors focus:border-azul-medio focus:ring-2 focus:ring-azul-medio/30 aria-invalid:border-rojo-error";

/** Las cuatro variantes de botón. Un solo `primario` por pantalla. */
export type Variante = "primario" | "secundario" | "terciario" | "destructivo";

const BASE =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-admin-meta font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 aria-busy:cursor-wait aria-busy:opacity-100";

// Contrastes medidos: el primario 4,78:1 (6,10:1 en hover), el secundario
// 13,63:1 (11,63:1 en hover), el terciario 5,11:1 y el destructivo 6,57:1
// (5,75:1 sobre su tinte al 8 % del hover). El terciario subraya en hover:
// con el fondo `azul-claro/30`, el `azul-medio` baja a 4,36:1. El
// destructivo lleva borde, como el secundario: es un botón y no un link en
// rojo, y en una fila queda alineado con los demás.
//
// El primario es el mismo en los tres temas: su texto es `sobre-naranja`,
// un blanco que el tema oscuro no invierte (`white` ahí es la superficie).
const PRIMARIO = "bg-naranja-boton text-sobre-naranja hover:bg-naranja-boton-hover";

const SOBRE_BLANCO: Record<Variante, string> = {
  primario: PRIMARIO,
  secundario: "border border-azul-principal text-azul-principal hover:bg-azul-claro/30",
  terciario: "text-azul-medio underline-offset-2 hover:underline",
  destructivo: "border border-rojo-error text-rojo-error hover:bg-rojo-error/8",
};

// Sobre `azul-principal` (un encabezado con cambios sin guardar): el primario
// es el mismo, que tiene su fondo; el secundario va en blanco (hover
// 10,02:1); el terciario y el destructivo, en `azul-claro` (7,68:1), porque
// `rojo-error` ahí da 2,07:1. El destructivo, con su borde.
const SOBRE_AZUL: Record<Variante, string> = {
  primario: PRIMARIO,
  secundario: "border border-white text-white hover:bg-white/10",
  terciario: "text-azul-claro underline-offset-2 hover:underline",
  destructivo: "border border-azul-claro text-azul-claro hover:bg-white/10",
};

/**
 * Las clases de un botón (`Boton`). El foco va en `azul-medio` sobre blanco y
 * en `azul-claro` sobre azul (el `azul-medio` ahí da 2,67:1).
 */
export function claseDeBoton(variante: Variante, sobreAzul = false) {
  return sobreAzul
    ? `${BASE} focus-visible:outline-azul-claro ${SOBRE_AZUL[variante]}`
    : `${BASE} focus-visible:outline-azul-medio ${SOBRE_BLANCO[variante]}`;
}
