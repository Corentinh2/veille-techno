---
title: "Windows 10 arrive en fin de support : inventaire et plan de migration"
date: 2025-10-14
summary: "Microsoft arrête le support de Windows 10 le 14 octobre 2025 : plus de correctifs de sécurité gratuits pour les éditions grand public et professionnelles. Les organisations peuvent acheter jusqu'à trois ans de mises à jour étendues (ESU). Les postes restants doivent être migrés vers Windows 11 ou couverts par ESU."
category: reseau-os
importance: eleve
score:
  impact: 3
  urgence: 4
  perimetre: 4
  pertinence: 4
tags: ["Windows 10", "Windows 11", "ESU", "cycle de vie"]
exemple: true
actions:
  - type: patcher
    detail: "Inventorier les postes encore sous Windows 10 et vérifier leur compatibilité Windows 11 (TPM 2.0, Secure Boot, processeur pris en charge)."
  - type: surveiller
    detail: "Pour les postes qui ne peuvent pas migrer tout de suite : chiffrer le coût d'ESU et fixer une date limite de remplacement."
sources:
  - title: "Microsoft Learn — Windows 10 Home and Pro, cycle de vie"
    url: "https://learn.microsoft.com/en-us/lifecycle/products/windows-10-home-and-pro"
  - title: "Microsoft Learn — Extended Security Updates (ESU) program for Windows 10"
    url: "https://learn.microsoft.com/en-us/windows/whats-new/extended-security-updates"
---

## Ce qui change

Le **14 octobre 2025**, Windows 10 atteint sa fin de support. La version **22H2** est la dernière version de Windows 10 : elle ne recevra plus de nouvelles fonctionnalités, et surtout **plus de correctifs de sécurité** gratuits.

Concrètement, une faille découverte après cette date restera ouverte sur les postes non couverts. Avec le rythme des Patch Tuesday, un poste non maintenu devient rapidement une porte d'entrée sur le réseau.

## Les options

| Option | Pour qui | Remarque |
| --- | --- | --- |
| Migrer vers Windows 11 | Postes compatibles | Gratuit, mais à tester (applications métier, pilotes) |
| Programme ESU | Postes qui ne peuvent pas migrer tout de suite | Payant pour les organisations, jusqu'à 3 ans, le prix double chaque année |
| VM Windows 10 dans Azure / Windows 365 | Cas particuliers (application ancienne) | ESU inclus sans surcoût selon Microsoft |
| Remplacer le matériel | Postes non compatibles Windows 11 | À budgéter |

L'ESU ne fournit **que des correctifs de sécurité** : pas de nouvelles fonctionnalités ni de support technique. C'est une solution de transition, pas une fin en soi.

## Ce que je retiens

C'est le type de sujet qui ne crée pas de panne le jour J, mais qui fait monter le risque semaine après semaine. Le plus efficace est de partir d'un **inventaire fiable** (version de Windows, modèle, compatibilité) puis de prioriser les postes les plus exposés (portables nomades, postes d'administration).

Pour l'inventaire, une requête PowerShell suffit sur un poste :

```powershell
Get-ComputerInfo | Select-Object OsName, OsVersion, OsBuildNumber
```

À l'échelle du parc, la même information remonte depuis l'Active Directory ou l'outil de gestion des postes (Intune, SCCM, GLPI…).
