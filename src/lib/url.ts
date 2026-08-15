// Every internal link must go through this so the site keeps working
// whichever `base` astro.config.mjs is set to (project site today, could
// change to an org-root or custom domain later).
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, '')}`;
}

// Turns a display value like "TU Berlin" into a URL-safe slug like "tu-berlin".
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
