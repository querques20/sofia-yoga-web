"use client";

import { useRef, type CSSProperties } from "react";
import { CONTACTO } from "@/lib/contacto";
import { escucharHueco, hayEntradaPendiente, HUECO_INICIAL, paginaArmada, telonTerminado } from "@/lib/entrada";
import { gsap, useGSAP } from "@/lib/gsap";
import { heroEntranceEnds, heroEntranceStarts, heroLeft } from "@/lib/hero-entrance";
import { rutaEn } from "@/lib/idiomas";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useRuta } from "@/lib/useRuta";
import { Magnetique } from "./Magnetique";
import {
  abrirPuertas,
  aparecerEnSuLugar,
  dejarEnSuLugar,
  formarFlor,
  limpiarPuertas,
  medirPuertas,
  parallax,
  remedirPuertas,
  respirarYFlotar,
} from "./hero/coreografia";
import { tamanoDeLaFlor } from "./hero/geometria";
import { Puerta } from "./hero/Puerta";
import { PUERTAS, type ClavePuerta } from "./hero/puertas";

export type TextosHero = {
  /** las tres líneas del título, y abajo el lugar en manuscrita */
  lineas: [string, string, string];
  lugar: string;
  sub: string;
  whatsapp: string;
  /** cómo se llama el grupo de puertas para el lector de pantalla */
  puertasAria: string;
  puertas: Record<ClavePuerta, { nombre: string; alt: string }>;
};

// la unidad de todo el collage: así entra igual en una pantalla ancha y en una bajita
const UNIDAD = { "--u": "min(1vw, 1.6vh)" } as CSSProperties;
// el collage va en compu: el mismo corte que el menú, y más ancho que alto. Abajo de eso, la grilla
const COMPU = "(min-width: 64rem) and (min-aspect-ratio: 1/1)";
// la flor de fotos se queda un instante entera antes de abrirse
const PAUSA = 0.2;

// en qué anda la coreografía: la flor crece con el hueco, los pétalos se abren, o ya está todo en su lugar
type Fase = "flor" | "abriendo" | "quieta";

/**
 * el hero del Inicio: el título en el medio y las seis puertas alrededor, cada una una foto con link a su página.
 * Con la entrada, las fotos forman la flor por la que se abre el telón y después se abren hasta su lugar
 */
