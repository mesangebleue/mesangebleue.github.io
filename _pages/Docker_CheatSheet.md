---
title:  "Docket Cheatsheet"
layout: single
classes: wide
permalink: /Docker_CheatSheet/
toc: true
header:
  teaser: assets/images/docker.png
---
# Introduction

Docker est une technologie de containérisation sous Linux.

Il repose sur :
- les namespaces linux
- les cgroups
- des images (des filesystems)


Les namespaces permettent d'isoler les process dans un groupe de process. Un nouveau group peut avoir son propre process 'init'.

Les cgroups permettent de contrôler les ressources allouées à un process ou à un groupe de process.



Docker reste liée à une version d'un noyau Linux, celui du Host.

En principe le lancement d'un container Docker est plus rapide que le lancement d'une VM et devrait prendre moins de ressources.


Avoir une image système similaire et reproductible aide au dev/test/deploiement.
L'image du container est paramétrée par un fichier Dockerfile.


L'idée, faire une appli et décrire tout ce qu'il y a autour comme outils indispensable afin de de pouvoir déployer facilement le tout
dans un environnement de production.


# Les images

Les images sont souvent construites récursivement, l'image B est construite à partir de l'image A.

Pour voir la suite des images servant à créer l'image finale :
```
$ docker images
```
puis on choisit une
```
 docker history NomImage
```

Un dépôt d'images : Docker Hub Registry

pour créer une image, prendre une image du Registry ou faire évoluer une image et enregister cette évolution via
```
docker commit
```

# Le container

On déclare un container à partir d'une image.

Un container incarne la notion d'environnement.

On donne des paramètres à une Image pour la connecter au reste du système (ex: mappage de ports)

Les commandes ```docker container run``` et ```docker run``` sont les même.

Le **Dockerfile** est un moyen de donner les paramètres qui seront utilisés par le container à son lancement.


# Dockerfile

Il permet de créer une image, assembler une image de base et donner quelques commandes
supplémentaires pour en faire une nouvelle. Le *Dockerfile* permet également de définir
certains paramètres qui seront utilisés au lancement du container.

```
# L'image de base à utiliser
FROM debian:wheezy

MAINTAINER Bobo dada <bob@dada.com>

RUN apt-get update \
    && apt-get install -y \
        nginx

# Copier le fichier vers le nouveau FS
COPY nginx.conf /etc/nginx/nginx.conf

COPY service_start.sh /home/docker/script/service_start.sh
RUN chmod 744 /home/docker/script/service_start.sh

ENTRYPOINT /home/docker/script/service_start.sh
WORKDIR /home/docker
```

puis
```
 $ docker build .
```

# docker-cli


La commande *docker* permet un ensemble de commandes pour manipuler des containers.

```
$ docker pull hello-world
$ docker image ls
$ docker run hello-world
```

Les 2 premières commandes ont rapatrié une image et permis de faire la liste des images présentes en local.
La 3eme a permis de lancer un container à partir de cette image.

# Commandes utiles

## Avoir une console dans le container

```
$ docker run --tty --interactive debian:7
```

Vous devriez être dans un magnifique container avec un bash prêt à répondre. Vous remarquerez le temps de lancement est assez faible. Mais qu'avons-nous fait ? Détaillons ce qu'elle veut dire :

 -  L'option --tty permet d'attacher la console à notre console actuelle et de ne pas perdre le focus. C'est grâce à cette option que votre container ne va pas se terminer.
 -  L'option --interactive vous permet de dialoguer avec votre container. Sans cette option, tout ce que vous taperez dans votre console ne sera pas transmis au bash du container.

Il faut que le Dockerfile ait déclaré *CMD=/bin/bash*.

## Lister les containers

```
docker ps -a
```
équivalent à
```
docker container ls -a
```

```
docker container ls -a
CONTAINER ID        IMAGE                              COMMAND                  CREATED             STATUS                     PORTS                                            NAMES
8a5b91272180        faucet/faucet                      "/usr/local/bin/entr…"   9 days ago          Up 7 days                  0.0.0.0:6653->6653/tcp, 0.0.0.0:9302->9302/tcp   faucet
adf7036dccfb        colisanr/morbig:latest             "/home/opam/morbig/b…"   11 months ago       Exited (0) 11 months ago                                                    laughing_swartz
3e4a6fceec2d        colisanr/morbig:latest             "/home/opam/morbig/b…"   11 months ago       Exited (1) 11 months ago                                                    angry_snyder
dde5b1d3a906        hello-world                        "/hello"                 14 months ago       Exited (0) 14 months ago                                                    confident_bassi
4ab194a1bd61        buildroot   "/bin/bash -e /start…"   14 months ago       Exited (0) 14 months ago                                                    unruffled_rosali
```
Avec le *-a* on obtient toutes les containers existant, même ceux qui en sont pas UP.

## Lister les images

```
docker image ls
```
équivalent à
```
docker images
```

