import type { CSSProperties, ReactNode } from "react";

export type Paso = {
  titulo: string;
  /** cómo se llama en el índice de arriba, corto */
  corto: string;
  /** la idea del paso, en grande */
  idea: ReactNode;
  texto: ReactNode;
};

// fondos opacos y alternados, claro, oscuro, claro: cada panel se apoya sobre el anterior,
// y el cambio de tono es lo que hace legible el corte. Sin terracota (es solo para botones)
const TONOS = [
  { fondo: "bg-arena text-verde", numero: "text-violeta", idea: "text-violeta", texto: "opacity-85", masa: "#F5EFE9", flor: "#7A6193" },
  { fondo: "bg-verde text-pagina", numero: "text-salvia", idea: "text-salvia-clara", texto: "opacity-85", masa: "#4A594B", flor: "#DDE4D9" },
  { fondo: "bg-celeste text-verde", numero: "text-verde/60", idea: "text-verde", texto: "opacity-85", masa: "#DBE9EF", flor: "#7A6193" },
];

/** la flor de Sofía sobre unas masas de elipses; de un paso al otro se va abriendo (más grande y girada) */
function Visual({ numero, total, masa, flor }: { numero: number; total: number; masa: string; flor: string }) {
  const avance = total > 1 ? (numero - 1) / (total - 1) : 1;
  const escala = 0.55 + 0.45 * avance;
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <g fill={masa}>
        <ellipse cx="205" cy="152" rx="168" ry="118" transform="rotate(-8 205 152)" />
        <ellipse cx="300" cy="214" rx="86" ry="64" transform="rotate(18 300 214)" />
      </g>
      <g transform={`translate(205 150) rotate(${-30 + 30 * avance}) scale(${escala})`} fill="none" stroke={flor} strokeWidth={3 / escala} strokeLinecap="round">
        {[0, 60, 120, 180, 240, 300].map((giro) => (
          <ellipse key={giro} className="pila-petalo" cx="0" cy="-52" rx="24" ry="52" pathLength={1} transform={`rotate(${giro})`} />
        ))}
      </g>
    </svg>
  );
}

/**
 * Un paso como panel apilable. Cuando la pila está prendida (globals.css, `[data-pila]`), cada panel se
 * traba un poco más abajo que el anterior —una pestaña por paso— y mide una pestaña más que el que le
 * sigue, así trabados terminan todos en la misma línea y se despegan juntos. Sin eso (movimiento reducido
 * o pantalla baja), van uno abajo del otro con su alto natural
 */
export function PanelPaso({ paso, numero, total }: { paso: Paso; numero: number; total: number }) {
  const tono = TONOS[(numero - 1) % TONOS.length];
  const solapa = "var(--pila-solapa, 4.75rem)";
  return (
    <li
      data-pila-panel
      style={
        {
          "--pila-panel-top": `calc(var(--pila-tope, 6rem) + var(--pila-franja, 7rem) + ${numero - 1} * ${solapa})`,
          "--pila-panel-alto": `calc(var(--pila-alto, 27rem) + ${total - numero} * ${solapa})`,
        } as CSSProperties
      }
      className={`${tono.fondo} flex flex-col overflow-hidden rounded-[2rem]`}
    >
      {/* la pestaña: lo único que queda a la vista cuando el siguiente lo tapa */}
      <div className="flex h-[var(--pila-solapa,4.75rem)] shrink-0 items-center gap-4 px-6 lg:gap-5 lg:px-10">
        <span className={`titre text-[1.7rem] lg:text-[2.3rem] ${tono.numero}`} aria-hidden="true">
          {numero}
        </span>
        <h3 className="titre text-[1.45rem] lg:text-[2.3rem]">{paso.titulo}</h3>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-6 px-6 pb-7 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12 lg:px-10 lg:pb-10">
        {/* en la compu el texto descansa abajo; cuando asoma el siguiente, sube hasta la pestaña (pila.ts) */}
        <div data-pila-texto className="lg:self-end">
          <p className={`text-[1.2rem] leading-snug font-bold lg:text-[1.5rem] ${tono.idea}`}>{paso.idea}</p>
          <p className={`mt-3 max-w-[34rem] text-[1.02rem] leading-relaxed lg:mt-5 lg:text-[1.12rem] ${tono.texto}`}>{paso.texto}</p>
        </div>
        {/* en el celular ocupa lo que le queda al panel debajo del texto */}
        <div className="max-h-[16rem] min-h-0 flex-1 lg:max-h-none">
          <Visual numero={numero} total={total} masa={tono.masa} flor={tono.flor} />
        </div>
      </div>
    </li>
  );
}
