"use client";

import { useLayoutEffect } from "react";
import { ScriptEnLinea } from "./ScriptEnLinea";

// marca que hay JS, así lo que entra animado no aparece y desaparece. Y si la entrada ya se vio en esta visita,
// lo marca también, así el telón ni se pinta
function marcar() {
  document.documentElement.classList.add("js");
  try {
    if (sessionStorage.getItem("sofia-entrada")) document.documentElement.classList.add("entrada-vista");
  } catch {
    // sin almacenamiento la entrada se ve en cada carga, nada más
  }
}

/**
 * Las marcas de <html> que dependen del navegador. En la carga inicial las pone el script antes de pintar; cuando
 * React vuelve a dibujar el layout (al cambiar de idioma cambia el layout raíz) <html> pierde las clases y el
 * script no se repite, así que las vuelve a poner el efecto, también antes de pintar y antes que la entrada
 */
export function MarcasDelDocumento() {
  useLayoutEffect(marcar, []);
  return <ScriptEnLinea html={`(${marcar.toString()})()`} />;
}
