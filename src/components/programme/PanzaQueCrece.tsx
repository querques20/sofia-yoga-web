import { gsap } from "@/lib/gsap";
import { escucharSouffle } from "@/lib/souffle";
import { CabezaDePerfil } from "../ilustraciones/cara";
import {
  CELESTE_CLARA,
  Cuello,
  Manguita,
  PAGINA,
  PIEL,
  PieDeAdelante,
  PieDeAtras,
  RIBETE,
  SALVIA,
  SALVIA_CLARA,
  VERDE,
  VIOLETA,
} from "../ilustraciones/partes";

// la embarazada del programa: la misma del inicio, a color, con la panza de cada trimestre.
// Cada trimestre trae la forma del vestido (la panza), el brazo y la mano, las sombras y la luz que siguen a la panza,
// cuánto se separan los pies y el color de la mejilla. Programme.tsx la hace pasar de uno a otro al bajar
export const FORMAS = [
  {
    // 1er trimestre: casi no se nota y apoya la mano abajo
    vestido:
      "M203 163 C 194 166 187 174 185 186 C 180 220 178 250 176 290 C 174 340 166 400 156 462 C 170 468 186 466 200 470 C 216 474 232 468 248 472 C 262 475 274 468 284 462 C 280 420 276 386 272 362 C 277 346 279 322 277 298 C 274 272 268 244 259 223 C 265 212 263 199 256 191 C 252 187 248 185 244 184 C 231 181 216 173 203 163 Z",
    brazo:
      "M192 184 C 190 172 200 166 210 170 C 216 174 218 186 216 196 C 216 216 218 240 224 260 C 236 274 250 284 262 290 C 270 292 277 296 277 302 C 277 308 270 310 262 306 C 250 300 238 292 228 284 C 214 278 204 272 198 262 C 190 238 190 210 192 184 Z",
    antebrazo: "M228 284 C 238 292 250 300 262 306 C 270 310 277 308 277 304 C 270 306 262 303 252 298 C 242 293 234 288 228 281 Z",
    dedos: ["M265 294.5 C 269 296 272.5 298 275 300.5", "M263 299.5 C 267 301 270 302.5 273 305"],
    pulsera: "M254 283 C 253 289 250 295 246 300",
    bajoPecho: "M259 223 C 266 223 274 226 280 230 C 272 229 265 230 257 233 Z",
    bajoPanza: "M277 300 C 279 324 276 348 272 362 C 268 350 271 330 272 314 C 273 306 275 302 277 300 Z",
    luz: "M260 226 C 268 236 274 254 276 274 C 272 262 268 250 263 240 C 261 235 260 230 260 226 Z",
    pliegue: "M272 362 C 266 366 258 368 250 369",
    pies: [0, 0],
    rubor: 0.17,
  },
  {
    // 2e trimestre: la panza redonda, el pecho un poco más grande y la mano al costado
    vestido:
      "M203 163 C 194 166 187 174 185 186 C 180 220 179 252 177 290 C 174 340 166 400 156 462 C 170 468 186 466 200 470 C 216 474 232 468 248 471 C 262 473 274 466 285 460 C 281 418 277 382 273 358 C 287 342 294 316 291 290 C 287 262 277 238 261 223 C 267 212 265 198 257 190 C 253 186 249 184 244 184 C 231 181 216 173 203 163 Z",
    brazo:
      "M192 184 C 190 172 200 166 210 170 C 216 174 218 186 216 196 C 216 216 218 238 226 256 C 242 268 258 276 272 280 C 282 280 290 283 291 289 C 292 295 286 298 277 296 C 262 294 248 288 236 282 C 220 278 204 272 198 260 C 190 238 190 210 192 184 Z",
    antebrazo: "M236 282 C 248 288 262 294 277 296 C 286 298 292 295 291 290 C 284 293 272 292 260 289 C 250 287 242 284 236 279 Z",
    dedos: ["M276 283 C 281 283.5 286 285 289 287", "M275 289 C 280 290 284 291 288 292.5"],
    pulsera: "M264 276 C 265 282 264 288 261 293",
    bajoPecho: "M261 223 C 269 223 278 227 285 232 C 275 230 267 231 259 234 Z",
    bajoPanza: "M291 290 C 294 318 286 344 273 358 C 270 348 281 330 285 310 C 287 300 289 294 291 290 Z",
    luz: "M262 225 C 276 234 287 252 290 274 C 284 260 277 248 268 238 C 265 234 263 229 262 225 Z",
    pliegue: "M273 358 C 266 364 257 367 247 368",
    pies: [0, 0],
    rubor: 0.22,
  },
  {
    // 3e trimestre: la panza grande y más baja, la espalda apenas arqueada, el ruedo levantado y los pies separados
    vestido:
      "M203 163 C 194 166 187 174 185 186 C 181 222 183 256 179 292 C 173 340 166 400 156 462 C 170 468 186 466 200 470 C 216 474 232 467 248 469 C 263 470 276 462 288 455 C 284 414 279 378 276 352 C 299 336 312 308 309 280 C 305 251 287 230 263 222 C 270 211 268 197 258 189 C 254 186 249 184 244 184 C 231 181 216 173 203 163 Z",
    brazo:
      "M192 184 C 190 172 200 166 210 170 C 216 174 218 186 216 196 C 216 216 218 238 226 256 C 246 266 268 272 286 276 C 296 275 304 278 305 284 C 306 290 300 294 290 292 C 274 290 256 284 238 280 C 220 278 204 272 198 260 C 190 238 190 210 192 184 Z",
    antebrazo: "M238 280 C 256 284 274 290 290 292 C 300 294 304 290 305 286 C 296 289 280 287 262 283 C 252 281 244 279 238 277 Z",
    dedos: ["M288 281 C 294 281.5 299 282.5 304 283.5", "M288 286.5 C 293 287.5 297 288.5 301 289.5"],
    pulsera: "M276 271 C 279.5 278 280.5 285 279 292",
    bajoPecho: "M263 222 C 271 222 282 226 291 232 C 279 230 270 231 260 235 Z",
    bajoPanza: "M309 282 C 312 310 299 338 276 352 C 272 343 289 325 296 304 C 300 293 305 286 309 282 Z",
    luz: "M265 224 C 288 232 304 252 308 278 C 300 263 289 249 274 238 C 270 234 267 229 265 224 Z",
    pliegue: "M276 352 C 268 359 258 363 246 364",
    pies: [5, -3],
    rubor: 0.26,
  },
];

