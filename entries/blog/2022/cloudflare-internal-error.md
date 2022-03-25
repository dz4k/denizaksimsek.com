---
tags:
- webdev
- bugfix
title: "Cloudflare Pages: Failed: an internal error occurred"
lang: en
---

I deploy my website on Cloudflare Pages (at time of writing). My builds were 
failing with the error message:

  ~~~
  17:24:49.795	Deploying your site to Cloudflare's global network...
  17:24:50.632	Failed: an internal error occurred
  ~~~

No other information.

Googling yields that many things can cause this issue. <!-- TODO: compile -->
In my case, it was a **directory called `_redirects/` in the output folder**.

Cloudflare expects `_redirects` to be a file to read redirect information from.
(Indeed, that's what I was using it for --- it was output to a directory by 
accident).
