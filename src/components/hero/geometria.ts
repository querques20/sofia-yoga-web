// la geometría de la flor de fotos del Inicio, sin DOM: dónde cae cada pétalo, cómo pasa cada foto de pétalo a su
// forma y cuánto mide la flor. Son funciones puras: las prueba geometria.test.mjs

/** los ocho radios de un border-radius (los cuatro horizontales y los cuatro verticales), en % */
export type Forma = [number, number, number, number, number, number, number, number];

// las dos formas entre las que respira cada foto, las mismas del marco de À propos (Portrait.tsx)
export const FORMA_A: Forma = [58, 42, 46, 54, 52, 44, 56, 48];
export const FORMA_B: Forma = [50, 50, 56, 44, 46, 54, 48, 52];
// y la forma de pétalo de la que salen: una elipse
export const PETALO: Forma = [50, 50, 50, 50, 50, 50, 50, 50];

// la flor dibujada de la entrada (Fleur.tsx): viewBox de 224, seis elipses de 24 × 52 con el centro a 52 del medio
export const FLOR = { lado: 224, petaloAncho: 48, petaloAlto: 104, radio: 52 } as const;

/**
 * el border-radius de una foto. `soplo` (0 a 1) la lleva de la forma A a la B al respirar; `forma` (0 a 1) la lleva
 * de pétalo a esa mezcla; `desfase` corre los radios de a dos, así cada foto respira en otro punto que la de al lado
 */
export function radioOrganico(soplo: number, forma: number, desfase: number): string {
  const corrida = (f: Forma, k: number) => f[(k + desfase * 2) % 8];
  const radios = PETALO.map((petalo, k) => {
    const a = corrida(FORMA_A, k);
    const respirando = a + (corrida(FORMA_B, k) - a) * soplo;
    return +(petalo + (respirando - petalo) * forma).toFixed(2);
  });
  return `${radios.slice(0, 4).join("% ")}% / ${radios.slice(4).join("% ")}%`;
}

/** el pétalo de un ángulo (en grados, 0 arriba, horario) en una flor de `tam` px de lado centrada en `centro` */
export function petaloEnFlor(angulo: number, tam: number, centro: { x: number; y: number }) {
  const escala = tam / FLOR.lado;
  const a = (angulo * Math.PI) / 180;
  return {
    x: centro.x + FLOR.radio * escala * Math.sin(a),
    y: centro.y - FLOR.radio * escala * Math.cos(a),
    w: FLOR.petaloAncho * escala,
    h: FLOR.petaloAlto * escala,
    r: angulo,
  };
}

/** el lado de la capa de la foto: cubre la diagonal mientras es un pétalo girado, y queda justa cuando ya está en su lugar */
export function ladoDeLaFoto(w: number, h: number, forma: number): number {
  const cubre = Math.hypot(w, h);
  const justa = (Math.max(w, h) * 108) / 100;
  return cubre * (1 - forma) + justa * forma;
}

/** cuánto mide la flor de fotos: crece con el hueco de la entrada, pero no pasa del 76 % del alto ni del 86 % del ancho */
export function tamanoDeLaFlor(hueco: number, ventana: { ancho: number; alto: number }): number {
  return Math.min(hueco, (ventana.alto * 76) / 100, (ventana.ancho * 86) / 100);
}
