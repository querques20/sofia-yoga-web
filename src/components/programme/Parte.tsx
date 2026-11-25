/**
 * One of the frame's two texts: what changes in the body (the sage shape) or how the practice adapts (the blue
 * one). The shape and its label stay; the three trimesters' lines lie in one cell and the scene shows one at a
 * time (`.marco-pila`, globals.css). Where nothing moves they are a list, and each line says its trimester.
 * Two overlapping ellipses, never a circle. Hidden from a screen reader: the trimester list reads the lines
 */
export function Parte({ clase, color, etiqueta, pila, lineas }: { clase: string; color: string; etiqueta: string; pila: string; lineas: { cual: React.ReactNode; texto: string }[] }) {
  return (
    <div aria-hidden="true">
      <p className="flex items-center gap-2.5">
        <svg viewBox="0 0 60 50" className="h-6 w-7 shrink-0 overflow-visible lg:h-8 lg:w-10" aria-hidden="true">
          <g className={clase} fill={color}>
            <ellipse cx="30" cy="24" rx="22" ry="17" transform="rotate(-16 30 24)" />
            <ellipse cx="36" cy="30" rx="15" ry="12" transform="rotate(28 36 30)" />
          </g>
        </svg>
        <span className="text-[0.8rem] font-bold tracking-[0.08em] uppercase">{etiqueta}</span>
      </p>
      <div className={`marco-pila ${pila} mt-1.5 text-[0.95rem] leading-snug lg:mt-2 lg:text-[clamp(0.84rem,min(2.05svh,1.25vw),1.05rem)]`}>
        {lineas.map((linea) => (
          <p key={linea.texto}>
            <span className="marco-cual">{linea.cual}</span>
            {linea.texto}
          </p>
        ))}
      </div>
    </div>
  );
}
