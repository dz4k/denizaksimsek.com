---
title: The Server-side Frontend Developer
draft: true
---

_Normalize HTML!_

[htmx] is a frontend library that builds on the programming model of pre-JavaScript web apps, rather than imitating native apps.
This means that in an htmx app, the server (written in any language you like) generates HTML, and the client is the browser itself.
SPA frameworks, on the other hand, treat the browser as a _runtime_ for the actual client, written in JS, to run on.

The way htmx works is a lot clearer if you have a familiarity with the "full page reload" style of app.
While webdev Twitter would lead you to believe that this kind of app is a relic, they're actually everywhere.
Virtually all WordPress sites fit this category.
Countless old forums.
https://ezgif.com/ is an image editor written in this style.

And yet, many are puzzled at first when encountering htmx.
The orthodoxy of the online webdev community is to conflate server and client with frontend and backend.
So we can't blame anyone if upon hearing "server-rendered HTML", they understand "mix business logic with CSS classes".

But in reality, all web apps deliver HTML from the server[^1].
In fact, retrieving `/index.html` from a server is the first step of using any web app.

Part of the confusion stems from the concept of "the server".
Web apps are rarely served by a single server, so we should clarify what kind of server we're referring to.
In SPAs, the `index.html` is often served by a static file server, maybe a CDN,
and there's another server that serves data in an application-specific JSON-based format.
htmx does not stop you from creating a similar separation.
The only difference is that the server that serves the HTML, instead of serving JavaScript to drive UI,
drives the UI itself with htmx attributes.
This means it cannot be a dumb file server anymore, but the complexity is made up with by completely eliminating the client-side JS.

Server-generated HTML that the user interacts with through links and forms has lots of tooling around it.
After all, it's the oldest way to build an interactive web application.
The <dfn>links-and-forms</dfn> app can then be progressively enhanced with JS, but there is less tooling for this case.
Effort in the JavaScript ecosystem towards tooling seems to be focused towards frameworks that assume total control over HTML generation.
Though this might change with the _Islands Architecture_ trend[^2].

::: fig[HTML can truly be served by any language you like.]
 - Bob Nystrom <https://twitter.com/munificentbob> [2014-08-28 21:35](https://twitter.com/munificentbob/status/505061118503424000)
   > Observation: If you create a new programming language, no matter how obscure, someone will write a parser combinator library for it.
    
    - Daniel Spiewak <https://twitter.com/djspiewak> [2014-08-28 21:47](https://twitter.com/djspiewak/status/505064095746248704)
      > Followed very quickly by a web framework.
:::

[^1]: I could hedged by saying "most web apps",
but then people might ask me for examples of web apps that _don't_ serve HTML (I don't know of any) ---
instead of posting them without anyone asking.
The latter is less work for me and more educational for everyone.

[htmx]: https://htmx.org
