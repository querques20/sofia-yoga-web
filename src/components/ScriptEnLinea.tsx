"use client";

/**
 * Un script que corre mientras el navegador lee el HTML, antes de pintar. Solo hace falta en la carga inicial:
 * cuando React vuelve a dibujar el layout en el navegador (al cambiar de idioma cambia el layout raíz), sale
 * como text/plain, así no se ejecuta de nuevo ni React avisa por el <script>. Es el patrón de la guía de Next
 * (preventing-flash-before-hydration)
 */
export function ScriptEnLinea({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
