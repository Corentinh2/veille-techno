---
title: "Azure API Management : accès non autorisé corrigé, les secrets sont à renouveler"
date: 2026-11-21
summary: "Microsoft a corrigé le 19 novembre une faille exploitée dans les offres Classic d'Azure API Management, qui donnait accès à des fonctions d'administration et aux secrets stockés. Le correctif est appliqué côté Microsoft, mais il n'invalide pas les identifiants déjà exposés : Microsoft recommande de les renouveler."
category: infra-cloud-devops
importance: moyen
score:
  impact: 4
  urgence: 3
  perimetre: 2
  pertinence: 2
tags: ["Azure", "API Management", "cloud", "secrets"]
actions:
  - type: surveiller
    detail: "Si l'entreprise utilise une instance APIM Classic (Developer, Basic, Standard ou Premium) : lire l'avis dans Azure Service Health et renouveler les secrets selon le guide Microsoft."
  - type: rien
    detail: "Aucune mise à jour à installer : le correctif est déjà appliqué par Microsoft sur le service."
sources:
  - title: "Microsoft Tech Community — Rotating credentials in Azure API Management (21 novembre 2026)"
    url: "https://techcommunity.microsoft.com/blog/integrationsonazureblog/rotating-credentials-in-azure-api-management/4575478"
  - title: "Techzine — Microsoft patches actively exploited vulnerability in Azure API Management (24 novembre 2026)"
    url: "https://www.techzine.eu/news/security/146028/microsoft-patches-actively-exploited-vulnerability-in-azure-api-management/"
---

## Ce qui s'est passé

**Azure API Management** (APIM) est le service de Microsoft qui sert de passerelle devant des API : il gère l'authentification, les clés d'abonnement et la connexion aux services en arrière-plan. Pour cela, il stocke souvent des **secrets** : clés, mots de passe, certificats, chaînes de connexion.

Selon Techzine, qui relaie l'avis de Microsoft, la faille a été repérée le **18 novembre 2026** et bloquée le **19 novembre**. Elle permettait un accès non autorisé à certaines fonctions d'administration des instances **Classic**, y compris aux secrets qu'elles contiennent. Microsoft indique que la faille a été exploitée. Aucun numéro de CVE n'est mentionné dans les sources consultées.

Le **21 novembre**, Microsoft a publié un guide détaillé pour **renouveler les identifiants** stockés dans APIM.

## Qui est concerné ?

- Concernées : les offres **Classic Developer, Basic, Standard et Premium**.
- Non concernées : l'offre **Consumption (Classic)** et toutes les offres **v2**.
- Le correctif est appliqué par Microsoft : **aucune mise à jour à faire** côté client.

En revanche, le correctif **n'invalide pas** les identifiants qui auraient été récupérés avant. Microsoft recommande donc de renouveler les secrets potentiellement exposés, de surveiller les systèmes accessibles avec ces secrets et d'analyser les journaux.

## Pourquoi c'est important pour moi

Je n'administre pas Azure API Management aujourd'hui, d'où une pertinence faible. Mais la logique est utile à retenir pour tout service cloud : quand une faille a pu exposer des secrets, **corriger ne suffit pas, il faut aussi renouveler les secrets**.

Le guide de Microsoft donne un ordre de rotation à appliquer partout :

1. créer le nouveau secret chez l'émetteur (service cible, fournisseur d'identité) ;
2. le mettre à jour dans APIM ;
3. tester ;
4. révoquer l'ancien secret.

Changer la valeur dans APIM ne révoque pas l'ancien secret chez l'émetteur : c'est l'erreur à éviter.

## Vérification rapide

Lister les instances APIM et leur offre (SKU) dans un abonnement :

```powershell
Get-AzApiManagement | Select-Object Name, ResourceGroupName, Sku
```
