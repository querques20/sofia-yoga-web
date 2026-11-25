import { puede } from "@sofia/auth";
import { actividadReciente, type EventoReciente } from "./actividad-reciente";

/** Lo que el Inicio necesita de la sesión: quién es y su rol. */
export type SesionDelInicio = { user: { name: string; rol?: unknown } };

export type DatosDelInicio = {
  nombre: string;
  /** `null` si no se pudo leer. */
  actividad: EventoReciente[] | null;
  /** Si llega a Cuentas › Actividad, donde está toda: el Inicio muestra solo lo que cambia algo. */
  verActividad: boolean;
};

/**
 * Todo lo que muestra el Inicio para esa sesión. Cada bloque se lee aislado:
 * si su consulta tira, el bloque dice que no se pudo leer y la pantalla sigue.
 * Las fechas viajan como ISO. Hoy hay un solo bloque, la actividad; los
 * pendientes y los números de la semana llegan con los módulos que los tengan.
 */
export async function inicioPara(sesion: SesionDelInicio): Promise<DatosDelInicio> {
  const { rol } = sesion.user;
  let actividad: EventoReciente[] | null;
  try {
    actividad = await actividadReciente(rol);
  } catch (e) {
    console.error("Inicio: no se pudo leer la actividad reciente:", e instanceof Error ? e.message : e);
    actividad = null;
  }
  return { nombre: sesion.user.name, actividad, verActividad: puede(rol, "usarCuentas") };
}
