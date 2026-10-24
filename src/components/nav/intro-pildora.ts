import { telonAbierto } from "@/lib/entrada";
import { gsap } from "@/lib/gsap";

// cuánto se ve el nombre antes de plegarse y abrir los links: lo mismo que tarda en asentarse el inicio
const SOSTEN_MS = 1700;
// si la persona ya quiere hacer algo, no se la hace esperar más que esto
const SOSTEN_MINIMO_MS = 600;
const INTENCION = ["pointermove", "wheel", "touchstart", "keydown"] as const;

// la bienvenida es una sola vez: si se vuelve al Inicio navegando, el menú ya está abierto
let hecha = false;
export function introPildoraHecha() {
  return hecha;
}

// si se entró al sitio por otra página tampoco se hace: al llegar al Inicio el menú ya estaba abierto
export function saltarIntroPildora() {
  hecha = true;
}

/**
 * La píldora del Inicio, como la de ED: arranca cerrada (la flor y el nombre) y se abre.
 * El nombre se desvanece y se pliega, la píldora crece y los links entran escalonados.
 * Se arma adentro del contexto del matchMedia que la llama: así, si se cambia de página a mitad de camino,
 * todo se deshace una sola vez y en orden (con un contexto propio adentro se deshacía dos veces
 * y los links volvían a quedar escondidos)
 */
export function crearIntroPildora(nav: HTMLElement, contexto: gsap.Context) {
  let vivo = true;
  let reloj = 0;
  let quitar = () => {};
  let corrio = false;
  const q = gsap.utils.selector(nav);

  gsap.set(q("[data-nav-marca]"), { width: "auto", autoAlpha: 1 });
  gsap.set(q("[data-nav-links]"), { width: 0, autoAlpha: 0 });
  gsap.set(q("[data-nav-item]"), { autoAlpha: 0, x: -8 });

  const abrir = () => {
    if (corrio || !vivo) return;
    corrio = true;
    hecha = true;
    quitar();
    // el timeline nace más tarde, afuera del efecto: se suma al mismo contexto para que también se deshaga
    contexto.add(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(q("[data-nav-marca]"), { autoAlpha: 0, duration: 0.3, ease: "power2.out" })
        .to(q("[data-nav-marca]"), { width: 0, duration: 0.45 }, "<")
        .set(q("[data-nav-links]"), { autoAlpha: 1 }, "+=0.06")
        .to(q("[data-nav-links]"), { width: "auto", duration: 0.75, ease: "expo.out" }, "<")
        .to(q("[data-nav-item]"), { autoAlpha: 1, x: 0, duration: 0.55, stagger: 0.07 }, "<0.12");
    });
  };

  telonAbierto.then(() => {
    if (!vivo) return;
    const arranque = performance.now();
    reloj = window.setTimeout(abrir, SOSTEN_MS);
    const apurar = () => {
      window.clearTimeout(reloj);
      reloj = window.setTimeout(abrir, Math.max(0, SOSTEN_MINIMO_MS - (performance.now() - arranque)));
      quitar();
    };
    INTENCION.forEach((e) => window.addEventListener(e, apurar, { passive: true, once: true }));
    quitar = () => INTENCION.forEach((e) => window.removeEventListener(e, apurar));
  });

  // lo que GSAP no deshace solo: el reloj y los oyentes
  return () => {
    vivo = false;
    window.clearTimeout(reloj);
    quitar();
  };
}
