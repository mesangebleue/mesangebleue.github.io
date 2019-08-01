g---
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

Jekyll est un système de production de site web statique.
Il offre un certain cadre pour écrire des articles, des pages et produire automatiquement
un site web à partir de ces données.

Le contenu est écrit dans un dérivé du Markdown et chaque page de contenu permet en plus
d'utiliser


# Installation


# Choix d'un thème


# Configuration du thème

# Mon organisation

Je veux le maximum de largeur pour mes articles.

Je veux un accès facile par un menu à quelques pages de récapitulatif sur la gauche

Je veux un menu en haut avec des liens vers des pages ou des collections d'articles.
La majorité des articles seront probablement sur l'informatique mais il faut aussi des pages
sur le voyages et sur d'autres passions.

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

__

# Mettre une image de header pas trop Grande

# Mettre des images teaser pour les articles

# Changer le CSS pour une page en particlier

# Changer le menu principal

# Changer la taille de la fonte

# Faire un menu avec des liens dans la page

# Mettre des id sur les titre avec kramdown


# Ajouter des favicon

# Ajouter un sitemap


# Liens

[https://jekyllrb.com/](https://jekyllrb.com/)

http://jekyllbootstrap.com/

https://mmistakes.github.io

https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/

https://www.taniarascia.com/make-a-static-website-with-jekyll/

http://jmcglone.com/guides/github-pages/