// la planta de al lado: un solo tallo que se va dibujando, hojas que se abren cuando el tallo las pasa
// y la flor de Sofía en la punta, que pasa de pimpollo a flor abierta
const TALLO = "M122 488 C 117 444 119 384 130 336";
// hasta dónde llega el tallo en el 1er trimestre (fracción de su largo)
const ALTURA_INICIAL = 0.24;
// dónde nace cada hoja (fracción del largo), para qué lado va, su tamaño y su giro
const HOJAS = [
  { en: 0.07, lado: -1, tam: 1, giro: -12 },
  { en: 0.17, lado: 1, tam: 0.95, giro: 10 },
  { en: 0.3, lado: -1, tam: 0.9, giro: -8 },
  { en: 0.45, lado: 1, tam: 0.85, giro: 12 },
  { en: 0.61, lado: -1, tam: 0.8, giro: -4 },
  { en: 0.76, lado: 1, tam: 0.7, giro: 16 },
];
const HOJA = "M0 0 C -12 -3 -21 -12 -23 -25 C -10 -23 -2 -13 0 0 Z";
const NERVIO = "M0 0 C -7 -7 -13 -14 -19 -21";
// el giro de cada pétalo con la flor cerrada, a medio abrir y abierta
const PETALOS = [
  [-8, -50, -150],
  [-5, -30, -90],
  [-2, -10, -30],
  [2, 10, 30],
  [5, 30, 90],
  [8, 50, 150],
];
const ESCALA_FLOR = 0.62;

