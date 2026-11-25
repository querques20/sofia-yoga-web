import type { TipoDeActividad } from "@/datos/actividad";
import { DEL_ACCESO } from "./acceso";
import type { EventoParaLeer, Frase } from "./comun";
import { DE_LAS_CUENTAS } from "./cuentas";
import { DE_MI_CUENTA } from "./mi-cuenta";

export type { EventoParaLeer } from "./comun";

// Cada módulo trae sus frases en su archivo, y una línea acá. Es un Record
// para que un tipo nuevo no compile hasta tener su frase.
const FRASES: Record<TipoDeActividad, Frase> = {
  ...DEL_ACCESO,
  ...DE_MI_CUENTA,
  ...DE_LAS_CUENTAS,
};

/**
 * Cómo se lee un evento de la actividad: «Raquel Ayala entró». La usan el
 * Inicio y Cuentas › Actividad, así se lee igual en los dos lados.
 */
export function fraseDe(evento: EventoParaLeer): string {
  return FRASES[evento.tipo](evento);
}
