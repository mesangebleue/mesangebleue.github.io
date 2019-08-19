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

Jekyll est un système de production de site web statique.
Il offre un certain cadre pour écrire des articles, des pages et produire automatiquement
un site web à partir de ces données.

Le contenu est écrit dans un dérivé du Markdown et chaque page de contenu permet en plus
d'utiliser le langage de formating *Liquid*.

Donc une fois qu'on a configuré / désigné son site comme on veut, la création
d'une nouvelle page, d'un nouvel article est très rapide. Il suffit d'écrire un simple
fichier Markdown, d'y rajouter une petite en-tête, 2 commandes et le site est généré.

Jekyll est statique, contrairement à d'autres sysèteme de production web, donc pas
de base de donnée, ce qui évite de potentiel problème (injection de requête SQL)
et une certaine lourdeur.
Bien sur Jekyll a un potentiel moindre qu'un Wordpress, mais il est parfait pour
un petit site de Blog voir pour faire des sites professionels plus conséquents (
        https://jekyllrb.com/showcase/
        )


Jekyll est un programme en langage de script Ruby.

Ruby utilise un gestionnaire de paquets appelé gem.

# Résumé des étapes

Donc, pour faire vite :
- on installe Jekyll avec un thème
- on écrit quelques posts de blog en Markdown
- on execute Jekyll

et voilà, on se retrouve avec un site (que l'on peut facilement faire héberger,
sur GitHub Pages entre autre).


# Installation

Installation des packages Jekyll fourni par Ubuntu.

Le package installera la quasi totalité des fichiers dans */usr/lib/ruby/vendor_ruby/jekyll*

https://github.com/jekyll/jekyll

# Qu'est ce ca fait

Un site Jekyll, quand vous travaillez dessus se présente avec une structure définie.

```
├── _config.yml
├── _data
|   └── members.yml
├── _drafts
|   ├── begin-with-the-crazy-ideas.md
|   └── on-simplicity-in-technology.md
├── _includes
|   ├── footer.html
|   └── header.html
├── _layouts
|   ├── default.html
|   └── post.html
├── _posts
|   ├── 2007-10-29-why-every-programmer-should-play-nethack.md
|   └── 2009-04-26-barcamp-boston-4-roundup.md
├── _sass
|   ├── _base.scss
|   └── _layout.scss
├── _site
├── .jekyll-metadata
└── index.html # can also be an 'index.md' with valid front matter
```

https://jekyllrb.com/docs/structure/

Pour obtenir cette arborescence il suffira d'utiliser la commande

```
jekyll new repertoire_de_mon_site
```
En réalité avec cette commande certains des répertoires de la structure ne seront pas
placés dans votre nouveau répertoire. Pour connaitre leur emplacement faite :

```
bundle show minima
```

Ensuite, grosso modo, si pouvez écrire des fichiers au format Kramdown (une forme de MarkDown)
dans le répertoire \_posts, avec une en-tête en *Font Matter*,
et vous pouvez générer votre site static avec des blogs de posts.

```
jekyll build
```
produira votre site dans le répertoire *\_site*.




Facile, mais comment faire un peu plus ? Comment changer l'aspect d'un site ?
Tout d'abord, il est possible de changer de thème.

Pour plus de détails sur le fonctionnement interne de Jekyll, consultez :
https://www.bytesandwich.com/jekyll/software/blogging/2016/09/14/how-does-jekyll-work.html

Pour résumer :
- on regarde tout les fichiers rencontrés dans le répertoire de travail
- si c'est un répertoire commencant par un *_*, et si ce n'est pas *_posts* ou *_pages*, on ignore ce répertoire
- les fichiers retenues seront soit omis, copiés tel quels ou transformés.
- les fichiers transformés sont les fichiers ayant une en-tête *Front Matter*

# En-tête *Front Matter*

Cette en-tête des fichiers indique des règles de transformations à Jekyll.

En fait cette en-tête permet de définir et/ou donner une valeur à des variables
du langage *Liquid*, le langage de templating utilisé par Jekyll.

Ainsi donner une valeur à une variable connu dans les règles de transformations
pour produire permet de configurer la page.

Parmi les variables toujours présentes on peut citer :
- layout
- permalink
- published
- date
- category
- tags

On peut également mettre toutes les variables qui seront utilisés dans les règles de transformations
et qui sont mis dans les Objet Ruby *Page*.
Par exemple :
- title
- author
- toc
- classes
- excerpt

Il est également possible de définir ses propres variables pour les utiliser dans la page.

```
---
food: Pizza
---

<h1>{{ page.food }}</h1>
```

Les variables composites comme *header.teaser* la forme YAML est :
```
header:
  teaser: VALUE.png
```

Attention les variables prédéfinies (utilisées par les règles de transformations)
dépendent de ces règles, donc du thème Jekyll choisi et des plugins installés.


# Choix d'un thème

Le thème correspond à un ensemble de fichiers l'apparence final de votre site.
La commande de base de création de Jekyll utilisera le thème de base : *minima*.

Il existe bien sur un grand nombre d'autres thèmes.

J'ai choisi le thème *minimal-mistakes*.

https://mmistakes.github.io/minimal-mistakes/docs/installation/



# Configuration du thème

La configuration du thème, comme du site Jekyll en général se fait par l'intermédiaire
du fichier de configuration *\_config.yml*

https://mmistakes.github.io/minimal-mistakes/docs/configuration/




# Mon organisation

Je veux le maximum de largeur pour mes articles.

Je veux un accès facile par un menu à quelques pages de récapitulatif sur la gauche

Je veux un menu en haut avec des liens vers des pages ou des collections d'articles.
La majorité des articles seront probablement sur l'informatique mais il faut aussi des pages
sur le voyages et sur d'autres passions.

Le menu, \_data/navigation.yml

# Configurer les fontes

# Changer une chaine de caractère




# Configuration du footer

\_includes/footer.html

# Ajout d'un favicon

\_includes/head/custom.html
```
 <!-- start custom head snippets -->

 <!-- insert favicons. use https://realfavicongenerator.net/ -->
 <link rel="icon" type="image/x-icon" sizes="16x16" href="{{ '/assets/images/favicon-16x16.ico' | relative_url }}">
 <link rel="icon" type="image/x-icon" sizes="32x32" href="{{ '/assets/images/favicon-32x32.ico' | relative_url }}">

 <!-- end custom head snippets -->
```

rel attribute has to have value "icon".

# Utilisation de GitHub-pages


# Le SEO

# Le SiteMap

Plugin jekyll

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
