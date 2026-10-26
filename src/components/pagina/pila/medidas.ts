// de dónde sacan las posiciones las animaciones de la pila (la misma idea que «Cómo trabajamos» en ED).
// Dos reglas que costaron allá:
// 1. Las posiciones se miden desde la sección y no desde los paneles: un panel trabado (sticky) le miente
//    a ScrollTrigger sobre dónde está, la lista no.
// 2. El `top` con el que se traba cada panel se lee del CSS, que es el que lo calcula según la pantalla:
//    una copia en JS se desincroniza sin avisar

/** el `top` con el que se traba el panel, en px */
export function topeDePanel(panel: HTMLElement) {
  return parseFloat(getComputedStyle(panel).top) || 0;
}

/** dónde arranca un panel en el flujo, medido desde el borde de la sección (con el aire entre paneles) */
export function flujoDesdeSeccion(panel: HTMLElement) {
  const lista = panel.parentElement;
  if (!lista) return 0;
  const estilo = getComputedStyle(lista);
  const aire = parseFloat(estilo.rowGap) || 0;
  const hermanos = Array.from(lista.children).filter((h): h is HTMLElement => h instanceof HTMLElement && h.hasAttribute("data-pila-panel"));
  return (
    lista.offsetTop +
    parseFloat(estilo.paddingTop) +
    hermanos.slice(0, hermanos.indexOf(panel)).reduce((suma, h) => suma + h.offsetHeight + aire, 0)
  );
}
