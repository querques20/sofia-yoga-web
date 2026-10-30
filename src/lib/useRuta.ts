"use client";

import { usePathname } from "next/navigation";
import { leerRuta } from "./idiomas";

/** el idioma y la página actuales (la ruta francesa), iguales en el servidor y en el navegador (ver leerRuta) */
export function useRuta() {
  return leerRuta(usePathname());
}
