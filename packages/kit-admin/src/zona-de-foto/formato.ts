// Cómo se nombra un archivo de foto en la zona: sus tipos por extensión, su
// peso y por qué no se toma. Sin dominio: los tipos y el tope llegan por prop.

/** «image/jpeg» → «jpg»; «image/svg+xml» → «svg». */
export const extension = (tipo: string) => (tipo.split("/")[1] ?? tipo).replace("jpeg", "jpg").replace("svg+xml", "svg");

/** «jpg, png o webp». */
export function enLista(tipos: readonly string[]): string {
  const nombres = tipos.map(extension);
  return nombres.length > 1 ? `${nombres.slice(0, -1).join(", ")} o ${nombres.at(-1)}` : (nombres[0] ?? "");
}

const MEGA = 1024 * 1024;

/** 4194304 → «4»; 1572864 → «1,5». */
export const megas = (bytes: number) => String(Math.round((bytes / MEGA) * 10) / 10).replace(".", ",");

/** «380 KB» o «1,5 MB». */
export const peso = (bytes: number) => (bytes < MEGA ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${megas(bytes)} MB`);

/** Por qué no se toma el archivo, en una línea, o `null` si sirve. */
export function motivoParaNoTomarla(archivo: File, tipos: readonly string[], maximoBytes: number): string | null {
  if (!tipos.includes(archivo.type)) return `Ese archivo no es una foto en ${enLista(tipos)}.`;
  if (archivo.size > maximoBytes) return `Pesa ${peso(archivo.size)}: el tope es ${megas(maximoBytes)} MB. Achicala antes de subirla.`;
  return null;
}
