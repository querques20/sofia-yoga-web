/**
 * Campos que van uno al lado del otro porque son una sola cosa (DESIGN.md
 * §11, «Unidad»): el texto de un botón y adónde lleva, una cifra y su unidad.
 * Es la única manera de poner dos campos en la misma fila: dos campos que no
 * son una unidad van uno abajo del otro, a todo el ancho de la columna.
 *
 * Sus miembros se reparten la fila en partes iguales y la llenan de borde a
 * borde, así el borde derecho del último coincide con el de los campos
 * sueltos. Van sin ayuda propia, así las cajas quedan a la misma altura; lo
 * que haya que explicar va en la ayuda del grupo que los contiene. En el
 * celular, uno abajo del otro. No sabe de ED.
 */
export function Unidad({ children }: { children: React.ReactNode }) {
  return <div className="space-y-5 sm:flex sm:items-start sm:gap-4 sm:space-y-0 sm:*:min-w-0 sm:*:flex-1 sm:*:basis-0">{children}</div>;
}
