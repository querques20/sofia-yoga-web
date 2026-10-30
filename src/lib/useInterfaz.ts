"use client";

import { INTERFAZ } from "@/contenido/interfaz";
import { useRuta } from "./useRuta";

/** los textos fijos de la web en el idioma de la página, para los Client Components */
export function useInterfaz() {
  return INTERFAZ[useRuta().idioma];
}
