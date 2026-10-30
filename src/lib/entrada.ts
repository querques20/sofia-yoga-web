// la entrada de la página avisa cuándo empieza a abrirse, así lo que anima al llegar arranca justo ahí
// y no se pierde detrás del telón. Si no hay entrada (menos movimiento, o ya vista), se avisa enseguida.
// La entrada se repite al cambiar de idioma: cada vez que vuelve a cerrarse el telón empieza una vuelta nueva,
// con su propio aviso

let avisar: () => void = () => {};
let abierto = false;
let vuelta = 0;
const nuevoAviso = () => new Promise<void>((resolver) => (avisar = resolver));
let aviso: Promise<void> = typeof window === "undefined" ? Promise.resolve() : nuevoAviso();

/** se cumple cuando el telón de esta vuelta empieza a abrirse (hay que pedirlo al montar, no guardarlo) */
export function telonAbierto() {
  return aviso;
}

export function abrirTelon() {
  abierto = true;
  avisar();
}

/** la entrada va a volver a verse: lo que se monte desde ahora espera el aviso nuevo */
export function cerrarTelon() {
  if (!abierto) return;
  abierto = false;
  vuelta += 1;
  aviso = nuevoAviso();
}

/** cuántas veces se volvió a cerrar el telón (para lo que se hace una vez por entrada, como la píldora del menú) */
export function vueltaDeEntrada() {
  return vuelta;
}
