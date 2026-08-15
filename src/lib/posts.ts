import { getCollection, type CollectionEntry } from 'astro:content';

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
