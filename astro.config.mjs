import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://peregrinesys.com',
  // Marketing pages stay statically prerendered (served from Vercel's CDN edge).
  // /api/contact opts out via `export const prerender = false` and is built into a
  // Vercel serverless function automatically.
  adapter: vercel(),
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
