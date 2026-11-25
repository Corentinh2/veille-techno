---
title: "OpenTofu 1.6.0 : le fork libre de Terraform passe en version stable"
date: 2024-01-10
summary: "Après le passage de Terraform sous licence BSL 1.1 en août 2023, la Linux Foundation a lancé OpenTofu, un fork resté sous licence libre MPL 2.0. Sa première version stable, la 1.6.0, est sortie le 10 janvier 2024. C'est une alternative à évaluer pour l'infrastructure as code."
category: infra-cloud-devops
importance: moyen
score:
  impact: 2
  urgence: 2
  perimetre: 3
  pertinence: 4
tags: ["Terraform", "OpenTofu", "IaC", "licence"]
exemple: true
actions:
  - type: tester
    detail: "Rejouer un de mes projets Terraform de lab avec la commande tofu (init, plan) pour vérifier la compatibilité."
  - type: surveiller
    detail: "Suivre l'écart de fonctionnalités entre Terraform et OpenTofu avant tout choix pour un projet en production."
sources:
  - title: "Linux Foundation — Linux Foundation Launches OpenTofu (20 septembre 2023)"
    url: "https://www.linuxfoundation.org/press/announcing-opentofu"
  - title: "OpenTofu — OpenTofu is going GA (10 janvier 2024)"
    url: "https://opentofu.org/blog/opentofu-is-going-ga/"
  - title: "HashiCorp — HashiCorp adopts the Business Source License"
    url: "https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license"
---

## Le contexte

En **août 2023**, HashiCorp a annoncé que ses produits, dont **Terraform**, passaient de la licence libre **MPL 2.0** à la **Business Source License (BSL) 1.1**. Le code reste lisible, mais cette licence limite l'usage commercial dans des produits concurrents de ceux de HashiCorp.

En réaction, une partie de la communauté a créé un fork, d'abord appelé OpenTF, puis rebaptisé **OpenTofu** et placé sous la gouvernance de la **Linux Foundation** le 20 septembre 2023. Le projet reste sous MPL 2.0.

## La nouveauté

Le **10 janvier 2024**, OpenTofu publie sa première version stable, la **1.6.0**. Elle reprend la syntaxe HCL et le fonctionnement de Terraform : un fichier `.tf` existant fonctionne en remplaçant la commande `terraform` par `tofu`. Cette version ajoute aussi un framework de test des configurations et un nouveau registre de providers et de modules.

## Pourquoi ça me concerne

Pour mon usage (lab et petits déploiements), la licence BSL ne change rien : je peux continuer à utiliser Terraform. Mais le sujet est à connaître :

- certaines entreprises ou éditeurs basculent vers OpenTofu pour rester sur une licence libre ;
- les deux outils vont peu à peu diverger, donc un code écrit pour l'un ne marchera pas forcément pour l'autre à terme ;
- en entretien ou devant un jury, savoir expliquer la différence entre Terraform et OpenTofu est un plus.

## Essai rapide

```bash
tofu init
tofu plan
```

Si le `plan` ne montre aucune différence avec celui produit par Terraform, la migration d'un projet simple est quasi transparente.
