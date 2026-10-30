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
