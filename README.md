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
| `/` | Home: the flower intro, the breathing pregnant figure, the program by trimester |
| `/yoga-prenatal-geneve` | Prenatal yoga: before you come, signs to stop, trimester by trimester |
| `/yoga-post-partum-geneve` | Postnatal yoga: when to return, what insurance covers in Switzerland, pelvic floor and diastasis |
| `/cours-de-yoga-geneve` | Classes: the styles, what yoga brings, in a group, private or in the park |
| `/cours-prives-yoga-geneve` | Private classes |
| `/ateliers-evenements` | Workshops: the ticket for the next workshop |
| `/a-propos` | Her story, how she teaches and her training |
| `/faq` | Frequently asked questions |
| `/contact` | A message builder for WhatsApp or email |

## Running it

```bash
pnpm install
pnpm dev        # http://localhost:3010
pnpm build
```

The WhatsApp buttons go to Sofia's real number. When testing, do not send the messages.

To contribute, see [CONTRIBUTING.md](CONTRIBUTING.md).

## How it is built

- Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.
- GSAP (ScrollTrigger, SplitText, DrawSVG and MorphSVG) for animation and Lenis for smooth scrolling.
- With the system's "reduce motion" setting on, everything renders without animation.

Folders:

- `src/app`: the pages and the layout.
- `src/components`: the sections, one folder per page. `pagina/` holds the shared pieces and `ilustraciones/` the SVG drawings.
- `src/lib`: the breathing that sets the site's rhythm, contact details and navigation.
- `scripts`: `regenerar-ilustraciones.mjs` builds the standalone drawings for «Par où commencer» (`public/ilustraciones`) from the components, with the dev server running. Those SVGs are not edited by hand. `install-hooks.mjs` installs the git hooks.

The typefaces (D-DIN and Caveat) are free to use (SIL OFL) and live in `src/app/fonts` with their licenses.
