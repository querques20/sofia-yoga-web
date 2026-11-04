# Sofia Yoga

Test version of the website for Sofia Costa, a yoga teacher in Geneva: prenatal yoga, postnatal yoga and dynamic yoga classes. The site is in French, English and Spanish.

As a test version:

- Anything Sofia has not confirmed yet (places, schedules, prices…) shows the «à confirmer» pill.
- Texts need a native speaker's review before publishing.
- Health information carries its sources at the foot of each page.

## Pages

French is the base language and has no URL prefix. English and Spanish live under `/en` and `/es`, with their own slugs.

| Route | Content |
| --- | --- |
| `/` | Home: the flower intro that opens into six photos (one door to each page), the program by trimester and the word strip |
| `/yoga-prenatal-geneve` | Prenatal yoga: the breathing pregnant figure, before you come, signs to stop, trimester by trimester |
| `/yoga-post-partum-geneve` | Postnatal yoga: when to return, what insurance covers in Switzerland, pelvic floor and diastasis |
| `/cours-de-yoga-geneve` | Classes: the styles, what yoga brings, in a group, private or in the park |
| `/cours-prives-yoga-geneve` | Private classes: why a private class, and its practical info |
| `/ateliers-evenements` | Workshops: the ticket for the next workshop |
| `/a-propos` | Her story, how she teaches and her training |
| `/contact` | A message builder for WhatsApp or email |

## The home photos

Each of the six doors on the home page carries a photo (`public/inicio/`). Sofia has no professional photos yet: two are hers, from her Instagram, and four are placeholders.

| Door | File | Source | Status |
| --- | --- | --- | --- |
| Cours privés | `cours-prives-geneve.jpg` | Instagram @sofia.yogaflow, cover of a video from May 2024 (360 × 640) | Sofia's. Ask her for the original |
| Au parc | `yoga-au-parc-geneve.jpg` | Instagram @sofia.yogaflow, photo from March 2024 (512 × 640) | Sofia's. Ask her for the original |
| Yoga prénatal | `yoga-prenatal-geneve.jpg` | Unsplash `photo-1710897872898-3bc4353682ce` | Placeholder |
| Post-partum | `yoga-post-partum-geneve.jpg` | Unsplash `photo-1773243086577-5a98bc868a2f` | Placeholder |
| Cours en groupe | `cours-en-groupe-geneve.jpg` | Unsplash `photo-1761035005546-62b8018b212a` | Placeholder |
| Ateliers | `ateliers-yoga-geneve.jpg` | Unsplash `photo-1643682661119-28da0685be2c` | Placeholder |

The placeholders (Unsplash license, free to use) are marked `provisoria: true` in `src/components/hero/puertas.ts` and get replaced by Sofia's photos as soon as they arrive. The site does not go to production with them without deciding so first.

## Running it

```bash
pnpm install
pnpm dev        # http://localhost:3010
pnpm build
pnpm test       # the intro and home geometry tests (node:test)
```

The WhatsApp buttons go to Sofia's real number. When testing, do not send the messages.

To contribute, see [CONTRIBUTING.md](CONTRIBUTING.md).

## How it is built

- Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.
- GSAP (ScrollTrigger, SplitText, DrawSVG and MorphSVG) for animation and Lenis for smooth scrolling.
- With the system's "reduce motion" setting on, everything renders without animation.
- Each block lives on one page only: the nav and the footer are the only things repeated everywhere. Practical info and the frequently asked questions sit with their class, and contact has its own page.

Folders:

- `src/app`: the pages and the layout.
- `src/components`: the sections, one folder per page. `pagina/` holds the shared pieces and `ilustraciones/` the SVG drawings.
- `src/lib`: the breathing that sets the site's rhythm, contact details and navigation.
- `scripts`: `install-hooks.mjs` installs the git hooks.

The typefaces (D-DIN and Caveat) are free to use (SIL OFL) and live in `src/app/fonts` with their licenses.
