import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Domain ownership was never confirmed (intake Q3 unanswered) — this is a
// plausible placeholder for a working sitemap/canonicals in this dummy
// build, NOT a confirmed real domain. Must be replaced with the operator's
// actual domain before any real launch.
export default defineConfig({
  site: 'https://cleanlabbyez.com',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
