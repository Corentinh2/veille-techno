---
title: "Windows Admin Center : la migration ESXi vers Hyper-V arrive dans vMode"
date: 2026-11-23
summary: "Microsoft a intégré son outil de conversion de machines virtuelles VMware ESXi vers Hyper-V dans le mode Virtualisation (vMode) de Windows Admin Center, en préversion privée. Il remplace l'ancienne extension et synchronise les disques avant la bascule pour réduire l'interruption de service."
category: infra-cloud-devops
importance: moyen
score:
  impact: 1
  urgence: 1
  perimetre: 3
  pertinence: 5
tags: ["Hyper-V", "VMware", "ESXi", "Windows Admin Center", "migration"]
actions:
  - type: tester
    detail: "Si une sortie de VMware est envisagée : s'inscrire à la préversion et tester la conversion d'une VM de lab, en mesurant la durée de bascule."
  - type: surveiller
    detail: "Suivre le passage en disponibilité générale avant tout usage en production."
sources:
  - title: "Microsoft Tech Community — VM Conversion is now in Windows Admin Center: Virtualization Mode (17 novembre 2026)"
    url: "https://techcommunity.microsoft.com/blog/windows-admin-center-blog/vm-conversion-is-now-in-windows-admin-center-virtualization-mode/4573880"
  - title: "IT-Connect — VMware ESXi to Hyper-V migration comes to Windows Admin Center vMode in private preview (23 novembre 2026)"
    url: "https://www.it-connect.tech/vmware-esxi-to-hyper-v-migration-comes-to-windows-admin-center-vmode-in-private-preview/"
---

## Ce qui s'est passé

Microsoft a annoncé sur son blog Tech Community (billet du 17 novembre, relayé par IT-Connect le **23 novembre 2026**) que l'outil **VM Conversion** est désormais intégré au **mode Virtualisation (vMode)** de **Windows Admin Center**, l'interface web d'administration de Windows Server. Il permet de migrer des machines virtuelles depuis des hôtes **VMware ESXi** vers des hôtes **Hyper-V**.

La fonction est en **préversion privée** : il faut s'inscrire auprès de Microsoft pour y accéder. Elle remplace l'ancienne extension en préversion, qui a été retirée du catalogue d'extensions.

## Comment ça marche

D'après Microsoft :

- une **VM « appliance » Windows** doit être déployée sur chaque hôte ESXi qui héberge des VM à migrer ;
- cette appliance lit les disques des VM source grâce à **HotAdd** et au **suivi des blocs modifiés** (*Changed Block Tracking*) ;
- les données sont synchronisées **avant** la bascule, ce qui réduit le temps pendant lequel la VM source doit être arrêtée ;
- des **vérifications préalables** contrôlent que les environnements source et cible sont prêts ;
- un volet de suivi affiche chaque étape, la durée et le pourcentage de synchronisation.

## Qui est concerné ?

Les organisations qui envisagent de quitter VMware, un mouvement fréquent depuis le rachat par Broadcom et le changement de politique de licences. Les versions d'ESXi prises en charge ne sont pas précisées dans les sources consultées.

## Pourquoi c'est important pour moi

Je travaille à la fois avec VMware et Hyper-V : la migration entre hyperviseurs est un sujet concret. Jusqu'ici, il fallait passer par des outils tiers ou par une conversion manuelle des disques (VMDK vers VHDX), avec une interruption longue.

Un outil intégré à Windows Admin Center, gratuit et pris en charge par Microsoft, pourrait simplifier ces projets. Mais une préversion ne doit pas servir en production : le bon usage aujourd'hui, c'est de **tester en lab** pour préparer un éventuel projet de migration.

## Pour aller plus loin

Avant tout test, vérifier sur l'hôte Hyper-V cible que le rôle est bien installé :

```powershell
Get-WindowsFeature -Name Hyper-V | Select-Object Name, InstallState
```
