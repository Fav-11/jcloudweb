import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/config/site.js';

export default defineConfig({
  site: siteConfig.siteUrl,
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
    prerenderEnvironment: 'node',
  }),
  integrations: [sitemap()],
  compressHTML: true,
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
