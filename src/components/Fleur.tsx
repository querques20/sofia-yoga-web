import type { Ref } from "react";

type Props = {
  className?: string;
  trazo?: number;
  titulo?: string;
  ref?: Ref<SVGSVGElement>;
};

/** la flor de seis pétalos de sus facturas, en línea fina. Es provisoria hasta tener el archivo de Canva */
export function Fleur({ className, trazo = 2.2, titulo, ref }: Props) {
  return (
    <svg
      ref={ref}
      viewBox="-112 -112 224 224"
      className={className}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
    >
      <g className="petalos" fill="none" stroke="currentColor" strokeWidth={trazo} strokeLinecap="round">
        {Array.from({ length: 6 }, (_, i) => (
          <ellipse
            key={i}
            className="petalo"
            cx="0"
            cy="-52"
            rx="24"
            ry="52"
            pathLength={1}
            transform={`rotate(${i * 60})`}
          />
        ))}
      </g>
    </svg>
  );
}
