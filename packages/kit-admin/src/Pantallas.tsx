// Los moldes de una pantalla del admin (DESIGN.md §11, «Moldes de pantalla»):
// cada pantalla elige uno según lo que es, y el molde le da su ancho y su
// ritmo vertical. El layout que las envuelve no limita nada. La ficha tiene
// el suyo aparte (`PantallaDeFicha`), con su riel.

/**
 * Una lista, un índice, un tablero (Inicio, Mensajes, Métricas, Cuentas): un
 * ancho cómodo de lectura, 72 rem, centrado. El encabezado y lo que sigue, con
 * el mismo aire siempre.
 */
export function PantallaDeLista({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl space-y-6">{children}</div>;
}

/**
 * Una pantalla de ajustes en apartados (Ajustes, Mi cuenta, Invitar, una
 * cuenta): el título y la frase a la izquierda, lo que se toca a la derecha,
 * en 64 rem centrados.
 */
export function PantallaDeAjustes({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl space-y-6">{children}</div>;
}
