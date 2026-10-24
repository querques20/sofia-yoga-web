// la entrada de la página avisa cuándo empieza a abrirse, así el inicio arranca su animación justo ahí
// y no se pierde detrás del telón. Si no hay entrada (menos movimiento), se avisa enseguida.

let avisar: () => void = () => {};
export const telonAbierto: Promise<void> =
  typeof window === "undefined" ? Promise.resolve() : new Promise<void>((resolver) => (avisar = resolver));

export function abrirTelon() {
  avisar();
}
