// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL et BASE_PATH sont fournis par le workflow GitHub Actions
// (voir .github/workflows/deploy.yml). En local, on simule la même base
// que sur GitHub Pages pour repérer tout de suite les liens cassés.
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/veille-techno';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
