# Contributing to Deutsch Path

Thanks for wanting to share your experience or improve a guide. Deutsch Path
is a [Semester Zero](https://github.com/semesterzero) project, and it runs
on personal accounts from real people — that's the whole point.

## Ways to contribute

1. **Pull request (the default path).** Fork this repo, add a markdown file
   under `content/posts/`, open a PR. Use the checklist in the PR template.
2. **Browser editing.** You can do the same thing through GitHub's web UI, no
   git required. The **"Write a post"** link in the site's nav opens GitHub's
   new-file editor with the frontmatter template already filled in — fill in
   your details and open a PR straight from the browser. (You can also do
   this manually: browse to `content/posts/`, click "Add file" → "Create new
   file", and paste in the template below.)
3. **No-git intake.** Not built yet. If you'd rather not use GitHub at all, or
   your post is sensitive, contact the maintainer directly and they can commit
   it on your behalf.

## A note on anonymity

You can write under a pseudonym — see the `author` frontmatter field and
`content/authors/`. Your author file only needs a display name (and optional
bio); your real identity is never stored in this repo.

One thing to know: **opening a PR from your own GitHub account permanently
links that account to the commit**, even if your byline is a pseudonym. If
that matters to you, use the browser-editing path with a throwaway account,
or ask the maintainer to commit on your behalf.

## Writing a post

Copy this frontmatter template into a new file under `content/posts/`,
named `your-post-title-kebab-case.md` (the filename becomes the permanent
URL, so pick it carefully):

```yaml
---
title: "A short, specific title"
description: "One or two sentences, 40-160 characters."
type: experience              # experience | guide
stage: visa                   # applying | admission | visa | arrival | studying | working | general
date: 2026-08-14
lastVerified: 2026-08-14      # when you last checked the facts in this post
author: your-author-slug      # must match a file in content/authors/
lang: en                      # en | de — omit for English, the default
university: TU Berlin         # experience only — omit for guide
city: Berlin                  # experience only — omit for guide
intake: WS25                  # experience only — omit for guide; format WS|SS + 2 digits
tags: [vfs, documents]        # up to 5, from the tags list in src/lib/constants.ts
draft: false
---

Your post body in markdown.
```

`type: experience` is a personal account anchored to a specific university,
city, and intake — it requires those three fields. `type: guide` is general
reference not tied to one person's application — it must leave them out.

If you don't already have an author file, add one to `content/authors/` first:

```yaml
---
displayName: "How you want to be credited"
bio: "Optional, one line."
---
```

### Adding a new university, city, or tag

Frontmatter values for `university`, `city`, and `tags` are validated against
allowlists in `src/lib/constants.ts`. If the build fails because your value
isn't recognized, add it there — don't work around it by leaving the field
free text.

## Writing a multilingual post

Every post defaults to English (`lang: en`). A translation is **not** a new
story — it's another version of the same one. The site treats it that way
too: a post with a translation shows up once in every listing, with a small
language switch on the card, not as two separate posts.

To add a translation of an existing post:

1. Find the original post's filename, e.g.
   `content/posts/vfs-chennai-visa-appointment.md`. You don't need to add
   anything to it — an untranslated (or primary) post needs no
   `translationGroup` at all; the site treats its own filename as its group.
2. Create the translated file with a language-suffixed filename, e.g.
   `content/posts/vfs-chennai-visa-appointment-de.md`, and set:

   ```yaml
   lang: de                                          # currently en | de
   translationGroup: vfs-chennai-visa-appointment    # the ORIGINAL post's filename, without .md
   ```

3. Keep everything else in the frontmatter (`type`, `stage`, `university`,
   `city`, `intake`, `tags`, `author`) the same as the original — only
   `title`, `description`, `lang`, and the body are translated.

That's the only rule: **`translationGroup` on a translation must exactly
match the original post's filename.** The build fails with a clear error if
two posts in the same group ever claim the same `lang`.

A post doesn't need a translation to be published — most won't have one.
Add one when a translation actually exists and is accurate, not as a
placeholder.

Currently only `en` and `de` are supported (see `LANGUAGES` in
`src/lib/constants.ts`) — add a new language there first if you need one.
There's no site-wide language switcher; the rest of the UI (nav, labels)
stays in English regardless of a post's language — only the post itself
switches.

## Content rules

- **Freshness.** Keep `lastVerified` accurate. If you're updating a post
  because something changed, bump the date — don't leave stale facts under a
  fresh-looking `date`.
- **No advice framing.** Write about what happened to you, not what a reader
  should do or is eligible for. Every post already carries a standing
  disclaimer — you don't need to add your own.
- **No scraped content.** Don't copy text from university sites, forums,
  Reddit, or Telegram groups. Link out instead.
- **Never invent facts.** Fees, deadlines, document lists, and processing
  times must come from your own experience or a linked official source. If
  you can't verify a number, leave it out rather than guess, and flag it to
  the maintainer.

## Before opening a PR

- [ ] `pnpm run check` passes
- [ ] `pnpm run build` passes
- [ ] Images are under 300KB and in WebP format
- [ ] New categorical values were added to `src/lib/constants.ts`, not left
      as ad hoc text

## Licensing

By contributing content, you keep copyright and grant this project a
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license to publish
it. By contributing code, you agree it's licensed [MIT](LICENSE). If you're
not sure your content's underlying source material is clear to publish under
these terms, ask before submitting.
