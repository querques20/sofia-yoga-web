// íconos de línea, dibujados a mano para que hagan juego con la flor
type Props = { className?: string };

export function IconoWhatsApp({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 19.5 L 5.6 15.8 A 8 8 0 1 1 8.4 18.5 Z" />
      <path d="M9.2 8.6 C 9 9.9 9.6 11.6 10.9 12.9 C 12.3 14.3 14 14.9 15.3 14.7 L 15.8 13.4 L 14.2 12.6 L 13.4 13.3 C 12.5 12.9 11.5 11.9 11.1 11 L 11.8 10.2 L 11 8.6 Z" />
    </svg>
  );
}

export function IconoCorreo({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7.5 C 4 6.6 4.7 6 5.6 6 H 18.4 C 19.3 6 20 6.6 20 7.5 V 16.5 C 20 17.4 19.3 18 18.4 18 H 5.6 C 4.7 18 4 17.4 4 16.5 Z" />
      <path d="M4.6 7 L 12 12.6 L 19.4 7" />
    </svg>
  );
}

export function IconoInstagram({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 4 H 16 C 18.2 4 20 5.8 20 8 V 16 C 20 18.2 18.2 20 16 20 H 8 C 5.8 20 4 18.2 4 16 V 8 C 4 5.8 5.8 4 8 4 Z" />
      <ellipse cx="12" cy="12" rx="3.7" ry="3.6" />
      <ellipse cx="16.9" cy="7.2" rx="0.6" ry="0.6" fill="currentColor" />
    </svg>
  );
}
