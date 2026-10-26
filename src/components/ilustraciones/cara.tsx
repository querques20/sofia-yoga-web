import { PIEL, SALVIA, VERDE, VIOLETA } from "./partes";

// la cara de perfil que comparten las tres chicas: la embarazada, la mamá con el bebé y la del guerrero.
// Las tres miran a la derecha, así que la oreja va con lo redondo atrás y el lado que se pega a la cara, adelante

/** la cabeza: debajo de la nariz tiene labio de arriba, labio de abajo y mentón */
export const CARA =
  "M196 72 C 214 62 238 70 242 92 C 244 99 247 104 251 110 C 252 112 250 114 246 114 C 246.5 115.5 247.8 117 247.6 118.6 C 247.3 119.8 246 120.3 245.2 120.6 C 246.4 121.3 246.9 122.7 246 124 C 245.2 125.2 243.6 125.8 243.4 127.2 C 244.6 128.6 245 131 243.6 133.2 C 242 135.8 239 137 236 137.6 C 228 141 214 140 206 134 C 192 124 186 104 190 88 C 192 80 193 76 196 72 Z";

/** la boca: sale de donde se juntan los labios y va hacia atrás, con la punta apenas para arriba */
export const BOCA = "M245 120.7 C 243.4 121.5 241.4 121.6 239.6 120.5";

/** la oreja, apenas inclinada hacia atrás. Si la cabeza está girada, el aro va aparte para que cuelgue derecho */
export function Oreja({ aro = true }: { aro?: boolean }) {
  return (
    <>
      <path fill={PIEL} d="M216.2 100.1 C 208.6 97.4 202.7 104.5 205.1 112.2 C 206.8 119 211.6 123.3 216.8 120.8 C 218.6 113.9 218.7 105.8 216.2 100.1 Z" />
      <path d="M215.2 100.3 C 208.8 98.4 203.2 104.4 205.1 112.2 C 206.6 118.5 211 122.4 216.3 120.9" fill="none" stroke={VERDE} strokeWidth="1.1" strokeLinecap="round" opacity="0.3" />
      <path d="M213 105.2 C 209.2 106.9 208.8 111.6 212.3 115.5" fill="none" stroke={VERDE} strokeWidth="1.1" strokeLinecap="round" opacity="0.32" />
      {aro && <Aro x={215.4} y={122.1} />}
    </>
  );
}

/** la cabeza de la embarazada: ojos cerrados, el pelo largo con una flor de broche y la oreja con aro */
export function CabezaDePerfil({ rubor = 0.17, claseRubor }: { rubor?: number; claseRubor?: string }) {
  return (
    <>
      <path fill={PIEL} d={CARA} />
      {/* un poco de color en la mejilla */}
      <ellipse className={claseRubor} cx="229" cy="112" rx="5.5" ry="3.4" fill={VIOLETA} opacity={rubor} />
      {/* ojo cerrado con pestañas, ceja y la boca */}
      <g fill="none" stroke={VERDE} strokeLinecap="round">
        <path d="M226 100 C 229 103.5 234 103.5 237 100.5" strokeWidth="1.7" />
        <path d="M229.5 103 L 228.5 106" strokeWidth="1.2" />
        <path d="M233.5 103.6 L 233.5 106.6" strokeWidth="1.2" />
        <path d="M227 92.5 C 231 90 235 90 238.5 92" strokeWidth="1.5" opacity="0.85" />
        <path d={BOCA} strokeWidth="1.2" opacity="0.65" />
      </g>
      <path
        fill={VERDE}
        d="M241 86 C 239 66 214 58 196 62 C 172 68 160 92 164 120 C 166 144 156 168 154 198 C 152 232 164 258 158 292 C 156 310 160 328 170 342 C 172 330 175 318 180 308 C 182 320 188 330 196 334 C 190 316 188 296 190 276 C 192 252 188 226 192 204 C 196 184 199 166 200 148 C 200 134 200 122 201 112 C 202 104 206 98 213 95 C 219 89 230 83 241 86 Z"
      />
      {/* brillo y mechones */}
      <g fill="none" stroke={SALVIA} strokeLinecap="round">
        <path d="M190 72 C 200 66 212 64 224 68" strokeWidth="3.2" opacity="0.6" />
        <path d="M180 88 C 170 116 170 154 174 192 C 177 222 172 258 166 292" strokeWidth="2" opacity="0.45" />
        <path d="M190 226 C 186 256 182 290 184 322" strokeWidth="1.8" opacity="0.35" />
      </g>
      {/* la flor de Sofía, chiquita, de broche */}
      <g transform="translate(181 100) scale(0.3)" fill="none" stroke={VIOLETA} strokeWidth="5" strokeLinecap="round">
        {[0, 60, 120, 180, 240, 300].map((giro) => (
          <ellipse key={giro} cx="0" cy="-18" rx="8" ry="18" transform={`rotate(${giro})`} />
        ))}
      </g>
      <Oreja />
    </>
  );
}

/** el aro violeta, colgando derecho desde (x, y) */
export function Aro({ x, y }: { x: number; y: number }) {
  return (
    <>
      <path d={`M${x} ${y} L ${x} ${y + 2.5}`} stroke={VIOLETA} strokeWidth="1.1" strokeLinecap="round" />
      <ellipse cx={x} cy={y + 5.1} rx="2" ry="2.5" fill={VIOLETA} />
    </>
  );
}
