// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// This is a GitHub Pages *project* site (org: semesterzero, repo: main-blog),
// not an org-root (semesterzero.github.io) site — base must stay '/main-blog/'
// unless the repo is renamed to semesterzero.github.io or a custom domain is added.
// https://astro.build/config
export default defineConfig({
  site: 'https://semesterzero.github.io/main-blog',
  base: '/main-blog/',
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
