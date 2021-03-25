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


## Code de l'exemple

Code de l'exemple du cours

*/ws/src/obj_detection/setup.cfg*

```python
import rclpy
from rclpy.node import Node

from sensor_msgs.msg import Image
import cvlib as cv
from cvlib.object_detection import draw_bbox
from cv_bridge import CvBridge
import time


class DetectorNode(Node):
    def __init__(self):
        super().__init__("detector_node")
        self.pub = self.create_publisher(Image, "/object_detection/output", 10)
        self.sub = self.create_subscription(Image, "/ankbot/camera/image_raw", callback, 10)
        self.cv_bridge = CvBridge()

    def callback(self, msg):
        time_now = time.time()
        img_opencv = self.cv_bridge.imgmsg_to_cv2(msg, desired_encoding="rgb8")
        bbox, label, conf = cv.detect_common_object(img_opencv)
        output_image = draw_bbox(img_opencv, bbox, label, conf)

        img_msg = self.cv_bridge.cv2_to_image(output_image, encoding="rgb8")
        img_msg.header = msg.header

        self.pub.publish(img_msg)
        self.set_logger().info("detection took {}%s".format(time.time()-time_now))

def main(args = None):
    rclpy.init(args = args)

    detector = DetectorNode()
    rclpy.spin(detector)
    detector.destroy_node()
    rclpy.shutdown()

if __name__ == "__main__":
    main()
```

