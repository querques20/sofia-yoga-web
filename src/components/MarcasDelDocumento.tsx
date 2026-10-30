"use client";

import { useLayoutEffect } from "react";
import { ScriptEnLinea } from "./ScriptEnLinea";

// marca que hay JS, así lo que entra animado no aparece y desaparece. Y si la entrada ya se vio en esta visita y
// en este idioma, lo marca también, así el telón ni se pinta
function marcar() {
  document.documentElement.classList.add("js");
  try {
    if (sessionStorage.getItem("sofia-entrada") === document.documentElement.lang) document.documentElement.classList.add("entrada-vista");
  } catch {
    // sin almacenamiento la entrada se ve en cada carga, nada más
  }
}

function marcarJs() {
  document.documentElement.classList.add("js");
}

/**
 * Las marcas de <html> que dependen del navegador. En la carga inicial las pone el script antes de pintar. Al
 * cambiar de idioma cambia el layout raíz: <html> pierde las clases y el script no se repite, así que el efecto
 * vuelve a poner «js» antes de pintar. «entrada-vista» no: en el idioma nuevo la entrada se vuelve a ver
 */
export function MarcasDelDocumento() {
  useLayoutEffect(marcarJs, []);
  return <ScriptEnLinea html={`(${marcar.toString()})()`} />;
}
