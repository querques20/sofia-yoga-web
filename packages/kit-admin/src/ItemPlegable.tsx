import { Alerta, ChevronAbajo } from "./iconos";

type Props = {
  /** Lo que lo nombra: «Autor 3». */
  titulo: string;
  /** Lo que tiene adentro, en una línea: «Luis Manuel Cabrera Chim». */
  resumen?: string;
  /** El último guardado encontró un error adentro: cerrado, lo dice. */
  conError?: boolean;
  /** Abierto o cerrado, si lo lleva quien lo usa; sin esto, lo lleva el navegador. */
  abierto?: boolean;
  alAbrirOCerrar?: (abierto: boolean) => void;
  /** Los botones del ítem (mover, quitar): a la vista también cerrado. */
  acciones?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Un ítem de una lista que se pliega (DESIGN.md §11, «Lista variable»): un
 * `details` cuyo resumen es su número y lo que tiene adentro, con la marca de
 * error (el ícono y «Con error»: el color solo no alcanza). Es un `details`
 * para que «revisar errores» lo abra como abre cualquier otro.
 *
 * Los botones van fuera del `summary`, a la derecha de su fila: un botón
 * adentro de otro se anuncia mal y su clic abriría el ítem. Quedan después del
 * `details` en el DOM, así con el ítem cerrado el Tab va resumen → botones.
 * El chevron gira por el `open` de su propio `details` y no por un `group`,
 * que en una lista anidada se encendería con el de afuera. No sabe de ED.
 */
export function ItemPlegable({ titulo, resumen, conError = false, abierto, alAbrirOCerrar, acciones, children }: Props) {
  return (
    <li className="relative rounded-xl border border-azul-claro/60">
      <details open={abierto} onToggle={alAbrirOCerrar ? (e) => alAbrirOCerrar(e.currentTarget.open) : undefined}>
        <summary
          className={`flex min-h-12 cursor-pointer list-none items-center gap-2 rounded-xl py-2 pl-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-medio [&::-webkit-details-marker]:hidden ${acciones ? "pr-44" : "pr-4"}`}
        >
          <ChevronAbajo size={16} className="shrink-0 -rotate-90 text-azul-medio motion-safe:transition-transform [details[open]>summary>&]:rotate-0" />
          <span className="min-w-0 flex-1 truncate text-admin-meta font-medium">
            {titulo}
            {resumen ? <span className="text-gris-texto"> · {resumen}</span> : null}
          </span>
          {conError ? (
            <span className="flex shrink-0 items-center gap-1 text-admin-meta font-medium text-rojo-error">
              <Alerta size={16} className="shrink-0" />
              Con error
            </span>
          ) : null}
        </summary>
        <div className="@container border-t border-azul-claro/60 p-4">{children}</div>
      </details>
      {acciones ? <div className="absolute top-1 right-2 flex items-center gap-1">{acciones}</div> : null}
    </li>
  );
}
