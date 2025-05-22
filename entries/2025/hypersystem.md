---
title: "Hypersystem: a pixel display font for Hypermedia Systems"
---

<style>
@font-face { font-family: "Hypersystem"; src: url(/assets/fonts/Hypersystem.ttf) format(truetype) }
</style>

<figure style="
  font-family: Hypersystem; hyphens: auto; color: #bbf7ff; background: black;
  margin: 2em 0; padding: 0 1em; border: 1px solid currentcolor;">

Hypertexts: new forms of writing, appearing on computer screens, that will
branch or perform at the reader’s command. A hypertext is a non-sequential
piece of writing; only the computer display makes it practical.

</figure>

**[Download Hypersystem](/assets/fonts/Hypersystem.ttf){download}**

Hypersystem is a new font I designed for the web version of Hypermedia Systems.

Recently, I reworked the web page of our book Hypermedia Systems
(<https://hypermedia.systems>). I was happy with the layout, but unhappy with
how the book title looked. It was set in Jaro, a great free display font we also
used for the print release, but I didn't think it worked to communicate the tone
of our book on the home page.

After trying out a few alternatives, Carson suggested that I adapt the lettering
from the cover of the [paperback edition]. The pixel artist we hired did an
absolutely fantastic job, but we decided to roll our own for the lettering.

[paperback edition]: <https://www.lulu.com/shop/deniz-ak%C5%9Fim%C5%9Fek-and-adam-stepinski-and-carson-gross-and-mike-amundsen/hypermedia-systems/paperback/product-jen2vm2.html>

<figure style="display: flex; flex-flow: row nowrap; gap: 1em;">

<figure style="margin: 0; flex: 1 1 auto;"><a href=/assets/photos/hypersys-lettering-1.png><img src=/assets/photos/hypersys-lettering-1.png></a></figure>
<figure style="margin: 0; flex: 1 1 auto;"><a href=/assets/photos/hypersys-lettering-2.png><img src=/assets/photos/hypersys-lettering-2.png></a></figure>
<figure style="margin: 0; flex: 1 1 auto;"><a href=/assets/photos/hypersys-lettering-3.png><img src=/assets/photos/hypersys-lettering-3.png></a></figure>

<figcaption>My early attempts at Hypermedia Systems cover lettering.</figcaption>
</figure>

After trying to make off-the-shelf fonts work for a while, we eventually asked
the artist for the original PSDs and I lettered in a custom title. Making it go
behind the car was Carson's idea.

<figure style="display: flex; flex-flow: row wrap; flex: 1 1 12em">
<a href=/assets/photos/hypersys-lettering-final.png><img src=/assets/photos/hypersys-lettering-final.png></a>
<figcaption>The published cover.</figcaption>
</figure>

The initial plan was to make an unslanted version of the lettering and put it
on the landing page as an image, but I'd recently heard about Panic's [Caps]
font design tool for the Playdate console, so I decided to give a making a whole
font a go.

[caps]: <https://play.date/caps>

Caps is great, but it can only save fonts in a Playdate-specific format --- a
fact I realized far too late. After much searching, I found [Bits'n'Picas], a
bitmap font tool that could both import the Playdate format and export to .ttf.

[Bits'n'Picas]: <https://github.com/kreativekorp/bitsnpicas>

The font is live on <https://hypermedia.systems>, both on the landing page and
in the content for chapter and section headings.

Right now, Hypersystem supports ASCII, rudimentary Turkish, and a few extra
punctuation characters.

**[Download Hypersystem](/assets/fonts/Hypersystem.ttf){download}**
