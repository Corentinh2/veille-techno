---
title: "GitLab 19.6.1 : un correctif critique pour une faille de Ruby"
date: 2026-11-20
summary: "GitLab a publié le 20 novembre les versions 19.6.1, 19.5.8 et 19.4.10, qui corrigent la CVE-2026-132825, une faille de l'interpréteur Ruby embarqué pouvant permettre une exécution de code à distance. GitLab.com est déjà corrigé ; les instances auto-hébergées doivent être mises à jour."
category: infra-cloud-devops
importance: eleve
score:
  impact: 4
  urgence: 3
  perimetre: 3
  pertinence: 4
cve: ["CVE-2026-132825"]
cvss: 7.4
tags: ["GitLab", "Ruby", "DevOps", "CI/CD"]
actions:
  - type: patcher
    detail: "Mettre à jour les instances GitLab auto-hébergées (CE ou EE) en 19.6.1, 19.5.8 ou 19.4.10 selon la branche."
  - type: patcher
    detail: "Pour une installation compilée depuis les sources : recompiler avec Ruby 3.3.14 ou 3.4.13 (ou plus récent dans la même branche)."
sources:
  - title: "GitLab — Critical Patch Release: 19.6.1, 19.5.8, 19.4.10"
    url: "https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-6-1-released/"
  - title: "CERT-FR — CERTFR-2026-AVI-1591 : Vulnérabilité dans GitLab"
    url: "https://cert.cyber.gouv.fr/avis/CERTFR-2026-AVI-1591/"
---

## Ce qui s'est passé

Le **20 novembre 2026**, GitLab a publié un correctif qualifié de critique : versions **19.6.1, 19.5.8 et 19.4.10** pour les éditions Community (CE) et Enterprise (EE). Le CERT-FR a relayé l'information le même jour.

Particularité : le bug n'est pas dans le code de GitLab mais dans **Ruby**, le langage sur lequel GitLab est construit. Il s'agit d'un **dépassement de mémoire dans le tas** (*heap buffer overflow*) lors du changement de casse de certaines chaînes de caractères : une chaîne fabriquée exprès peut provoquer une écriture hors des limites prévues. L'équipe de sécurité de Ruby estime que cela peut permettre une exécution de code à distance dans certains scénarios.

## Qui est concerné ?

- GitLab CE/EE **avant 19.4.10**, **19.5 avant 19.5.8** et **19.6 avant 19.6.1**.
- **GitLab.com et GitLab Dedicated** sont déjà corrigés : rien à faire pour les utilisateurs du service hébergé.
- Les paquets et images officiels intègrent déjà le Ruby corrigé. Seules les installations **compilées à la main** doivent reconstruire Ruby (3.3.14 ou 3.4.13 au minimum).

Sur la gravité, les sources divergent : GitLab classe la faille **critique**, en s'appuyant sur l'avis de l'équipe Ruby, alors que la fiche MITRE lui attribue un score CVSS de **7,4** (élevé). Aucune exploitation n'était signalée à la date de l'avis.

## Pourquoi c'est important pour moi

GitLab contient souvent ce qu'une entreprise a de plus sensible côté infrastructure : le code, les playbooks Ansible, les configurations Terraform, les variables de CI/CD et parfois des secrets. Une exécution de code sur le serveur GitLab peut donc donner accès à toute la chaîne de déploiement.

Le sujet est d'autant plus d'actualité que des groupes de rançongiciel ciblent déjà des instances GitLab avec des identifiants volés (voir l'article de cette semaine sur les frameworks offensifs agentiques). Je le classe en « élevé » plutôt qu'en « critique » car aucune exploitation n'est connue pour l'instant.

## Vérification rapide

```bash
# Version de GitLab (installation Omnibus)
sudo gitlab-rake gitlab:env:info | grep -E "GitLab information|Version"
# Version de Ruby embarquée
/opt/gitlab/embedded/bin/ruby -v
```
