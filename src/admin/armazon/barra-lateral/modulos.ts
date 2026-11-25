import type { ComponentType } from "react";
import type { Capacidad } from "@sofia/auth";
import { Casa, Users, type IconProps } from "../iconos";

// Las entradas de la sidebar, en grupos separados por un divisor: lo que se
// mira todos los días y lo que se publica. Lo que se configura una vez va
// aparte, pegado abajo. Un solo nivel: lo que hay adentro de cada módulo va
// en pestañas, no acá. Hoy están el Inicio y Cuentas; cada módulo nuevo
// (talleres, horarios y precios, fotos) suma acá su entrada.

export type Modulo = {
  clave: string;
  nombre: string;
  href: string;
  Icono: ComponentType<IconProps>;
  /** Los primeros segmentos después de `/admin` que la encienden. */
  segmentos: readonly string[];
  /**
   * Lo que hay que poder para verlo en la sidebar, y lo que pide la guarda del
   * módulo (`Guarda.tsx`; `guarda.test.ts` los cruza). Sin capacidad, lo ve
   * toda sesión: hoy, solo el Inicio.
   */
  capacidad?: Capacidad;
  /**
   * Lo que se crea en este módulo, como acceso rápido en el Inicio («Nuevo
   * taller»): lo ve quien tiene la capacidad del módulo. El módulo lo suma
   * en su línea cuando existe su pantalla.
   */
  accesoRapido?: { etiqueta: string; href: string };
};

export const GRUPOS: readonly (readonly Modulo[])[] = [[{ clave: "inicio", nombre: "Inicio", href: "/admin", Icono: Casa, segmentos: [""] }]];

/** Pegado abajo: lo que se configura una vez. A quien edita no le aparece (sus capacidades lo dicen). */
export const CONFIGURACION: readonly Modulo[] = [
  { clave: "cuentas", nombre: "Cuentas", href: "/admin/cuentas", Icono: Users, segmentos: ["cuentas"], capacidad: "usarCuentas" },
];

/** Todos los módulos, en el orden de la sidebar. */
export const MODULOS: readonly Modulo[] = [...GRUPOS.flat(), ...CONFIGURACION];

/** El segmento que decide la entrada activa: `/admin/cuentas/3` → `cuentas`, `/admin` → `""`. */
export function primerSegmento(ruta: string): string {
  return ruta.split("/")[2] ?? "";
}
