// la parte yang (dinámica) y la parte yin (suave): elipses encimadas, ningún círculo
export function Parte({ clase, color, texto }: { clase: string; color: string; texto: string }) {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 60 50" className="h-10 w-12 shrink-0 overflow-visible" aria-hidden="true">
        <g className={clase} fill={color}>
          <ellipse cx="30" cy="24" rx="22" ry="17" transform="rotate(-16 30 24)" />
          <ellipse cx="36" cy="30" rx="15" ry="12" transform="rotate(28 36 30)" />
        </g>
      </svg>
      <span className="text-[1.02rem] font-bold leading-tight">{texto}</span>
    </div>
  );
}
