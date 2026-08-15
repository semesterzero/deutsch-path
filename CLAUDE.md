# CLAUDE.md

Instructions for Claude Code working in this repository.

## What this is

**Semester Zero** — an open-source blog where Indian students share real experiences of
moving to Germany for a Master's. Applications, APS, visa appointments, blocked accounts,
arrival, studying, working.

Repo: `github.com/semesterzero/<repo>`

The site is static. No database, no backend, no auth. Content is markdown in git.

**Current stage:** single maintainer writing all posts. Every decision should keep the
door open for outside contributors later without requiring a rewrite. Prefer boring,
conventional solutions over clever ones.

## Stack

- **Astro** — static site generator, content collections for schema validation
- **GitHub Pages** — hosting, deployed from GitHub Actions (no external service)
- **GitHub Actions** — validates every PR, builds and deploys every push to `main`

Everything runs inside GitHub. There is no third-party hosting account, no external
dashboard, and no deploy step that happens outside this repo.

Do not add a framework (React/Vue/Svelte) unless a feature genuinely requires client-side
interactivity. Most of this site is static HTML and should stay that way.

## Structure

```
/content
  /posts        # all articles, flat, kebab-case filenames
  /authors      # one file per author, incl. pseudonyms
/src
  /layouts
  /components
  /pages
  content.config.ts   # THE schema — source of truth for frontmatter
/.github
  workflows/ci.yml       # PR: validate + build, no deploy
  workflows/deploy.yml   # push to main: build + publish to GitHub Pages
  pull_request_template.md
CONTRIBUTING.md
```

## Content model

Two post types. This distinction drives most of the site.

### `experience`
A personal account, anchored to a specific time and place. Requires `university`,
`city`, and `intake`. Ages fast — always shows a freshness banner once stale.

### `guide`
General reference, not tied to one person's application. No university/intake fields.
Should be updated in place rather than superseded by new posts.

Both types use the same `stage` taxonomy, which is the primary navigation:

`applying` → `admission` → `visa` → `arrival` → `studying` → `working` → `general`

`general` exists for posts that don't fit the journey (cost of living, culture,
language learning, opinion pieces). Do not force a post into a stage it doesn't belong in.

### Frontmatter

```yaml
---
title: "VFS Mumbai visa appointment, start to finish"
description: "What actually happened, what I over-prepared for."   # 40-160 chars
type: experience              # experience | guide
stage: visa
date: 2026-08-14
lastVerified: 2026-08-14      # when facts were last checked
author: anon-mumbai-ws25      # must match a file in /content/authors
university: TU Berlin         # experience only
city: Berlin                  # experience only
intake: WS25                  # experience only, format WS|SS + 2 digits
tags: [vfs, documents]        # max 5, from tags allowlist
draft: false
---
```

Enforce all of this in `src/content.config.ts` with Zod. Use `superRefine` so that
`type: experience` requires the university/city/intake fields and `type: guide` rejects
them. A malformed post must fail the build with a message naming the file — never
silently publish.

Keep categorical values (stages, universities, cities, tags) in a single exported
constants file so pages, filters, and validation all read from one list.

## Content rules

**Freshness.** If `lastVerified` is more than 12 months old, the layout shows a banner
warning that rules may have changed. This is automatic — never rely on authors to add it.
Visa requirements, blocked account minimums, and APS fees all change yearly.

**No advice framing.** These are personal experiences, not immigration or legal advice.
A standing disclaimer lives in the post layout. Do not write copy that tells readers what
they should do, what they are eligible for, or what will happen in their case.

**Anonymity.** Authors may use a pseudonym; the author file carries the display name and
the real identity is never stored in the repo. Be aware and remind the maintainer when
relevant: a PR permanently links a GitHub account to the commit. For genuinely sensitive
posts, the maintainer commits on the author's behalf. Never add tooling that surfaces
GitHub usernames next to pseudonymous bylines.

**No scraped content.** Do not copy text from university sites, forums, Reddit, or
Telegram groups into posts. Link out instead.

**Never invent facts.** Fees, deadlines, document lists, and processing times must come
from the author or an official source that is linked. If a number can't be verified,
leave it out and flag it to the maintainer rather than guessing.

## Commands

```bash
npm run dev        # local dev server
npm run build      # production build — must pass before any PR merges
npm run preview    # serve dist/ locally, exactly as it will be published
npx astro check    # schema + type validation
```

## Deployment

The site is built and published by GitHub Actions to GitHub Pages. The build output
(`dist/`) is **never committed** — it is produced fresh by CI on every push to `main`.
There is no `gh-pages` branch to maintain and no manual deploy step.

