// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [preact()],

  vite: {
    plugins: [tailwindcss()],
    define: {
      // Define globals for Cloudflare Workers compatibility
      'global': 'globalThis'
    }
  }
});