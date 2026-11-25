---
title: "Claude Ship : Anthropic confie une partie de la revue de code à des agents"
date: 2026-11-24
summary: "Anthropic a présenté Claude Ship, un ensemble de trois agents qui relisent les demandes de fusion, corrigent les échecs de CI et peuvent approuver certaines modifications selon des règles écrites dans le dépôt. Le service est en bêta pour les offres Claude Code Team et Enterprise, et fonctionne uniquement avec GitHub."
category: ia
importance: info
score:
  impact: 1
  urgence: 1
  perimetre: 2
  pertinence: 3
tags: ["IA", "agents", "revue de code", "GitHub", "Anthropic"]
actions:
  - type: rien
    detail: "Culture générale : comprendre comment les agents IA s'intègrent dans une chaîne CI/CD et quels garde-fous sont proposés."
sources:
  - title: "LeMagIT — Claude Ship : Anthropic veut confier la revue de code aux agents IA (24 novembre 2026)"
    url: "https://www.lemagit.fr/actualites/366655341/Claude-Ship-Anthropic-veut-confier-la-revue-de-code-aux-agents-IA"
---

## Ce qui s'est passé

Selon LeMagIT (article du **24 novembre 2026**), Anthropic a présenté le 23 novembre **Claude Ship**, un système d'agents IA conçu par l'équipe de Claude Code pour relire, vérifier et valider des modifications de code (*pull requests*), sans qu'un humain intervienne à chaque fois.

Il regroupe trois agents :

| Agent | Rôle | Statut |
| --- | --- | --- |
| Claude Code Review | Analyse les demandes de fusion, élimine les faux positifs et classe les problèmes par gravité | Disponible |
| PR Steward | Traite les échecs de CI, les conflits de fusion et les remarques de revue, puis propose un correctif sur une branche, sans jamais approuver ni fusionner | Bêta |
| Claude Approvals | Approuve une partie des demandes de fusion selon des règles écrites dans un fichier du dépôt | Bêta |

Je n'ai pas trouvé d'annonce correspondante sur la page d'actualités d'Anthropic : l'information repose sur l'article de LeMagIT.

## Qui est concerné ?

- Les clients des offres **Claude Code Team et Enterprise**, en bêta.
- Uniquement avec **GitHub** et GitHub Enterprise Cloud.
- Les administrateurs peuvent autoriser ou interdire l'agent, choisir trois niveaux de revue (rapide, standard, approfondie), planifier ses passages et fixer un plafond de dépenses. La facturation se fait au volume de requêtes consommées.

## Pourquoi c'est important pour moi

C'est un sujet de culture générale, mais il touche un domaine que j'utilise : le versionnement de mes playbooks Ansible et de mon code Terraform. Ce qui m'intéresse surtout, ce sont les **garde-fous** recommandés, qui valent pour tout agent IA branché sur une chaîne de déploiement :

- activer la **protection de branche** sur GitHub, pour qu'un agent ne puisse pas fusionner seul ;
- commencer en mode **observation seule** avant de rendre l'approbation de l'agent obligatoire ;
- écrire les règles d'approbation dans le dépôt, donc versionnées et relisibles.

La même semaine, une faille critique de Drupal a été découverte par un outil d'analyse d'Anthropic (voir l'article de cette édition) : l'IA sert aussi bien à écrire et relire du code qu'à y chercher des failles.
