import { gsap, ScrollTrigger } from "@/lib/gsap";
import { flujoDesdeSeccion, topeDePanel } from "./medidas";

// lo que se mueve en la pila (el apilado en sí es CSS, en globals.css):
// - la llegada: el título y el primer panel suben apenas cuando asoma la sección;
// - la flor de cada panel se dibuja cuando el panel aparece (también en el celular);
// - en la compu, el texto de cada panel sube y se achica hasta la pestaña antes de que el siguiente lo tape,
//   y el índice de arriba marca el paso que se está leyendo

/** escala del texto cuando ya quedó pegado a la pestaña */
const COMPACTO = 0.8;
/** aire entre la pestaña y el texto achicado, en rem */
const AIRE_REM = 1;

type Estado = "recorrido" | "activo" | "pendiente";

function marcar(pasos: HTMLElement[], activo: number) {
  pasos.forEach((paso, i) => {
    const estado: Estado = i === activo ? "activo" : i < activo ? "recorrido" : "pendiente";
    paso.dataset.estado = estado;
    // para un lector de pantalla, cuál es el que se está leyendo: el color solo no lo dice
    if (estado === "activo") paso.setAttribute("aria-current", "step");
    else paso.removeAttribute("aria-current");
  });
}

/** se llama con la pila prendida (movimiento y alto suficiente); `compu` suma el achicado y el índice */
export function animarPila(seccion: HTMLElement, compu: boolean) {
  const paneles = gsap.utils.toArray<HTMLElement>("[data-pila-panel]", seccion);
  const pasos = gsap.utils.toArray<HTMLElement>("[data-pila-paso]", seccion);
  const franja = seccion.querySelector<HTMLElement>("[data-pila-franja]");
  if (!paneles.length) return () => {};

  gsap.from([franja, paneles[0]], {
    autoAlpha: 0,
    y: 26,
    duration: 0.9,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: { trigger: seccion, start: "top 78%", once: true },
  });

  paneles.forEach((panel) => {
    gsap.fromTo(
      panel.querySelectorAll(".pila-petalo"),
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 1.1, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: panel, start: "top 82%", once: true } },
    );
  });

  if (!compu) return () => {};

  // cada panel prende su paso cuando se traba: su lugar en el flujo menos el `top` con el que se traba
  paneles.forEach((panel, i) => {
    ScrollTrigger.create({
      trigger: seccion,
      start: () => `top+=${flujoDesdeSeccion(panel) - topeDePanel(panel)} top`,
      invalidateOnRefresh: true,
      onEnter: () => marcar(pasos, i),
      onLeaveBack: () => marcar(pasos, Math.max(0, i - 1)),
    });
  });
  marcar(pasos, 0);

  // el achicado, por scroll: arranca cuando el borde del que viene asoma por abajo de la pantalla y termina
  // cuando llega al texto en reposo. Al último lo tapa la banda del cierre; si no hay banda, nadie lo tapa
  const banda = seccion.querySelector<HTMLElement>("[data-pila-banda]");
  const tapados = banda ? paneles : paneles.slice(0, -1);
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const textos = tapados.flatMap((panel, i) => {
    const texto = panel.querySelector<HTMLElement>("[data-pila-texto]");
    const pestana = panel.firstElementChild as HTMLElement | null;
    if (!texto || !pestana) return [];
    // la banda ya trae su margen negativo en el offsetTop: es su lugar real en el flujo
    const siguiente = () => (i + 1 < paneles.length ? flujoDesdeSeccion(paneles[i + 1]) : (banda?.offsetTop ?? 0));
    const reposo = () => topeDePanel(panel) + texto.offsetTop;
    gsap.fromTo(
      texto,
      { y: 0, scale: 1, transformOrigin: "0 0" },
      {
        y: () => -(texto.offsetTop - (pestana.offsetHeight + AIRE_REM * rem)),
        scale: COMPACTO,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: seccion,
          start: () => `top+=${siguiente()} bottom`,
          end: () => `top+=${siguiente()} ${reposo()}px`,
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      },
    );
    return [texto];
  });
  gsap.set(textos, { willChange: "transform" });

  return () => {
    marcar(pasos, 0);
    gsap.set(textos, { clearProps: "transform,willChange" });
  };
}
