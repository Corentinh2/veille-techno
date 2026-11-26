# Fiche technique — Veille Techno

Site de veille technologique hebdomadaire (cybersécurité, infra/cloud/DevOps, IA, réseau/OS), réalisé dans le cadre de mon alternance en administration systèmes et réseaux.

| | |
| --- | --- |
| **Adresse du site** | https://corentinh2.github.io/veille-techno/ |
| **Dépôt du code** | https://github.com/Corentinh2/veille-techno (public) |
| **Mise en ligne** | 25 novembre 2026 |
| **Langue** | Français |

## Type de site

**Site statique** généré à l'avance (*Static Site Generation*) :

- toutes les pages HTML sont produites une fois, au moment du « build », puis servies telles quelles ;
- **aucun serveur d'application, aucune base de données, aucun compte utilisateur, aucun cookie** ;
- conséquence : site très rapide, quasiment pas de surface d'attaque, hébergement gratuit.

## Technologies

| Rôle | Technologie | Version |
| --- | --- | --- |
| Moteur du site (framework / générateur) | [Astro](https://astro.build) | 7.4.13 |
| Outil de build et serveur de développement | Vite (intégré à Astro) | 8.3.8 |
| Validation des articles (schéma) | Zod (intégré à Astro) | 4.6.7 |
| Coloration du code dans les articles | Shiki (intégré à Astro) | 4.6.0 |
| Vérification des types | TypeScript + @astrojs/check | 6.0.3 / 0.9.12 |
| Environnement d'exécution (build) | Node.js | 26.13.1 en local, 24 sur GitHub |
| Gestionnaire de paquets | npm | 11.20.0 |

Aucune bibliothèque JavaScript côté navigateur (pas de React, jQuery, etc.), aucun framework CSS, aucune police ni ressource externe.

## Langages utilisés

| Langage | Utilisation | Volume |
| --- | --- | --- |
| **Astro** (HTML + JavaScript/TypeScript) | Pages et composants du site | ≈ 1 730 lignes |
| **TypeScript** | Logique : thèmes, niveaux, calcul des semaines ISO, schéma des articles | ≈ 220 lignes |
| **CSS** | Mise en forme, mode sombre, affichage mobile | ≈ 230 lignes |
| **Markdown** (+ en-têtes **YAML**) | Contenu : articles et éditions | 12 articles |
| **JavaScript** (navigateur) | Bascule clair/sombre, filtres et recherche de la page Articles | quelques dizaines de lignes |
| **YAML** | Chaîne de déploiement GitHub Actions | 60 lignes |
| **Batch Windows** | Lanceur `Lancer-Veille.bat` | 53 lignes |

## Hébergement et déploiement

| Élément | Choix |
| --- | --- |
| Hébergement | **GitHub Pages** (gratuit, HTTPS, réseau de diffusion de GitHub) |
| Gestion de versions | **Git**, dépôt sur **GitHub** |
| Déploiement | **GitHub Actions** : à chaque `push` sur la branche `main`, le site est reconstruit et publié automatiquement (≈ 1 minute) |
| Étapes du pipeline | récupération du code → installation de Node.js 24 → `npm ci` → `npm run build` → publication du dossier `dist/` |

Le build **échoue volontairement** si un article est mal formé : niveau d'importance incohérent avec la note, source manquante, URL invalide, date absente. Une erreur ne peut donc pas être publiée par accident.

## Chiffres du site

| | |
| --- | --- |
| Pages générées | 23 |
| Poids total du site | ≈ 450 Ko |
| Feuille de style | 8 Ko |
| Articles publiés | 12 (dont 3 d'exemple) |
| Éditions hebdomadaires | 1 réelle (semaine 48 – 2026) |

## Fonctionnalités

- **Accueil** : sujets critiques et élevés en tête, puis derniers articles, accès par thème.
- **Articles** : filtres par thème et par importance, recherche texte ; les filtres sont inscrits dans l'adresse (lien partageable).
- **Page article** : encadré « Que dois-je faire ? », détail de la note sur 20, CVE (liens vers la base NVD), score CVSS, sources.
- **Archives** : une page par semaine ISO, « Veille semaine XX – AAAA ».
- **Méthodologie** : barème des 4 critères (impact, urgence, périmètre, pertinence) et niveaux 🔴 🟠 🟡 🔵.
- **Sources suivies** : CERT-FR, CISA KEV, IT-Connect, LeMagIT, BleepingComputer, The Hacker News, HashiCorp, Red Hat/Ansible, éditeurs IA.
- **Mode sombre** (automatique selon le système, ou bouton), **affichage adapté au mobile**, navigation au clavier.

## Organisation du code

```
src/
  content/articles/AAAA-sXX/   articles en Markdown, rangés par semaine
  content/editions/            texte d'introduction de chaque édition
  content.config.ts            schéma des articles (contrôles automatiques)
  lib/                         logique : thèmes, niveaux, semaines ISO
  components/                  carte d'article, badge d'importance, note
  layouts/                     gabarit commun (en-tête, pied de page)
  pages/                       accueil, articles, archives, méthodologie, sources
  styles/                      CSS global
public/                        icônes du site
.github/workflows/deploy.yml   déploiement automatique
.claude/commands/veille.md     commande de rédaction de la veille
Lancer-Veille.bat              lanceur Windows
```

## Production de la veille

| Étape | Outil |
| --- | --- |
| Collecte, notation, rédaction, vérification des faits | Claude Code (assistant IA), commande `/veille` |
| Automatisation | Tâche planifiée chaque lundi vers 7 h : rédige l'édition de la semaine écoulée et ouvre une *pull request* |
| Validation | Relecture humaine de la *pull request*, puis fusion sur `main` → publication automatique |

Chaque fait (numéro de CVE, versions, dates, exploitation active) est vérifié contre sa source, et chaque article cite ses liens. Les articles sont rédigés en français, sans copier les sources.

## Poste de développement

| | |
| --- | --- |
| Système | Windows 11 |
| Outils | Node.js, npm, Git, GitHub CLI (`gh`), Claude Code |
| Lancer en local | `npm run dev` ou le raccourci « Veille Techno » → http://localhost:4321/veille-techno/ |
