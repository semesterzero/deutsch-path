import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { dedupeByTranslationGroup, getSortedPosts } from '../lib/posts';
import { withBase } from '../lib/url';

export async function GET(context: APIContext) {
  // Same dedupe as the on-site listings — a translation is the same story,
  // not a second feed entry.
  const posts = dedupeByTranslationGroup(await getSortedPosts());

  return rss({
    title: 'Deutsch Path',
    description: "Real experiences of moving from India to Germany for a Master's.",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: withBase(`/posts/${post.id}/`),
    })),
  });
}
