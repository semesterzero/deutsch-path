import { REPO_URL } from './constants';

// This template must stay in sync with the one in CONTRIBUTING.md — both
// document the same schema, just in two forms (readable doc vs. prefilled
// link). Dates are left as placeholders rather than today's date: this URL
// is baked into static HTML at build/deploy time, so an actual date would
// silently go stale between deploys.
const POST_TEMPLATE = `---
title: "A short, specific title"
description: "One or two sentences, 40-160 characters."
type: experience              # experience | guide
stage: visa                   # applying | admission | visa | arrival | studying | working | general
date: YYYY-MM-DD
lastVerified: YYYY-MM-DD      # when you last checked the facts in this post
author: your-author-slug      # must match a file in content/authors/
lang: en                      # en | de — omit for English, the default
university: TU Berlin         # experience only — omit for guide
city: Berlin                  # experience only — omit for guide
intake: WS25                  # experience only — omit for guide; format WS|SS + 2 digits
tags: [vfs, documents]        # up to 5, from the tags list in src/lib/constants.ts
draft: false
---

Your post body in markdown.
`;

// A GitHub "create new file" deep link, prefilled with the frontmatter
// template — so writing a post doesn't require knowing the schema by heart
// or touching git locally. See CONTRIBUTING.md for the full walkthrough.
export function newPostGitHubUrl(): string {
  const params = new URLSearchParams({
    filename: 'content/posts/your-post-title-kebab-case.md',
    value: POST_TEMPLATE,
  });
  return `${REPO_URL}/new/main?${params.toString()}`;
}
