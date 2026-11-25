---
title: "Porte dérobée dans xz-utils : la chaîne d'approvisionnement Linux visée"
date: 2024-03-29
summary: "Du code malveillant a été découvert dans les versions 5.6.0 et 5.6.1 de xz-utils, une bibliothèque de compression présente sur la plupart des distributions Linux. Dans certaines configurations, il visait le serveur SSH pour permettre un accès non autorisé. Les distributions stables majeures n'ont pas reçu ces versions."
category: cybersecurite
importance: critique
score:
  impact: 5
  urgence: 4
  perimetre: 4
  pertinence: 5
cve: ["CVE-2024-3094"]
cvss: 10
tags: ["Linux", "SSH", "supply chain", "xz"]
exemple: true
actions:
  - type: patcher
    detail: "Vérifier la version installée (xz --version) sur chaque serveur et poste Linux ; si 5.6.0 ou 5.6.1, revenir à une version saine (ex. 5.4.6) via le gestionnaire de paquets."
  - type: surveiller
    detail: "Rechercher des signes de compromission sur les machines qui ont eu une version touchée (connexions SSH inhabituelles) et suivre les bulletins de ma distribution."
sources:
  - title: "Andres Freund — backdoor in upstream xz/liblzma leading to ssh server compromise (oss-security)"
    url: "https://www.openwall.com/lists/oss-security/2024/03/29/4"
  - title: "CISA — Reported Supply Chain Compromise Affecting XZ Utils Data Compression Library, CVE-2024-3094"
    url: "https://www.cisa.gov/news-events/alerts/2024/03/29/reported-supply-chain-compromise-affecting-xz-utils-data-compression-library-cve-2024-3094"
  - title: "Red Hat — Urgent security alert for Fedora Linux 40 and Fedora Rawhide users"
    url: "https://www.redhat.com/en/blog/urgent-security-alert-fedora-41-and-rawhide-users"
  - title: "NVD — CVE-2024-3094"
    url: "https://nvd.nist.gov/vuln/detail/CVE-2024-3094"
---

## Ce qui s'est passé

Le 29 mars 2024, l'ingénieur Andres Freund a signalé sur la liste oss-security un comportement anormal : sur des machines Debian de développement (sid), les connexions SSH consommaient beaucoup trop de CPU. En remontant la piste, il a trouvé du **code malveillant caché dans les archives officielles de xz-utils**, versions **5.6.0 et 5.6.1**.

Le code n'était pas dans le dépôt Git lisible, mais injecté au moment de la compilation à partir de fichiers de test volontairement obscurcis. Une fois la bibliothèque `liblzma` chargée par le démon `sshd` (ce qui arrive sur les distributions qui lient `sshd` à `libsystemd`), il pouvait détourner l'authentification et permettre à l'attaquant d'exécuter des commandes à distance.

## Qui est touché ?

- Les versions malveillantes n'ont été diffusées **que dans des branches de test ou de développement** : Fedora Rawhide, la bêta de Fedora 40, Debian sid, et quelques distributions en *rolling release*.
- Red Hat indique qu'**aucune version de RHEL n'est concernée**. Les versions stables de Debian et d'Ubuntu ne l'étaient pas non plus.
- La CISA recommande de revenir à une version saine, par exemple **xz-utils 5.4.6**, et de rechercher toute activité suspecte.

## Pourquoi c'est important pour moi

Même si mes serveurs de production en version stable n'étaient pas exposés, cette affaire montre un risque que je dois garder en tête : une attaque **sur la chaîne d'approvisionnement logicielle**. L'attaquant a gagné la confiance des mainteneurs pendant plusieurs années avant d'introduire son code. Un correctif ne suffit pas à se protéger de ce genre d'attaque ; il faut aussi :

- éviter les dépôts de test sur des machines exposées ;
- savoir inventorier rapidement les versions installées sur un parc (un playbook Ansible le fait en quelques minutes) ;
- surveiller les accès SSH (journaux, alertes sur les connexions inhabituelles).

## Vérification rapide

```bash
xz --version
# Debian / Ubuntu
dpkg -l | grep -E 'xz-utils|liblzma'
# RHEL / Fedora
rpm -qa | grep -E '^xz'
```
