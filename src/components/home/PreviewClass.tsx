import Image from "next/image";
import { enlaceWhatsApp, MENSAJES } from "@/lib/contacto";
import { idiomaActual } from "@/lib/idioma-actual";
import { Magnetique } from "../Magnetique";
import { RiseIn } from "./RiseIn";

export type TextosPreviewClass = {
  titulo: string;
  texto: string;
  /** what the photo standing in for the video shows */
  foto: string;
  /** the button beside the title: booking is by message, so it opens WhatsApp with the question written */
  boton: string;
};

/**
 * A look at a class before writing to her, laid out as on lottiemurphy.com
 * (docs/research/2026-11-24-testimonials-and-closing.md): a wide frame across the page and, under it, the title
 * and one line on the left and the button on the right, all three in line with the frame's edges. Sofia has
 * not given a video yet, so the frame holds a placeholder photo (README § photos), large enough for a wide
 * screen. The play mark is a drawing, not a button: there is nothing to play, and nothing on the frame says so
 * (the owner's word, 2026-11-24). When her video arrives it takes the frame, with a still of it as its poster.
 * On a computer the whole of it fits one screen (the frame takes the room the text leaves), and it is the
 * cover the closing band rises over: it stops there for a moment, then the band comes up (Closing, globals.css)
 */
export async function PreviewClass({ t }: { t: TextosPreviewClass }) {
  const idioma = await idiomaActual();
  return (
    <section id="apercu" data-cover className="flex flex-col px-3 pb-[clamp(4.5rem,11vw,8.5rem)] lg:min-h-svh lg:px-6 lg:pt-6 lg:pb-9">
      <RiseIn className="flex flex-1 flex-col">
        {/* on a phone the frame is upright and the photo lies wide: it is cut to nearly twice the screen's width */}
        <div data-rise className="relative aspect-[4/5] max-h-[82svh] w-full overflow-hidden rounded-[2rem] bg-arena sm:aspect-video lg:aspect-auto lg:max-h-none lg:min-h-[18rem] lg:flex-1 lg:rounded-[2.75rem]">
          <Image src="/inicio/apercu-cours-yoga-geneve.jpg" alt={t.foto} fill sizes="(min-width: 40rem) 100vw, 190vw" className="object-cover" />
          <span className="absolute inset-0 bg-verde/25" aria-hidden="true" />
          <span className="absolute top-1/2 left-1/2 grid h-[clamp(4.5rem,9vw,7rem)] w-[clamp(4.5rem,9vw,7rem)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-pagina/90" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="ml-[6%] h-[38%] w-[38%] fill-verde">
              <path d="M6 3.5v17L20.5 12z" />
            </svg>
          </span>
        </div>
        <div className="mt-[clamp(1.25rem,2.5vw,1.75rem)] flex flex-wrap items-start justify-between gap-x-10 gap-y-6 px-2 lg:px-0">
          <div>
            <h2 data-rise className="titre text-[clamp(2.4rem,4.6vw,3.6rem)]">
              {t.titulo}
            </h2>
            <p data-rise className="mt-3 max-w-[34rem] text-[1.15rem] leading-relaxed">
              {t.texto}
            </p>
          </div>
          <div data-rise>
            <Magnetique>
              <a className="boton" href={enlaceWhatsApp(MENSAJES[idioma].cours)} target="_blank" rel="noopener noreferrer">
                {t.boton}
              </a>
            </Magnetique>
          </div>
        </div>
      </RiseIn>
    </section>
  );
}
