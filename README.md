# Semester Zero

An open-source blog where Indian students share real experiences of moving to
Germany for a Master's: applications, APS, visa appointments, blocked
accounts, arrival, studying, working.

These are personal accounts, not immigration or legal advice. See the
disclaimer on every post.

**Live site:** https://semesterzero.github.io/main-blog/

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
    constants.ts       # stages, universities, cities, tags — single source of truth
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
  banner, CI, deploy, live on GitHub Pages
- **v2**: RSS, sitemap, search, prefilled "write a post" links
- **v3**: comments, no-git submission intake, author pages