// el tallo es una sola curva y estos son sus cuatro puntos
const CURVA = [122, 488, 117, 444, 119, 384, 130, 336];

function enCurva(t: number) {
  const [x0, y0, x1, y1, x2, y2, x3, y3] = CURVA;
  const u = 1 - t;
  const [a, b, c, d] = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return { x: a * x0 + b * x1 + c * x2 + d * x3, y: a * y0 + b * y1 + c * y2 + d * y3 };
}

// el largo acumulado del tallo, para ubicar cosas por fracción del largo (igual que el trazo, que tiene pathLength 1).
// Va con Math.sqrt y no con Math.hypot: sqrt da exactamente lo mismo en el servidor y en cualquier navegador,
// así las hojas que se dibujan en el HTML no cambian de lugar al hidratar
const MUESTRAS = 64;
const LARGOS = [0];
for (let i = 1, antes = enCurva(0); i <= MUESTRAS; i++) {
  const ahora = enCurva(i / MUESTRAS);
  const [dx, dy] = [ahora.x - antes.x, ahora.y - antes.y];
  LARGOS.push(LARGOS[i - 1] + Math.sqrt(dx * dx + dy * dy));
  antes = ahora;
}

function puntoDelTallo(f: number) {
  const buscado = Math.min(Math.max(f, 0), 1) * LARGOS[MUESTRAS];
  let i = 1;
  while (i < MUESTRAS && LARGOS[i] < buscado) i++;
  const tramo = (buscado - LARGOS[i - 1]) / (LARGOS[i] - LARGOS[i - 1]);
  return enCurva((i - 1 + tramo) / MUESTRAS);
}

const redondo = (n: number) => Number(n.toFixed(2));

/** dónde va cada hoja y cuánto está abierta, según hasta dónde llegó el tallo */
function hojaEn(hoja: (typeof HOJAS)[number], altura: number) {
  const { x, y } = puntoDelTallo(hoja.en);
  const abierta = Math.min(Math.max((altura - hoja.en) / 0.08, 0), 1);
  const g = 1 - (1 - abierta) * (1 - abierta);
  const ancho = (hoja.lado > 0 ? -hoja.tam : hoja.tam) * g;
  return `translate(${redondo(x)} ${redondo(y)}) rotate(${hoja.giro}) scale(${redondo(ancho)} ${redondo(hoja.tam * g)})`;
}

/** la flor según cuánto se abrió: 0 es pimpollo, 0.5 a medio abrir y 1 abierta */
function florAbierta(apertura: number) {
  const primera = apertura < 0.5;
  const tramo = primera ? apertura / 0.5 : (apertura - 0.5) / 0.5;
  const entre = (a: number, b: number, c: number) => redondo(primera ? a + (b - a) * tramo : b + (c - b) * tramo);
  return {
    // el centro sube a medida que se abre, así los pétalos de abajo no tapan el tallo
    sube: entre(0, -5, -31),
    ancho: entre(4.5, 7, 8),
    relleno: entre(1, 1, 0.55),
    giros: PETALOS.map(([a, b, c]) => entre(a, b, c)),
    centro: redondo(Math.max(0, (apertura - 0.8) / 0.2)),
  };
}

