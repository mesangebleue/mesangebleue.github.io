---
layout: single
classes: wide
title: Cours sur ROS2 - Introduction
permalink: ros2_introduction
excerpt: "Cours sur ROS2 - Introduction"
header:
  teaser: assets/images/rosorg-logo1.png
toc: true
toc_sticky: true
---

# Avis sur le cours de  Coursera

Ce cours est très mal réalisé. Le son est très mauvais et
les explications dures à suivre.

Les exemples sont assez mal présentés et l'utilisation de Tilix de cette
façon est vraiment à éviter ...

Toutefois le contenu global n'est pas trop mal pour une première introduction à ROS2.

# Contenu du cours d'intro à ROS2

Chargement d'un module et d'un Node. Par exemple le Node TurtleSim.

Chargement d'un Node de commande de mouvement du NodeSim.

Les Nodes s'échangent des messages.

Un Node peut être Publisher.

Un Node peut être Subscriber.

On peut Souscrire à plusieurs messages.

Notion de Topic pour un message.

Un petit programme permet de voir les relations Pub/Sub entre Nodes.

Exemple d'écriture d'un Pub et d'un Sub en Python.

Petit exemple d'utilisation avec un env de simulation + complexe.


Écriture d'un package ROS2.

On utilise les données d'un Node de la simulation, d'un capteur Camera pour
analyser des images avec OpenCV et mettre des BoundingBox avec annotation autour des
éléments reconnus.

# Mes propres manipulations

En relation avec le cours mais faites en dehors de ce cadre.

La doc ROS2 et les tutos allant avec sont de très bonne qualité.

## Install de ROS2

Install de ROS2 sur Ubuntu20.04 LTS
https://docs.ros.org/en/foxy/Installation/Linux-Install-Debians.html


## Mise en place de l'environnement
```
source /opt/ros/foxy/setup.bash
 ```

Permet notamment d'avoir l'aide de TAB qd on utilise une commande ros2.


## Commandes courantes

```
 ros2 node info
 ```
 et
 ```
 ros2 node list
 ```
 permet d'avoir une liste et des infos sur les Nodes *en cours d’exécution*.

```
 ros2 topic info ...
 ros2 topic echo ...
```


## Création d'un package et utilisation d'OpenCV

Chargement d'un package.

Téléchargement par git.

```
mkdir PERSO/Coursera-ROS2-Intro/
mkdir -p PERSO/Coursera-ROS2-Intro/ws/src
cd PERSO/Coursera-ROS2-Intro/ws/src
git clone https://github.com/HemaZ/ankhbot_gazebo.git
```
un package qui est un fork d'un package existant, avec un ajout de capteur camera.

Install de l'outil de build *colcon*

```
aptitude install ???
```

```
colcon build
```
va construire des répertoires build et install au niveau du répertoire src et
builder le projet.


On utilise une commande ROS pour créer un package

```
ros2 pkg create NomPackage
```

ceci va créer automatiquement un répertoire sources avec certains fichiers prédéfinis
```
── obj_detection
    ├── obj_detection
    │   └── __init__.py
    ├── obj_detection_node.py
    ├── package.xml
    ├── resource
    │   └── obj_detection
    ├── setup.cfg
    ├── setup.py
    └── test
        ├── test_copyright.py
        ├── test_flake8.py
        └── test_pep257.py

```
