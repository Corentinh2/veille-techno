---
description: Produit l'édition hebdomadaire de la veille (recherche, notation, rédaction, vérification, build, proposition de commit)
argument-hint: "[date de fin AAAA-MM-JJ, par défaut aujourd'hui]"
---

# Édition hebdomadaire de la veille

Tu produis l'édition de la semaine du site de veille technologique de ce dépôt (Astro, articles Markdown dans `src/content/articles/`).
Le lecteur est un alternant en administration systèmes et réseaux : Windows, Linux, virtualisation (hyperviseurs), Terraform/Ansible, Nextcloud, réseau. Le site est montré à son tuteur et à un jury : la rigueur factuelle prime sur la quantité.

Date de fin de la période : `$ARGUMENTS` si fourni, sinon la date du jour. La période couverte est **les 7 jours qui précèdent cette date (inclus)**.

Suis les étapes dans l'ordre et tiens une liste de tâches.

## 0. Préparer

1. Calcule la semaine ISO de la date de fin → identifiant d'édition `AAAA-sXX` (ex. `2026-s48`) et titre « Veille semaine XX – AAAA ».
2. Lis `src/content.config.ts` (schéma exact) et `src/lib/veille.ts` (valeurs autorisées) ; lis un article existant comme modèle de format.
3. Liste les articles déjà publiés (`src/content/articles/**`) pour **ne pas reprendre un sujet déjà traité**, sauf fait nouveau important (dans ce cas, dis-le explicitement dans l'article et renvoie vers l'ancien).
4. Si le dossier `src/content/articles/AAAA-sXX/` existe déjà, demande-moi si je veux compléter l'édition ou la refaire avant de continuer.

## 1. Rechercher (7 derniers jours, 4 thèmes)

Fais plusieurs recherches web (lance-les en parallèle) couvrant les 4 thèmes, avec des requêtes en français et en anglais. Points de départ, dans cet ordre de priorité :

- **cybersecurite** : CERT-FR (alertes et avis — cert.ssi.gouv.fr), CISA KEV (ajouts récents au catalogue), BleepingComputer, The Hacker News, IT-Connect, Patch Tuesday si la période en contient un.
- **infra-cloud-devops** : blog HashiCorp (Terraform, Vault, Packer), blog Red Hat / Ansible, nouveautés hyperviseurs (VMware/Broadcom, Proxmox, Hyper-V), Kubernetes/conteneurs, Nextcloud, LeMagIT.
- **ia** : annonces officielles des éditeurs (Anthropic, OpenAI, Google, Mistral AI, Meta…), IA appliquée à l'admin sys / à la sécurité, réglementation (AI Act, CNIL), LeMagIT.
- **reseau-os** : Windows / Windows Server (mises à jour, fin de support, changements), noyau Linux et distributions (RHEL, Debian, Ubuntu), équipements réseau (Cisco, Fortinet, Palo Alto…), protocoles.

Ouvre les articles pertinents (et pas seulement les extraits de recherche). **Ne garde que des faits publiés dans la période** (vérifie la date de publication de chaque source).

## 2. Sélectionner et noter (8 à 12 sujets)

Sélectionne **8 à 12 sujets** au total, avec au moins un sujet par thème si l'actualité le permet. Priorise ce qui touche l'environnement du lecteur.

Note chaque sujet sur les 4 critères (0 à 5 chacun), selon le barème de `src/pages/methodologie.astro` :

1. **impact** : gravité des conséquences (compromission, panne, perte de données)
2. **urgence** : exploitation active (ex. ajout au CISA KEV), délai de correctif, date de fin de support
3. **perimetre** : nombre de systèmes ou d'utilisateurs concernés
4. **pertinence** : lien avec Windows, Linux, hyperviseurs, Terraform/Ansible, Nextcloud, réseau

Niveau = total : `critique` 16-20 · `eleve` 12-15 · `moyen` 8-11 · `info` 0-7. Le build **refuse** un article dont le niveau ne correspond pas au total.
Repère : une faille activement exploitée ou CVSS ≥ 9 sur un produit courant doit en pratique atteindre le niveau critique ; si ta note ne l'y amène pas, justifie-le dans l'article.

**Avant de rédiger**, affiche-moi un tableau récapitulatif (titre provisoire, thème, 4 notes, total, niveau, source principale) puis continue sans attendre, sauf si un choix est vraiment ambigu.

## 3. Rédiger

Un fichier par sujet : `src/content/articles/AAAA-sXX/<slug-court-en-minuscules>.md`.

Frontmatter (respecte exactement le schéma) :

```yaml
---
title: "…"                 # clair, factuel, en français
date: AAAA-MM-JJ           # date de publication de l'info (dans la période)
summary: "…"               # 2-3 phrases, ce qu'il faut retenir
category: cybersecurite | infra-cloud-devops | ia | reseau-os
importance: critique | eleve | moyen | info
score:
  impact: 0-5
  urgence: 0-5
  perimetre: 0-5
  pertinence: 0-5
cve: ["CVE-AAAA-NNNNN"]    # facultatif
cvss: 9.8                  # facultatif, score de base officiel (NVD ou éditeur)
tags: ["…"]
actions:                   # au moins une
  - type: patcher | tester | surveiller | rien
    detail: "action concrète, adaptée à mon environnement"
sources:                   # au moins une, idéalement la source primaire + une source presse
  - title: "Éditeur — titre de la page"
    url: "https://…"
---
```

Corps de l'article (250 à 500 mots) avec des intertitres `##` : « Ce qui s'est passé », « Qui est concerné ? », « Pourquoi c'est important pour moi », et si utile une commande de vérification (PowerShell ou bash).

Règles de rédaction :

- **En français, avec tes propres mots.** Ne copie aucune phrase des sources, pas de traduction mot à mot. Pas de citation de plus de 15 mots.
- Ton factuel et sobre, pas de sensationnalisme. Explique les sigles la première fois.
- Chaque fait important doit pouvoir être relié à une source listée dans `sources`.
- Si une information est incertaine ou non confirmée par l'éditeur, écris-le clairement (« selon BleepingComputer, non confirmé par l'éditeur »).
- N'ajoute pas `exemple: true`.

Crée aussi `src/content/editions/AAAA-sXX.md` :

```yaml
---
title: "Veille semaine XX – AAAA"
date: AAAA-MM-JJ   # date de fin de la période
intro: "1 à 2 phrases qui résument la semaine"
---
```

suivi d'un court paragraphe (3-5 lignes) sur les points saillants de la semaine.

## 4. Vérifier chaque fait

Pour **chaque** article, rouvre les sources et vérifie un par un :

- numéros de CVE (format et correspondance avec le produit), score CVSS ;
- produits et **versions** concernées et corrigées ;
- **dates** (publication, correctif, fin de support) ;
- statut d'exploitation (ex. présence réelle dans le catalogue CISA KEV) ;
- que chaque URL de `sources` existe et parle bien de ce sujet.

Corrige tout écart. Si un fait ne peut pas être confirmé, retire-le ou signale-le comme non confirmé. Termine par un tableau « fait → source → vérifié ✅ / corrigé ✏️ / retiré ❌ ».

## 5. Build et commit

1. Lance `npm run build`. En cas d'erreur (schéma, niveau incohérent, URL invalide…), corrige et relance jusqu'à ce que le build passe.
2. Montre-moi `git status` et un résumé de l'édition (nombre de sujets par niveau et par thème).
3. **Propose** un message de commit du type `veille: semaine XX – AAAA (N sujets)` et demande-moi confirmation avant de committer.
4. **Ne pousse jamais** (`git push`) sans mon accord explicite.
