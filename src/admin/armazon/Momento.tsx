"use client";

import { fechaYHora, fechaYHoraCorta, haceCuanto } from "@/lib/contenido/tiempo";

/** «27/9/2028»: el día con su año, sin la hora (`dia`), en la zona de quien mira como lo demás. */
const DIA = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "numeric", year: "numeric" });

/**
 * Una fecha en la zona de quien mira: absoluta («21/9 a las 14:05») o
 * relativa («hace 3 minutos», como pide el SPEC §2 para el borrador), corta
 * (`corta`: «21/9 · 14:05», la del estado del riel), o solo el día con su año
 * (`dia`: «Se borra el 27/9/2028»). El
 * servidor la renderiza con su reloj y su zona (UTC en Vercel y en el VPS) y el navegador
 * la corrige al hidratar: `suppressHydrationWarning` existe para esto y solo
 * cubre este elemento. La relativa se recalcula en cada render, o sea cada
 * vez que el estado del editor cambia.
 *
 * Si `iso` no describe una fecha válida, no se muestra nada: formatear una
 * fecha inválida con `Intl.DateTimeFormat` tira `RangeError`, y ese error se
 * llevaría puesto el editor entero en vez de mostrar un campo vacío.
 */
/** Cómo se escribe: relativa, solo el día, corta o entera. */
function comoSeEscribe(iso: string, fecha: Date, { relativo, dia, corta }: { relativo: boolean; dia: boolean; corta: boolean }): string {
  if (relativo) return haceCuanto(fecha);
  if (dia) return DIA.format(fecha);
  return corta ? fechaYHoraCorta(iso) : fechaYHora(iso);
}

export function Momento({ iso, relativo = false, dia = false, corta = false }: { iso: string; relativo?: boolean; dia?: boolean; corta?: boolean }) {
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return null;
  return (
    <time dateTime={iso} suppressHydrationWarning>
      {comoSeEscribe(iso, fecha, { relativo, dia, corta })}
    </time>
  );
}
