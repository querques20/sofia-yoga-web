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
import { ALTURA_INICIAL, ESCALA_FLOR, florAbierta, FORMAS, HOJA, hojaEn, HOJAS, NERVIO, puntoDelTallo, redondo, TALLO } from "./panza";

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
