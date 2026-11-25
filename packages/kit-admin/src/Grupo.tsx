/**
 * Un grupo de campos con nombre propio adentro de un bloque (un botón: su
 * texto y adónde lleva): un `fieldset` con su leyenda en el segundo nivel de
 * título (DESIGN.md §11, «Tipo») y su ayuda, que se lee antes de los campos.
 * Sin caja: la leyenda alcanza. No sabe de ED.
 */
export function Grupo({ titulo, ayuda, children }: { titulo: string; ayuda?: string; children: React.ReactNode }) {
  return (
    // `min-w-0` le saca al `fieldset` el ancho mínimo que el navegador le pone de fábrica.
    <fieldset className="min-w-0">
      <legend className="font-display text-admin-cuerpo font-bold">{titulo}</legend>
      {ayuda ? <p className="mt-1 text-admin-meta text-gris-texto">{ayuda}</p> : null}
      <div className="mt-3 space-y-5">{children}</div>
    </fieldset>
  );
}
