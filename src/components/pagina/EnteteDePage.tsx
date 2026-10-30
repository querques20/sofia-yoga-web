"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { paginaArmada, telonAbierto } from "@/lib/entrada";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { rutaEn } from "@/lib/idiomas";
import { useInterfaz } from "@/lib/useInterfaz";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useRuta } from "@/lib/useRuta";

// si las fuentes tardan, no dejamos el título escondido más de esto (igual que en el inicio)
const ESPERA_FUENTES = 500;

/** la palabra del título en manuscrita y violeta, como «bouger» en el inicio */
export function Mano({ children }: { children: ReactNode }) {
  // el margen es para que la última letra, que se inclina, no se pegue a la palabra siguiente
  return <span className="mano mr-[0.12em] inline-block text-[1.12em]">{children}</span>;
}

type Props = {
  /** el nombre corto de la página, para el camino de vuelta al inicio */
  fil: string;
  titulo: ReactNode;
  intro: ReactNode;
  acciones?: ReactNode;
  /** lo que va al costado: la ilustración, el ticket, el retrato o el mensaje */
  visual?: ReactNode;
  /** si lo del costado se queda un poco atrás al bajar (no conviene cuando es algo para tocar) */
  paralaje?: boolean;
};

/**
 * La cabecera de las páginas de adentro, con el mismo movimiento que el inicio: las líneas del título suben,
 * la palabra manuscrita se escribe y el resto llega después. Arranca cuando se abre el telón de la entrada;
 * si se llega navegando, el telón ya está abierto y arranca enseguida
 */
export function EnteteDePage({ fil, titulo, intro, acciones, visual, paralaje = true }: Props) {
  const t = useInterfaz();
  const { idioma } = useRuta();
  const raiz = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    (_, contextSafe) => {
      // la página se monta entera de una vez: la entrada espera este aviso para dibujar la flor
      paginaArmada();
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      let partido: SplitText | null = null;
      let arranco = false;

      const animar = contextSafe!(() => {
        if (arranco) return;
        arranco = true;
        const [h1] = q(".entete-titulo");
        partido = SplitText.create(h1, { type: "lines", mask: "lines" });
        gsap.set(q(".entete-texto .entra"), { visibility: "visible" });

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(q(".entete-fil"), { opacity: 0, y: 10, duration: 0.7 }, 0)
          .from(partido.lines, { yPercent: 108, duration: 1.1, stagger: 0.12 }, 0.1)
          .fromTo(
            q(".entete-titulo .mano"),
            { clipPath: "inset(-60% 100% -60% -5%)" },
            { clipPath: "inset(-60% -5% -60% -5%)", duration: 1.2, ease: "power2.inOut", clearProps: "clipPath" },
            0.6,
          )
          .from(q(".entete-intro, .entete-acciones"), { opacity: 0, y: 16, duration: 0.9, stagger: 0.12 }, 0.55)
          .add(() => partido?.revert());
      });

      // sin dibujo (FAQ, cours privés) no hay nada que mover
      if (paralaje && q(".entete-visual").length) {
        gsap.to(q(".entete-visual"), {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: raiz.current, start: "top top", end: "bottom top", scrub: 0.6 },
        });
      }

      // «vivo» evita que una promesa de un montaje anterior (React monta dos veces en desarrollo) anime de nuevo
      let reloj = 0;
      let vivo = true;
      telonAbierto().then(() => {
        if (!vivo) return;
        reloj = window.setTimeout(animar, ESPERA_FUENTES);
        document.fonts.ready.then(() => {
          window.clearTimeout(reloj);
          if (vivo) animar();
        });
      });
      return () => {
        vivo = false;
        window.clearTimeout(reloj);
        partido?.revert();
      };
    },
    { scope: raiz, dependencies: [quieto, paralaje], revertOnUpdate: true },
  );

  return (
    <section ref={raiz} className="relative overflow-hidden pt-28 pb-14 lg:flex lg:min-h-[92svh] lg:items-center lg:pt-32 lg:pb-20">
      <div className="contenedor grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="entete-texto relative z-10 lg:col-span-7">
          <nav aria-label={t.nav.migas} className="entete-fil entra mb-7 text-[1rem]">
            <ol className="flex flex-wrap items-center gap-2.5">
              <li>
                <Link href={rutaEn(idioma, "/")} className="enlace">
                  {t.nav.inicio}
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-40">
                /
              </li>
              <li aria-current="page" className="font-bold">
                {fil}
              </li>
            </ol>
          </nav>
          <h1 className="entete-titulo titre entra text-[clamp(3rem,8.6vw,6.3rem)]">{titulo}</h1>
          <div className="entete-intro entra mt-7 max-w-[34rem] space-y-4 text-[1.15rem] leading-relaxed lg:text-[1.25rem]">{intro}</div>
          {acciones && <div className="entete-acciones entra mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">{acciones}</div>}
        </div>
        {visual && <div className="entete-visual relative lg:col-span-5">{visual}</div>}
      </div>
    </section>
  );
}
