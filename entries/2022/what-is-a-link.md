---
title: What is a link?
draft: yes
---

 - text
 - href
 - rel
 - transclude
 - excerpt
 {role=list .tool-bar}

Link text and `rel` are the same, except that one is for humans and the other is for machines.
Remove rel, and you get [harder to scrape, harder to script][] resources.
Remove text, and you get [microsyntax][] --- #yay.

transclusion as formulated by hypermedia thinkers neglects the intricacies of quotation.

in the absence of transclusion in the WWW (beyond iframes),
we have a wealth of emergent conventions to guide the design of a transclusion feature:

 - embeds, opengraph. target page has control over the excerpt to be shown ---
   [control afforded by obscurity][].
   source page has control over which properties to show (rarely exercised).
 - extracts, quotes with a source link. source page has total control and can even fabricate quotes,
   but people can check the original source.
   if it's possible to comment on the source page, only one person needs to notice the misquote.

a truly comprehensive transclusion feature _as formulated by hypermedia thinkers_
would likely wreak havoc with the same-origin policy.

[microsyntax]: https://indieweb.org/microsyntax
[harder to scrape, harder to script]: #harder-to-scrape-harder-to-script
[control afforded by obscurity]: #control-afforded-by-obscurity


<aside>

## harder to scrape, harder to script

the machine-legibility of human-readable resources is abridged when humans are audience № 1,
and restored ehrn it's possible for the document to provide alternate information or representations of parts of itself.
otherwise, it becomes necessary to create another resource.

more generally, can we specify alternative representations for different audiences, machine or human?
the `src` and `alt` attributes of `<img>` specify different representations for visual and nonvisoal `@media`.

all forms of alternate representations preclude WYSIWYG.

</aside>

<aside>

## control afforded by obscurity

with HTML, it's hard to figure out what to extract from a page unless the author explicitly marks it.
"reading mode" implementations use heuristics,
and authors can obscure their document structure to game these heuristics.
opengraph tags allow the page to have embeds completely irrelevant to their actual contents.

</aside>
