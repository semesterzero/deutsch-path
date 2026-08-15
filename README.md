# Deutsch Path

A [Semester Zero](https://github.com/semesterzero) project.

**Live site:** https://semesterzero.github.io/deutsch-path/

## What this is

Applying to a German Master's program mostly means piecing together the real
process from scattered forum threads, Telegram groups, and outdated blog
posts — most of it either official-but-vague or detailed-but-unverifiable.
Deutsch Path is a single place for **first-hand accounts** of that process,
written by the people who actually went through it: what the VFS appointment
was actually like, what the TU Dresden admission portal actually asked for,
what a blocked account actually costs to open.

It's not a wiki and it's not a forum. Every post has a named (or
pseudonymous) author standing behind it, a date, and a note on when the facts
were last checked — so readers can tell how current something is instead of
guessing.

## Who it's for

- **Indian students at any stage** of moving to Germany for a Master's —
  from still deciding where to apply, through visa and blocked account
  paperwork, to already there and figuring out housing, part-time work, or
  everyday life.
- **People who've already been through it** and want to write down what
  actually happened for the next batch of applicants — which is also how the
  site grows. See [CONTRIBUTING.md](CONTRIBUTING.md).

It is explicitly **not** immigration or legal advice, and doesn't claim to
be — every post carries that disclaimer, because the point is "here's what
happened to me," not "here's what you should do."

## What belongs here

Two kinds of posts, both organized under a shared stage taxonomy
(`applying → admission → visa → arrival → studying → working`, plus
`general` for anything that doesn't fit that timeline — cost of living,
culture, language learning):

- **Experience posts** — a personal account anchored to a specific
  university, city, and intake. Ages fast on purpose: visa rules and fees
  change yearly, so these carry a freshness banner once a year old.
- **Guides** — general reference not tied to one person's application
  (e.g. "cost of living in Dresden"). Updated in place as facts change,
  rather than replaced by a new post.

What doesn't belong: content copied from university sites, forums, or
Telegram groups (link out instead); fees, deadlines, or document lists that
can't be traced back to the author's own experience or a linked official
source; and anything written as advice rather than an account of what
happened. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full content rules.

## Stack

- [Astro](https://astro.build) — static site generator, content collections
  for schema-validated frontmatter
- [GitHub Pages](https://pages.github.com) — hosting
- GitHub Actions — validates every PR, builds and deploys every push to `main`

The site is fully static: no database, no backend, no auth. All content is
markdown, versioned in this repo.

## Local development

Requires Node (see `.nvmrc`) and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm run dev        # local dev server
pnpm run build      # production build — must pass before any PR merges
pnpm run preview    # serve dist/ locally, exactly as it will be published
pnpm run check      # schema + type validation (astro check)
```

## Project structure

```
/content
  /posts        # all articles, flat, kebab-case filenames — one per post
  /authors      # one file per author, including pseudonyms
/src
  /layouts      # BaseLayout, PostLayout
  /components   # StageNav, PostCard, FreshnessBanner, Disclaimer
  /pages        # routes, including generated filter pages
  /lib
    constants.ts       # stages, universities, cities, tags, languages — single source of truth
  content.config.ts     # the frontmatter schema — source of truth for what a post needs
/.github/workflows       # ci.yml (PR checks), deploy.yml (publish to Pages)
```

## Contributing

Writing a post, fixing a fact, or adding a university/city to the taxonomy —
see [CONTRIBUTING.md](CONTRIBUTING.md).

## Licensing

Code is licensed [MIT](LICENSE). Content under `/content` (posts and author
files) is licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/):
authors keep copyright and grant this project publishing rights. See
[CONTRIBUTING.md](CONTRIBUTING.md#licensing) for details.

## Roadmap

- **v1** (current): schema, post layout, stage nav, filter pages, freshness
  banner, CI, deploy, live on GitHub Pages; basic multilingual support in the
  schema (`lang` field, no per-language routing yet)
- **v2**: RSS, sitemap, search, prefilled "write a post" links
- **v3**: comments, no-git submission intake, author pages
