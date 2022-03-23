---
tags: post
title: CSS — Adding Additional Box Shadows
date: 2020-09-02 12:54:44
syndication:
  DEV: https://dev.to/dz4k/css-adding-additional-box-shadows-2lob
---

When you want to add a box shadow to an element, but don't want to override any it might already have. ([Jump to code](#the-code))

## Less-than-amazing solutions

We could copy the `box-shadow` property from the element in question, paste it and append our additional shadow at the end. Of course, this requires us to know the box-shadow on the target element, which might not always be possible (say, making a reusable `.highlight-glow` class).

[StackOverflow says to put the shadow on an absolutely-positioned pseudo-element](stackoverflow-says). This leaves us with a similar problem to the one we started with --- the element in question might already have styles on the `::before` or `::after` that conflicts with ours.

## My solution {#the-code}

Use CSS variables to apply box shadows.

~~~css
.shadowy-figure {
    --box-shadow: .5em .5em 1em #333;
    box-shadow: var(--box-shadow);
}
~~~

Later on, you can tack things on at the end of this variable, like so:

~~~css
.highlight {
    box-shadow: var(--box-shadow), 0 0 .1em #fff inset;
}
~~~

One drawback is that we cannot use this technique in several classes and apply them to one element. We can solve this problem when [`parent-var()`](parent-var) is a thing in CSS --- if it already is by the time you read this post, do let me know!

[stackoverflow-says]:  https://stackoverflow.com/a/11486224
[parent-var]:          https://lists.w3.org/Archives/Public/www-style/2012Aug/0891.html
