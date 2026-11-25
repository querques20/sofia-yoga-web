import { ChevronAbajo } from "./iconos";

type Props = {
  /** Qué tiene: «Cómo se ve», «Se ve en», «Salud del link». */
  titulo: string;
  /** Lo que conviene ver sin abrirlo, en una palabra o un número («Anda», «3 lugares»). */
  resumen?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Un panel del módulo al final del riel de una ficha (DESIGN.md §11, «Ficha
 * de una entidad»): una línea con su título y un chevron, cerrado al cargar,
 * así lo fijo del riel (el estado y el índice) entra sin scroll propio. Solo
 * si alguien lo abre puede scrollear el riel. Es un `details`: anda sin
 * JavaScript, y «revisar errores» lo abre si el campo con error vive acá. No
 * sabe de ED.
 */
export function PanelDelRiel({ titulo, resumen, children }: Props) {
  return (
    <details className="group/panel border-t border-azul-claro/60">
      <summary className="flex min-h-10 cursor-pointer list-none items-center gap-2 rounded-sm py-2 text-admin-meta font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-medio [&::-webkit-details-marker]:hidden">
        <ChevronAbajo size={16} className="shrink-0 -rotate-90 text-azul-medio motion-safe:transition-transform group-open/panel:rotate-0" />
        <span className="min-w-0 flex-1 truncate">{titulo}</span>
        {resumen ? <span className="shrink-0 font-normal text-gris-texto">{resumen}</span> : null}
      </summary>
      <div className="space-y-4 pt-2 pb-4">{children}</div>
    </details>
  );
}
