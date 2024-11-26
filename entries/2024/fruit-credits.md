---
title: 'Fruit Credits: a personal accounting app based on hledger'
---

I recently published the first pre-release version of [Fruit Credits] on Flathub.
(I then immediately published two more because the reviewer discovered a bug).

[Fruit Credits]: https://fruitcredits.dz4k.com


## why: boring life stuff

After quitting my job and realizing it would be a while before I found a new one[^1],
I realized I might need to be a bit more responsible with money.
Naturally, I downloaded [hledger].

[hledger]: https://hledger.org

I'd tried to use hledger before but couldn't make a habit of it.
I was concerned that my new attempt could be a procrastination mechanism,
but to my surprise, it was actually massively helpful.
Even after one month, I felt more in control of my life than ever before,
and it's kept me in the black since.

It was hard for me at first to see the value of keeping your own books
when banks already record and present a history of transactions.
Right now, the benefits I experience are:

  - **Everything is in one place.**
    Most people keep multiple accounts at multiple banks.
    Banks are somehow all shit at application engineering,
    or even just providing usable data export.
    Before picking up hledger, I straight-up had no idea _how much money I had_.

  - **The data is queryable.**
    I'm talking super basic stuff --
    I've not even scratched the surface of what one can do with plain text accounting,
    yet it's still massively valuable to ask the computer
    "how much did I spend on A since B?"

  - **The usual reasons.**
    It's free software operating on free file formats.
    I can see my account balances without popups offering me loans I can't pay back.

[^1]: I'm fine -- I live with my parents, have no dependents
  and still have some income via [Hypermedia Systems].
  I would still very much like a job though, which is why
  I invested in highly demanded skills as Vala programming and Haskell Flatpak packaging.

[Hypermedia Systems]: https://hypermedia.systems

I started by typing transactions in the ledger format directly in a text editor.
Then, I started using `hledger add`, which has autocompletion capabilities.
Unfortunately, both of these were too clunky for me --
maybe it takes getting used to, but I kept making typos in `hledger add`
and fumbling as I tried to undo them.

I imagined a GUI for adding transactions quickly that wouldn't require me to enter things in order.
This vision would eventually feature-creep itself into a GUI version of hledger.


## how: exciting computer stuff

I'd heard [Tauri] was Electron but good,
which was an attractive proposition to a web developer.
It took me about a week to give up --
it turns out making a web app look good as a desktop app is harder than Discord makes it look.

[Tauri]: https://tauri.app/

Being a GNOME user,
I was inspired by the many [GNOME Circle] apps to build something with [GTK4] and [libadwaita].
I fired up GNOME Builder and spent about 2 days paralyzed by the language selector.
After looking at code examples online, I decided [Vala] was the simplest option.

I used GNOME Builder to scaffold the app, and used it to develop for a while.
Eventually, I figured out how to build the app without it, and went back to Zed.

It took me a while to get everything configured --
for example, the default Builder template has a directory for translations with [gettext],
but there's extra setup required to actually build and use them.

However, between the build headaches, the programming inner loop was quite enjoyable,
especially with the new-ish [Blueprint] UI language.

[GNOME Circle]: https://circle.gnome.org/
[GTK4]: https://gtk.org/
[libadwaita]: https://gnome.pages.gitlab.gnome.org/libadwaita/
[Vala]: https://vala.dev/
[gettext]: https://en.wikipedia.org/wiki/Gettext
[Blueprint]: https://jwestman.pages.gitlab.gnome.org/blueprint-compiler/


### vala is pretty cool, imo

It seems that Rust is the recommendation for new GTK apps.
Unfortunately, I never got into Rust, and
I don't think adding the GObject memory management model into the mix would make it grow on me.

For the uninitiated, GObject is a subsystem that was originally part of GTK that
provides object-oriented programming and reference-counted memory management features in C.
Though GObject has some fun features like signals,
there's little fun to be had in writing classes in C --
even with all the macro magic provided, class definitions are full of boilerplate code.
In addition, the reference counting mechanism requires you to `g_object_ref ()` and unref your objects manually.

