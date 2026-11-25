import { ENTRADA } from "./clases";
import { ChevronAbajo } from "./iconos";

/**
 * La caja de un desplegable (DESIGN.md §11, «Campos»): la misma `ENTRADA`
 * que un texto —alto, borde, radio y foco—, sin la apariencia del navegador y
 * con un chevron `azul-medio` con su aire a la derecha, que no toca el borde.
 * La lista abierta la dibuja la utilidad `desplegable-propio` que pone la app
 * (README), donde el navegador la deja; donde no, es la nativa. Es un
 * `<select>` de verdad: el teclado, el lector y el formulario andan igual.
 * Quien la usa pone la etiqueta. No sabe de ED.
 */
export function CajaDesplegable({ className = "", children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className="relative mt-1 block">
      {/* Sin la apariencia del navegador lo hace `desplegable-propio`: sin la utilidad, queda la flecha nativa además del chevron. */}
      <select {...props} className={`${ENTRADA} desplegable-propio cursor-pointer pr-10 ${className}`}>
        {children}
      </select>
      <ChevronAbajo size={18} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-azul-medio" />
    </span>
  );
}
