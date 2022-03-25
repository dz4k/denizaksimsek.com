---
title: Eleventy + Markdown + CoffeeScript = ❤
date: 2020-10-16 17:12:00
syndication:
  DEV: https://dev.to/dz4k/eleventy-markdown-coffeescript-p5a
templateEngineOverride: md
---

I've started using CoffeeScript instead of YAML for frontmatter, and it works like a dream. [Endorsed by Zach Leatherman][endorsed].

## Markdown with Frontmatter

As far as I know, Jekyll is the origin of using a YAML block at the top of a
Markdown file for metadata. It's not hard to imagine why this became popular ---
associating prose with data is a common use case, and though they have their
issues, both Markdown and YAML look pretty.* <small data-sidenote><q>It looks
pretty</q> is often what people really mean when they call something
"human-readable".</small>

## Eleventy Frontmatter

Eleventy uses frontmatter blocks (delimited by `---`) for all kinds of files. Markdown posts, HTML partials and Nunjucks/EJS/Liquid/... templates can all have them. The data in the frontmatter can then be used in templates. In the following, `title` is not a reserved name:

~~~
---
title: 'A Blog Post'
---

# {title}

Lorem ipsum dolor sit amet...

~~~

We could have used `name`, `heading` or `kdsad983erj33`.

---

Eleventy's ["Computed Data"][computed-data-docs] feature relies on functions in the frontmatter. As YAML doesn't have functions, you are expected to use JS (well, you can use template strings I guess...):

~~~html
---js
{
  title: "My page title",
  eleventyComputed: {
    currentDate: () => new Date().toLocaleString()
  }
}
---
<!doctype html>
<html>
--- … -->
<body>
   <p>This website was last generated on {{ currentDate }}</p>
  <!-- … -->
~~~

Computed data is cool. Among other things, it allows me to move logic away from my templates and express it in an actual programming language. However JS frontmatter is not very pretty, and I don't want to convert my whole frontmatter just for one function.

If only there was a language that had the expressive power of JS, and the visually clean data notation of YAML...

## CoffeeScript All The Time!

CoffeeScript is actually mentioned in the GitHub repo for `gray-matter`, the library Eleventy uses to parse frontmatter. Compared to YAML, it's not much more verbose:

<div id=compare class="-full-bleed-scroll" style="
	padding-inline: var(--dim-body-padding);
	display:flex;
	gap: 3ch;">

<style>
#compare pre {overflow: unset; margin-inline: 0}
</style>

~~~
---
title: Street sign in İstanbul
date: 2020-10-10 19:27:39
tags: [place, design]
photo: /photos/img02.jpeg
türkçe: /2020/istanbul-street-sign/
---
YAML
~~~

~~~
---
title: 'Street sign in İstanbul'
date: '2020-10-10T19:27:39+03:00'
tags: ['place', 'design']
photo: '/photos/img02.jpeg'
türkçe: '/2020/istanbul-street-sign/'
---
CoffeeScript
~~~

</div>

The CoffeeScript code above is actually fully YAML-compatible! This keeps my templates portable. And with computed data:

~~~liquid
---
layout: 'layout'
eleventyComputed:
	syndicationLinks: (data) ->
		DEV: data.devToSyndication[data.page.url]
---

<article class="h-entry">
	<!-- ... -->
	{%for silo, link in syndicationLinks%}
		<a class="u-syndication" href="{{link}}">{{silo}}</a>
		{%if not loop.last%} | {%endif%}
	{%endfor%}
~~~

I think that computed frontmatter gives a nice balance of logic-less* and
logic-full templates. <small data-sidenote>Logicless templates: For people
who will never need to make an HTML monthly calendar!</small>

[endorsed]: https://twitter.com/zachleat/status/1340057504567488513
[computed-data-docs]:	https://www.11ty.dev/docs/data-computed/
[js-frontmatter-docs]:	https://www.11ty.dev/docs/data-frontmatter/#javascript-front-matter