One feature of GObject is the ability to generate bindings to other languages,
including ones with actual OOP features,
which allows GTK apps to be implemented in a variety of languages.
However, these bindings often suffer from various impedance mismatches
between GObject and the languages' own object models.

Vala, however, is implemented with GObject in mind from the start.
It has built-in syntax for features (like signals)

Though I've fallen in love with Vala, I can see why other people might not enjoy it.
It has unfixed compiler bugs, and a standard library that was written for C.
Most frustratingly though, refcounting is not as ergonomic as full tracing garbage collection,
and when using C libraries (including GObject based ones!)
that expect you to be comfortable with creative usage of memory,
you can run into hard-to-debug segfaults.

The de facto debugger for Vala is [gdb], and it has no Vala support.
You have to debug through the generated C.
I had no gdb experience.
Thankfully, GLib has a built in logging framework that makes printf-style debugging quite comfortable.

What draws me to Vala is the feeling of consideration that it exudes from every orifice.
I would constantly discover that whatever I was trying to do,
the Vala designers knew I'd need to do it, and had implemented a feature to make it easier.

[gdb]: https://en.wikipedia.org/wiki/GNU_Debugger


### flatpacking haskell

A GTK app written in Vala and compiled with Meson is the happiest of happy paths for Flatpak.
Unfortunately, hledger, which Fruit Credits necessarily depends on, is written in Haskell.

Flathub requires not only that everything is built from source,
but also that all necessary sources can be downloaded before the build process (which is sandboxed).
This is antithetical to the model used by Haskell (and npm, and cargo, and many others)
where a build tool downloads dependencies and discovers transitive dependencies at the same time.

After a few days of digging through outdated resources, I understood that
a tool called [cabal-flatpak] was the best way to generate Flatpak manifests that
fetch and compile Haskell libraries in the right order.
Unfortunately, despite seemingly being under active maintenance, the tool had bugs,
and no discernible way to report them.
Since I don't know Haskell, I couldn't maintain a fork,
so I wrote [some jq and shell to work around the bugs][manifest generator].

Upon submitting my app to Flathub, I found out I was something of a pioneer:

> - **bbhtt:** why are these needed and why do you need to do this manually?
> - **dz4k:** The haskell modules in the manifest are based on the output of
>   [cabal-flatpak](https://hackage.haskell.org/package/cabal-flatpak-0.0)
>   and the article [How to Flatpak a Haskell App into Flathub](https://medium.com/@lettier/how-to-flatpak-a-haskell-app-into-flathub-86ef6d69e94d).
>   Are there more up-to-date resources for bundling Haskell programs?
> - **bbhtt:** <mark>No, we don't have haskell apps. This is probably the second or third one ever.</mark>
> {role="list"}

-- [Add com.dz4k.FruitCredits by dz4k · Pull Request #5731 · flathub/flathub](https://github.com/flathub/flathub/pull/5731#discussion_r1805683874)
{.quote-attribution}

fun.

[cabal-flatpak]: https://hackage.haskell.org/package/cabal-flatpak
[manifest generator]: https://github.com/flathub/com.dz4k.FruitCredits/tree/master/scripts


## what: thermonuclear war stuff

Though Fruit Credits is pretty barebones compared to what hledger can do,
it's crossed from "dogfooding" to actually usable software for my use cases.
Queries and transaction input work well.

I'm currently working on a setup interface to create a new ledger file from scratch,
as well as making the app more beginner-friendly in general.
I'd like to add some way of editing and deleting transactions,
and some reporting features.

My usage of hledger is pretty limited in the grand scheme of things,
so I won't be able to cover every use case by myself.
I'd love it if people gave Fruit Credits a try,
even if just to tell me how it couldn't read their journal file.

------

- [get it on Flathub](https://flathub.org/apps/com.dz4k.FruitCredits)
- [get the code on Codeberg](https://codeberg.org/dz4k/fruit-credits)
- [complain about it on Codeberg](https://codeberg.org/dz4k/fruit-credits/issues)
- [look at the website on the website](https://fruitcredits.dz4k.com/)
