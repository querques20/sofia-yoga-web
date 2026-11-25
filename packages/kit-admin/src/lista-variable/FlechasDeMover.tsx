import { FlechaAbajo, FlechaArriba } from "../iconos";

/** Un botón que es solo un ícono, 40 × 40: las flechas y la papelera de un ítem. El color lo pone cada uno. */
export const BOTON_DE_ICONO =
  "inline-flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-medio disabled:cursor-not-allowed disabled:opacity-60";

// Las flechas de mover, en `azul-medio` (5,11:1). En hover el fondo
// `azul-claro/30` baja el ícono a 4,36:1, que alcanza para un gráfico (3:1,
// WCAG 1.4.11). Flechas y no chevrons: un chevron se lee como abrir o cerrar,
// que es lo que hace el de la izquierda del ítem.
const MOVER = `${BOTON_DE_ICONO} text-azul-medio hover:bg-azul-claro/30`;

/** El lugar de una flecha que no va (en una punta): ocupa lo mismo, así las flechas de todas las filas quedan en la misma columna; no se enfoca ni se anuncia. */
function Lugar() {
  return <span aria-hidden="true" className="inline-flex size-10 shrink-0" />;
}

type Props = {
  /** Los `id` de las dos flechas: quien mueve les devuelve el foco. */
  idSubir: string;
  idBajar: string;
  /** Su nombre para el lector: «Subir sección 2». */
  subir: string;
  bajar: string;
  /** Sin la función, esa flecha no va y queda su lugar. */
  alSubir?: () => void;
  alBajar?: () => void;
  /** Mientras un movimiento corre. */
  deshabilitadas?: boolean;
};

/** «Subir» y «Bajar» de una fila, siempre en el mismo lugar. No sabe de ED. */
export function FlechasDeMover({ idSubir, idBajar, subir, bajar, alSubir, alBajar, deshabilitadas = false }: Props) {
  return (
    <>
      {alSubir ? (
        <button id={idSubir} type="button" aria-label={subir} title="Subir" disabled={deshabilitadas} onClick={alSubir} className={MOVER}>
          <FlechaArriba size={20} />
        </button>
      ) : (
        <Lugar />
      )}
      {alBajar ? (
        <button id={idBajar} type="button" aria-label={bajar} title="Bajar" disabled={deshabilitadas} onClick={alBajar} className={MOVER}>
          <FlechaAbajo size={20} />
        </button>
      ) : (
        <Lugar />
      )}
    </>
  );
}
