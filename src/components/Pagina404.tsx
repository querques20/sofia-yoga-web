import Link from "next/link";
import { TEXTOS_404 } from "@/contenido/pagina-404";
import { type Idioma, rutaEn } from "@/lib/idiomas";

// el contenido de la 404 en un idioma. No se indexa (Next le pone noindex a toda respuesta 404), así que no
// lleva canonical ni hreflang: solo tiene que devolver a la persona a una página que sí existe
export function Pagina404({ idioma }: { idioma: Idioma }) {
  const t = TEXTOS_404[idioma];
  return (
    <main lang={idioma} data-404={idioma} className="contenedor flex min-h-[86svh] flex-col justify-center pt-32 pb-20">
      <p className="mano text-[clamp(3rem,8vw,5rem)]">{t.exclamacion}</p>
      <h1 className="titre mt-3 text-[clamp(3rem,8.6vw,6.3rem)]">{t.h1}</h1>
      <p className="mt-6 max-w-[32rem] text-[1.15rem] leading-relaxed">{t.texto}</p>
      <ul className="mt-8 flex flex-wrap gap-3">
        {t.salidas.map((salida) => (
          <li key={salida.ruta}>
            <Link
              href={rutaEn(idioma, salida.ruta)}
              className="inline-flex rounded-full border border-verde/25 px-5 py-2.5 text-[1.02rem] font-bold transition-colors duration-300 hover:bg-salvia-clara"
            >
              {salida.texto}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
