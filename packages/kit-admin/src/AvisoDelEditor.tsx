import type { ReactNode } from "react";
import { Aviso } from "./Aviso";

/**
 * El aviso de la última acción. `choque`: otra persona guardó mientras tanto,
 * y el aviso ofrece recargar. `errores`: los de los campos, cuando el aviso
 * es su resumen. Los dos se quedan en el encabezado; lo demás va en un aviso
 * breve (`useAvisoDelEditor`), con «Reintentar» si llega `reintentar`.
 * `titulo` nombra lo que pasó cuando el detalle no es una frase (lleva un link).
 */
export type AvisoDelEditor = { ok: boolean; detalle: ReactNode; titulo?: string; choque?: true; errores?: readonly unknown[]; reintentar?: () => void };

/**
 * El aviso de la última acción de un editor (una página, una entrada) que se
 * queda en el encabezado: el choque, con «Recargar» adentro cuando otra persona
 * guardó mientras tanto, o el resumen de los errores de los campos (DESIGN.md
 * §11, «Avisos»).
 */
export function AvisoDeLaAccion({ aviso, alCerrar, alRecargar }: { aviso: AvisoDelEditor | null; alCerrar: () => void; alRecargar: () => void }) {
  if (!aviso) return null;
  return (
    <Aviso tono={aviso.ok ? "bien" : "error"} alCerrar={alCerrar} accion={aviso.choque ? { etiqueta: "Recargar", alHacer: alRecargar } : undefined}>
      {aviso.detalle}
    </Aviso>
  );
}
