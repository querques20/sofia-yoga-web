import type { ReactNode } from "react";

/**
 * Una palabra marcada a mano en violeta: subrayada o rodeada. El trazo (.souligne-trazo) lo dibuja
 * la sección que la usa, cuando la frase entra en pantalla. Va en una sola línea para que la marca no se parta
 */
export function Souligne({ children, forma = "linea" }: { children: ReactNode; forma?: "linea" | "rond" }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      {forma === "linea" ? (
        <svg
          viewBox="0 0 120 12"
          preserveAspectRatio="none"
          className="souligne-trazo pointer-events-none absolute -bottom-[0.2em] -left-[0.04em] h-[0.3em] w-[calc(100%+0.08em)] overflow-visible text-violeta"
          aria-hidden="true"
        >
          <path d="M2 7 C 26 3 52 9 78 5.5 C 94 3.6 108 6 118 4.6" fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 120 50"
          preserveAspectRatio="none"
          className="souligne-trazo pointer-events-none absolute -top-[0.2em] -left-[0.26em] h-[calc(100%+0.42em)] w-[calc(100%+0.52em)] overflow-visible text-violeta"
          aria-hidden="true"
        >
          <path
            d="M74 5 C 40 0 6 8 3 25 C 0 41 30 49 62 48 C 96 47 118 38 117 23 C 116 9 90 2 54 7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  );
}
