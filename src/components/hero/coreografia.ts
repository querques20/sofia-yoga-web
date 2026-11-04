"use client";

import { gsap } from "@/lib/gsap";
import { escucharSouffle } from "@/lib/souffle";
import { ladoDeLaFoto, petaloEnFlor, radioOrganico } from "./geometria";
import { PUERTAS } from "./puertas";

/**
 * una foto del Inicio mientras la coreografía la mueve: su puerta (el hueco donde queda) y su marco, con el
 * estado que se pinta en cada cuadro. `x` e `y` son el corrimiento desde el centro de su puerta; `forma` va de
 * 0 (pétalo) a 1 (su forma orgánica)
 */
export type Foto = {
  el: HTMLElement;
  /** lo que GSAP mueve (parallax, fundido): la puerta en sí queda centrada por CSS y no se pisan */
  cuerpo: HTMLElement;
  marco: HTMLElement;
  foto: HTMLElement;
  i: number;
  angulo: number;
  giro: number;
  orden: number;
  prof: number;
  cx: number;
  cy: number;
  W: number;
  H: number;
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  forma: number;
  flote: number;
};

// cuánto tarda cada pétalo en abrirse, y cuánto espera cada uno al anterior
const ABRIR = 1.35;
const ENTRE_PETALOS = 0.05;

/** mide cada puerta en su lugar (centro y tamaño, en la ventana) y arma la foto que la coreografía mueve */
export function medirPuertas(seccion: HTMLElement): Foto[] {
  return PUERTAS.flatMap((p, i) => {
    const el = seccion.querySelector<HTMLElement>(`[data-puerta="${p.clave}"]`);
    const cuerpo = el?.querySelector<HTMLElement>("[data-cuerpo]");
    const marco = el?.querySelector<HTMLElement>("[data-marco]");
    const foto = el?.querySelector<HTMLElement>("[data-foto]");
    if (!el || !cuerpo || !marco || !foto) return [];
    const f: Foto = {
      el,
      cuerpo,
      marco,
      foto,
      i,
      angulo: p.angulo,
      giro: p.giro,
      orden: p.orden,
      prof: p.prof,
      cx: 0,
      cy: 0,
      W: 0,
      H: 0,
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      r: p.giro,
      forma: 1,
      flote: 0,
    };
    remedir(f);
    return [f];
  });
}

function remedir(f: Foto) {
  const caja = f.el.getBoundingClientRect();
  f.cx = caja.left + caja.width / 2;
  f.cy = caja.top + caja.height / 2;
  f.W = caja.width;
  f.H = caja.height;
}

/** vuelve a medir las puertas (la ventana cambió de tamaño) sin perder las fotos que ya están en marcha */
export function remedirPuertas(fotos: Foto[]) {
  fotos.forEach(remedir);
}

/** pinta el estado de una foto: el marco gira y la foto gira al revés, así queda derecha adentro del pétalo */
export function pintar(f: Foto, soplo: number) {
  f.marco.style.width = `${f.w}px`;
  f.marco.style.height = `${f.h}px`;
  f.marco.style.transform = `translate(-50%, -50%) translate(${f.x}px, ${f.y + f.flote}px) rotate(${f.r}deg)`;
  f.marco.style.borderRadius = radioOrganico(soplo, f.forma, f.i);
  const lado = ladoDeLaFoto(f.w, f.h, f.forma);
  f.foto.style.width = `${lado}px`;
  f.foto.style.height = `${lado}px`;
  f.foto.style.transform = `translate(-50%, -50%) rotate(${-f.r}deg)`;
}

/** las seis fotos formando la flor, centrada en la ventana (sin la barra de scroll, como la máscara del telón) */
export function formarFlor(fotos: Foto[], tam: number) {
  const centro = { x: document.documentElement.clientWidth / 2, y: window.innerHeight / 2 };
  for (const f of fotos) {
    const petalo = petaloEnFlor(f.angulo, tam, centro);
    f.x = petalo.x - f.cx;
    f.y = petalo.y - f.cy;
    f.w = petalo.w;
    f.h = petalo.h;
    f.r = petalo.r;
    f.forma = 0;
    pintar(f, 0);
  }
}

/** cada foto en su puerta, con su forma y su giro final */
export function dejarEnSuLugar(fotos: Foto[], soplo = 0) {
  for (const f of fotos) {
    f.x = 0;
    f.y = 0;
    f.w = f.W;
    f.h = f.H;
    f.r = f.giro;
    f.forma = 1;
    pintar(f, soplo);
  }
}

/** los pétalos se abren hasta su lugar, en el orden de cada uno */
export function abrirPuertas(fotos: Foto[], linea: gsap.core.Timeline, desde: number) {
  for (const f of fotos) {
    linea.to(
      f,
      { x: 0, y: 0, w: f.W, h: f.H, r: f.giro, forma: 1, duration: ABRIR, ease: "power3.inOut", onUpdate: () => pintar(f, 0) },
      desde + f.orden * ENTRE_PETALOS,
    );
  }
}

/** sin flor (no hubo entrada): las fotos aparecen en su lugar con un fundido y una escala suave */
export function aparecerEnSuLugar(fotos: Foto[], linea: gsap.core.Timeline, desde: number) {
  dejarEnSuLugar(fotos);
  linea.from(
    fotos.map((f) => f.cuerpo),
    { opacity: 0, scale: 0.94, duration: 0.8, ease: "power3.out", stagger: 0.06 },
    desde,
  );
}

/** las fotos respiran con la web y flotan despacito: el hero nunca queda quieto. Devuelve cómo pararlo */
export function respirarYFlotar(fotos: Foto[]) {
  let soplo = 0;
  const dejarDeEscuchar = escucharSouffle((v) => {
    soplo = v;
  });
  const cuadro = (tiempo: number) => {
    for (const f of fotos) {
      f.flote = Math.sin(tiempo * 0.55 + f.i * 1.3) * 5;
      pintar(f, soplo);
    }
  };
  gsap.ticker.add(cuadro);
  return () => {
    gsap.ticker.remove(cuadro);
    dejarDeEscuchar();
  };
}

/** al bajar, cada foto se va a su velocidad (sobre el cuerpo, no sobre el marco). Devuelve cómo sacarlo */
export function parallax(fotos: Foto[], seccion: HTMLElement) {
  const tweens = fotos.map((f) =>
    gsap.to(f.cuerpo, {
      y: () => -f.prof * seccion.offsetHeight,
      ease: "none",
      scrollTrigger: { trigger: seccion, start: "top top", end: "bottom top", scrub: 0.6, invalidateOnRefresh: true },
    }),
  );
  return () => {
    tweens.forEach((tween) => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
  };
}

/** borra lo que pintó la coreografía: las fotos vuelven a quedar como las deja el CSS */
export function limpiarPuertas(fotos: Foto[]) {
  for (const f of fotos) {
    f.marco.removeAttribute("style");
    f.foto.removeAttribute("style");
  }
}
