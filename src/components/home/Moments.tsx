import Image from "next/image";

// The photos, by their Pexels id (public/inicio/moments, README § photos): placeholders until Sofia's own arrive.
// Three to a column, and no photo twice
const PHOTOS = [
  [8436587, 7155543, 3822190],
  [8436725, 4457982, 8436586],
  [8436589, 7155545, 8957626],
  [8436727, 7055722, 3822167],
  [8436729, 7155544, 3822169],
  [8436728, 7055720, 8436730],
  [8436726, 7155546, 3822188],
  [8436590, 7055721, 8436588],
];
// each column is written twice over, so that it has no end as it goes round (.mur-colonne, globals.css)
const COPIES = [0, 1];

/**
 * Photos of classes, in the closing band between what her students say and the ask, laid out as on
 * lottiemurphy.com, with its measures (columns of 238 by 317 px photos, 24 px apart, in a strip 528 px tall):
 * each column goes round slowly on its own, one up and the next down, and the band's colour lies over the strip,
 * solid at its top and nearly clear at its foot, so the photos come out of the band. There are more columns
 * than a screen holds: the strip is cut at both sides. With reduced motion the columns stand still.
 *
 * The photos say nothing a reader needs, so the strip is hidden from a screen reader. They are placeholders: not
 * to be published as they are
 */
export function Moments({ titulo }: { titulo: string }) {
  return (
    <div>
      <div className="contenedor text-center">
        <h2 className="titre mx-auto max-w-[20ch] text-[clamp(2.4rem,4.6vw,3.6rem)] text-balance">{titulo}</h2>
      </div>
      <div className="relative mt-4 h-[clamp(22rem,36.8vw,33rem)] overflow-hidden" aria-hidden="true">
        <div className="mur flex justify-center gap-3 lg:gap-6">
          {PHOTOS.map((column) => (
            <div key={column[0]} className="w-[clamp(9.5rem,16.6vw,14.875rem)] shrink-0">
              <ul className="mur-colonne">
                {COPIES.map((copy) =>
                  column.map((id) => (
                    <li key={`${copy}-${id}`} className="mb-3 lg:mb-6">
                      <Image src={`/inicio/moments/${id}.jpg`} alt="" width={520} height={693} sizes="(min-width: 64rem) 15rem, 10rem" className="aspect-[3/4] w-full rounded-[0.5rem] object-cover" />
                    </li>
                  )),
                )}
              </ul>
            </div>
          ))}
        </div>
        <span className="pointer-events-none absolute inset-0 bg-linear-to-b from-verde via-verde/90 via-30% to-verde/24" />
      </div>
    </div>
  );
}
