---
title: "Postfix 3.11.8 : douze défauts corrigés, dont certains vieux de 25 ans"
date: 2026-11-22
summary: "Le serveur de messagerie Postfix a publié le 22 novembre la version 3.11.8 et des mises à jour pour ses anciennes branches. Elles corrigent des failles d'impact moyen : fuite d'informations en local et déni de service du client SMTP. Une modification de syntaxe peut casser certaines configurations TLS."
category: reseau-os
importance: moyen
score:
  impact: 2
  urgence: 2
  perimetre: 3
  pertinence: 4
tags: ["Postfix", "messagerie", "SMTP", "Linux"]
actions:
  - type: patcher
    detail: "Appliquer la mise à jour Postfix fournie par la distribution (Debian, Ubuntu, RHEL) sur les serveurs de messagerie et les relais SMTP."
  - type: tester
    detail: "Avant la mise à jour, chercher dans main.cf les options de protocole TLS écrites avec « >= » ou « <= » suivi d'un espace, et corriger leur syntaxe."
sources:
  - title: "Postfix — Postfix stable release 3.11.8 and legacy releases"
    url: "http://www.postfix.org/announcements/postfix-3.11.8.html"
  - title: "CERT-FR — CERTFR-2026-AVI-1610 : Multiples vulnérabilités dans Postfix"
    url: "https://cert.cyber.gouv.fr/avis/CERTFR-2026-AVI-1610/"
---

## Ce qui s'est passé

Le **22 novembre 2026**, le projet Postfix a publié la version stable **3.11.8** ainsi que des mises à jour pour les branches plus anciennes. Le CERT-FR a publié son avis le 24 novembre.

L'annonce décrit des problèmes d'**impact moyen**, qui permettent notamment une **fuite d'informations en local** et un **déni de service du client SMTP**. Elle signale aussi un détail parlant : plus de la moitié des douze défauts corrigés existent depuis **25 à 29 ans**.

Parmi les changements :

- le client SMTP limite désormais à **100 secondes** le temps total de résolution DNS des serveurs destinataires, pour contrer un serveur DNS malveillant qui ferait volontairement expirer chaque requête ;
- les livraisons via `:include:` dans le fichier d'alias sont différées si le propriétaire du dossier n'a pas le droit de lire le fichier visé.

## Qui est concerné ?

Selon le CERT-FR, toutes les branches sont touchées. Versions corrigées : **3.11.8, 3.10.15, 3.9.16, 3.8.22, 3.7.24, 3.6.22 et 3.5.29**. Les branches 3.5 à 3.7 ne sont plus maintenues officiellement mais reçoivent quand même ce correctif.

En pratique, sur un serveur Linux, la mise à jour arrive par les paquets de la distribution, qui reportent souvent le correctif sans changer de numéro de version principale.

## Attention à la configuration TLS

Cette version modifie la syntaxe des options de version de protocole TLS. Une écriture du type `>= TLSv1.2` (avec un **espace** après le signe) est désormais interprétée comme `>=TLSv1.2`. En revanche, un `>=` ou `<=` qui n'est suivi d'aucun nom de protocole devient une **erreur de syntaxe**. Il faut relire la configuration avant de mettre à jour.

## Pourquoi c'est important pour moi

Postfix est le serveur de messagerie le plus répandu sous Linux. On le trouve aussi comme simple relais d'envoi sur beaucoup de serveurs (alertes de supervision, notifications Nextcloud). Le risque reste modéré, mais le sujet est typique de la maintenance courante : appliquer les mises à jour de la distribution et **vérifier la configuration avant** pour éviter une panne de messagerie.

## Vérification rapide

```bash
postconf mail_version
postconf -n | grep -E "tls_protocols|tls_mandatory_protocols"
```
