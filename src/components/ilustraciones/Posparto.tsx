// la mamá con su bebé (ilustraciones/posparto-bebe.svg), partida en grupos para animarla como la embarazada.
// Sin el filtro de grano: la página ya tiene el suyo encima
export function Posparto() {
  return (
    <>
      <defs>
      {/* puntitos del vestido celeste */}
      <pattern id="pp-puntos" width="13" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
        <ellipse cx="4" cy="4" rx="1.5" ry="1.8" fill="#DBE9EF"/>
        <ellipse cx="10.5" cy="10.5" rx="1.2" ry="1.5" fill="#DBE9EF"/>
      </pattern>
      {/* puntitos más chiquitos para la mantita */}
      <pattern id="pp-puntos-manta" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)">
        <ellipse cx="3" cy="3" rx="1" ry="1.2" fill="#F5EFE9"/>
        <ellipse cx="7.5" cy="7.5" rx="0.8" ry="1" fill="#F5EFE9"/>
      </pattern>

      {/* las formas que se usan más de una vez (relleno + recorte) */}
      <path id="pp-forma-vestido" d="M204 160 C 194 164 186 172 184 186 C 181 220 180 256 180 292 C 178 340 168 400 158 462 C 172 468 188 466 202 470 C 218 474 234 468 250 472 C 264 475 276 468 286 462 C 282 420 274 372 264 332 C 258 308 252 292 250 278 C 249 264 250 252 253 240 C 258 226 262 212 260 198 C 257 184 247 172 236 163 C 226 168 212 166 204 160 Z"/>
      <path id="pp-forma-manga" d="M190 194 C 188 178 197 166 209 165 C 222 165 230 178 230 194 C 230 202 231 208 233 213 C 220 218 204 218 191 214 C 189 207 189 200 190 194 Z"/>
      <path id="pp-forma-brazo" d="M195 192 C 194 181 201 173 210 173 C 219 174 222 185 221 197 C 220 212 221 228 226 241 C 240 237 256 232 270 228 C 275 226 279 223 283 219 C 286 215 289 212.5 293 212 C 296 211.5 297.5 214.5 295.5 216.5 C 294 218 292.5 219 292 220 C 295.5 217.8 300 216.5 303.5 216.3 C 306.5 216.2 307.8 219 305.8 221 C 307.8 222.6 308.2 225.4 306.2 227.2 C 308 229 308 232 306 233.8 C 306.8 236.6 304.3 238.8 300.8 238.8 C 294 240 285 242 276 242 C 262 247 244 253 230 259 C 220 264 208 266 203 257 C 199 240 196 216 195 192 Z"/>
      <path id="pp-forma-cuello" d="M206 118 L 233 132 C 231 145 232 154 237 163 C 241 171 245 180 247 190 L 196 192 C 198 174 200 158 202 146 C 203 136 204 126 206 118 Z"/>
      <path id="pp-forma-manta" d="M249 206 C 246 192 249 178 257 170 C 265 162 281 161 291 170 C 299 178 302 192 299 205 C 305 218 307 236 305 252 C 303 266 291 277 275 277 C 262 277 253 272 249 262 C 246 246 247 222 249 206 Z"/>

      <clipPath id="pp-recorte-ropa"><use href="#pp-forma-vestido"/></clipPath>
      <clipPath id="pp-recorte-manga"><use href="#pp-forma-manga"/></clipPath>
      <clipPath id="pp-recorte-brazo"><use href="#pp-forma-brazo"/></clipPath>
      <clipPath id="pp-recorte-cuello"><use href="#pp-forma-cuello"/></clipPath>
      <clipPath id="pp-recorte-manta"><use href="#pp-forma-manta"/></clipPath>

      </defs>
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
      <g className="ilus-flores">
        {/* la flor de Sofía y dos flores chiquitas, en línea violeta */}
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
      </g>
      <g className="ilus-puntos">
        {/* puntitos sueltos */}
        <g fill="#7A6193" opacity="0.55">
          <ellipse cx="146" cy="78" rx="2.2" ry="2.6"/>
          <ellipse cx="300" cy="78" rx="1.8" ry="2.1"/>
          <ellipse cx="356" cy="196" rx="2.2" ry="2.5"/>
          <ellipse cx="70" cy="196" rx="1.8" ry="2.2"/>
        </g>
      </g>
      <g className="ilus-figura">
        {/* sombra del piso */}
        <ellipse cx="224" cy="488" rx="100" ry="9" fill="#A9BCA1" opacity="0.55"/>

        {/* cuello: baja por debajo del vestido y se abre hacia los hombros; y la sombra que le hace la mandíbula */}
        <use href="#pp-forma-cuello" fill="#E6D8C7"/>
        <path clipPath="url(#pp-recorte-cuello)" fill="#39463A" opacity="0.07" d="M208 137 C 215 145 225 150 235 150 C 230 153.5 222 154.5 215 152 C 211 149 209 143 208 137 Z"/>

        {/* cabeza, cara, coronilla y oreja: la misma de la embarazada, pero inclinada hacia el bebé */}
        <g transform="translate(5 6) rotate(20 212 124)">
          <path fill="#E6D8C7" d="M196 72 C 214 62 238 70 242 92 C 244 99 247 104 251 110 C 252 112 250 114 246 114 C 247 118 246 122 243 124 C 243 128 241 133 236 136 C 228 141 214 140 206 134 C 192 124 186 104 190 88 C 192 80 193 76 196 72 Z"/>
          {/* ojos cerrados, ceja, una sonrisa apenas y un rubor chiquito debajo del ojo */}
          <ellipse cx="229.5" cy="110.5" rx="3.8" ry="2.3" fill="#7A6193" opacity="0.2"/>
          <g fill="none" stroke="#39463A" strokeLinecap="round">
            <path d="M226 100 C 229 103.5 234 103.5 237 100.5" strokeWidth="1.7"/>
            <path d="M229.5 103 L 228.5 106" strokeWidth="1.2"/>
            <path d="M233.5 103.6 L 233.5 106.6" strokeWidth="1.2"/>
            <path d="M227 92.5 C 231 90 235 90 238.5 92" strokeWidth="1.5" opacity="0.85"/>
            <path d="M243 121.5 C 244.5 122.5 246 122 247 120.8" strokeWidth="1.2" opacity="0.6"/>
          </g>
          {/* pelo de arriba: cubre la coronilla y pasa por detrás de la oreja */}
          <path fill="#39463A" d="M241 86 C 239 66 214 58 196 62 C 172 68 160 92 164 120 C 165 128 165 134 164 140 L 201 140 C 200 130 200 120 201 112 C 202 104 206 98 213 95 C 219 89 230 83 241 86 Z"/>
        </g>

        {/* el resto del pelo cae derecho por la espalda, aunque ella incline la cabeza */}
        <path fill="#39463A" d="M173.3 109.8 C 171.5 117.7 169.4 123.3 166.4 128.6 C 163.4 134 157 168 155.5 202 C 153.5 236 164 262 158 294 C 156 312 160 330 170 344 C 172 332 175 320 180 310 C 182 322 188 332 196 336 C 190 318 188 298 190 278 C 192 254 188 228 192 206 C 196 186 200 170 203 154 C 204 144 205 136 207 128 L 205 112 Z"/>

        {/* brillo en la coronilla y mechones claros (el mechón pasa por debajo del broche) */}
        <g transform="translate(5 6) rotate(20 212 124)">
          <path d="M190 72 C 200 66 212 64 224 68" fill="none" stroke="#A9BCA1" strokeWidth="3.2" strokeLinecap="round" opacity="0.6"/>
        </g>
        <g fill="none" stroke="#A9BCA1" strokeLinecap="round">
          <path d="M206 76 C 196 84 188 98 182 118 C 175 144 172 172 173 200 C 174 228 176 252 171 278 C 169 290 167 298 166 306" strokeWidth="2" opacity="0.45"/>
          <path d="M186 222 C 182 252 180 288 182 320" strokeWidth="1.8" opacity="0.35"/>
        </g>

        {/* la flor chiquita en el pelo, como broche, y la oreja por encima del pelo */}
        <g transform="translate(5 6) rotate(20 212 124)">
          <g transform="translate(181 100) scale(0.3)" fill="none" stroke="#7A6193" strokeWidth="5" strokeLinecap="round">
            <ellipse cx="0" cy="-18" rx="8" ry="18"/>
            <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(60)"/>
            <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(120)"/>
            <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(180)"/>
            <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(240)"/>
            <ellipse cx="0" cy="-18" rx="8" ry="18" transform="rotate(300)"/>
          </g>
          <path fill="#E6D8C7" d="M205 101 C 212 97 219 103 218 111 C 217.5 118 213.5 123 208 121.5 C 205 115 203.5 107 205 101 Z"/>
          <path d="M206 101 C 212 98 218.5 103 218 111 C 217.6 117.5 214 122 208.5 121.5" fill="none" stroke="#39463A" strokeWidth="1.1" strokeLinecap="round" opacity="0.28"/>
          <path d="M209 105.5 C 213 106.5 214.2 111 211.5 115.5" fill="none" stroke="#39463A" strokeWidth="1.1" strokeLinecap="round" opacity="0.32"/>
        </g>
        {/* el aro cuelga derecho del lóbulo (no gira con la cabeza) */}
        <path d="M217.2 127.4 L 217.2 130" stroke="#7A6193" strokeWidth="1.1" strokeLinecap="round"/>
        <ellipse cx="217.2" cy="132.6" rx="2" ry="2.5" fill="#7A6193"/>


        {/* el brazo de atrás: sale de detrás del cuerpo y sostiene al bebé por debajo (un poco más en sombra) */}
        <g>
          <path fill="#E6D8C7" d="M246 268 C 262 270 280 270 294 266 C 299 264 302 259 304 255 C 306 252 310 253 310 257 C 311 264 309 272 304 279 C 298 286 286 290 272 290 C 262 290 252 290 246 289 Z"/>
          <path fill="#39463A" opacity="0.1" d="M246 268 C 262 270 280 270 294 266 C 299 264 302 259 304 255 C 306 252 310 253 310 257 C 311 264 309 272 304 279 C 298 286 286 290 272 290 C 262 290 252 290 246 289 Z"/>
          <g fill="none" stroke="#39463A" strokeWidth="1.1" strokeLinecap="round" opacity="0.3">
            <path d="M300.5 283 C 304.5 279 307.5 273 308.5 266"/>
            <path d="M295.5 280.5 C 299.5 277.5 302.5 272.5 304 267"/>
          </g>
        </g>

        {/* vestido celeste, largo, con borde ondulado */}
        <use href="#pp-forma-vestido" fill="#A4C8D8"/>
        <g clipPath="url(#pp-recorte-ropa)">
          {/* estampado */}
          <use href="#pp-forma-vestido" fill="url(#pp-puntos)" opacity="0.7"/>
          {/* volumen: sombra en la espalda y debajo del brazo */}
          <g fill="#39463A" opacity="0.11">
            <path d="M184 186 C 181 220 180 256 180 292 C 178 340 168 400 158 462 L 178 465 C 186 400 194 340 196 292 C 196 256 198 220 200 188 Z"/>
            <path d="M206 262 C 218 268 234 266 252 258 L 252 264 C 236 272 218 274 206 268 Z"/>
            <path d="M247 176 C 242 188 242 200 246 212 L 251 212 C 247 200 247 188 252 178 Z"/>
          </g>
          {/* luz sobre el frente de la falda */}
          <path fill="#F5EFE9" opacity="0.25" d="M262 300 C 270 340 278 400 283 452 C 276 402 268 346 257 306 Z"/>
          {/* ribete del escote */}
          <path d="M205 163.5 C 213 169.5 226 171.5 236 166" fill="none" stroke="#F5EFE9" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
          {/* pliegues */}
          <g fill="none" stroke="#39463A" strokeWidth="2.5" strokeLinecap="round" opacity="0.13">
            <path d="M262 342 C 266 390 270 430 272 460"/>
            <path d="M232 300 C 228 360 224 420 222 466"/>
            <path d="M206 336 C 202 384 198 426 196 466"/>
          </g>
        </g>

        {/* pies con sandalias */}
        <path fill="#E6D8C7" d="M250 466 C 252 476 262 482 280 482 C 288 482 290 476 282 472 L 268 468 Z"/>
        <path fill="#E6D8C7" d="M168 464 C 168 476 176 482 192 480 C 198 478 196 472 188 468 Z"/>
        <g fill="none" stroke="#39463A" strokeWidth="1.8" strokeLinecap="round" opacity="0.45">
          <path d="M262 472 C 266 476 270 478 275 478"/>
          <path d="M178 470 C 181 474 185 476 189 476"/>
        </g>

        {/* el bebé, envuelto en su mantita */}
        <use href="#pp-forma-manta" fill="#A9BCA1"/>
        <g clipPath="url(#pp-recorte-manta)">
          <use href="#pp-forma-manta" fill="url(#pp-puntos-manta)" opacity="0.5"/>
          {/* sombra en la espalda del bebé y debajo de la cabecita */}
          <g fill="#39463A" opacity="0.11">
            <path d="M299 205 C 305 218 307 236 305 252 C 303 266 291 277 275 277 L 275 268 C 290 266 297 254 297 240 C 297 226 295 214 292 206 Z"/>
            <path d="M250 210 C 262 214 280 212 296 204 C 292 212 280 218 266 218 C 258 218 252 215 250 210 Z"/>
          </g>
          {/* luz arriba de la capucha */}
          <path fill="#F5EFE9" opacity="0.4" d="M258 172 C 266 165 280 165 288 172 C 280 169 268 169 258 176 Z"/>
          {/* la punta de la mantita que cruza */}
          <path d="M296 214 C 282 228 266 240 252 246" fill="none" stroke="#39463A" strokeWidth="2" strokeLinecap="round" opacity="0.15"/>
        </g>
        {/* borde de la mantita alrededor de la carita, y la carita */}
        <path fill="#DDE4D9" d="M248 202 C 244 190 248 176 260 173 C 272 170 280 178 280 190 C 280 200 274 206 266 207 C 258 208 252 206 248 202 Z"/>
        <path fill="#E6D8C7" d="M249 199 C 246 189 250 180 259 178 C 268 176 275 183 275 191 C 275 199 269 204 262 204 C 256 204 251 202 249 199 Z"/>
        <ellipse cx="265" cy="195.5" rx="2.4" ry="1.5" fill="#7A6193" opacity="0.15"/>
        <g fill="none" stroke="#39463A" strokeLinecap="round">
          <path d="M259.5 190 C 261 191.6 263.5 191.6 265 190" strokeWidth="1.2"/>
          <path d="M251.5 189.5 C 252.6 190.8 254.4 190.8 255.4 189.6" strokeWidth="1.1"/>
          <path d="M256.5 194 C 257 195 258 195.2 258.8 194.6" strokeWidth="1" opacity="0.5"/>
        </g>

        {/* brazo de adelante: baja del hombro, cruza por delante y apoya la mano en la espalda del bebé */}
        <use href="#pp-forma-brazo" fill="#E6D8C7"/>
        <g clipPath="url(#pp-recorte-brazo)" fill="#39463A" opacity="0.1">
          <path d="M195 192 C 196 216 199 240 203 257 C 208 266 220 264 230 259 C 244 253 262 247 276 242 L 276 236 C 262 240 246 245 232 251 C 222 255 212 256 209 248 C 205 232 203 212 202 192 Z"/>
        </g>
        {/* dedos */}
        <g fill="none" stroke="#39463A" strokeWidth="1.1" strokeLinecap="round" opacity="0.3">
          <path d="M293 221.8 C 297 221.3 301 221.1 305.6 221.2"/>
          <path d="M293 227.6 C 297 227.3 301 227.2 306 227.4"/>
          <path d="M292 233.6 C 296 233.5 300 233.6 305.6 234"/>
          <path d="M283 222.5 C 285.5 220.5 288 219.5 291 219.4"/>
        </g>
        {/* pulsera */}
        <path d="M270.5 228 C 274 233 276 238 276.5 243" fill="none" stroke="#7A6193" strokeWidth="2.4" strokeLinecap="round"/>

        {/* manguita corta, celeste */}
        <use href="#pp-forma-manga" fill="#A4C8D8"/>
        <g clipPath="url(#pp-recorte-manga)">
          <use href="#pp-forma-manga" fill="url(#pp-puntos)" opacity="0.7"/>
          <path fill="#39463A" opacity="0.11" d="M190 194 C 189 200 189 207 191 214 C 204 218 220 218 233 213 L 232 206 C 220 210 204 210 196 206 C 194 200 194 196 196 190 Z"/>
          <path d="M192 213.2 C 205 216.6 220 216.6 232 212.4" fill="none" stroke="#F5EFE9" strokeWidth="1.6" strokeLinecap="round" opacity="0.5"/>
        </g>
      </g>
    </>
  );
}
