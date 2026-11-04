# Contributing to Sofia Yoga

## Setup

```sh
pnpm install   # also installs the git hooks
pnpm dev       # http://localhost:3010
```

In a clone that already had its dependencies, `pnpm install` does nothing and skips the hooks: run `pnpm run prepare`
once.

The WhatsApp buttons go to Sofia's real number. When testing, do not send the messages.

## Workflow

- `main` moves through a pull request, merged with **Rebase and merge**, so history stays linear and commits stay
  atomic. No direct pushes, no force-pushes to `main`. Sync with `git pull --rebase`.
- Branch from an up-to-date `main`: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`, `chore/<topic>`.
- Keep a PR to one subject. Screenshots help when the change is visual.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/), in English:

```
<type>(<optional scope>): <imperative description, lowercase, no final period>

<optional body: why the change was made>
```

- Types: `feat`, `fix`, `refactor`, `perf`, `docs`, `content` (site copy or images only), `chore`, `build`, `ci`.
- Header of 72 characters or fewer.
- Atomic: one logical change per commit. A change that touches two subjects is two commits.

Older commits are in Spanish and stay as they are; history is not rewritten.

## Language

- English: commits, PRs, branches, docs, new comments, script names and the identifiers of new modules.
- French, English and Spanish: what a visitor reads. A text change covers the three languages.
- Existing Spanish comments and identifiers can stay. A new name in an existing module follows that module's
  vocabulary, so one file does not mix two; rename when you rework the module as a whole.

## Gates

`git push` runs these through `.githooks/pre-push` and stops if any fails:

```sh
pnpm typecheck
pnpm react-doctor   # 100/100 with zero diagnostics, warnings included
pnpm lint
```

Before opening a PR, also run:

```sh
pnpm build
```

Fix findings in code. Do not silence them: no `react-doctor-disable`, no `doctor.config.*`, no `reactDoctor` key in
`package.json`, no `eslint-disable` of a gate rule. If a rule looks like a false positive, change the code in a way
that preserves behaviour, or raise it in the PR.

`git push --no-verify` is the only way past the hook, and it is for emergencies: say so in the PR.

react-doctor is pinned in `package.json`, so a new release cannot block a push by surprise. Bump it in its own PR,
along with whatever fixes the new version asks for.

## Content

- Never invent what Sofia has not confirmed (places, schedules, prices): use the «à confirmer» pill.
- Texts go through a native speaker before publishing.
- Health information carries its sources at the foot of the page.
