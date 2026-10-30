"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { abrirTelon, cerrarTelon, escucharCierre, paginaLista, telonVieneCerrado } from "@/lib/entrada";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { lenisActual } from "@/lib/lenis";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Fleur } from "./Fleur";

// el tamaño de la flor dibujada: el hueco arranca exactamente de este tamaño para que no se note el cambio
const TAMANO_FLOR = 112;
const INSPIRA = 1.18;
// lo más que espera la flor a que la página se arme (si alguna no avisa) y después a un momento libre
const ESPERA_PAGINA_MS = 1000;
const ESPERA_LIBRE_MS = 300;
const CLAVE = "sofia-entrada";

// en qué idioma se vio la entrada en esta visita (la entrada se repite al cambiar de idioma)
function idiomaVisto() {
  try {
    return sessionStorage.getItem(CLAVE);
  } catch {
    return null;
  }
}

function marcarVista(idioma: string) {
  try {
    sessionStorage.setItem(CLAVE, idioma);
  } catch {
    // sin almacenamiento (navegación privada estricta) se ve en cada carga, nada más
  }
}

/**
 * Llama cuando la página ya se armó y el navegador quedó libre: al montar, la página arma sus animaciones y mide
 * todo, y eso congela algunos cuadros. Si la flor se dibuja en ese momento, se traba; el telón verde ya está
 * pintado y espera quieto
 */
function cuandoEsteLibre(hacer: () => void) {
  let cancelar = () => {};
  let vivo = true;
  const tope = new Promise<void>((resolver) => window.setTimeout(resolver, ESPERA_PAGINA_MS));
  Promise.race([Promise.all([document.fonts.ready, paginaLista()]), tope]).then(() => {
    if (!vivo) return;
    // Safari todavía no tiene requestIdleCallback
    if (typeof window.requestIdleCallback === "function") {
      const espera = requestIdleCallback(hacer, { timeout: ESPERA_LIBRE_MS });
      cancelar = () => cancelIdleCallback(espera);
    } else {
      const espera = window.setTimeout(hacer, 150);
      cancelar = () => window.clearTimeout(espera);
    }
  });
  return () => {
    vivo = false;
    cancelar();
  };
}

// el hueco abierto del todo: tapa toda la pantalla, también las esquinas que caen entre dos pétalos
// (el centro donde los seis pétalos se tocan mide un 21 % del ancho de la flor)
const huecoAbierto = () => Math.hypot(window.innerWidth, window.innerHeight) * 2.6;

/**
 * La entrada: el telón verde aparece suave desde el color de la página, la flor se dibuja, inspira, y al expirar
 * la página se abre a través de ella. Una vez por idioma. Al cambiar de idioma, la página primero se cierra por
 * la flor (Cierre) y la entrada nueva arranca ya verde
 */
