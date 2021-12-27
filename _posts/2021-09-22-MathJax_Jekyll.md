---
layout: single
classes: wide
title: Use Mathjax3 with Jekyll
permalink: mathjax
excerpt: ""
header:
  teaser: assets/images/mathjax/mj-logo.svg
toc: true
toc_sticky: true
mathjax: true
---

# Introduction

Mathjax permet d'entrer dans une page des expressions mathématiques en Tex, MathML
et de produire une sortie en HTML ou SVG.

# Documentation

Page offcielle de MathJax
- [https://www.mathjax.org/](https://www.mathjax.org/)
- [https://docs.mathjax.org/en/latest/basic/mathjax.html](https://docs.mathjax.org/en/latest/basic/mathjax.html)
- [https://docs.mathjax.org/en/latest/index.html](https://docs.mathjax.org/en/latest/index.html)

La meilleure page sur MathJax3 et Jekyll :
[https://11011110.github.io/blog/2019/10/17/mathjax-3-jekyll.html](https://11011110.github.io/blog/2019/10/17/mathjax-3-jekyll.html)


Cette page décrit l'intégration de Mathjax3 dans Jekyll. La façon dont Jekyll traite
certaines balises implique l'intégration de code JS dans un include de Jekyll.


MathJax2 et Mathjax3 sont très différents.

D'un point de vue utilisateur, ce qui est le plus visible est la facon de configurer MathJax
(notamment le format d'entree et le format de sortie).

En Mathjax2 on pouvait passer par un objet JS définissant ces paramètres de la configuration
ou par une URL spéciale définissant des paramètres particuliers.
Avec mathjax3, la configuration est généralement chargée via l'inclusion d'un script de type :
https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js

Plusieurs script prédéfinie existent.


# Cas spécial du Kramdown et Jekyll

D'après [https://11011110.github.io/blog/2019/10/17/mathjax-3-jekyll.html](https://11011110.github.io/blog/2019/10/17/mathjax-3-jekyll.html)

<blockquote>
<p>
Kramdown
</p>
<p>
In kramdown, you don’t use the same delimiters for math. Kramdown expects to see mathematical formulas delimited by \$$ ... \$$ in its marked-up text input, always.
</p>
<p>It will determine from context whether it’s an inline formula or a display formula. It also doesn’t use the default delimiters in the html that it generates.
</p>
<p>Instead it outputs html that puts inline formulas inside &lt;script type="math/tex"\&gt; ... &lt;/script\&gt; html tags, and, similarly, puts display formulas inside &lt;script type="math/tex; mode=display"&gt; ... &lt;/script&gt; tags. This all worked in MathJax 2, and these script delimiters are still recommended in the MathJax 3 documentation, but they don’t work any more.
</p>
<p>
The right way to fix this would be either to get MathJax 3 to understand the script delimiters, or to get kramdown to know how to generate something that works in MathJax 3, but I don’t have a lot of control over either.
</p>
<p>And the second-best fix might be to use some other software after kramdown runs, to change the delimiters in the static html files before they get served to anyone, but I don’t have that option on my blog host. Instead, I followed a suggestion in the kramdown documentation for working with KaTeX, a competing JavaScript library to MathJax for formatting mathematical equations in web pages.
</p>
<p> The suggestion is to add to your html files a little bit of glue JavaScript code that recognizes the formula delimiters produced by kramdown and does something with them. In my case, the something that I want to do is just to convert them to the delimiters that MathJax defaultly recognizes.
</p>
</blockquote>



Il est donc nécessaire d'ajouter du code JS dans les pages de Jekyll.

Ajout du code suivant à la fin de mon _includes/head.html

```js

    <!-- for mathjax support -->
    {% if page.mathjax %}
<script type="text/javascript">
document.addEventListener('DOMContentLoaded', function(){
  function stripcdata(x) {
    if (x.startsWith('% <![CDATA[') && x.endsWith('%]]>'))
      return x.substring(11,x.length-4);
    return x;
  }
  document.querySelectorAll("script[type='math/tex']").forEach(function(el){
    el.outerHTML = "\\(" + stripcdata(el.textContent) + "\\)";
  });
  document.querySelectorAll("script[type='math/tex; mode=display']").forEach(function(el){
    el.outerHTML = "\\[" + stripcdata(el.textContent) + "\\]";
  });
  var script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
  document.head.appendChild(script);
}, false);
</script>
    {% endif %}

```

# Elements TEX utiles

Les éléments Tex qui m'ont été utiles :

[Mathematical expresssions](https://fr.overleaf.com/learn/latex/Mathematical_expressions)

Les matrices

$$
A=\begin{pmatrix}
a_{11} & a_{12} & \dots & a_{1n} \\
a_{21} & a_{22} & \dots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \dots & a_{mn}
\end{pmatrix}$$

~~~
$$
A=\begin{pmatrix}
a_{11} & a_{12} & \dots & a_{1n} \\
a_{21} & a_{22} & \dots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \dots & a_{mn}
\end{pmatrix}$$
~~~

Superscript et Subscript

$$x = \sqrt{a_{11}^2 + b^{(2+a)} + ...}$$

~~~
$$x = \sqrt{a_{11}^2 + b^{(2+a)} + ...}$$
~~~

Fraction

$$ e_1 = \frac{u_1}{|u_1|} $$

~~~
$$ e_1 = \frac{u_1}{|u_1|} $$
~~~
