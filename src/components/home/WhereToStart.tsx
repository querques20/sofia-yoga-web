import Link from "next/link";
import { idiomaActual } from "@/lib/idioma-actual";
import { rutaEn } from "@/lib/idiomas";
import { CLASES, PAGINAS } from "@/lib/navegacion";
import { PUERTAS } from "../hero/puertas";
import { Trait } from "./Trait";
import { WhereToStartScene } from "./WhereToStartScene";

export type TextosWhereToStart = {
  titulo: string;
  /** who each thing is for, in the visitor's words, and the one thing known for sure about it */
  situaciones: [Situacion, Situacion, Situacion];
  /** the workshops, in one line: none is announced yet */
  ateliers: { texto: string; enlace: string };
};
type Situacion = { frase: string; detalle: string };

// where each situation leads: the pregnant visitor and the new mother have one page each; the classes are one
// thing taken three ways, so that row links to the three (their names and routes are the hero's doors)
const DESTINOS = ["/yoga-prenatal-geneve", "/yoga-post-partum-geneve", "/cours-de-yoga-geneve"] as const;

// the site's outlined pill (the 404's, «Sur cette page»), 3rem tall here: it is what the visitor taps to go on.
// The arrow says it leads somewhere, and steps forward under the pointer
const PILL =
  "group/pill inline-flex min-h-12 items-center gap-2 rounded-full border border-verde/25 px-5 text-[1.02rem] font-bold whitespace-nowrap transition-colors duration-300 hover:bg-salvia-clara";

/**
 * The Home's scene after the programme: what Sofia offers, sorted by who is reading. The hero shows six doors of
 * the same weight; here they fall into three situations, and group, private and park show as three ways to take
 * the same class. Text only: the photos are the hero's. It is large and airy, a little taller than a screen. On
 * a computer it waits under the programme's panel while the panel leaves from over it, and then goes on with the
 * page (`.ou-stage`, globals.css). How its title and rows come in is WhereToStartScene's. The links are the
 * site's outlined pills, tall enough for a thumb; a row that leads to one page is that link from edge to edge
 */
export async function WhereToStart({ t }: { t: TextosWhereToStart }) {
  const idioma = await idiomaActual();
  const pagina = (href: string) => ({
    href: rutaEn(idioma, href),
    texto: PAGINAS.find((p) => p.href === href)?.texto[idioma] ?? "",
  });
  const formatos = CLASES.map(({ clave, texto }) => {
    const puerta = PUERTAS.find((p) => p.clave === clave);
    const ruta = rutaEn(idioma, puerta?.ruta ?? DESTINOS[2]);
    return { href: puerta?.ancla ? `${ruta}#${puerta.ancla}` : ruta, texto: texto[idioma] };
  });
  const enlaces = [[pagina(DESTINOS[0])], [pagina(DESTINOS[1])], formatos];

  return (
    <WhereToStartScene>
      <section id="par-ou-commencer" data-stage className="contenedor py-[clamp(4.5rem,11vw,8.5rem)]">
        <h2 data-rise className="titre text-[clamp(2.6rem,6.4vw,5rem)]">
          {t.titulo}
        </h2>
        <ul className="mt-10 lg:mt-14">
          {t.situaciones.map((situacion, i) => {
            // one page to go to: the whole row is the link, and it answers the pointer as one piece
            const whole = enlaces[i].length === 1;
            return (
              <li key={situacion.frase} data-rise className="group relative grid gap-x-12 gap-y-4 py-8 lg:grid-cols-12 lg:items-baseline lg:py-10">
                <Trait />
                <h3
                  className={`titre text-[clamp(1.9rem,4.4vw,3.4rem)] lg:col-span-7 ${whole ? "transition-transform duration-500 ease-souple lg:group-hover:translate-x-3" : ""}`}
                >
                  {situacion.frase}
                </h3>
                <div className="lg:col-span-5">
                  <p className="max-w-[28rem] text-[1.15rem] leading-relaxed">{situacion.detalle}</p>
                  <p className="mt-5 flex flex-wrap gap-3">
                    {enlaces[i].map((enlace) => (
                      <Link key={enlace.href} className={`${PILL} ${whole ? "after:absolute after:inset-0" : ""}`} href={enlace.href}>
                        {enlace.texto}
                        <span className="transition-transform duration-300 ease-souple group-hover/pill:translate-x-1" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    ))}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <p data-rise className="relative pt-8 text-[1.15rem]">
          <Trait />
          {t.ateliers.texto}{" "}
          <Link className="enlace font-bold" href={rutaEn(idioma, "/ateliers-evenements")}>
            {t.ateliers.enlace}
          </Link>
        </p>
      </section>
    </WhereToStartScene>
  );
}
