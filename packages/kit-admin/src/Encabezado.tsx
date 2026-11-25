import { Volver, type DestinoDeVolver } from "./Volver";

type Props = {
  /** El `h1` de la pantalla. */
  titulo: string;
  /** En un detalle, la vuelta a su lista («← Productos»), arriba del título: la misma en todas las pantallas de detalle. */
  volver?: DestinoDeVolver;
  /** Al lado del título: una `Insignia`. */
  estado?: React.ReactNode;
  /** Una línea en meta debajo del título. */
  detalle?: React.ReactNode;
  /** A la derecha, con un solo primario. */
  acciones?: React.ReactNode;
  /** Abajo, adentro del encabezado: así un aviso se ve aunque la pantalla esté scrolleada. */
  avisos?: React.ReactNode;
  /** Las `Pestanas` del módulo, en su propia fila y pegadas al divisor de abajo. */
  pestanas?: React.ReactNode;
  /**
   * Las acciones y los avisos quedan siempre a la vista: en escritorio, todo
   * el encabezado pegado arriba; por debajo de `lg`, el título hace scroll y
   * las acciones van en una barra fija abajo, al alcance del pulgar. Quien lo
   * usa deja lugar abajo para que la barra no tape lo último.
   */
  fijo?: boolean;
  /**
   * Todo el encabezado pasa a `azul-principal` (el modo navy de DESIGN.md
   * §11): lo que hay adentro tiene que ir en su versión «sobre azul».
   */
  resaltado?: boolean;
  /**
   * El título en una sola línea, cortado con «…» (entero en su `title`), y las
   * acciones en la misma fila: el encabezado mide lo mismo con cualquier
   * título. El de una ficha, que es fijo y no puede comerse la pantalla.
   */
  unaLinea?: boolean;
};

// Sobre azul: el texto en blanco (13,63:1) y lo secundario en `azul-claro`
// (7,68:1), incluido el foco, porque el `azul-medio` ahí da 2,67:1.
const secundarioDe = (resaltado: boolean) => (resaltado ? "text-azul-claro" : "text-gris-texto");
const fondoDe = (resaltado: boolean) => (resaltado ? "border-azul-principal bg-azul-principal" : "border-azul-claro/60 bg-white");

/**
 * Las acciones y los avisos. En escritorio la barra se disuelve (`contents`)
 * y sus hijos vuelven a la fila del encabezado. Fija, en el celular es una
 * barra de 64 px abajo (40 del botón y 12 arriba y abajo), que suma el área
 * segura del iPhone cuando la hay; el aviso va arriba de las acciones
 * (`flex-col-reverse`), sin cambiar el orden del DOM.
 */
function Barra({ acciones, avisos, fijo, resaltado, unaLinea }: Pick<Props, "acciones" | "avisos"> & { fijo: boolean; resaltado: boolean; unaLinea: boolean }) {
  const barra = fijo
    ? `fixed inset-x-0 bottom-0 z-10 flex flex-col-reverse gap-2 border-t px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-colors lg:contents ${fondoDe(resaltado)}`
    : "contents";
  return (
    <div className={barra}>
      {acciones ? <div className={`flex flex-wrap items-center justify-end gap-2 lg:shrink-0 ${unaLinea ? "lg:flex-nowrap" : ""}`}>{acciones}</div> : null}
      {/* Con fondo blanco propio: los tintes del aviso están medidos sobre blanco, y así se leen igual en el modo navy. Vacío (un aviso que hoy no dice nada), no ocupa una fila. */}
      {avisos ? <div className="w-full rounded-lg bg-white empty:hidden">{avisos}</div> : null}
    </div>
  );
}

// El fondo y el divisor siguen de costado hasta los bordes del `main`: dos
// franjas del ancho de la ventana que heredan el fondo y el color del borde,
// y que el `main` recorta (`overflow-x-clip`). Así, adentro de un molde
// centrado, el encabezado no flota: lo de adentro queda alineado con el molde.
const DE_BORDE_A_BORDE =
  "before:absolute before:top-0 before:-bottom-px before:right-full before:w-screen before:border-b before:border-inherit before:bg-inherit after:absolute after:top-0 after:-bottom-px after:left-full after:w-screen after:border-b after:border-inherit after:bg-inherit";

/**
 * El encabezado de una pantalla del admin (DESIGN.md §11): dónde estás, el
 * título, el estado, el detalle, las acciones y las pestañas. No sabe de ED.
 * El `-mx-6` lo lleva hasta los bordes del molde, dentro de un `main` que se
 * espera con `px-6` y `py-10`, y su fondo sigue hasta los del `main`. Fijo,
 * sube hasta el borde de arriba (`-mt-10`): pegado arriba desde que carga.
 */
export function Encabezado({ titulo, volver, estado, detalle, acciones, avisos, pestanas, fijo = false, resaltado = false, unaLinea = false }: Props) {
  return (
    <header
      className={`relative -mx-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b px-6 py-3 transition-colors ${DE_BORDE_A_BORDE} ${fijo ? "lg:sticky lg:top-0 lg:z-10 lg:-mt-10 lg:pt-5" : ""} ${fondoDe(resaltado)} ${resaltado ? "text-white" : ""}`}
    >
      {/* La base 0 deja que las acciones se queden en la fila y el texto se parta (o, en una línea, se corte), en vez de bajarlas. En el celular las acciones de un encabezado fijo van abajo, y las de uno suelto bajan si no entran. */}
      <div className={`min-w-0 ${unaLinea ? "flex-1 basis-0" : "lg:flex-1 lg:basis-0"}`}>
        {volver ? <Volver {...volver} resaltado={resaltado} /> : null}
        <div className={`flex items-baseline gap-x-2 gap-y-1 ${unaLinea ? "" : "flex-wrap"}`}>
          <h1 title={unaLinea ? titulo : undefined} className={`font-display text-admin-titulo font-bold ${unaLinea ? "min-w-0 truncate" : ""}`}>
            {titulo}
          </h1>
          {estado ? <span className={`self-center ${unaLinea ? "flex shrink-0 items-center gap-2" : ""}`}>{estado}</span> : null}
        </div>
        {detalle ? <div className={`mt-1 flex max-w-prose flex-wrap items-center gap-x-3 text-admin-meta ${secundarioDe(resaltado)}`}>{detalle}</div> : null}
      </div>
      {acciones || avisos ? <Barra acciones={acciones} avisos={avisos} fijo={fijo} resaltado={resaltado} unaLinea={unaLinea} /> : null}
      {/* A todo el ancho, y el `-mb-3` se come el `py-3`: la barra de la activa queda sobre el divisor. */}
      {pestanas ? <div className="-mb-3 w-full min-w-0">{pestanas}</div> : null}
    </header>
  );
}
