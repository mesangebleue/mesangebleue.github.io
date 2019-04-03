---
layout: single
classes: wide
title: Creation d'un site statique avec Jekyll - Minimal-mistakes
permalink: creation_statique_jekyll
excerpt: "Creation d'un site statique avec Jekyll - Minimal-mistakes et GitHubPages"
header:
  image: assets/images/jekyll-logo-2x.png
  teaser: assets/images/jekyll-logo-2x.png
toc: true
toc_sticky: true
---

# Introduction

# Installation


# Choix d'un thème


# Configuration du thème

# Mon organisation

# Utilisation de GitHub-pages


# Le SEO

# Le SiteMap

# Toutes les balises YAML FrontMatter pour Minimal-mistakes


layout: single
title: Title of Your Post
canonical_url: "https://yoursite.com/custom-canonical-url"


---
layout: splash
classes:
  - landing
  - dark-theme
---

---
toc: true
toc_label: "My Table of Contents"
toc_icon: "cog"
---


excerpt: "A unique line of text to describe this post that will display in an archive listing and meta description with SEO benefits."

---
title: Portfolio
layout: collection
permalink: /portfolio/
collection: portfolio
entries_layout: grid
---

header:
  teaser: path-to-teaser-image.jpg


  defaults:
    # _posts
    - scope:
        path: ""
        type: posts
      values:
        layout: single
        author_profile: true
        read_time: true
        comments: true
        share: true
        related: true


        collections:
          portfolio:
            output: true
            permalink: /:collection/:path/

            author: Billy Rick


Mettre une image de header pas trop Grande

Mettre des images teaser pour les articles

Changer le CSS pour une page en particlier

Changer le menu principal

Changer la taille de la fonte

Faire un menu avec des liens dans la page
Mettre des id sur les titre avec kramdown


Ajouter des favicon

Ajouter un sitemap
