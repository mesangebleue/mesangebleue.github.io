---
title:  "OpenVSwitch CheatCheet"
layout: single
classes: wide
permalink: /OpenVSwitch_CheatSheet/
---
# Introduction

OpenVSwtich est un switch virtuel.

C'est un switch de niveau 2. Il intervient au niveau 2 DE LA COUCHE OSI.
Ce qui correspond généralement à la couche Ethernet.

Une de ses fonctionnalités est de pouvoir créer créer des ports qui apparaitront
dans le système comme des interfaces réseaux ou bien de lui attribuer une interface
réseau réelle comme port.

Exemple de configuration avec des interfaces réelles et des ports.

[image]



Expliquer param type:Internal

Expliquer param

Tagged/Untagged

Notion de Trunk

Native-Tagged

Native-Untagged

Image pour expliquer les flux suivants les différents types.

Pour tracer les elements dans OVS
 sudo ovs-appctl ofproto/trace ovs_switch in_port=1,dl_vlan=35


Supprimer un VLAN d'un port
ovs-vsctl remove port eth1 tag 0



 sudo ovs-vsctl show

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


...
allow-ovs_switch BOX_NB300
iface BOX_NB300 inet static
    ovs_bridge ovs_switch
    ovs_type OVSIntPort
    ovs_options tag=2381
    address 192.168.1.100
    netmask 255.255.255.0


allow-ovs_switch WAN_2900
iface WAN_2900 inet manual
    ovs_bridge ovs_switch
    ovs_type OVSIntPort
    ovs_options tag=2900
    pre-up ip netns add WAN
    up ip link set WAN_2900 netns WAN && ip netns exec WAN ifconfig WAN_2900 up
    post-down ip netns del WAN




Liens :

http://www.openvswitch.org/support/dist-docs-2.5/tutorial/Tutorial.md.txt

https://www.lecoindunet.com/comprendre-notion-vlan-tagged-untagged-1629


https://vincent.bernat.ch/fr/blog/2017-linux-bridge-isolation


# OpenVswitch et les VLANs



# Utilisation des VLANs

# Rappel de commandes
