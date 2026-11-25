import type { Breve } from "./cola";

// Armar un aviso breve: de lo que contestó una acción, o para después de
// recargar. Sin React; lo prueba partir.test.ts.

/** Donde una acción que recarga la página deja su aviso, para el próximo montaje. */
const CLAVE = "aviso-breve";

/** Cuánto vale ese aviso: la recarga es de un momento. Más viejo, era de otra sesión (se venció y se volvió a entrar). */
const VALE_MS = 60_000;

/** Para una acción que termina recargando la página: el aviso se muestra al volver. Solo texto. */
export function avisarDespues(breve: Omit<Breve, "detalle" | "accion"> & { detalle?: string }) {
  sessionStorage.setItem(CLAVE, JSON.stringify({ breve, en: Date.now() }));
}

/** El aviso que dejó una acción antes de recargar, una sola vez y si es de recién: se borra al leerlo. */
export function tomarElDeAntes(ahora = Date.now()): Breve | null {
  const guardado = sessionStorage.getItem(CLAVE);
  if (!guardado) return null;
  sessionStorage.removeItem(CLAVE);
  try {
    const { breve, en } = JSON.parse(guardado) as { breve: Breve; en: number };
    return ahora - en <= VALE_MS ? breve : null;
  } catch {
    // Algo que no se puede leer no se muestra.
    return null;
  }
}

/** «Publicado: el sitio ya lo muestra.» → «Publicado» y «El sitio ya lo muestra.»; sin dos partes, todo es el texto. */
export function partir(frase: string): { texto: string; detalle?: string } {
  const corte = /^(.+?)[:.]\s+(\S.*)$/.exec(frase);
  if (!corte) return { texto: frase.replace(/\.$/, "") };
  const [, texto, resto] = corte;
  return { texto, detalle: resto.charAt(0).toUpperCase() + resto.slice(1) };
}

/** «Listo: el sitio ya muestra…» → «El sitio ya muestra…»; un «Listo.» solo, nada. */
export function sinListo(frase: string): string | undefined {
  const resto = frase.replace(/^Listo[.:]?\s*/, "");
  return resto ? resto.charAt(0).toUpperCase() + resto.slice(1) : undefined;
}

/**
 * Lo que contestó una acción (`{ ok, detalle }`), como aviso breve. Si salió
 * bien con un «Listo:», `hecho` lo nombra («Datos guardados») y lo demás va
 * debajo; si la frase ya dice qué pasó («Archivo reemplazado: …», «No cambió
 * ningún plazo.»), va ella. Si no salió, el error, partido igual: qué falló
 * arriba y qué hacer debajo.
 */
export function breveDe(r: { ok: boolean; detalle: string }, hecho: string): Breve {
  if (!r.ok) return { tono: "error", ...partir(r.detalle) };
  if (!/^Listo\b/.test(r.detalle)) return { tono: "exito", ...partir(r.detalle) };
  return { tono: "exito", texto: hecho, detalle: sinListo(r.detalle) };
}
