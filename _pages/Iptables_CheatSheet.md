---
title:  "IPtables Cheatsheet"
layout: single
classes: wide
permalink: /Iptables_CheatSheet/
---

# Introduction

IPtables est le front-end de passage de règles au module NETFILTER, module du
noyau Linux.


# Les tables

Netfilter possède 3 tables de bases :
- filter
- nat
- mangle

Chacune des tables possèdent des chaînes prédéfinies :
- INPUT
- FORWARD
- OUTPUT
- PREROUTING
- POSTROUTING

# Commandes utiles

Lister les règles d'une table.

```
# iptables -L -n -v
# iptables -t nat -L -n -v
# iptables -t mangle -L -n -v
```

Lister les règles sous la forme de règles à entrer
```
# iptables -t filter -S
```
Créer une nouvelle chaîne
```
# iptables -N MA_CHAINE
```

Flusher une table
```
# iptables -t mangle -F
```

Supprimer une chaîne MA_CHAINE
```
# iptables -D INPUT -j MA_CHAINE
# iptables -F MA_CHAINE
# iptables -X MA_CHAINE
```

# Le NAT

Le NAT (Network Address Translation) permet de passer des paquets réseaux
destinés à un réseau particulier (e.g. 10.0.0/8) à un autre réseau (e.g. 192.168.0.0/8).

Ainsi, par exemple, la machine faisant du NAT peut recevoir des paquets d'une
 machine en 10.0.0.1 à destination d'un autre machine ayant pour adresse  
 192.168.0.1. Pour que ce paquet soit routable, la machine NAT va changer
 l'adresse source pour mettre sa propre adresse (appartenant au réseau en
 192.168.0.0/24) et elle va se souvenir de la connexion entre les 2 machines
pour pour pouvoir faire le transfert en sens inverse des réponses de
 192.168.0.1 à 10.0.0.1.

[schema_NAT_1:schema_NAT_1.png]

Le NAT peut être :
- un NAT statique, où on donne une correspondance entre une adresse du LAN et
une adresse du WAN, on pourra accéder à la machine du LAN depuis le WAN.
- un NAT dynamique, où on donne une adresse IP et un réseau privé, l'adresse
IP sera l'adresse publique permettant d'accéder au sous réseau privé.
- une redirection port, on donne un port sur l'adresse IP WAN et on redirige
le flux vers un port d'une adresse IP du LAN.

## NAT statique

La configuration du NAT statique va se retrouver dans la table NAT de IPtable.

La règle iptable utilise la commande DNAT (Destination NAT) qui permet de changer
l'adresse Destination du paquet reçu par l'adresse de la machine cible.

## NAT dynamique

Le NAT dynamique permet à un ensemble de PC du coté LAN de sortir du coté WAN
 en utilisant une seule adresse IP externe.

En réalité un NAT dynamique permet de spécifier un ensemble d'adresse externe
 à souvent on utilise une seule adresse externe.

Le NAT dynamique peut être implémenté en utilisant deux types de commandes IPtables,
 SNAT ou MASQUERADE.

Dans le cas où on spécifie l'adresse de sortie à utiliser on utilise une règle
 IPtable dans la table NAT avec la commande SNAT.

La commande SNAT (Source NAT) va transformer l'adresse source des paquets
passant par l'interface publique pour lui mettre l'adresse publique.

Dans le cas où on ne spécifie par l'adresse de sortie on utilise une règle IPtable
 dans la table NAT avec la commande MASQUERADE.
Dans ce cas, on prendra l'adresse IP de l'interface publique comme adresse de sortie.

## Les helpers

Certains protocoles (dont ftp, tftp et irc) ont besoin de modules supplémentaires
pour pouvoir tracer correctement les sessions lors de l'utilisation du NAT.

# La conntrack

Le tracking de connexion permet de se souvenir d'un début de connexion ou d'une
connexion et de son état.

Une connexion peut être dans l'état NEW, ESTABLISED ou RELATED.

La signification de ces termes va dépendre du protocole (UDP, TCP, ...).

La conntrack est indispensable à l'implémentation du NAT.

## Commandes de conntrack

Lister le contenu de la conntrack :
```
# conntrack -L
```
Interprétation :

Vider la conntrack :
```
# conntrack -F
```

# Le futur de Iptables/Netfilter

nftables

https://developers.redhat.com/blog/2016/10/28/what-comes-after-iptables-its-successor-of-course-nftables/

ou BPF/eBPF.
