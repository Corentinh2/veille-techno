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
  // Politique de sécurité du contenu : Astro ajoute une balise CSP avec
  // l'empreinte de chaque script et style légitime ; tout code injecté est bloqué.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
      styleDirective: {
        resources: [
          "'self'",
          // Couleurs des blocs de code (attributs style générés par Shiki) :
          // n'autorise que des attributs de style, jamais de script.
          { resource: "'unsafe-inline'", kind: 'attribute' },
        ],
      },
    },
  },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
