---
title: Making Kustom widgets that fit in with Nothing OS
---

I've been using a Nothing Phone (2a) for a while now. I love the built in widgets, but there's not enough of them, and most third-party widgets stick out like a sore thumb. Not even any of the Nothing-themed KWGT packs on the Play Store match.

So I tried my own hand at it, and with not much effort, I was able to make these two:

![A Nothing Phone home screen with weather, date, next event and pedometer widgets](/assets/photos/Screenshot_20240424-121527.png)

To my eyes, that's an exact match! The date and next event widgets are mine.

If you just want to have these widgets, you can download them. If you want to make your own, read on:

- [VeryFewThings Date](https://cloud.dz4k.dev/s/y5aDJyPWwYiG2tb)

- [VeryFewThings Next Event](https://cloud.dz4k.dev/s/Zsa8Zq2wCaeH5wH)

(this is my first time using Nextcloud's sharing links, so let me know if there's any issues)

I'll probably be updating these widgets and this guide, as well as making more widgets. In particular, some of the formulas in the next event widget are a bit messy.


## Background

The background of the widget is a Rectangle. Use formulas for the width, height and paint color (long press each property, and tap the calculator icon). The formulas are:

- **Width**: `$si(rwidth)$`
- **Height**: `$si(rheight)$`
- **Paint**: `$si(syscn1, if(si(darkmode), 10, 93)$`

I used a corner radius of 32, though that's my eyeball measurement and might not be exact. For 2x1 and 1x2 widgets, you can use an absurd number like 9999 to make them pill-shaped.


## Layout

The widget should have 32 points of padding.

Some Nothing widgets like the digital clock change based on their size. My date widget does the same thing. You can use these formulas to detect if the widget is wide or tall:

- **Wide**: `$si(rwidth) > 1.8 * si(rheight)$`
- **Tall**: `$si(rheight) > 1.8 * si(rwidth)$`

If neither of these are true, the widget is square.


## Text

Kustom can access your device's system fonts, including Nothing's custom fonts.

Dotted: NDot (Variant: 57 for big text, 55 for small text)
Monospace: Lettera Mono
Serif: Ntype82
Sans-serif: Roboto (weight 300)

Nothing uses the NDot font exclusively in all caps, so I recommend matching that.

- **Text color**: `$si(syscn1, if(si(darkmode), 100, 0))`
