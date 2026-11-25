import { Fleur } from "@/components/Fleur";
import { NOMBRE_DEL_SITIO } from "@/lib/sitio";

/**
 * La marca en el admin: la flor de seis pétalos del sitio (`Fleur`, que es
 * provisoria hasta tener su archivo) y el nombre en D-DIN Condensed, en
 * mayúsculas, como los títulos del sitio. Toma el color de quien la pone, así
 * sirve igual sobre la crema y sobre el verde. La flor es decorativa: el
 * nombre va en texto.
 */
export function Marca({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Fleur className="size-8 shrink-0" trazo={7} />
      <span className="font-display text-admin-seccion leading-none font-bold tracking-wide uppercase">{NOMBRE_DEL_SITIO}</span>
    </span>
  );
}
