/**
 * El título de una lista del formulario, con su cuenta y su ayuda: el tercer
 * nivel de título (DESIGN.md §11, «Tipo»), un paso abajo del bloque. A la
 * derecha, si hay, lo que actúa sobre la lista entera. Interno del kit.
 */
export function TituloDeLista({ titulo, ayuda, acciones }: { titulo: string; ayuda?: string; acciones?: React.ReactNode }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-4">
        <p className="font-display text-admin-cuerpo font-bold">{titulo}</p>
        {acciones ? <div className="-mr-4 flex flex-wrap">{acciones}</div> : null}
      </div>
      {ayuda ? <p className="mt-1 text-admin-meta text-gris-texto">{ayuda}</p> : null}
    </div>
  );
}
