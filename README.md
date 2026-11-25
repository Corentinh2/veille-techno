# Veille Techno

Site statique de veille technologique (cybersécurité, infra/cloud/DevOps, IA, réseau/OS), construit avec [Astro](https://astro.build) et publié sur GitHub Pages.

Chaque sujet est noté sur 20 (impact, urgence, périmètre, pertinence) et classé 🔴 critique, 🟠 élevé, 🟡 moyen ou 🔵 info. Le détail est sur la page **Méthodologie** du site.

## Commandes

| Commande | Effet |
| --- | --- |
| `npm install` | Installe les dépendances |
| `npm run dev` | Serveur local sur http://localhost:4321/veille-techno/ |
| `npm run build` | Génère le site dans `dist/` (et valide tous les articles) |
| `npm run preview` | Sert le contenu de `dist/` |
| `npm run check` | Vérification TypeScript / Astro |

## Écrire la veille

Dans Claude Code, à la racine du dépôt :

```
/veille
```

La commande (définie dans `.claude/commands/veille.md`) cherche l'actualité des 7 derniers jours, sélectionne 8 à 12 sujets, les note, rédige les articles, vérifie les faits, lance le build et propose un commit. Elle ne pousse rien sans accord.

## Structure

```
src/
  content/
    articles/AAAA-sXX/<slug>.md   # un article = un fichier, rangé par semaine ISO
    editions/AAAA-sXX.md          # chapeau facultatif de l'édition
  content.config.ts               # schéma du frontmatter (vérifie aussi niveau ↔ score)
  lib/veille.ts                   # thèmes, niveaux, calcul des semaines
  pages/                          # accueil, articles, archives, méthodologie, sources
.github/workflows/deploy.yml      # build + déploiement GitHub Pages à chaque push sur main
```

## Frontmatter d'un article

```yaml
title: "…"
date: 2026-11-24
summary: "2-3 phrases"
category: cybersecurite | infra-cloud-devops | ia | reseau-os
importance: critique | eleve | moyen | info
score: { impact: 5, urgence: 4, perimetre: 4, pertinence: 5 }   # total = 18/20
actions:
  - type: patcher | tester | surveiller | rien
    detail: "ce que je dois faire concrètement"
sources:
  - title: "Éditeur — titre"
    url: "https://…"
cve: ["CVE-2026-12345"]   # facultatif
cvss: 9.8                 # facultatif
tags: ["Linux"]           # facultatif
```

Le build échoue si le niveau ne correspond pas au total (16-20 critique, 12-15 élevé, 8-11 moyen, 0-7 info) ou s'il manque une source.

## Articles d'exemple

Les trois articles marqués `exemple: true` (xz-utils, fin de support de Windows 10, OpenTofu) servent de démonstration. Ils peuvent être supprimés une fois les premières vraies éditions publiées.
