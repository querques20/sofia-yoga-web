import { lang } from "next/root-params";
import { INTERFAZ } from "@/contenido/interfaz";
import { esIdioma, IDIOMA_BASE, type Idioma } from "./idiomas";

// el idioma de la página, para los Server Components (sale del segmento [lang]; los Client Components usan
// useRuta o useInterfaz, porque next/root-params solo anda en el servidor)
export async function idiomaActual(): Promise<Idioma> {
  const valor = await lang();
  return esIdioma(valor) ? valor : IDIOMA_BASE;
}

/** los textos fijos de la web (menú, pie, botones) en el idioma de la página */
export async function interfaz() {
  return INTERFAZ[await idiomaActual()];
}
