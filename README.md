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
| `/` | Home: the flower intro that opens into six photos (one door to each page), the program by trimester, where to start, Sofia's invitation, the practical info, the place for testimonials, how to write to her and the word strip |
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
pnpm test       # node:test: the intro and home geometry, the admin's rules, the packages
```

The WhatsApp buttons go to Sofia's real number. When testing, do not send the messages.

To contribute, see [CONTRIBUTING.md](CONTRIBUTING.md).

## The admin

`/admin` is the private side: sign-in, accounts with three roles (`dirige`, `administra`, `edita`), invitations, each
person's own account and the activity log. It does not edit the site's content yet; that is built on top. Its
interface is in Spanish, and it has its own stylesheet (`src/app/(admin)/admin.css`) with Sofia's palette and
typefaces, in three themes.

The public site builds and runs without it. The admin needs a database and the variables of `.env.example`:

```bash
cp .env.example .env.local                      # fill in DATABASE_URL and BETTER_AUTH_SECRET
docker compose -f compose.dev.yaml up -d        # Postgres on localhost:5434
pnpm migrate:deploy                             # creates the tables
pnpm create-account you@example.com "Your Name" dirige
```

Then open `/admin/olvide-mi-contrasena` and ask for the link to choose a password. Without a Resend key, every email
(that link, and the sign-in code) is printed on the dev server's console instead of being sent. There is no public
sign-up: an account exists because someone who runs the admin invited it, or because of the command above.

The admin came from the Empoderamiento Docente project (commit `ecc6c7f0`): the three packages and the access,
accounts and activity screens, without that project's own modules.

## How it is built

- Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.
- GSAP (ScrollTrigger, SplitText, DrawSVG and MorphSVG) for animation and Lenis for smooth scrolling.
- With the system's "reduce motion" setting on, everything renders without animation.
- Each block lives on one page only: the nav and the footer are the only things repeated everywhere. Practical info and the frequently asked questions sit with their class, and contact has its own page.

Folders:

- `src/app`: the pages and the layout.
- `src/components`: the sections, one folder per page. `pagina/` holds the shared pieces and `ilustraciones/` the SVG drawings.
- `src/lib`: the breathing that sets the site's rhythm, contact details and navigation.
- `src/app/(admin)`, `src/admin`, `src/datos`, `src/correos`: the admin's routes, screens, data layer and emails.
- `packages`: `auth` (sessions, roles and permissions), `db` (the Prisma client) and `kit-admin` (the admin's controls).
- `prisma`: the schema and its migrations.
- `scripts`: `install-hooks.mjs` installs the git hooks; `create-account.mts` and `appoint-director.mts` are the
  admin's two command-line doors.

The typefaces (D-DIN and Caveat) are free to use (SIL OFL) and live in `src/app/fonts` with their licenses.
