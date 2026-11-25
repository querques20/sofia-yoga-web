/**
 * Una acción que deshace o saca del sitio (DESIGN.md §11, «Ficha de una
 * entidad», «Más acciones» del estado del riel): qué es y qué pasa si se
 * toca, en una línea, y lo que la hace, debajo: en el riel, angosto, un botón al
 * lado entraba o no según su largo, y las filas quedaban desparejas. Van en una
 * lista con divisor; lo que no se deshace confirma en el lugar (`Confirmacion`).
 */
export function FilaDeAccion({ titulo, consecuencia, children }: { titulo: string; consecuencia: string; children?: React.ReactNode }) {
  return (
    <li className="space-y-2 py-4">
      <div className="min-w-0">
        <p className="font-medium">{titulo}</p>
        <p className="mt-0.5 text-admin-meta text-gris-texto">{consecuencia}</p>
      </div>
      {children}
    </li>
  );
}