function Planta() {
  const punta = puntoDelTallo(ALTURA_INICIAL);
  const flor = florAbierta(0);
  return (
    <g className="panza-planta">
      <path
        className="panza-tallo"
        d={TALLO}
        pathLength={1}
        strokeDasharray={`${ALTURA_INICIAL} 1`}
        fill="none"
        stroke={SALVIA}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {HOJAS.map((hoja) => (
        <g key={hoja.en} className="panza-hoja" transform={hojaEn(hoja, ALTURA_INICIAL)}>
          <path d={HOJA} fill={SALVIA} />
          <path d={NERVIO} fill="none" stroke={VERDE} strokeWidth="1.2" strokeLinecap="round" opacity="0.18" vectorEffect="non-scaling-stroke" />
        </g>
      ))}
      <g className="panza-flor" transform={`translate(${redondo(punta.x)} ${redondo(punta.y)})`}>
        {/* dos hojitas que sostienen la flor */}
        <g fill={SALVIA}>
          <path d="M0 0 C -4 -2 -8 -6 -9 -11 C -4 -10 -1 -6 0 0 Z" />
          <path d="M0 0 C 4 -2 8 -6 9 -11 C 4 -10 1 -6 0 0 Z" />
        </g>
        <g transform={`scale(${ESCALA_FLOR})`} fill={PAGINA} stroke={VIOLETA} strokeWidth={redondo(2 / ESCALA_FLOR)} strokeLinecap="round">
          {flor.giros.map((giro, i) => (
            <g key={i} className="panza-petalo" transform={`translate(0 ${flor.sube}) rotate(${giro})`}>
              <ellipse cx="0" cy="-18" rx={flor.ancho} ry="18" fillOpacity={flor.relleno} />
            </g>
          ))}
          <circle className="panza-flor-centro" r="3.2" fill={VIOLETA} stroke="none" transform={`translate(0 ${flor.sube}) scale(${flor.centro})`} />
        </g>
      </g>
    </g>
  );
}

/** la embarazada del programa, armada en el 1er trimestre */
export function PanzaQueCrece() {
  const forma = FORMAS[0];
  return (
    // apoyada abajo: en el celular el lugar es más alto que el dibujo y así no queda flotando en el medio
    <svg viewBox="92 52 244 448" preserveAspectRatio="xMidYMax meet" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        {/* estampado de puntitos para el vestido */}
        <pattern id="p-puntos" width="13" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
          <ellipse cx="4" cy="4" rx="1.5" ry="1.8" fill={SALVIA_CLARA} />
          <ellipse cx="10.5" cy="10.5" rx="1.2" ry="1.5" fill={SALVIA_CLARA} />
        </pattern>
        <clipPath id="p-recorte-vestido">
          <path className="panza-vestido" d={forma.vestido} />
        </clipPath>
      </defs>
      {/* fondo: masas de elipses encimadas y unos puntitos sueltos */}
      <g className="panza-fondo">
        <g className="panza-masa">
          <ellipse cx="222" cy="280" rx="104" ry="212" transform="rotate(-5 222 280)" fill={CELESTE_CLARA} />
        </g>
        <g className="panza-masa">
          <ellipse cx="160" cy="400" rx="58" ry="84" transform="rotate(-18 160 400)" fill={SALVIA_CLARA} />
        </g>
        <g className="panza-masa">
          <ellipse cx="282" cy="440" rx="46" ry="44" fill={CELESTE_CLARA} />
        </g>
        <g fill={VIOLETA} opacity="0.55">
          <ellipse cx="140" cy="118" rx="2.2" ry="2.6" />
          <ellipse cx="300" cy="96" rx="1.8" ry="2.1" />
          <ellipse cx="322" cy="214" rx="2" ry="2.4" />
        </g>
      </g>
      {/* sombra del piso */}
      <ellipse cx="214" cy="488" rx="112" ry="9" fill={SALVIA} opacity="0.55" />
      <Planta />
      <g className="panza-figura">
        <PieDeAtras className="panza-pie-atras" />
        <PieDeAdelante className="panza-pie-adelante" />
        <Cuello />
        <g className="panza-cabeza">
          <CabezaDePerfil rubor={forma.rubor} claseRubor="panza-rubor" />
        </g>
        <g className="panza-torso">
          <path className="panza-vestido" fill={SALVIA} d={forma.vestido} />
          <g clipPath="url(#p-recorte-vestido)">
            <rect x="140" y="150" width="190" height="340" fill="url(#p-puntos)" opacity="0.6" />
            {/* volumen: sombra en la espalda, debajo del pecho y debajo de la panza */}
            <g fill={VERDE} opacity="0.11">
              <path d="M170 180 L 200 186 C 196 220 194 250 192 290 C 190 340 184 400 176 466 L 140 466 Z" />
              <path className="panza-bajo-pecho" d={forma.bajoPecho} />
              <path className="panza-bajo-panza" d={forma.bajoPanza} />
            </g>
            {/* luz sobre la panza */}
            <path className="panza-luz" fill={PAGINA} opacity="0.32" d={forma.luz} />
            <path d={RIBETE} fill="none" stroke={PAGINA} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            {/* pliegues */}
            <g fill="none" stroke={VERDE} strokeWidth="2.5" strokeLinecap="round" opacity="0.13">
              <path className="panza-pliegue" d={forma.pliegue} />
              <path d="M262 366 C 266 400 270 430 272 458" />
              <path d="M232 340 C 228 384 224 422 222 464" />
            </g>
          </g>
          {/* brazo y mano sobre la panza */}
          <path className="panza-brazo" fill={PIEL} d={forma.brazo} />
          <g fill={VERDE} opacity="0.1">
            <path d="M192 184 C 190 210 190 238 198 260 C 202 266 206 268 211 270 C 203 250 201 220 203 190 Z" />
            <path className="panza-antebrazo" d={forma.antebrazo} />
          </g>
          <g fill="none" stroke={VERDE} strokeWidth="1.1" strokeLinecap="round" opacity="0.3">
            {forma.dedos.map((dedo) => (
              <path key={dedo} className="panza-dedo" d={dedo} />
            ))}
          </g>
          <path className="panza-pulsera" d={forma.pulsera} fill="none" stroke={VIOLETA} strokeWidth="2.4" strokeLinecap="round" />
          <Manguita puntos="p-puntos" />
        </g>
      </g>
    </svg>
  );
}

