---
title: "Tip: Instantly Edit Your Eleventy Site on Github"
date: 2020-08-17 20:12:00
syndication:
  DEV: https://dev.to/dz4k/tip-instantly-edit-your-eleventy-site-on-github-5cme
---

You're looking at the blog post you made yesterday, when suddenly a typo catches your eye. What is the fastest way to fix it? ([Skip to code](#the-code)).

**Note:** This tip assumes you use GitHub. It could likely be adapted easily for other Git providers.

Add the following to your base layout (note the `{{}}` and replace `<username>/<repo>` with the repo for the site):

~~~html
<script>
  addEventListener('keyup', e => {
    if (e.shiftKey === true) {
      switch (e.keyCode) {
      case 69: // E
        window.location = 'https://github.com/<username>/<repo>/edit/main/{{page.inputPath}}'
        break
      }
    }
  })
</script>
~~~

When you press <kbd>Shift+E</kbd>, the GitHub editor will open to the current page! The switch statement is there because I used to have a few more hotkeys.
