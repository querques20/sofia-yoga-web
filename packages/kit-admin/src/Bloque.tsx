/**
 * Un bloque del formulario de una ficha (DESIGN.md §11, «Ficha de una
 * entidad»): el primer nivel de título, con el divisor, y los campos debajo,
 * con menos aire entre ellos que entre bloques. El `id` del título es el ancla
 * del índice del riel («En esta ficha»), y su `scroll-margin` lo deja a la
 * vista debajo del encabezado fijo (la variable la pone `PantallaDeFicha`).
 */
export function Bloque({ id, titulo, children }: { id: string; titulo: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="space-y-5">
      <h2 id={id} className="scroll-mt-(--tope-del-riel) border-b border-azul-claro/60 pb-2 font-display text-admin-seccion font-bold">
        {titulo}
      </h2>
      {children}
    </section>
  );
}
