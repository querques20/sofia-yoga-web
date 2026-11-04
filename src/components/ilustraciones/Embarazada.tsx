import { CabezaDePerfil } from "./cara";
import { Cuello, FloresVioletas, Manguita, MasasDeFondo, PieDeAdelante, PieDeAtras, Ramas, RIBETE } from "./partes";

// el vestido, con el escote de perfil y el borde ondulado
const VESTIDO =
  "M203 163 C 194 166 187 174 185 186 C 180 220 178 250 176 290 C 174 340 166 400 156 462 C 170 468 186 466 200 470 C 216 474 232 468 248 472 C 262 475 274 468 284 462 C 280 420 276 380 274 352 C 296 334 308 306 304 278 C 300 250 284 230 262 222 C 268 212 266 198 258 190 C 254 186 249 184 244 184 C 231 181 216 173 203 163 Z";

// la embarazada de perfil, la ilustración con detalle (ilustraciones/embarazada-perfil-detalle.svg),
// partida en grupos para poder animarla por partes. Sin el filtro de grano: la página ya tiene el suyo encima.
// La cabeza, el cuello, la manguita y los pies son los mismos que los de la embarazada del programa (partes.tsx)
export function Embarazada() {
  return (
    <>
      <defs>
      {/* estampado de puntitos para el vestido */}
      <pattern id="h-puntos" width="13" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
      <ellipse cx="4" cy="4" rx="1.5" ry="1.8" fill="#DDE4D9"/>
      <ellipse cx="10.5" cy="10.5" rx="1.2" ry="1.5" fill="#DDE4D9"/>
      </pattern>
      <clipPath id="h-recorte-vestido"><path d={VESTIDO}/></clipPath>
      </defs>
      <MasasDeFondo />
      <Ramas />
      <g className="ilus-flores">
        {/* la flor de Sofía y dos flores chiquitas, en línea violeta */}
        <FloresVioletas />
        {/* puntitos sueltos */}
        <g fill="#7A6193" opacity="0.55">
        <ellipse cx="146" cy="78" rx="2.2" ry="2.6"/>
        <ellipse cx="300" cy="78" rx="1.8" ry="2.1"/>
        <ellipse cx="356" cy="196" rx="2.2" ry="2.5"/>
        <ellipse cx="70" cy="196" rx="1.8" ry="2.2"/>
        </g>
      </g>
      {/* sombra del piso */}
      <ellipse cx="224" cy="488" rx="100" ry="9" fill="#A9BCA1" opacity="0.55"/>
      <g className="ilus-figura">
        {/* los pies con sandalias van primero: el ruedo del vestido les tapa el empeine */}
        <PieDeAtras />
        <PieDeAdelante />
        <Cuello />
        <g className="ilus-cabeza">
          <CabezaDePerfil />
        </g>
        <g className="ilus-torso">
          {/* vestido, con borde ondulado */}
          <path fill="#A9BCA1" d={VESTIDO}/>
          <g clipPath="url(#h-recorte-vestido)">
          {/* estampado */}
          <path fill="url(#h-puntos)" opacity="0.6" d={VESTIDO}/>
          {/* volumen: sombra en la espalda, debajo del pecho y debajo de la panza */}
          <g fill="#39463A" opacity="0.11">
          <path d="M184 184 C 180 220 178 250 176 290 C 174 340 166 400 156 462 L 176 465 C 184 400 190 340 192 290 C 194 250 196 220 200 186 Z"/>
          <path d="M262 222 C 270 222 280 226 288 232 C 276 230 268 231 259 234 Z"/>
          <path d="M304 280 C 306 308 294 336 274 352 C 270 344 286 326 292 304 C 296 292 300 284 304 280 Z"/>
          </g>
          {/* luz sobre la panza */}
          <path fill="#F5EFE9" opacity="0.32" d="M264 224 C 286 232 301 252 304 276 C 297 262 287 248 273 238 C 269 234 266 229 264 224 Z"/>
          {/* ribete del escote */}
          <path d={RIBETE} fill="none" stroke="#F5EFE9" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
          {/* pliegues */}
          <g fill="none" stroke="#39463A" strokeWidth="2.5" strokeLinecap="round" opacity="0.13">
          <path d="M276 350 C 268 357 258 361 246 362"/>
          <path d="M262 364 C 266 398 270 428 272 458"/>
          <path d="M232 340 C 228 384 224 422 222 464"/>
          </g>
          </g>
          {/* brazo y mano sobre la panza */}
          <path fill="#E6D8C7" d="M192 184 C 190 172 200 166 210 170 C 216 174 218 186 216 196 C 216 216 218 238 226 256 C 246 266 268 272 286 276 C 296 275 304 278 305 284 C 306 290 300 294 290 292 C 274 290 256 284 238 280 C 220 278 204 272 198 260 C 190 238 190 210 192 184 Z"/>
          <g fill="#39463A" opacity="0.1">
          <path d="M192 184 C 190 210 190 238 198 260 C 202 266 206 268 211 270 C 203 250 201 220 203 190 Z"/>
          <path d="M238 280 C 256 284 274 290 290 292 C 300 294 304 290 305 286 C 296 289 280 287 262 283 C 252 281 244 279 238 277 Z"/>
          </g>
          {/* dedos */}
          <g fill="none" stroke="#39463A" strokeWidth="1.1" strokeLinecap="round" opacity="0.3">
          <path d="M288 281 C 294 281.5 299 282.5 304 283.5"/>
          <path d="M288 286.5 C 293 287.5 297 288.5 301 289.5"/>
          </g>
          {/* pulsera */}
          <path d="M276 271 C 279.5 278 280.5 285 279 292" fill="none" stroke="#7A6193" strokeWidth="2.4" strokeLinecap="round"/>
          <Manguita puntos="h-puntos" />
        </g>
      </g>
    </>
  );
}
