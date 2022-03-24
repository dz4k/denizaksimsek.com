---
tags: blog
title: 'Repost: "hyperscript 0.0.4 beta is going to be out soon..."'
date: 2021-02-13 17:45:11
repost of:
  name: “hyperscript 0.0.4 beta is going to be out soon [...]”
  url: https://twitter.com/htmx_org/status/1360593828894281736
---

<blockquote style="white-space: pre-wrap">
hyperscript 0.0.4 beta is going to be out soon

a sneak peek:

the wait command can now pause evaluation until an event is received

here a class is added, hyperscript waits for the transition to end, then the
element is removed

feature suggested by <a href="/">@DenizAksimsek</a>

<pre class="language-html">
&lt;div _="on click add .fade then wait for transitionend then remove">
  This is a notice. Click to dismiss.
  &lt;/div>
</pre>
</blockquote>