```
 $ docker images
REPOSITORY                           TAG                 IMAGE ID            CREATED             SIZE
<none>                               <none>              1f918fe50d27        9 days ago          101MB
faucet/faucet                        latest              c11601ffc8f0        9 days ago          213MB
faucet/python3                       4.0.0               301fd7e94942        8 months ago        58.4MB
brcm/bspbuilder                      latest              70df9cee49c0        11 months ago       7.4GB
debian                               9.8                 2d337f242f07        12 months ago       101MB
brcm/bspbuilder   latest              15d0cd491172        15 months ago       7.44GB
hello-world                          latest              fce289e99eb9        15 months ago       1.84kB
buildroot     latest              7ac12b4dd9e1        15 months ago       2.69GB
colisanr/morbig                      latest              08731feb424c        19 months ago       1.63GB
```

Avec l'option *-a* on obtient les images intermédiaires. Information que l'on peut
également obtenir par
```
docker image history NomImage
```
.

## docker run

Fait
```
docker create
docker start
```

Pour stopper un container, faire
```
docker stop
```

Attention si je refait un *docker run*, je refais un *create* et donc j'ai plusieurs containers.



# Le Docker registry

C'est le dépôt des images de bases.

Celui par défaut et le Docker-Hub([https://hub.docker.com/]()) mais il est tout a fait possible d'en avoir un a soi.

D'après [https://docs.docker.com/registry/]() :
   The Registry is a stateless, highly scalable server side application that stores and lets you distribute Docker images.

   A registry is a storage and content delivery system, holding named Docker images, available in different tagged versions.

   A registry is an instance of the registry image, and runs within Docker.

Pour s'en créer un perso faire :

```
$ docker run -d -p 5000:5000 --name registry registry:2
```

# Le stockages des images en local

Sur Ubuntu

```
$ docker info
```

permet de voir que **Docker Root Dir: /var/lib/docker**


La page [https://www.freecodecamp.org/news/where-are-docker-images-stored-docker-container-paths-explained/]()
explicite un peu l'organisation des fichiers de Docker.

Pour les images, on procède par une image mère puis des overlay. Le tout es contenu dans **/var/lib/docker/overlay2**.

La page [https://dev.to/napicella/how-are-docker-images-built-a-look-into-the-linux-overlay-file-systems-and-the-oci-specification-175n]()
explique le principe d'un OverlayFS et parle, un peu, des Images Docker.

Les Open Container Initiative (OCI) defintions des Images et Containers.

# Docker et le réseau


## Passer un port

```
-p 8888:5000
```
.


## Les Bridge Docker

**TODO**
.


## Commande docker network


**TODO**
.


## Docker de DPDK

Il semble possible d'utiliser DPDK.

Il est nécessaire d'utiliser docker en mode privilégié et de lier des emplacements systèmes au
container.

Par exemple :
```
docker run -it --privileged -v /sys/bus/pci/drivers:/sys/bus/pci/drivers -v /sys/kernel/mm/hugepages:/sys/kernel/mm/hugepages -v /sys/devices/system/node:/sys/devices/system/node -v /dev:/dev --name NAME -e NAME=NAME -e IMAGE=IMAGE IMAGE"
```
prise dans [https://github.com/jeremyeder/docker-dpdk/blob/master/Dockerfile]()



# Questions

Les accès réseaux possibles

Les accès aux périphériques ???
- [https://stackoverflow.com/questions/24225647/docker-a-way-to-give-access-to-a-host-usb-or-serial-device]()
- [https://subscription.packtpub.com/book/virtualization_and_cloud/9781783984862/2/ch02lvl1sec28/accessing-the-host-device-inside-the-container]()
- [https://www.losant.com/blog/how-to-access-serial-devices-in-docker]()

On lance quoi qd on lance un docker ?

Docker et LXC ?

# Liens

- [https://www.wanadev.fr/24-tuto-docker-demarrer-docker-partie-2/]() (+++)
- [https://docker-curriculum.com/]()  (+++)
- [https://www.smartwavesa.com/blog-articles/les-tutos-docker-episode-1/]()
- [https://docs.docker.com/get-started]()
- [https://docs.docker.com/engine/reference/commandline/docker/]()

[https://journaldunadminlinux.fr/tuto-docker-demarrer-avec-docker/]()

Faire son propre registry :
- [https://docs.docker.com/registry/deploying/]()
- [https://hackernoon.com/create-a-private-local-docker-registry-5c79ce912620]()



[https://journaldunadminlinux.fr/tuto-docker-demarrer-avec-docker/]()


[https://developers.redhat.com/blog/2015/06/02/can-you-run-intels-data-plane-development-kit-dpdk-in-a-docker-container-yep/]()

[https://software.intel.com/en-us/articles/using-docker-containers-with-open-vswitch-and-dpdk-on-ubuntu-1710]()


[https://stackoverflow.com/questions/24225647/docker-a-way-to-give-access-to-a-host-usb-or-serial-device]()
