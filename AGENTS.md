# Sofia Yoga

Website for Sofia Costa, a yoga teacher in Geneva: prenatal, postnatal and dynamic yoga classes, in French
(the base language, no URL prefix), English and Spanish. It is still a test version. Next.js 16 App Router,
React 19, TypeScript, Tailwind CSS v4, GSAP and Lenis; every route is prerendered.

## Commands

- `pnpm dev` serves on http://localhost:3010; `pnpm build` is the production build.
- `pnpm typecheck`, `pnpm lint`, `pnpm react-doctor`: the gate `.githooks/pre-push` runs. `pnpm install` installs it.

## Hard constraints

- The gate stays green: react-doctor at 100/100 with zero diagnostics. Fix findings in code. No `react-doctor-disable`,
  no `doctor.config.*`, no `reactDoctor` key in `package.json`, no `eslint-disable` of a gate rule.
- Commits, PRs, docs, comments and scripts are in English (`CONTRIBUTING.md`). Site copy is in French, English and
  Spanish, and every text change covers the three. Existing Spanish code stays until the code around it changes.
- Never invent what Sofia has not confirmed (places, schedules, prices): it shows the «à confirmer» pill. Texts need
  a native speaker's review before publishing, and health information cites its sources at the foot of the page.

## Gotchas

- The WhatsApp buttons go to Sofia's real number. When testing, do not send the messages.
- The mobile menu must not use `showModal()`: the top layer would paint it above the language curtain
  (`Entrada`, `z-[70]`). Its focus trap, Escape and inert background are hand-written for that reason.
- GSAP absorbs the CSS `translate` property of whatever it animates (it sets it to `none` and moves the pixels into
  `transform`). Centre with `translate` on a wrapper and animate an inner element, as the home's `.puerta-cuerpo` does.
- `next dev` rewrites the block below. Commit it as it comes.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
