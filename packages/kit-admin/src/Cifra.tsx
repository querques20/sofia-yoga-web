const numero = new Intl.NumberFormat("es-AR");

// La variación llega en una de cuatro formas («+N %», «−N %», «igual»,
// «sin datos previos»); acá cada una se traduce a
// la frase que se lee debajo del número, contra el período que se compara.
function leyendaDe(variacion: string, periodo: string): string {
  if (variacion.startsWith("+") || variacion.startsWith("−")) return `${variacion} contra ${periodo}`;
  if (variacion === "igual") return `Igual que ${periodo}`;
  return "Sin datos previos";
}

type Props = {
  etiqueta: string;
  /** `null` cuando no hay datos: se dibuja «—», nunca un cero inventado. */
  valor: number | null;
  /**
   * Sin `variacion` no lleva comparación: una posición en un ranking no se
   * compara en porcentaje, porque bajar es mejorar y se leería al revés.
   */
  variacion?: string;
  /** Contra qué se compara: «el período anterior», «la semana anterior». */
  periodo?: string;
  /** Lo que se lee abajo en lugar de la comparación: «No se pudo leer». */
  nota?: string;
  /** En una fila de una lista de cifras (la etiqueta y la comparación a la izquierda, el número a la derecha), sin caja propia: la caja es de la lista. */
  enFila?: boolean;
};

/**
 * Una cifra con su comparación (DESIGN.md §11, «Cifra»). La comparación va sin color:
 * subir no siempre es mejorar, y el rojo es solo para errores. Sin datos,
 * «—» con «Todavía no hay datos», y el lector oye «Sin datos» en vez de un
 * guion. `enFila`, compacta, para varias en una lista. No sabe de ED.
 */
export function Cifra({ etiqueta, valor, variacion, periodo = "el período anterior", nota, enFila = false }: Props) {
  const pie = nota ?? (valor === null ? "Todavía no hay datos" : variacion ? leyendaDe(variacion, periodo) : null);
  const escrito =
    valor === null ? (
      <>
        <span aria-hidden="true">—</span>
        <span className="sr-only">Sin datos</span>
      </>
    ) : (
      numero.format(valor)
    );
  if (enFila) {
    return (
      <div className="flex items-baseline justify-between gap-4 px-4 py-3">
        <div className="min-w-0">
          <p className="text-admin-meta font-medium">{etiqueta}</p>
          {pie ? <p className="text-admin-meta text-gris-texto">{pie}</p> : null}
        </div>
        <p className="shrink-0 font-display text-admin-seccion font-bold tabular-nums">{escrito}</p>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-azul-claro bg-white p-4">
      <p className="text-admin-meta text-gris-texto">{etiqueta}</p>
      <p className="mt-1 font-display text-admin-titulo font-bold">{escrito}</p>
      {pie ? <p className="mt-1 text-admin-meta text-gris-texto">{pie}</p> : null}
    </div>
  );
}
