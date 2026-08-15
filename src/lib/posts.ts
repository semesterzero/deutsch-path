import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LANGUAGE, type Language } from './constants';

type Post = CollectionEntry<'posts'>;

// Every listing page wants the same thing: non-draft posts, optionally
// narrowed further, newest first. Centralized here so index/stage/
// university/intake pages (and RSS/sitemap later) don't each reimplement
// the filter + sort.
export async function getSortedPosts(filter?: (post: Post) => boolean): Promise<Post[]> {
  const posts = await getCollection('posts', (post) => !post.data.draft && (!filter || filter(post)));
  return sortPostsByDateDesc(posts);
}

// Exported separately for pages that already have a specific post array
// (e.g. one group from getStaticPaths) and just need it ordered.
export function sortPostsByDateDesc(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// A post's `translationGroup` is optional — when unset, the post's own slug
// *is* the group. Only translations need to set it explicitly, pointing at
// the primary post's slug.
export function translationGroupOf(post: Post): string {
  return post.data.translationGroup ?? post.id;
}

// Collapses a translation group down to one representative post — the one
// a listing (post cards, RSS) should show, since a translation is the same
// story, not a second story. Prefers DEFAULT_LANGUAGE, falling back to
// whichever language exists.
//
// Guards against two posts in the same group claiming the same language —
// this can't be expressed as a per-entry Zod check (content collection
// schemas only see one file at a time), so it's enforced here instead; it
// still fails the build, just via a thrown error rather than a schema
// message.
export function dedupeByTranslationGroup(posts: Post[], preferredLang: Language = DEFAULT_LANGUAGE): Post[] {
  const groups = new Map<string, Post[]>();
  for (const post of posts) {
    const key = translationGroupOf(post);
    const existing = groups.get(key);
    if (existing) existing.push(post);
    else groups.set(key, [post]);
  }

  const representatives: Post[] = [];
  for (const [key, group] of groups) {
    const seenLangs = new Set<Language>();
    for (const post of group) {
      if (seenLangs.has(post.data.lang)) {
        throw new Error(
          `Duplicate translation: multiple posts share translationGroup "${key}" and lang "${post.data.lang}" ` +
            `(one of them is "${post.id}"). Each language in a translation group must appear at most once.`
        );
      }
      seenLangs.add(post.data.lang);
    }
    representatives.push(group.find((post) => post.data.lang === preferredLang) ?? group[0]);
  }

  return sortPostsByDateDesc(representatives);
}

// Given a representative post and the full (un-deduped) post list it came
// from, finds its sibling language versions — for the "Also in: DE/EN" link
// on both the post page and the listing card.
export function getTranslations(post: Post, allPosts: Post[]): { lang: Language; slug: string }[] {
  const key = translationGroupOf(post);
  return allPosts
    .filter((p) => p.id !== post.id && translationGroupOf(p) === key)
    .map((p) => ({ lang: p.data.lang, slug: p.id }));
}
