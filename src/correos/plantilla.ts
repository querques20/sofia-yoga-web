import { NOMBRE_DEL_SITIO } from "@/lib/sitio";

/**
 * La forma común de los correos del admin: HTML sobrio, en una columna, con
 * el nombre del sitio arriba, y el mismo texto en plano para los programas
 * que no muestran HTML (y para los filtros de spam, que desconfían de un
 * correo sin texto).
 *
 * Los colores van en hexadecimal porque un correo no lee las variables del
 * tema: son los valores de los tokens del admin (`app/(admin)/admin.css`), y
 * si el token cambia, cambia acá también. El botón es el primario del admin:
 * texto blanco sobre `naranja-boton`.
 */
const COLOR = {
  texto: "#39463a", // azul-principal: el verde de la marca
  secundario: "#5f685f", // gris-texto
  accion: "#b0604a", // naranja-boton: la terracota del admin (blanco encima, 4.55:1)
  sobreAccion: "#ffffff",
  fondo: "#f5efe9", // gris-fondo
  tarjeta: "#ffffff",
} as const;

const FUENTE = "Arial, Helvetica, sans-serif";

export type Contenido = { asunto: string; html: string; texto: string };

/** Lo que entra al HTML desde afuera (un nombre, un enlace) no puede cerrar una etiqueta. */
export function escapar(valor: string): string {
  return valor.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export function saludo(nombre?: string): string {
  return nombre?.trim() ? `Hola, ${nombre.trim()}:` : "Hola:";
}

// En hora universal y dicho así: el servidor no sabe dónde está quien lee.
const dia = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const hora = new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "UTC" });

/** «el 26 de septiembre de 2026 a las 20:15, hora universal»: cuándo pasó algo que avisa un correo. */
export function enHoraUniversal(cuando: Date): string {
  return `el ${dia.format(cuando)} a las ${hora.format(cuando)}, hora universal`;
}

/** «1 hora», «72 horas», «10 minutos»: cuánto dura un enlace o un código. */
export function duracion(minutos: number): string {
  if (minutos % 60 !== 0) return `${minutos} minutos`;
  const horas = minutos / 60;
  return horas === 1 ? "1 hora" : `${horas} horas`;
}

type Partes = {
  asunto: string;
  nombre?: string;
  /** Párrafos antes del botón. */
  antes: string[];
  /** Algo para copiar, grande y separado: el código del segundo factor. */
  destacado?: string;
  boton?: { texto: string; enlace: string };
  /** Párrafos después del botón, en gris. */
  despues: string[];
};

export function armarCorreo({ asunto, nombre, antes, destacado, boton, despues }: Partes): Contenido {
  const parrafosDeArriba = [saludo(nombre), ...antes];
  const parrafo = (texto: string, color: string = COLOR.texto) =>
    `<p style="margin:0 0 16px;color:${color};font:16px/1.5 ${FUENTE}">${escapar(texto)}</p>`;
  const destacadoHtml = destacado
    ? `<p style="margin:24px 0;color:${COLOR.texto};font:bold 32px/1 ${FUENTE};letter-spacing:6px">${escapar(destacado)}</p>`
    : "";
  const botonHtml = boton
    ? `<p style="margin:24px 0"><a href="${escapar(boton.enlace)}" style="display:inline-block;padding:12px 20px;border-radius:8px;background:${COLOR.accion};color:${COLOR.sobreAccion};font:bold 16px/1 ${FUENTE};text-decoration:none">${escapar(boton.texto)}</a></p>` +
      parrafo(`Si el botón no anda, copiá este enlace en el navegador: ${boton.enlace}`, COLOR.secundario)
    : "";
  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>${escapar(asunto)}</title></head>
<body style="margin:0;padding:24px;background:${COLOR.fondo}">
<div style="max-width:480px;margin:0 auto;padding:32px;background:${COLOR.tarjeta};border-radius:12px">
<p style="margin:0 0 24px;color:${COLOR.texto};font:bold 15px/1.2 ${FUENTE};letter-spacing:1.5px;text-transform:uppercase">${escapar(NOMBRE_DEL_SITIO)}</p>
${parrafosDeArriba.map((t) => parrafo(t)).join("\n")}
${destacadoHtml}
${botonHtml}
${despues.map((t) => parrafo(t, COLOR.secundario)).join("\n")}
</div>
</body></html>`;
  const texto = [...parrafosDeArriba, ...(destacado ? [destacado] : []), ...(boton ? [boton.enlace] : []), ...despues, `— ${NOMBRE_DEL_SITIO}`].join("\n\n");
  return { asunto, html, texto };
}
