import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import {
  ACTION_TYPES,
  CATEGORIES,
  IMPORTANCES,
  IMPORTANCE_META,
  importanceFromTotal,
  scoreTotal,
} from './lib/veille';

const note = z.number().int().min(0).max(5);

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z
    .object({
      title: z.string().min(5),
      date: z.coerce.date(),
      summary: z.string().min(40).max(600),
      category: z.enum(CATEGORIES),
      importance: z.enum(IMPORTANCES),
      // Détail de la note sur 20 : 4 critères notés de 0 à 5.
      score: z.object({
        impact: note,
        urgence: note,
        perimetre: note,
        pertinence: note,
      }),
      actions: z
        .array(
          z.object({
            type: z.enum(ACTION_TYPES),
            detail: z.string().min(3),
          }),
        )
        .min(1),
      sources: z
        .array(
          z.object({
            title: z.string().min(2),
            url: z.url(),
          }),
        )
        .min(1),
      cve: z.array(z.string().regex(/^CVE-\d{4}-\d{4,}$/)).optional(),
      cvss: z.number().min(0).max(10).optional(),
      tags: z.array(z.string()).default([]),
      // true pour les articles de démonstration (badge « Exemple »).
      exemple: z.boolean().default(false),
    })
    .superRefine((data, ctx) => {
      // Garde-fou : le niveau doit correspondre au total de la note.
      const total = scoreTotal(data.score);
      const attendu = importanceFromTotal(total);
      if (attendu !== data.importance) {
        const m = IMPORTANCE_META[attendu];
        ctx.addIssue({
          code: 'custom',
          path: ['importance'],
          message: `Score ${total}/20 → le niveau doit être « ${attendu} » (${m.min}-${m.max}), pas « ${data.importance} ».`,
        });
      }
    }),
});

// Chapeau facultatif d'une édition hebdomadaire (fichier nommé AAAA-sXX.md).
const editions = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/editions' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    intro: z.string(),
  }),
});

export const collections = { articles, editions };
