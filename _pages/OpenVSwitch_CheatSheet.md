---
title:  "OpenVSwitch CheatCheet"
layout: single
classes: wide
permalink: /OpenVSwitch_CheatSheet/
toc: true
---

# Introduction : Switch et VLAN

OpenVSwitch est un switch virtuel. Il peut remplir les même fonctionnalités
qu'un switch physique (voir plus) mais en logiciel.

C'est un switch multi-niveau, intervenant au niveau 2 et 3.
Nous ne parlerons ici que du niveau 2.
 Il intervient au niveau 2 de la couche OSI.
Ce qui correspond généralement à la couche Ethernet.

Une de ses fonctionnalités est de pouvoir créer des ports qui apparaîtront
dans le système comme des interfaces réseaux ou bien de lui attribuer une interface
réseau réelle comme port.

## Rappel sur le switch


Pour rappel un switch est un équipement réseau
chargé de commuter différents flux réseaux.
Un switch dispose de plusieurs ports réseaux pouvant accueillir un câble.

![reseau](/assets/images/OpenVSwitch_CheatSheet/reseau_switch.png)

Le switch apprend les adresses MAC sources et destinations qu'il voit passer sur les différents ports
ce qui lui permet de savoir vers quels ports doivent être dirigées les trames Ethernet.

![table des macs](/assets/images/OpenVSwitch_CheatSheet/switch_table.png)

Le switch peut également disposer d'une interface d'administration permettant
des gérer d'autres fonctionnalités. Parmi ces fonctionnalité on retrouvera
la gestion du protocole STP (Spanning Tree Protocol) et la gestion des VLANs.

Cet article parlera plus spécifiquement de la gestion des VLANs.

## Rappels sur les VLANs

Les VLANs (Virtual Local Area Network) permettent de catégoriser des paquets réseaux
pour en séparer les flux. Ainsi sur un réseau d'entreprise il peut y avoir un
VLAN Bureautique, un VLAN développeur et un VLAN public.
La configuration des différents switchs du réseau de l'entreprise permettra par exemple
de ne faire sortir les flux développeur que vers des prises Ethernet se trouvant physiquement
dans les salles réservées à cette catégorie de personnel.



Les VLANs sont une implémentation de la norme 802.1Q. Les paquets réseaux, niveau
2, donc Ethernet dans notre cas, vont se voir ajouter une information supplémentaire.



<table border="1">
<tr>
<td>adresse MAC dst.
</td>
<td>adresse MAC source
</td>
<td>Taille de la trame/EtherType
</td>
<td>Data
</td>
<td>FCS
</td></tr></table>


Une trame Ethernet avec du 802.1q examinée à travers Wireshark, donnera ceci :
![capture wireshark](/assets/images/OpenVSwitch_CheatSheet/vlan_wireshark.png)


![table des macs](/assets/images/OpenVSwitch_CheatSheet/reseau_switch_vlan.png)

Dans cet exemple :
* 2 ordinateurs sont sur le VLAN_1
* 3 sur le vlan2
* et 1 seul à accès aux VLAN_3 et au VLAN_4

Donc, bien que tous les ordinateurs soient connectés au même switch réseau, les VLANs
permettent de définir plusieurs réseaux indépendants.



# Commandes OpenvSwitch pour les VLANs

## Premier exemple

Disons que le switch de la figure précédente est joué par un ordinateur standard
faisant tourner OpenVswitch et qu'il dispose de 10 ports réseaux physique (eth0-eth9).


Pour créer le switch virtuel comme sur le dessin du dessus nous utiliserons la série
de commandes suivantes :

```
ovs-vsctl add-br br0

ovs-vsctl add-port br0 eth0 tag=1
ovs-vsctl add-port br0 eth1 tag=2
ovs-vsctl add-port br0 eth2 tag=1
ovs-vsctl add-port br0 eth5 trunks=3,4,5
ovs-vsctl add-port br0 eth6 tag=2
ovs-vsctl add-port br0 eth7 tag=2
ovs-vsctl add-port br0 eth8 trunks=3,4

```
Et voilà !