### Two workflows, separate jobs

**`ci.yml`** — runs on `pull_request`. Installs, runs `astro check`, runs `npm run build`,
runs the link check. Never deploys. This is the gate: a PR that fails here does not merge.

**`deploy.yml`** — runs on `push` to `main` and on `workflow_dispatch`. Builds, uploads
`dist/` as a Pages artifact, deploys. Must use:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false
```

with `actions/configure-pages`, `actions/upload-pages-artifact` (path `./dist`), and
`actions/deploy-pages`. Do not use a third-party publish action or push to a branch —
the artifact flow is the supported path and needs no tokens or secrets.

In repo settings, **Pages → Source must be set to "GitHub Actions"**, not "Deploy from a
branch". If deploys aren't appearing, check this first.

### URL and base path — get this right early

Astro must know its final URL at build time or every asset and internal link breaks.
Set both in `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://semesterzero.github.io',
  base: '/',
});
```

**Strongly prefer naming the repo `semesterzero.github.io`.** It publishes at the org root,
`base` stays `/`, and you avoid an entire category of broken-path bugs. If the repo has any
other name the site lives at `/<repo-name>/`, `base` must be set to match, and every
internal link and asset reference must go through Astro's `base` — hardcoded absolute paths
like `/posts/foo` will silently 404 in production while working fine in dev.

If a custom domain is added later, set `site` to that domain, set `base` back to `/`, and
commit a `public/CNAME` file containing the domain.

### Constraints to design around

- **Public repos only** on the free tier. Private-repo Pages needs a paid plan. This repo
  is public, so this is fine — but never commit anything that shouldn't be world-readable.
- **Soft limits**: ~1GB published site, ~10 builds/hour, 100GB/month bandwidth. A markdown
  blog will not approach these. Keeping images under 300KB keeps it that way.
- **Static only.** No server, no redirects file, no edge functions. Anything dynamic must
  be client-side JS or a third-party service.
- **Custom 404** comes from `src/pages/404.astro`, which Astro emits as `404.html`.
  GitHub Pages picks this up automatically.

### No PR previews — compensate for it

GitHub Pages has no per-PR preview URL. Since reviewers can't see rendered output before
merge, `ci.yml` should upload `dist/` as a build artifact (`actions/upload-artifact`) so a
reviewer can download and open it locally. Combined with `npm run preview`, that covers
most of the gap. Do not add a preview-deploy service without asking.

## Working in this repo

**Do:**
- Read `src/content.config.ts` before touching anything content-shaped
- Add new categorical values to the constants file, not inline in components
- Keep pages server-rendered at build time; prefer CSS over JS
- Write semantic HTML — this site should work perfectly with JS disabled
- Make filter pages (`/university/[slug]`, `/intake/[slug]`, `/stage/[slug]`) generated
  from the collection, never hand-maintained

**Don't:**
- Add dependencies without asking — every one is a maintenance cost for a solo maintainer
- Add analytics, trackers, or third-party embeds without explicit approval
- Restructure `/content` — filenames and paths are permanent URLs
- Commit images over 300KB; convert to WebP and resize first
- Edit published posts' facts on your own initiative; propose changes instead

## Contribution paths

Three, in order of what exists today:

1. **Pull request** — the default. Fork, add a markdown file, open a PR.
2. **Browser editing** — same thing via GitHub's web UI. Provide prefilled
   `github.com/.../new/main/content/posts?filename=&value=` links so contributors never
   touch git locally. Keep the frontmatter template short enough to fill in by hand.
3. **No-git intake** — not built yet. When needed, add Decap CMS (`/admin`), which commits
   to this repo behind a WYSIWYG editor. Until then, sensitive or non-technical
   submissions go to the maintainer, who commits them.

Keep the frontmatter schema simple enough that a person can write it by hand in a browser.
If a field is too fiddly to type manually, it's too fiddly.

## Roadmap

Build in this order. Do not skip ahead.

- **v1** — schema, post layout, stage nav, filter pages, freshness banner, `ci.yml`,
  `deploy.yml`, live on GitHub Pages
- **v2** — RSS, sitemap, search (Pagefind), `CONTRIBUTING.md`, PR template, prefilled
  "write a post" links
- **v3** — comments (giscus, GitHub Discussions), Decap CMS, author pages

Note on giscus: it requires commenters to have GitHub accounts, which sits awkwardly with
an audience that values anonymity. Raise this before implementing.

## Licensing

Code is MIT. Content is CC BY 4.0 — authors keep copyright and grant publishing rights.
State this in the README and `CONTRIBUTING.md`. Do not accept content whose license is
unclear.
