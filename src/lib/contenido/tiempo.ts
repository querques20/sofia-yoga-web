// Fechas en llano para el admin. Sin dominio de ED.

/** El día y la hora de una fecha, por separado: «21/9» y «14:05». */
function diaYHora(iso: string, zona?: string): [string, string] {
  const fecha = new Date(iso);
  const dia = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "numeric", timeZone: zona }).format(fecha);
  const hora = new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: zona }).format(fecha);
  return [dia, hora];
}

/** «21/9 a las 14:05». Sin zona usa la de quien corre el código: en el navegador, la de la persona. */
export function fechaYHora(iso: string, zona?: string): string {
  const [dia, hora] = diaYHora(iso, zona);
  return `${dia} a las ${hora}`;
}

/** «21/9 · 14:05», para una línea que tiene que entrar en un renglón (el estado del riel). */
export function fechaYHoraCorta(iso: string, zona?: string): string {
  const [dia, hora] = diaYHora(iso, zona);
  return `${dia} · ${hora}`;
}

/** «hace un momento», «hace 3 minutos», «hace 2 horas», «hace 5 días». */
export function haceCuanto(desde: Date, ahora: Date = new Date()): string {
  const segundos = Math.max(0, Math.round((ahora.getTime() - desde.getTime()) / 1000));
  if (segundos < 60) return "hace un momento";
  const minutos = Math.round(segundos / 60);
  if (minutos < 60) return `hace ${minutos} ${minutos === 1 ? "minuto" : "minutos"}`;
  const horas = Math.round(minutos / 60);
  if (horas < 24) return `hace ${horas} ${horas === 1 ? "hora" : "horas"}`;
  const dias = Math.round(horas / 24);
  return `hace ${dias} ${dias === 1 ? "día" : "días"}`;
}