Il est à noter que les PC n'ayant accès qu'à un seul VLAN sont en mode [*access*](#le-paramètre-vlan_mode)
il ne seront donc récepteurs que de trames réseau taggées par leur VLAN mais en fait
ne recevront que des paquets sans en-tête 802.1q. Ceci est très utiles pour les
ordinateurs qui ne sont pas configurés pour gérer les VLANs, pour eux tout est
transparent, les VLANs sont gérés par le switch.


## Deuxieme exemple

Bien sur le premier exemple n'est utile que sur un vrai élément réseau utilisé
comme un switch. OpenVswitch peut toutefois être très utile pour communiquer sur plusieurs
réseaux ou avec des VMs.

Imaginons que votre réseau d'entreprise comporte 3 VLANs :
* le VLAN_1 correspond au trafic réseau pour Internet (adresse en 192.168.100.0/24)
* le VLAN_2 correspond au trafic réseau pour l'administration interne (adresse en 192.168.101.0/24)
* le VLAN_3 correspond au trafic vers des serveurs spéciaux (serveurs de tests par exemple)
(adresse en 192.168.102.0/24)

En configurant correctement OpenVswitch, vous pourrez avoir 3 interfaces réseaux
virtuelles, chacune pouvant s'adresser à un VLAN particulier.

```
ovs-vsctl add-br br0
ovs-vsctl add-port br0 vlan1 tag=1 -- set interface vlan1 type=internal
ovs-vsctl add-port br0 vlan2 tag=2 -- set interface vlan2 type=internal
ovs-vsctl add-port br0 vlan3 tag=3 -- set interface vlan3 type=internal
ovs-vsctl add-port br0 eth0 -- set port eth0 trunks=1,2,3
```

Ces commandes feront apparaître 3 nouvelles interfaces sur le système.
```
$ip link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT group default qlen 1000
    link/ether XX:YY:ZZ:XX:YY:ZZ brd ff:ff:ff:ff:ff:ff
3: vlan1: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1
    link/ether XX:YY:ZZ:XX:YY:ZZ brd ff:ff:ff:ff:ff:ff
4: vlan2: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1
    link/ether XX:YY:ZZ:XX:YY:ZZ brd ff:ff:ff:ff:ff:ff
5: vlan3: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1
    link/ether XX:YY:ZZ:XX:YY:ZZ brd ff:ff:ff:ff:ff:ff
6: br0: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1
    link/ether XX:YY:ZZ:XX:YY:ZZ brd ff:ff:ff:ff:ff:ff
```

Les interfaces vlan1,vlan2 et vlan3 peuvent être vues comme des interfaces TAP créées par
OpenVswitch. C'est le paramètre *type=internal* qui a permis cette création.

Pour accéder aux machines sur les différents VLANs, il suffira de configurer une adresse
pour chacune de ces interfaces. Par exemple avec la suite de commande :
```
$ifconfig vlan1 192.168.100.66
$ifconfig vlan2 192.168.101.66
$ifconfig vlan3 192.168.102.66
```


# Détails des paramètres des VLANs

La création d'un port peut comporter un grand nombre de paramètres.
Nous n'étudierons ici que les paramètres *tag*, *type* et *vlan_mode*.

## Le paramètre *tag*

Le paramètre *tag* contiendra la valeur numérique du VLAN. Cette valeur est un
entier entre 0 et 4095.

Exemple
```
ovs-vsctl add-port br0 vlan1 tag=1200
```

## Le paramètre *type*

Le type de l'interface peut prendre plusieurs valeurs (cf. [ovs-vswitchd.conf.db.5.pdf - page 22](http://www.openvswitch.org//ovs-vswitchd.conf.db.5.pdf) ).

Les types possibles sont :
* system
* internal
* tap
* geneve
* gre
* ipsec_gre
* gre64
* ipsec_gre64
* vxlan
* lisp
* patch

Une interface de type *internal* est un périphérique réseau virtuel qui peux envoyer
et recevoir du trafic.


## Le paramètre *vlan_mode*

Le *vlan_mode* est un paramètre optionnel qui peut avoir 5 valeurs :
* access
* trunk
* native-tagged
* native-untagged
* dot1q−tunnel

Le mode **dot1q-tunnel** ne sera pas abordé ici.

---

Un port du bridge en **access** transmettra en sorti les paquets réseaux d'un et un seul VLAN (indiqué par le paramètre *tag*).
Tout autre paquet (sans header 802.1Q ou appartenant à un autre VLAN ne seront pas transmis).
Les seuls paquets habilités à entrer par ce port sont les paquets sans header 802.1Q (ou alors les paquets
  appartenant au VLAN 0).
Ce type de port est généralement utilisé pour connecter un équipement générant
des paquets réseaux sans header 802.1Q.


![port en mode access](/assets/images/OpenVSwitch_CheatSheet/reseau_switch_vlan_access.png)

Dans cet exemple le PC est relié à un port en *access tag=12*. Le PC n'a pas de notion de VLAN, il
reçoit et émet des paquets sans header 802.1q donc dans aucun VLAN.
Le switch va prendre les paquets venant du PC et leur ajouter un header 802.1Q(12),
le mettant ainsi dans le VLAN 12.
Il fera l'opération inverse pour les paquets à destination du PC (suppression du header 802.1q).
Un paquet voulant atteindre le PC mais n'étant pas dans le VLAN 12 ne sera pas transmis.

Exemples de commande :
```
ovs-vsctl add-port br0 vlan12 tag=12 -- set interface vlan12 type=internal
```
est équivalent à
```
ovs-vsctl add-port br0 vlan12 tag=12 -- set interface vlan12 type=internal vlan_mode=access
```

---

Le paramètre **trunk** permets de définir un ensemble de VLAN, le port acceptera
tout les paquets de cet ensemble de VLAN.

![port en mode trunk](/assets/images/OpenVSwitch_CheatSheet/reseau_switch_vlan_trunk.png)

Exemples de commande :

```
ovs-vsctl add-port br0 my_port -- set interface my_port type=internal
ovs-vsctl set port my_port trunks=12,13
```

---

Un port **native-tagged** fera en sorte que les paquets entrant n'ayant pas de header 802.1Q s'en verront ajouter un
et qu'il sera mis dans le VLAN indiqué par le paramètre *tag*. Le port taggera les paquets entrant.

![port en mode native-tagged](/assets/images/OpenVSwitch_CheatSheet/reseau_switch_vlan_native.png)

```
ovs-vsctl set port vnet0 tag=12
ovs-vsctl set port vnet0 trunks=13
ovs-vsctl set port vnet0 vlan_mode=native-tagged
```

Le VLAN porté par **tag** sera mis automatiquement dans le **trunks**.

---

Un port **native-untagged** fera en sorte qu'un paquet sortant, ayant un header 802.1Q
 et étant dans le VLAN indiqué par le paramètre *tag*,  se verra enlever son header 802.1Q.
Le port va untagger le paquet.


![port en mode native-untagged](/assets/images/OpenVSwitch_CheatSheet/reseau_switch_vlan_native_untagged.png)

```
ovs-vsctl set port vnet0 tag=12
ovs-vsctl set port vnet0 trunks=13,14
ovs-vsctl set port vnet0 vlan_mode=native-untagged
```




# Opérations courante sur le VLAN dans OpenVswitch

Ajouter un switch
```
ovs-vsctl add-br <switch>
```

Supprimer un switch

```
ovs-vsctl del-br <switch>
```

Ajouter un port
```
ovs-vsctl add-port <switch> <eth0> tag=<x>
```

Supprimer un port
```
ovs-vsctl del-port <eth0>
```

Modifier un port pour en faire un trunk
```
ovs-vsctl set port <eth0> trunks=3,4,5
```

Supprimer un des VLANs du trunk
```
ovs-vsctl set port <eth0> trunks=3,4
```


Supprimer un VLAN d'un port
```
ovs-vsctl remove port <eth1> tag <X>
```

Afficher un récapitulatif des bridges créés :
```
ovs-vsctl show

    Bridge ovs_switch
        ...
        Port "WAN_2900"
            tag: 2900
            Interface "WAN_2900"
                type: internal
        Port "BOX_NB300"
            tag: 2381
            Interface "BOX_NB300"
                type: internal
       ...
        Port "enp0s31f6"
            tag: 100
            trunks: [246, 247, 2380, 2381, 2900]
            Interface "enp0s31f6"
    ovs_version: "2.9.2"
```

Pour tracer les elements dans OVS
```
  ovs-appctl ofproto/trace ovs_switch in_port=1,dl_vlan=35
```

# Configurer un switch OpenVswitch au démarrage

Au démarrage de la machine, OpenVswitch (la partie server ovsdb-server), va se lancer
et restaurer la configuration entrée auparavant.
Il peut toutefois être utile d'entrer cette configuration via le fichier **/etc/netwoking/interfaces**.
Cette option permettra notamment de configurer la partie IP des interfaces, ce que ne permet pas OpenVswitch.

Voici un exemple de création d'un bridge *ovs_switch* ayant 2 port *internal* portant les VLANs 2381 et 2900.

```
...
allow-ovs ovs_switch
iface ovs_switch inet manual
    ovs_type OVSBridge

allow-ovs_switch VLAN_2381
iface VLAN_2381 inet static
    ovs_bridge ovs_switch
    ovs_type OVSIntPort
    ovs_options tag=2381
    address 192.168.1.100
    netmask 255.255.255.0

allow-ovs_switch VLAN_2900
iface VLAN_2900 inet manual
    ovs_bridge ovs_switch
    ovs_type OVSIntPort
    ovs_options tag=2900
    pre-up ip netns add WAN
    up ip link set WAN_2900 netns WAN && ip netns exec WAN ifconfig WAN_2900 up
    post-down ip netns del WAN

````


# Liens


[https://fr.wikipedia.org/wiki/IEEE_802.1Q](https://fr.wikipedia.org/wiki/IEEE_802.1Q)

[http://docs.openvswitch.org/en/latest/](http://docs.openvswitch.org/en/latest/)

[http://www.openvswitch.org/support/dist-docs-2.5/tutorial/Tutorial.md.txt](http://www.openvswitch.org/support/dist-docs-2.5/tutorial/Tutorial.md.txt)

[https://www.lecoindunet.com/comprendre-notion-vlan-tagged-untagged-1629](https://www.lecoindunet.com/comprendre-notion-vlan-tagged-untagged-1629)

[https://vincent.bernat.ch/fr/blog/2017-linux-bridge-isolation](https://vincent.bernat.ch/fr/blog/2017-linux-bridge-isolation)

[http://www.openvswitch.org/support/dist-docs/ovs-vswitchd.conf.db.5.pdf](http://www.openvswitch.org/support/dist-docs/ovs-vswitchd.conf.db.5.pdf page 23)

[https://blog.scottlowe.org/tags/ovs/](https://blog.scottlowe.org/tags/ovs/)
