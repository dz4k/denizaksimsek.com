---
title: Add Syndication Links On Your Personal Site Using Dev.to API
date: 2020-09-17 21:10:00
syndication:
  DEV: https://dev.to/dz4k/add-syndication-links-on-your-personal-site-using-dev-to-api-395
---

I recently started using the [RSS publishing][rsspub] option to syndicate posts from my personal site to DEV. This allows people to post comments under my posts, many of which might contain useful info. To allow any readers to easily discover and participate in these discussions, I've added links to the dev.to copies under my posts.

([Skip to code](#the-code))

I could, of course, add these links manually whenever I post, but being armed with such a powerful static site generator as Eleventy, I couldn't possibly _not_ automate it.

## The API and the Data File

Eleventy users will be aware of how easy it is to gather all kinds of data from various APIs and put it in your site, all statically without client-side code. Our task here is exceptionally simple: Pick out the `url` and `canonical_url` properties for each article, and create a mapping from the latter to the former.

~~~js
const fetch = require('node-fetch')

module.exports = fetch('https://dev.to/api/articles?username=dza')
    .then(res => res.json())
    .then(articles => articles.map(
        ({canonical_url, url}) => [canonical_url, url]))
    .then(Object.fromEntries)
~~~

**Note:** If you are copy-and-pasting this code, make sure to replace `dza` with your own dev.to username.

This will give us an object like this:

~~~json
{
	"https://www.denizaksimsek.com/2020/css-additional-box-shadow/":
	    "https://dev.to/dza/css-adding-additional-box-shadows-2lob",
	...
}
~~~

Now let's try using it in our templates:

~~~liquid
{%if devToSyndication[page.url]%}
<section class="syndication-links">
This article is syndicated to <a class="u-syndication"
    href="{{devToSyndication[page.url]}}">DEV</a>, where you can comment on it.
</section>
{%endif%}
~~~

Small problem: the `page.url` property Eleventy provides us is a relative URL, whereas the URLs we got from DEV are absolute.

Sounds like a job for the `URL` class!

~~~js
function makeRelativeUrl(url) {
	const urlObj = new URL(url)
	// you might want to append url.search and url.hash too
    // but it's unlikely, and a small amount of tech debt is
    // good for the soul
	return urlObj.pathname
}

...
({canonical_url, url}) => [makeRelativeUrl(canonical_url), url])
~~~

Now you should see links on any post that is syndicated to DEV.

## Appendix: The Final Data File {#the-code}

~~~js
const fetch = require('node-fetch')

function makeRelativeUrl(url) {
	const urlObj = new URL(url)
	return urlObj.pathname
}

module.exports = fetch('https://dev.to/api/articles?username=dza')
    .then(res => res.json())
    .then(articles => articles.map(
        ({canonical_url, url}) => [makeRelativeUrl(canonical_url), url]))
    .then(Object.fromEntries)
~~~

[rsspub]:  https://dev.to/settings/publishing-from-rss
