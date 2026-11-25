---
title: "Drupal : une faille critique du cœur exploitée le lendemain de son correctif"
date: 2026-11-24
summary: "Le 18 novembre, Drupal a corrigé une faille « hautement critique » de son cœur (CVE-2026-132165) qui peut permettre de prendre le contrôle d'un site via le script d'installation. Une exploitation a été signalée dès le 19 novembre au soir, et la CISA a ajouté la faille à son catalogue KEV le 24 novembre."
category: cybersecurite
importance: critique
score:
  impact: 5
  urgence: 5
  perimetre: 4
  pertinence: 2
cve: ["CVE-2026-132165"]
tags: ["Drupal", "PHP", "CMS", "CISA KEV", "RCE"]
actions:
  - type: patcher
    detail: "Si je gère un site Drupal : passer en 10.6.22, 11.3.22 ou 11.4.13 selon la branche, et migrer les sites restés sur une branche en fin de vie."
  - type: patcher
    detail: "Interdire au serveur web d'écrire dans settings.php (droits en lecture seule), mesure qui réduit certaines voies d'exploitation selon l'avis."
sources:
  - title: "Drupal.org — SA-CORE-2026-017 : Drupal core, Highly critical, Remote code execution"
    url: "https://www.drupal.org/sa-core-2026-017"
  - title: "CISA — CISA Adds Three Known Exploited Vulnerabilities to Catalog (24 novembre 2026)"
    url: "https://www.cisa.gov/news-events/alerts/2026/11/24/cisa-adds-three-known-exploited-vulnerabilities-catalog"
---

## Ce qui s'est passé

Le **18 novembre 2026**, l'équipe de sécurité de Drupal a publié l'avis **SA-CORE-2026-017**, classé « Highly critical » (score Drupal de 20 sur 25). Il corrige la **CVE-2026-132165**, une faille dans le script d'installation `install.php` livré avec le cœur de Drupal. Dans certaines conditions, un attaquant peut s'en servir pour relancer l'installation du site, ce qui peut aboutir à une **prise de contrôle du site** ou à une **exécution de code à distance** (RCE).

L'avis a ensuite été mis à jour : l'équipe Drupal a reçu un signalement d'exploitation sur des sites en production **dès le 19 novembre à 19 h UTC**, soit environ une journée après la publication du correctif. Le **24 novembre**, la CISA a ajouté la faille à son catalogue KEV, avec une échéance au 27 novembre pour les agences fédérales américaines.

Détail notable : l'avis crédite l'**outil d'analyse de code open source d'Anthropic** (« OSS Scanner ») pour la découverte de la faille. C'est un exemple concret d'IA utilisée en défense pour trouver des vulnérabilités.

## Qui est concerné ?

| Branche | Version corrigée |
| --- | --- |
| Drupal 11.4.x | 11.4.13 |
| Drupal 11.3.x | 11.3.22 |
| Drupal 10.6.x | 10.6.22 |

Les branches **11.2.x et antérieures, 10.5.x et antérieures, ainsi que Drupal 8 et 9**, sont en fin de vie : elles ne reçoivent pas de correctif. La seule solution est de migrer.

## Pourquoi c'est important pour moi

Je n'administre pas de site Drupal aujourd'hui, d'où une pertinence faible. Mais le sujet atteint le niveau critique par sa gravité et sa rapidité : **moins de 24 heures** entre le correctif et les premières attaques. C'est la tendance actuelle, et elle confirme qu'un correctif « hautement critique » sur une application web exposée doit être appliqué le jour même.

Ce cas rappelle aussi deux bonnes pratiques valables pour toute application web (Nextcloud compris) :

- les fichiers de configuration ne doivent pas être modifiables par le compte du serveur web ;
- les scripts d'installation doivent être retirés ou bloqués une fois l'installation terminée.

## Vérification rapide

```bash
# Version du cœur Drupal avec Drush
drush status --field=drupal-version
# Droits sur settings.php (attendu : pas d'écriture pour l'utilisateur web)
ls -l web/sites/default/settings.php
```