type Elegir = (selector: string) => Element[];

/**
 * Suma al timeline del programa el paso de un trimestre al otro: la panza, la mano, las sombras, el ruedo,
 * los pies y la flor. El tallo crece parejo de punta a punta, como el tiempo que pasa.
 * Devuelve cómo dejar la planta como al principio: lo que se le cambia a mano, GSAP no lo deshace
 */
export function crecerPanza(tl: gsap.core.Timeline, q: Elegir, momentos: number[], duracion: number) {
  const [tallo] = q(".panza-tallo");
  const hojas = q(".panza-hoja");
  const [flor] = q(".panza-flor");
  const petalos = q(".panza-petalo");
  const [centro] = q(".panza-flor-centro");
  const planta = { altura: ALTURA_INICIAL, apertura: 0 };

  const dibujarPlanta = () => {
    tallo.setAttribute("stroke-dasharray", `${planta.altura} 1`);
    hojas.forEach((hoja, i) => hoja.setAttribute("transform", hojaEn(HOJAS[i], planta.altura)));
    const punta = puntoDelTallo(planta.altura);
    flor.setAttribute("transform", `translate(${redondo(punta.x)} ${redondo(punta.y)})`);
    const forma = florAbierta(planta.apertura);
    petalos.forEach((petalo, i) => {
      petalo.setAttribute("transform", `translate(0 ${forma.sube}) rotate(${forma.giros[i]})`);
      petalo.firstElementChild?.setAttribute("rx", String(forma.ancho));
      petalo.firstElementChild?.setAttribute("fill-opacity", String(forma.relleno));
    });
    centro.setAttribute("transform", `translate(0 ${forma.sube}) scale(${forma.centro})`);
  };

  const crece = { duration: duracion, ease: "power1.inOut" };
  const [vestidos, brazo, antebrazo, pulsera, bajoPecho, bajoPanza, luz, pliegue, rubor, pieAdelante, pieAtras] = [
    ".panza-vestido",
    ".panza-brazo",
    ".panza-antebrazo",
    ".panza-pulsera",
    ".panza-bajo-pecho",
    ".panza-bajo-panza",
    ".panza-luz",
    ".panza-pliegue",
    ".panza-rubor",
    ".panza-pie-adelante",
    ".panza-pie-atras",
  ].map((selector) => q(selector));
  const dedos = q(".panza-dedo");

  momentos.forEach((momento, i) => {
    const forma = FORMAS[i + 1];
    tl.to(vestidos, { morphSVG: forma.vestido, ...crece }, momento)
      .to(brazo, { morphSVG: forma.brazo, ...crece }, momento)
      .to(antebrazo, { morphSVG: forma.antebrazo, ...crece }, momento)
      .to(pulsera, { morphSVG: forma.pulsera, ...crece }, momento)
      .to(bajoPecho, { morphSVG: forma.bajoPecho, ...crece }, momento)
      .to(bajoPanza, { morphSVG: forma.bajoPanza, ...crece }, momento)
      .to(luz, { morphSVG: forma.luz, ...crece }, momento)
      .to(pliegue, { morphSVG: forma.pliegue, ...crece }, momento)
      .to(rubor, { opacity: forma.rubor, ...crece }, momento)
      .to(pieAdelante, { x: forma.pies[0], ...crece }, momento)
      .to(pieAtras, { x: forma.pies[1], ...crece }, momento)
      .to(planta, { apertura: (i + 1) / momentos.length, ...crece, onUpdate: dibujarPlanta }, momento);
    dedos.forEach((dedo, j) => tl.to(dedo, { morphSVG: forma.dedos[j], ...crece }, momento));
  });

  const desde = momentos[0];
  const hasta = momentos[momentos.length - 1] + duracion;
  tl.to(planta, { altura: 1, duration: hasta - desde, ease: "none", onUpdate: dibujarPlanta }, desde);

  return () => {
    planta.altura = ALTURA_INICIAL;
    planta.apertura = 0;
    dibujarPlanta();
  };
}

