---
title: Eleventy — Dynamically Inlining Google Fonts
date: 2020-07-24 14:33:00
syndication:
  DEV: https://dev.to/dz4k/eleventy-dynamically-inlining-google-fonts-2geg
---

::: Warning :::
**Update <time>2021-02-07</time>:** I have learned since writing this post that this is a bad idea, since Google Fonts will serve different CSS based on the browser. If you want fast loading, vendor your fonts and use `<link rel=preload>`{.language-html}.
:::::::::::::::

All in the name of Lighthouse scores.

When you add Google Fonts to your website by copying the link from the fonts.google.com website, you create a request chain. That is, after loading the HTML of your page, the browser then needs to request a bit of CSS from Google, and only then can it start loading the fonts themselves. A simple solution to this is to copy the CSS returned by Google and paste it into a `<style>` element in your page. However, I like to change fonts quite frequently, and I'd like to automate this process. This is easy with Eleventy.

## A JavaScript data file

We simply fetch the CSS at build time.

~~~js
// _data/googleFontsStylesheet.js

const fetch = require('node-fetch')

const url = 'the URL in the Google Fonts stylesheet link href'

module.exports = fetch(url).then(res => res.text())
~~~

And include it in our base layout.

~~~liquid
<style type="text/css">{{googleFontsStylesheet|safe}}</style>
~~~

Enjoy your improved Lighthouse scores!