export function Hero({ t }: { t: TextosHero }) {
  const raiz = useRef<HTMLElement>(null);
  const { idioma } = useRuta();
  const quieto = useReducedMotion();

  useGSAP(
    (_, contextSafe) => {
      // la página se monta entera de una vez: la entrada espera este aviso para dibujar la flor
      paginaArmada();
      const seccion = raiz.current;
      if (!seccion) return;
      const q = gsap.utils.selector(raiz);
      // con menos movimiento todo queda en su lugar, como lo deja el CSS
      if (quieto) {
        gsap.set(q(".entra"), { visibility: "visible" });
        return;
      }

      // the nav waits for this entrance to end before it shows (nav/show-after-hero.ts)
      heroEntranceStarts();
      seccion.classList.add("con-coreografia");
      const fotos = medirPuertas(seccion);
      const lineas = q(".hero-linea > span:not(.mano)");
      const [mano] = q(".mano");
      const carteles = q("[data-cartel]");
      const ventana = () => ({ ancho: document.documentElement.clientWidth, alto: window.innerHeight });
      const enCompu = () => window.matchMedia(COMPU).matches;

      // Entrada decide si hay telón antes de que corra este efecto (en el layout va antes que la página): por
      // eso acá se puede preguntar. Si alguien pusiera <Entrada /> después de {children}, la flor saldría sin telón
      let fase: Fase = hayEntradaPendiente() ? "flor" : "abriendo";
      let vivo = true;
      let ultimoHueco = HUECO_INICIAL;
      let apertura: gsap.core.Timeline | null = null;
      let dejarDeRespirar = () => {};
      let dejarParallax = () => {};
      let dejarDeEscucharHueco = () => {};

      // el texto espera escondido y entra mientras los pétalos se abren
      gsap.set(lineas, { yPercent: 112 });
      gsap.set(mano, { clipPath: "inset(-20% 100% -20% -5%)" });
      gsap.set(q(".hero-sub, .hero-acciones"), { opacity: 0, y: 16 });
      gsap.set(carteles, { opacity: 0 });

      const entrarTexto = (linea: gsap.core.Timeline, desde: number) => {
        linea
          .to(lineas, { yPercent: 0, duration: 1.05, stagger: 0.09, ease: "power3.out" }, desde)
          // «à Genève» no sube: se escribe de izquierda a derecha
          .to(mano, { clipPath: "inset(-20% -5% -20% -5%)", duration: 0.9, ease: "power2.inOut", clearProps: "clipPath" }, desde + 0.35)
          .to(q(".hero-sub, .hero-acciones"), { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, desde + 0.35)
          .to(carteles, { opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }, desde + 0.45);
      };

      // el parallax se saca antes de volver a ponerlo: si no, quedan escenas de más escuchando el scroll
      const ponerParallax = () => {
        dejarParallax();
        dejarParallax = enCompu() ? parallax(fotos, seccion) : () => {};
      };

      // lo último, y no para: las fotos respiran y flotan, y en compu se van a su velocidad al bajar
      const alTerminar = contextSafe!(() => {
        if (!vivo) return;
        fase = "quieta";
        heroEntranceEnds();
        dejarDeRespirar();
        dejarDeRespirar = respirarYFlotar(fotos);
        ponerParallax();
      });

      const abrir = contextSafe!((desdeLaFlor: boolean) => {
        fase = "abriendo";
        apertura = gsap.timeline({ onComplete: alTerminar });
        if (desdeLaFlor) {
          abrirPuertas(fotos, apertura, PAUSA);
          entrarTexto(apertura, PAUSA + 0.7);
        } else {
          // ya se vio la entrada: las fotos aparecen en su lugar, sin flor
          aparecerEnSuLugar(fotos, apertura, 0);
          entrarTexto(apertura, 0.1);
        }
      });

      if (fase === "flor") {
        // por el hueco de la entrada se ven las fotos formando la flor, que crece con él
        formarFlor(fotos, HUECO_INICIAL);
        dejarDeEscucharHueco = escucharHueco((px) => {
          if (fase !== "flor") return;
          ultimoHueco = px;
          formarFlor(fotos, tamanoDeLaFlor(px, ventana()));
        });
        telonTerminado().then(() => {
          if (!vivo || fase !== "flor") return;
          dejarDeEscucharHueco();
          abrir(true);
        });
      } else {
        abrir(false);
      }
      gsap.set(q(".entra"), { visibility: "visible" });

      // si la ventana cambia de tamaño, cada foto vuelve a caer en su puerta. A mitad de la apertura, la apertura
      // se termina de golpe y todo queda en su lugar
      const alCambiar = contextSafe!(() => {
        if (!vivo) return;
        if (fase === "flor") {
          remedirPuertas(fotos);
          formarFlor(fotos, tamanoDeLaFlor(ultimoHueco, ventana()));
          return;
        }
        if (fase === "abriendo") apertura?.progress(1);
        remedirPuertas(fotos);
        dejarEnSuLugar(fotos);
        ponerParallax();
      });
      window.addEventListener("resize", alCambiar);

      return () => {
        vivo = false;
        heroLeft();
        window.removeEventListener("resize", alCambiar);
        dejarDeEscucharHueco();
        dejarDeRespirar();
        dejarParallax();
        limpiarPuertas(fotos);
        seccion.classList.remove("con-coreografia");
      };
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} id="inicio" data-hero className="relative min-h-svh overflow-clip" style={UNIDAD}>
      <div data-hero-copy className="hero-texto text-center">
        {/* el espacio después de cada línea es para quien lee el HTML sin estilos: las líneas son bloques */}
        <h1 className="hero-titulo titre entra">
          {t.lineas.map((linea) => (
            <span key={linea} className="hero-linea">
              <span>{linea}</span>{" "}
            </span>
          ))}
          <span className="hero-linea hero-lugar">
            <span className="mano text-[1.14em] leading-[0.95]">{t.lugar}</span>
          </span>
        </h1>
        <p className="hero-sub entra mx-auto mt-3 max-w-[31rem] text-[1.04rem] leading-[1.45]">{t.sub}</p>
        <div className="hero-acciones entra mt-4 flex justify-center">
          <Magnetique>
            <a className="boton" href={CONTACTO.whatsapp} target="_blank" rel="noopener noreferrer">
              {t.whatsapp}
            </a>
          </Magnetique>
        </div>
      </div>

      <nav className="hero-puertas entra" aria-label={t.puertasAria}>
        {PUERTAS.map((puerta) => (
          <Puerta
            key={puerta.clave}
            puerta={puerta}
            href={rutaEn(idioma, puerta.ruta) + (puerta.ancla ? `#${puerta.ancla}` : "")}
            nombre={t.puertas[puerta.clave].nombre}
            alt={t.puertas[puerta.clave].alt}
          />
        ))}
      </nav>
    </section>
  );
}
