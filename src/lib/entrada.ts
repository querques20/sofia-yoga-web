// la entrada de la página avisa cuándo empieza a abrirse, así lo que anima al llegar arranca justo ahí
// y no se pierde detrás del telón. Si no hay entrada (menos movimiento, o ya vista), se avisa enseguida.
// La entrada se repite al cambiar de idioma: cada vez que vuelve a cerrarse el telón empieza una vuelta nueva,
// con su propio aviso

let avisar: () => void = () => {};
let abierto = false;
let vuelta = 0;
const nuevoAviso = () => new Promise<void>((resolver) => (avisar = resolver));
let aviso: Promise<void> = typeof window === "undefined" ? Promise.resolve() : nuevoAviso();

// la página también avisa cuando terminó de armar sus animaciones: su JS llega aparte y React la monta un rato
// después que el layout, y armarla congela algunos cuadros. La flor espera ese aviso para dibujarse sin trabarse
let avisarPagina: () => void = () => {};
const nuevoAvisoDePagina = () => new Promise<void>((resolver) => (avisarPagina = resolver));
let pagina: Promise<void> = typeof window === "undefined" ? Promise.resolve() : nuevoAvisoDePagina();

// el tamaño de la flor dibujada y cuánto crece al inspirar: el hueco arranca justo de ese tamaño, y la flor de
// fotos del Inicio también, así no se nota el cambio
export const TAMANO_FLOR = 112;
export const INSPIRA = 1.18;
export const HUECO_INICIAL = TAMANO_FLOR * INSPIRA;

// mientras el telón se abre, la entrada avisa en cada cuadro cuánto mide el hueco: el hero del Inicio arma con eso
// la flor de fotos. Y cuando terminó del todo (el hueco tapó la pantalla) avisa el fin: recién ahí la flor se abre
let hueco = 0;
const oyentesDelHueco = new Set<(px: number) => void>();
let avisarFin: () => void = () => {};
const nuevoAvisoDeFin = () => new Promise<void>((resolver) => (avisarFin = resolver));
let fin: Promise<void> = typeof window === "undefined" ? Promise.resolve() : nuevoAvisoDeFin();

// al cambiar de idioma la página se cierra por la flor antes de navegar: quien sabe cerrarla se anota acá
let cerrar: ((seguir: () => void) => void) | null = null;
let vieneCerrado = false;

/** se cumple cuando el telón de esta vuelta empieza a abrirse (hay que pedirlo al montar, no guardarlo) */
export function telonAbierto() {
  return aviso;
}

export function abrirTelon() {
  abierto = true;
  vieneCerrado = false;
  avisar();
}

/** la entrada va a volver a verse: lo que se monte desde ahora espera el aviso nuevo */
export function cerrarTelon() {
  if (!abierto) return;
  abierto = false;
  vuelta += 1;
  aviso = nuevoAviso();
  pagina = nuevoAvisoDePagina();
  hueco = 0;
  fin = nuevoAvisoDeFin();
}

/** el tamaño del hueco de la flor, en cada cuadro mientras crece */
export function avisarHueco(px: number) {
  hueco = px;
  oyentesDelHueco.forEach((oyente) => oyente(px));
}

/** se entera de cada cambio del hueco; si ya está en marcha, se entera enseguida del último. Devuelve cómo borrarse */
export function escucharHueco(oyente: (px: number) => void) {
  oyentesDelHueco.add(oyente);
  if (hueco > 0) oyente(hueco);
  return () => {
    oyentesDelHueco.delete(oyente);
  };
}

/** la entrada de esta vuelta terminó del todo (Entrada lo llama al completar; sin entrada, enseguida) */
export function terminarTelon() {
  avisarFin();
}

/** se cumple cuando la entrada de esta vuelta terminó del todo (hay que pedirlo al montar, como telonAbierto) */
export function telonTerminado() {
  return fin;
}

/** true mientras el telón de esta vuelta no se abrió: el hero decide con esto si arma la flor de fotos o no */
export function hayEntradaPendiente() {
  return !abierto;
}

/** lo llama la cabecera de cada página (Hero, EnteteDePage) al montar, junto con el resto de la página */
export function paginaArmada() {
  avisarPagina();
}

export function paginaLista() {
  return pagina;
}

/** cuántas veces se volvió a cerrar el telón (para lo que se hace una vez por entrada, como la píldora del menú) */
export function vueltaDeEntrada() {
  return vuelta;
}

/** el telón que cierra la página al irse (Entrada) se anota; devuelve cómo borrarse */
export function escucharCierre(hacer: (seguir: () => void) => void) {
  cerrar = hacer;
  return () => {
    if (cerrar === hacer) cerrar = null;
  };
}

/** cierra la página por la flor y recién ahí sigue (navega). Sin telón (menos movimiento), sigue enseguida */
export function cerrarYSeguir(seguir: () => void) {
  if (!cerrar) return seguir();
  cerrar(() => {
    vieneCerrado = true;
    seguir();
  });
}

/** la entrada que llega después de un cierre arranca ya verde, sin aparecer desde el color de la página */
export function telonVieneCerrado() {
  return vieneCerrado;
}
