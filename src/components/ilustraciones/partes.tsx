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

/** the background: overlapping ellipses */
export function MasasDeFondo() {
  return (
    <g className="ilus-masas">
      {/* fondo: masas de elipses encimadas */}
      <g fill="#DDE4D9">
        <ellipse cx="146" cy="366" rx="120" ry="108" transform="rotate(-20 146 366)"/>
        <ellipse cx="112" cy="300" rx="62" ry="50" transform="rotate(30 112 300)"/>
      </g>
      <g fill="#DBE9EF">
        <ellipse cx="220" cy="252" rx="160" ry="192" transform="rotate(-6 220 252)"/>
        <ellipse cx="290" cy="330" rx="104" ry="116" transform="rotate(18 290 330)"/>
      </g>
    </g>
  );
}

/** the tall branch, the pale sprig behind the hair and the low leaves */
export function Ramas() {
  return (
    <g className="ilus-ramas">
      {/* rama alta detrás, a la derecha */}
      <g>
        <path d="M352 486 C 356 430 352 370 336 312" fill="none" stroke="#A9BCA1" strokeWidth="3" strokeLinecap="round"/>
        <g fill="#A9BCA1">
          <path d="M344 344 C 364 336 376 318 378 298 C 358 304 346 322 344 344 Z"/>
          <path d="M340 336 C 322 330 312 314 312 296 C 330 302 340 318 340 336 Z"/>
          <path d="M352 392 C 372 386 386 368 388 348 C 368 354 354 372 352 392 Z"/>
          <path d="M348 384 C 330 380 318 364 316 346 C 334 352 346 366 348 384 Z"/>
          <path d="M355 440 C 374 434 388 418 392 398 C 372 404 358 420 355 440 Z"/>
        </g>
        <g fill="none" stroke="#39463A" strokeWidth="1.2" strokeLinecap="round" opacity="0.18">
          <path d="M346 340 C 356 330 366 318 374 302"/>
          <path d="M338 332 C 330 324 322 314 316 300"/>
          <path d="M354 388 C 364 378 376 366 384 352"/>
          <path d="M346 380 C 336 372 326 362 320 350"/>
          <path d="M357 436 C 368 426 380 414 388 402"/>
        </g>
      </g>

      {/* ramita clara detrás del pelo */}
      <g fill="#DDE4D9">
        <path d="M128 330 C 126 292 130 256 142 222" fill="none" stroke="#DDE4D9" strokeWidth="3" strokeLinecap="round"/>
        <path d="M132 270 C 112 262 104 246 106 230 C 124 236 132 252 132 270 Z"/>
        <path d="M134 250 C 150 242 156 226 154 210 C 138 218 132 234 134 250 Z"/>
        <path d="M130 300 C 110 296 98 282 98 266 C 116 270 128 284 130 300 Z"/>
      </g>
      {/* hojas de abajo */}
      <g fill="#A9BCA1">
        <path d="M96 486 C 92 452 98 420 112 392" fill="none" stroke="#A9BCA1" strokeWidth="3" strokeLinecap="round"/>
        <path d="M100 450 C 76 446 62 430 60 412 C 82 412 98 428 100 450 Z"/>
        <path d="M104 420 C 120 408 124 390 120 372 C 104 380 98 400 104 420 Z"/>
        <path d="M98 470 C 80 474 66 468 58 456 C 74 448 92 456 98 470 Z"/>
      </g>
      <g fill="none" stroke="#39463A" strokeWidth="1.2" strokeLinecap="round" opacity="0.18">
        <path d="M98 448 C 88 440 76 428 66 416"/>
        <path d="M104 416 C 110 404 116 392 119 378"/>
        <path d="M96 468 C 86 466 74 462 64 457"/>
      </g>
    </g>
  );
}

/** Sofia's flower and two small ones, in violet line */
export function FloresVioletas() {
  return (
    <g fill="none" stroke="#7A6193" strokeLinecap="round">
      <g transform="translate(96 116)" strokeWidth="2">
        <ellipse cx="0" cy="-18" rx="8" ry="18"/>
        <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(60)"/>
        <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(120)"/>
        <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(180)"/>
        <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(240)"/>
        <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(300)"/>
      </g>
      <g transform="translate(330 120) scale(0.45)" strokeWidth="3.6">
        <ellipse cx="0" cy="-18" rx="8" ry="18"/>
        <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(60)"/>
        <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(120)"/>
        <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(180)"/>
        <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(240)"/>
        <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(300)"/>
      </g>
      <g transform="translate(56 336) scale(0.38)" strokeWidth="4">
        <ellipse cx="0" cy="-18" rx="8" ry="18"/>
        <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(60)"/>
        <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(120)"/>
        <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(180)"/>
        <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(240)"/>
        <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(300)"/>
      </g>
    </g>
  );
}
