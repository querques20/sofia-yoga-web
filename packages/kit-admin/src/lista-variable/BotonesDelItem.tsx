import { Papelera } from "../iconos";
import { BOTON_DE_ICONO, FlechasDeMover } from "./FlechasDeMover";

// La papelera en `rojo-error` (6,57:1; 5,75:1 sobre el tinte del hover): es
// lo único rojo de la fila, y un ícono como las flechas, así una lista larga
// no se llena de botones rojos.
const QUITAR = `${BOTON_DE_ICONO} text-rojo-error hover:bg-rojo-error/8`;

type Props = {
  /** El `id` base de sus botones: `<nombre>-<clave>-subir`, para devolverles el foco al mover. */
  id: string;
  /** «sección 2», para el lector. */
  cual: string;
  alSubir?: () => void;
  alBajar?: () => void;
  alQuitar: () => void;
};

/** «Subir», «Bajar» y «Quitar» de un ítem: las flechas siempre en su lugar (en una punta, la que no va deja el suyo vacío) y la papelera al final. */
export function BotonesDelItem({ id, cual, alSubir, alBajar, alQuitar }: Props) {
  return (
    <>
      <FlechasDeMover idSubir={`${id}-subir`} idBajar={`${id}-bajar`} subir={`Subir ${cual}`} bajar={`Bajar ${cual}`} alSubir={alSubir} alBajar={alBajar} />
      <button type="button" aria-label={`Quitar ${cual}`} title="Quitar" onClick={alQuitar} className={QUITAR}>
        <Papelera size={20} />
      </button>
    </>
  );
}
