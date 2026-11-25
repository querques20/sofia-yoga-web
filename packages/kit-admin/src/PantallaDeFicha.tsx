"use client";

import { RielDeLaFicha } from "./RielDeLaFicha";
import { useRielFijo } from "./useRielFijo";

type Props = {
  /** El `Encabezado` fijo de la ficha (con `unaLinea`): el primer hijo, para que sea fijo contra lo que scrollea. */
  encabezado: React.ReactNode;
  /** Lo que va en el riel, de arriba abajo: el estado, el índice («En esta ficha») y el panel del módulo. */
  riel: React.ReactNode;
  /** Lo que dice el riel plegado, por debajo de `xl`: «Estado, índice y cómo se ve». */
  resumenDelRiel: React.ReactNode;
  /** El formulario, en bloques. */
  children: React.ReactNode;
};

/**
 * El molde de una ficha (DESIGN.md §11, «Ficha de una entidad»): el
 * encabezado fijo, la columna del formulario y el riel. Hasta 67 rem
 * centrados; desde `xl`, la columna (hasta 44 rem) a la izquierda y el riel
 * (de 18 a 20 rem) a la derecha, fijo debajo del encabezado. Por
 * debajo de `xl`, el riel plegado después del formulario. Una ficha nueva toma
 * este molde y no copia una grilla. No sabe de ED.
 *
 * En el DOM va primero el formulario y después el riel, el orden en que se
 * leen en la pantalla ancha y en el celular: el orden del foco es el que se ve.
 * Abajo, en el celular, el lugar de la barra fija de las acciones (64 px).
 */
export function PantallaDeFicha({ encabezado, riel, resumenDelRiel, children }: Props) {
  const refRaiz = useRielFijo();
  return (
    // El tope es la suma de lo de adentro (44 + 3 + 20 rem): en una pantalla ancha la ficha se centra entera, sin hueco muerto.
    <div ref={refRaiz} className="mx-auto w-full max-w-268 max-lg:pb-16">
      {encabezado}
      {/* Las dos parten de su base (44 y 18 rem) y crecen juntas: la columna hasta 44 rem y el riel hasta 20, sin hueco muerto entre las dos. Si no entran, la columna se achica y el riel no baja de 18. */}
      <div className="mt-6 flex flex-col gap-8 xl:flex-row xl:items-start xl:gap-12">
        <div className="min-w-0 space-y-12 xl:max-w-176 xl:flex-1 xl:basis-176">{children}</div>
        <RielDeLaFicha resumen={resumenDelRiel}>{riel}</RielDeLaFicha>
      </div>
    </div>
  );
}