/** la primera vez que el marco entra en pantalla: aparece el fondo, crece la planta y llega ella */
export function aparecerPanza(q: Elegir, marco: Element) {
  const alEntrar = () => ({ trigger: marco, start: "top 78%", once: true });
  gsap.from(q(".panza-fondo"), { scale: 0.88, opacity: 0, transformOrigin: "50% 60%", duration: 1.3, ease: "power3.out", scrollTrigger: alEntrar() });
  gsap.from(q(".panza-planta"), { scale: 0.4, opacity: 0, transformOrigin: "50% 100%", duration: 1.1, delay: 0.25, ease: "power3.out", scrollTrigger: alEntrar() });
  gsap.from(q(".panza-figura"), { y: 22, opacity: 0, duration: 1.2, delay: 0.15, ease: "power3.out", scrollTrigger: alEntrar() });
}

/** respira con la web, igual que la del inicio: el torso se ensancha apenas, la cabeza sube y el fondo late */
export function respirarPanza(q: Elegir) {
  const [torso] = q(".panza-torso");
  const [cabeza] = q(".panza-cabeza");
  const masas = q(".panza-masa");
  gsap.set(torso, { svgOrigin: "182 300" });
  gsap.set(masas, { transformOrigin: "50% 50%" });
  const ancho = gsap.quickSetter(torso, "scaleX");
  const alto = gsap.quickSetter(torso, "scaleY");
  const sube = gsap.quickSetter(cabeza, "y", "px");
  const escalas = masas.map((masa) => gsap.quickSetter(masa, "scale"));
  return escucharSouffle((v) => {
    ancho(1 + v * 0.03);
    alto(1 + v * 0.008);
    sube(-v * 1.6);
    escalas.forEach((escala, i) => escala(i % 2 ? 1.03 - v * 0.05 : 0.97 + v * 0.06));
  });
}
