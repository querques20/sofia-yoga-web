type Fuente = { texto: string; href: string };

/**
 * De dónde sale la información general de salud de la página (es un tema delicado: tiene que poder verificarse).
 * Abajo, el recordatorio de que no reemplaza a quien la acompaña
 */
// el recordatorio de siempre en las páginas de embarazo y posparto; en las otras se cambia o se saca
const AVISO_SALUD =
  "Ces informations sont générales. Elles ne remplacent pas l’avis de ta sage-femme, de ta gynécologue ou de ta physio, qui connaissent ta situation.";

export function Sources({ fuentes, aviso = AVISO_SALUD }: { fuentes: Fuente[]; aviso?: string | false }) {
  return (
    <section className="pb-[clamp(3rem,8vw,5rem)]">
      <div className="contenedor">
        <div className="border-t border-verde/20 pt-8 lg:grid lg:grid-cols-12 lg:gap-10">
          <h2 className="text-[1.1rem] font-bold lg:col-span-3">Sources</h2>
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
            {aviso && <p className="mt-5 max-w-[44rem] text-[0.98rem] leading-relaxed opacity-80">{aviso}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
