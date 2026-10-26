// lo que comparten los dibujos de la embarazada (el del inicio y el del programa) y la mamá con el bebé:
// los colores, el cuello, la manguita y los pies. Están en las mismas coordenadas en todos. La cara está en cara.tsx

export const PIEL = "#E6D8C7";
// lo que queda del otro lado del cuerpo va un poco más oscuro, así se nota que está más lejos
export const PIEL_LEJOS = "#D8C5B0";
export const VERDE = "#39463A";
export const SALVIA = "#A9BCA1";
export const SALVIA_CLARA = "#DDE4D9";
export const CELESTE_CLARA = "#DBE9EF";
export const VIOLETA = "#7A6193";
export const PAGINA = "#F5EFE9";

// el ribete del escote: se ve de perfil, alto atrás y bajando en diagonal hasta el pecho
export const RIBETE = "M206 167.5 C 218 175.5 230 182.5 241 186.5";

const MANGA = "M199 166 C 209 164 219 168 224 176 C 228 183 228 192 224 199 C 213 202 199 201 188 197 C 187 186 190 174 199 166 Z";

/** el cuello y la sombra de la mandíbula. Baja hasta adentro del vestido para que no quede ningún hueco */
export function Cuello() {
  return (
    <>
      <path fill={PIEL} d="M206 116 L 230 118 C 229 134 231 148 238 162 C 241 170 245 178 249 185 L 247 204 L 196 204 C 198 178 200 152 201 140 C 202 130 203 122 206 116 Z" />
      <path fill={VERDE} opacity="0.07" d="M207 133 C 214 139 227 140 235 136 C 231 141 224 144 216 144 C 211 142 208 138 207 133 Z" />
    </>
  );
}

/** la manguita del vestido: tapa el hombro, así el brazo sale de la manga y no del escote */
export function Manguita({ puntos }: { puntos: string }) {
  return (
    <>
      <path fill={SALVIA} d={MANGA} />
      <path fill={`url(#${puntos})`} opacity="0.6" d={MANGA} />
      <path fill={VERDE} opacity="0.1" d="M188 197 C 199 201 213 202 224 199 C 224 195 223 192 221 190 C 211 193 199 192 189 189 Z" />
      <path d="M190 195.5 C 200 199 212 200 222 197" fill="none" stroke={PAGINA} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
    </>
  );
}

/** el pie de atrás (el del otro lado), con su sandalia. Va antes del vestido: el ruedo le tapa el empeine */
export function PieDeAtras({ className }: { className?: string }) {
  return (
    <g className={className}>
      <path fill={PIEL_LEJOS} d="M170 460 C 167 468 167 476 170 481 L 202 481 C 207 481 208 476 203 473 C 197 469 189 466 184 460 Z" />
      <path fill={VERDE} opacity="0.55" d="M168 480 L 204 480 C 207 480 208 483 205 484 L 171 484 C 168 484 166 482 168 480 Z" />
      <path d="M193 467 C 196 471 197 476 196 480" fill="none" stroke={VIOLETA} strokeWidth="2.2" strokeLinecap="round" />
    </g>
  );
}

/** el pie de adelante con el tobillo, que se ve cuando la panza levanta el ruedo */
export function PieDeAdelante({ className }: { className?: string }) {
  return (
    <g className={className}>
      <path fill={PIEL} d="M250 420 L 268 420 L 268 466 L 250 466 Z" />
      <path fill={PIEL} d="M250 462 C 247 470 247 477 250 482 L 292 482 C 297 482 298 477 293 474 C 286 470 277 467 268 462 Z" />
      <path fill={VERDE} opacity="0.55" d="M248 481 L 294 481 C 297 481 298 484 295 485 L 251 485 C 248 485 246 483 248 481 Z" />
      <g fill="none" stroke={VIOLETA} strokeWidth="2.2" strokeLinecap="round">
        <path d="M277 467 C 280 471 281 476 280 481" />
        <path d="M287 472 C 289 475 289.5 478 289 481" />
      </g>
      {/* el dedo gordo, apenas marcado */}
      <path d="M293 476.5 C 295.5 477.5 296.5 479.5 295.5 481" fill="none" stroke={VERDE} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    </g>
  );
}
