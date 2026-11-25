---
title: "Rançongiciels : les attaquants confient des intrusions entières à des agents IA"
date: 2026-11-23
summary: "Plusieurs groupes de rançongiciel utilisent désormais des frameworks offensifs dits « agentiques », où l'IA pilote une grande partie de l'attaque, de la reconnaissance à l'extorsion. Des chercheurs décrivent un agent capable d'attaquer des dizaines d'instances GitLab à partir de simples identifiants volés, pour quelques dollars par cible."
category: ia
importance: moyen
score:
  impact: 3
  urgence: 2
  perimetre: 3
  pertinence: 3
tags: ["IA", "agents", "rançongiciel", "GitLab", "MCP"]
actions:
  - type: patcher
    detail: "Imposer l'authentification multifacteur sur les services exposés (GitLab, VPN, webmail, Nextcloud) : ces agents réutilisent avant tout des identifiants volés."
  - type: surveiller
    detail: "Suivre l'évolution de ces outils et vérifier que les alertes de connexion anormale remontent bien dans la supervision."
sources:
  - title: "LeMagIT — Ransomware : les frameworks offensifs agentiques sont entrés dans la danse (23 novembre 2026)"
    url: "https://www.lemagit.fr/actualites/366655137/Ransomware-les-frameworks-offensifs-agentiques-sont-entres-dans-la-danse"
  - title: "BleepingComputer — CISA flags critical Cisco RCE flaw as actively exploited in attacks (23 novembre 2026)"
    url: "https://www.bleepingcomputer.com/news/security/cisa-flags-critical-cisco-expressway-rce-flaw-as-actively-exploited/"
---

## Ce qui s'est passé

Dans un article du **23 novembre 2026**, LeMagIT fait le point sur un changement dans les méthodes des groupes de rançongiciel. Ils ne se contentent plus de demander de l'aide ponctuelle à un chatbot : ils utilisent des **frameworks offensifs agentiques**, c'est-à-dire des outils où un ou plusieurs agents IA enchaînent eux-mêmes les étapes d'une attaque.

Les exemples cités, tous issus de chercheurs tiers :

- selon Cybernews, un affilié du groupe **The Gentlemen** fournit seulement l'adresse d'une **instance GitLab** et des identifiants compromis ; l'agent adapte ensuite ses scripts à la cible et peut mener **des dizaines d'attaques en parallèle**. Le coût en requêtes d'IA serait de **0,40 à 4 dollars** par attaque ;
- selon SOCRadar, des affiliés pilotent leurs intrusions avec des agents de code connectés à **32 serveurs MCP** (*Model Context Protocol*, le protocole qui donne des outils à un agent), avec validation humaine à chaque étape. Un groupe propose même cette chaîne d'outils « en tant que service » à d'autres criminels ;
- d'autres chercheurs ont repéré le framework **Artex** sur des infrastructures liées à plusieurs groupes.

Dans la même semaine, BleepingComputer rapporte que l'éditeur F6 a observé des attaquants qui s'aidaient d'un **assistant IA** pour exploiter une faille de Cisco Expressway (voir l'article de cette édition).

## Qui est concerné ?

Toute organisation qui expose des services sur Internet, en particulier ceux qui acceptent une connexion par identifiant et mot de passe. L'IA ne crée pas de nouvelle faille : elle **réduit le coût** des attaques et permet d'en lancer beaucoup plus à la fois.

## Pourquoi c'est important pour moi

Le point d'entrée décrit n'a rien de sophistiqué : des **identifiants volés** sur un service exposé. Ce qui change, c'est l'échelle. Une petite structure qui se pensait « trop petite pour intéresser » devient une cible rentable quand l'attaque coûte quelques dollars.

Les mesures de base gardent donc toute leur valeur :

- authentification multifacteur partout où c'est possible ;
- correctifs rapides sur les services exposés (GitLab, Nextcloud, VPN) ;
- alertes sur les connexions inhabituelles.

Les chiffres cités viennent de chercheurs en sécurité via la presse, et non des groupes eux-mêmes : ils donnent un ordre de grandeur, pas une mesure précise.

## Vérification rapide

Sur GitLab, vérifier que l'authentification à deux facteurs est imposée (en tant qu'administrateur) :

```bash
sudo gitlab-rails runner 'puts Gitlab::CurrentSettings.require_two_factor_authentication'
```
