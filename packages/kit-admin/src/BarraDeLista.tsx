type Props = {
  /** A la izquierda: el `Filtro` del estado, si la lista tiene uno. */
  filtro?: React.ReactNode;
  /** Al lado del filtro: los filtros de más, cada uno un `MenuDeFiltro`. */
  menus?: React.ReactNode;
  /** A la derecha: el `Buscador`. */
  buscador?: React.ReactNode;
};

/**
 * La barra de una lista (DESIGN.md §11, «Barra de una lista»): el filtro y
 * sus menús a la izquierda, el buscador a la derecha, en una sola fila arriba
 * de la lista; si no entran, el buscador baja. Toda lista con filtros o
 * búsqueda la usa, así no se apilan filas de píldoras. No sabe de ED.
 */
export function BarraDeLista({ filtro, menus, buscador }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {filtro ? <div className="min-w-0 max-w-full">{filtro}</div> : null}
      {menus ? <div className="flex flex-wrap items-center gap-2">{menus}</div> : null}
      {buscador ? <div className="w-full sm:ml-auto sm:w-auto">{buscador}</div> : null}
    </div>
  );
}
