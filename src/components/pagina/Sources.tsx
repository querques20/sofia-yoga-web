import { interfaz } from "@/lib/idioma-actual";

type Fuente = { texto: string; href: string };

/**
 * De dónde sale la información general de salud de la página (es un tema delicado: tiene que poder verificarse).
 * Abajo, el recordatorio de que no reemplaza a quien la acompaña
 */
// el aviso es por defecto el recordatorio de salud de siempre (ver interfaz); en las otras páginas se cambia o se saca
export async function Sources({ fuentes, aviso }: { fuentes: Fuente[]; aviso?: string | false }) {
  const t = await interfaz();
  const recordatorio = aviso ?? t.avisoSalud;
  return (
    <section className="pb-[clamp(3rem,8vw,5rem)]">
      <div className="contenedor">
        <div className="border-t border-verde/20 pt-8 lg:grid lg:grid-cols-12 lg:gap-10">
          <h2 className="text-[1.1rem] font-bold lg:col-span-3">{t.fuentes}</h2>
          <div className="mt-4 lg:col-span-9 lg:mt-0">
            <ul className="space-y-2 text-[0.98rem] leading-relaxed">
              {fuentes.map((fuente) => (
                <li key={fuente.href}>
                  <a className="enlace" href={fuente.href} target="_blank" rel="noopener noreferrer">
                    {fuente.texto}
                  </a>
                </li>
              ))}
            </ul>
            {recordatorio && <p className="mt-5 max-w-[44rem] text-[0.98rem] leading-relaxed opacity-80">{recordatorio}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
