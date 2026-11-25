import type { TipoDeActividad } from "@/datos/actividad";
import { DEL_ACCESO } from "./acceso";
import { MODULOS_DE_ACTIVIDAD, type Lectura, type ModuloDeActividad, type Pantalla } from "./comun";
import { DE_LAS_CUENTAS } from "./cuentas";
import { DE_MI_CUENTA } from "./mi-cuenta";

export { MODULOS_DE_ACTIVIDAD, type ModuloDeActividad } from "./comun";

/**
 * De qué parte del admin es cada tipo de actividad (el filtro «Módulo» de
 * Cuentas › Actividad) y adónde lleva. Cada módulo trae los suyos en su
 * archivo, y una línea acá: un tipo nuevo sin su lectura no compila.
 */
const LECTURAS: Record<TipoDeActividad, Lectura> = {
  ...DEL_ACCESO,
  ...DE_MI_CUENTA,
  ...DE_LAS_CUENTAS,
};

export function moduloDe(tipo: TipoDeActividad): ModuloDeActividad {
  return LECTURAS[tipo].modulo;
}

export function esModuloDeActividad(valor: string): valor is ModuloDeActividad {
  return Object.hasOwn(MODULOS_DE_ACTIVIDAD, valor);
}

/**
 * Adónde lleva lo que se tocó, si todavía tiene pantalla: lo de Cuentas, a
 * esa cuenta si existe. Lo que se borra no lleva a ningún lado.
 */
export function pantallaDe({ tipo, sobreId }: { tipo: TipoDeActividad; sobreId: string | null }, cuentasQueExisten: ReadonlySet<string>): Pantalla | null {
  const { pantalla } = LECTURAS[tipo];
  if (!sobreId || !pantalla) return null;
  return pantalla(sobreId, { cuentas: cuentasQueExisten });
}
