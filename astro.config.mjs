// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// This is a GitHub Pages *project* site (org: semesterzero, repo: deutsch-path),
// not an org-root (semesterzero.github.io) site — base must stay '/deutsch-path/'
// unless the repo is renamed to semesterzero.github.io or a custom domain is added.
// https://astro.build/config
export default defineConfig({
  site: 'https://semesterzero.github.io/deutsch-path',
  base: '/deutsch-path/',
  integrations: [
    icon(),
    sitemap({
      filter: (page) => !page.includes('/search'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
