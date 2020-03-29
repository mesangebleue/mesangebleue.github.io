---
title:  "Docket Cheatsheet"
layout: single
classes: wide
permalink: /Docker_CheatSheet/
---
# Introduction

Docker est une technologie de containérisation sous Linux.

Il repose sur :
- les namespaces linux
- les cgroups
- des images


Les namespaces permetttent d'isoler les process dans un groupe de process. Un nouveau group peut avoir son rorpor process 'init'.

Les cgroups permettent de controler les ressources allouées à un process ou à un groupe de process.



Docker reste liée à une version d'un noyau Linux, celui du Host.

En principe le lancement d'un container Docker est plus rapide que le lancement d'une VM et devrait prendre moins de ressources.


Avoir une image système similaire et reprodiuctioible aide au dev/test/deloiement.
L'image du container est paramétrée par un fichier Dockerfile.


L'idée, faire une appli et décrire tout ce qu'il y a autour comme outils indispensable afin de de pouvoir déplyer facilement le tout
dans un environnement de production.


# docker-cli


La commande *docker* permet un ensemble de commandes pour maniouler des containers.


# les images

Les images sont souvent contruites récursivement, l'image B est construite à partir de l'image A.

Un dépot d'images : Docker Hub Registry

# Dockerfile


Il permet de créer une image

```
FROM debian:wheezy

MAINTAINER Baptiste Donaux <bdonaux@wanadev.fr>

RUN apt-get update \
    && apt-get install -y \
        nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY service_start.sh /home/docker/script/service_start.sh
RUN chmod 744 /home/docker/script/service_start.sh

ENTRYPOINT /home/docker/script/service_start.sh
WORKDIR /home/docker
```

puis
   docker build .

# Le container

On donne des param à une Image pour la connecter au reste du système (ex: mappage de ports)


# Le Docker registry

C'est le dépot des images de bases.

Celui par défaut et le Docker-Hub
POur s'en créer un perso faire :


# Liens

https://www.wanadev.fr/24-tuto-docker-demarrer-docker-partie-2/
