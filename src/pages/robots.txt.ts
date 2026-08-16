import type { APIRoute } from 'astro';
import { withBase } from '../lib/url';

// Generated so the Sitemap line always matches `site`/`base` in
// astro.config.mjs instead of drifting from a hand-maintained
// public/robots.txt. `site` (unlike `Astro.site` in .astro pages) does NOT
// include `base`, so paths are built through withBase() first.
export const GET: APIRoute = ({ site }) => {
  const body = `User-agent: *
Allow: /
Disallow: ${withBase('/search')}

Sitemap: ${new URL(withBase('/sitemap-index.xml'), site).href}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