export function Entrada() {
  const telon = useRef<HTMLDivElement>(null);
  const [termino, setTermino] = useState(false);
  const [aparece, setAparece] = useState(() => !telonVieneCerrado());
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      const idioma = document.documentElement.lang;
      // con menos movimiento, o si ya se vio en esta visita y en este idioma, el telón se abre enseguida
      if (quieto || idiomaVisto() === idioma) {
        abrirTelon();
        setTermino(true);
        return;
      }
      // lo que se monte desde ahora espera a que este telón se abra
      cerrarTelon();
      document.documentElement.classList.remove("entrada-vista");
      const el = telon.current;
      // al volver a un idioma ya visitado, Next no vuelve a montar la página: la tenía guardada escondida, con la
      // entrada terminada. El telón se vuelve a pintar antes del próximo cuadro y este efecto corre de nuevo
      if (!el) {
        setAparece(!telonVieneCerrado());
        setTermino(false);
        return;
      }
      // Lenis arranca después de este efecto: lo frenamos en el cuadro siguiente para que no se pueda bajar durante la entrada
      requestAnimationFrame(() => lenisActual()?.stop());
      const flor = el.querySelector(".entrada-flor");
      const nombre = el.querySelector(".entrada-nombre");
      const final = huecoAbierto();

      const linea = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            lenisActual()?.start();
            // por las dudas, las escenas fijadas se vuelven a medir con la página ya abierta
            ScrollTrigger.refresh();
            setTermino(true);
          },
        })
        .fromTo(el.querySelectorAll(".entrada-flor ellipse"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.6, stagger: 0.045, ease: "power2.inOut" })
        .fromTo(nombre, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.15)
        // inspira: crece un poco y gira hasta quedar como la flor del hueco
        .to(flor, { scale: INSPIRA, rotation: 30, duration: 0.42, ease: "sine.inOut" }, 0.6)
        .to(nombre, { opacity: 0, y: -6, duration: 0.25, ease: "power2.in" }, 0.8)
        // expira: el hueco aparece justo sobre la flor y crece hasta abrir toda la página
        .set(el, { "--flor": `${TAMANO_FLOR * INSPIRA}px` }, 1.02)
        .add(() => {
          // se da por vista recién al abrirse: si se cierra la pestaña antes, se vuelve a ver
          marcarVista(idioma);
          abrirTelon();
        }, 1.04)
        .to(el, { "--flor": `${final}px`, duration: 0.95, ease: "power3.in" }, 1.02)
        .to(flor, { scale: INSPIRA * 2.2, opacity: 0, duration: 0.45, ease: "power2.in" }, 1.02);
      // la flor espera escondida (CSS) para no verse entera antes de dibujarse: con los pétalos en 0 % ya se puede mostrar
      gsap.set(flor, { transformOrigin: "50% 50%", opacity: 1 });

      return cuandoEsteLibre(() => linea.play());
    },
    { dependencies: [quieto, termino], revertOnUpdate: true },
  );

  if (termino) return <Cierre />;

  return (
    <div ref={telon} className={`entrada fixed inset-0 z-[70] bg-verde ${aparece ? "entrada-aparece" : ""}`} aria-hidden="true">
      <Fleur
        className="entrada-flor absolute top-1/2 left-1/2 -mt-[3.5rem] -ml-[3.5rem] h-28 w-28 text-salvia-clara"
        trazo={5}
      />
      <p className="entrada-nombre titre absolute top-[calc(50%+4.6rem)] left-0 w-full text-center text-[1.7rem] tracking-[0.05em] text-pagina">
        Sofia Yoga
      </p>
    </div>
  );
}

/**
 * Al cambiar de idioma, antes de navegar, la página se cierra por la flor: el hueco por donde se abrió se achica
 * hasta tapar todo de verde. La entrada del idioma nuevo arranca desde ese verde
 */
function Cierre() {
  const telon = useRef<HTMLDivElement>(null);
  const [seguir, setSeguir] = useState<(() => void) | null>(null);
  const [hueco, setHueco] = useState(0);
  const quieto = useReducedMotion();

  useEffect(() => {
    if (quieto) return;
    const borrar = escucharCierre((despues) => {
      setHueco(huecoAbierto());
      setSeguir(() => despues);
    });
    return () => {
      borrar();
      // Next esconde esta página al cambiar de idioma (y la vuelve a mostrar si se vuelve): ya cerrada, el telón se va
      setSeguir(null);
    };
  }, [quieto]);

  useGSAP(
    () => {
      if (!seguir || !telon.current) return;
      lenisActual()?.stop();
      gsap.to(telon.current, { "--flor": "0px", duration: 0.9, ease: "power2.inOut", onComplete: seguir });
    },
    { dependencies: [seguir] },
  );

  if (!seguir) return null;
  return (
    <div
      ref={telon}
      className="entrada entrada-cierre fixed inset-0 z-[70] bg-verde"
      style={{ "--flor": `${hueco}px` } as CSSProperties}
      aria-hidden="true"
    />
  );
}
