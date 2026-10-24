type Ancla = { href: string; texto: string };

/**
 * El índice de las páginas largas, justo debajo de la cabecera: cada pastilla lleva a su sección.
 * En el celular la fila se desliza de costado
 */
export function SurCettePage({ anclas }: { anclas: Ancla[] }) {
  return (
    <nav aria-label="Sur cette page" className="contenedor pb-[clamp(3rem,7vw,5rem)]">
      <div className="flex flex-col gap-3 border-t border-verde/20 pt-6 lg:flex-row lg:items-center lg:gap-6">
        <p className="shrink-0 text-[0.98rem] font-bold">Sur cette page</p>
        <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0">
          {anclas.map((ancla) => (
            <li key={ancla.href} className="shrink-0">
              <a
                href={ancla.href}
                className="inline-flex items-center gap-2 rounded-full border border-verde/25 px-4 py-2 text-[0.98rem] font-bold transition-colors duration-300 hover:bg-salvia-clara"
              >
                {ancla.texto}
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-violeta" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 2.5 C 8.2 6 7.8 9.5 8 13 M3.8 9 L 8 13.2 L 12.2 9" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
