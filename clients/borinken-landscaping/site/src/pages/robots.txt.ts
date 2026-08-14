import type { APIRoute } from 'astro';

// Build-time endpoint, not a static file — the sitemap URL always matches
// the real astro.config `site`, so it can never go stale after a
// per-client domain change.
export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapURL.href}\n`, {
    headers: { 'Content-Type': 'text/plain' },
  });
};
