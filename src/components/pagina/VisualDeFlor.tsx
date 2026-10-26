/**
 * Para las páginas que no tienen ilustración propia (FAQ, cours privés): la flor de Sofía sobre unas masas
 * de color, como en los paneles de la pila. Con `esterilla` la flor se apoya en una sola esterilla vista
 * desde arriba: el cours privé es eso, una persona y su esterilla
 */
export function VisualDeFlor({ esterilla = false, className }: { esterilla?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 400 420" className={className} aria-hidden="true">
      <g>
        <ellipse cx="196" cy="208" rx="168" ry="186" transform="rotate(-8 196 208)" fill="#DBE9EF" />
        <ellipse cx="292" cy="306" rx="92" ry="80" transform="rotate(18 292 306)" fill="#DDE4D9" />
        <ellipse cx="104" cy="118" rx="54" ry="44" transform="rotate(-24 104 118)" fill="#DDE4D9" />
      </g>
      {esterilla && (
        <g transform="rotate(-10 200 222)">
          <rect x="138" y="88" width="124" height="268" rx="20" fill="#A4C8D8" />
          {/* las rayitas de la esterilla */}
          <g stroke="#39463A" strokeWidth="2" opacity="0.08">
            {Array.from({ length: 15 }, (_, i) => (
              <path key={i} d={`M150 ${110 + i * 16} L 250 ${110 + i * 16}`} />
            ))}
          </g>
        </g>
      )}
      <g transform="translate(200 222) rotate(-12) scale(0.82)" fill="none" stroke="#7A6193" strokeWidth={2.6} strokeLinecap="round">
        {[0, 60, 120, 180, 240, 300].map((giro) => (
          <ellipse key={giro} cx="0" cy="-52" rx="24" ry="52" transform={`rotate(${giro})`} />
        ))}
      </g>
      {/* unos puntitos sueltos, como en las ilustraciones */}
      <g fill="#7A6193" opacity="0.55">
        <ellipse cx="66" cy="252" rx="2.2" ry="2.6" />
        <ellipse cx="338" cy="96" rx="1.8" ry="2.1" />
        <ellipse cx="350" cy="214" rx="2" ry="2.4" />
      </g>
    </svg>
  );
}
