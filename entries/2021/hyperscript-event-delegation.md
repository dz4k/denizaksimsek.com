---
title: Event Delegation in _hyperscript
date: 2021-05-20 12:43:49
---

TL;DR This is how you do it:

```hyperscript
on click
	tell the closest <li/> to the target
		remove yourself
		-- do more stuff...
		-- "you" refers to the clicked list item
```

Or more concisely:

```hyperscript
on click tell closest <li/> to target
	remove yourself
```

---

I've seen some people use a pattern like this:

```html
<ul>
	{% for item in items %}
		<li _="on click remove me">{{ item }}</li>
	{% endfor %}
</ul>
```

This is convenient to write if you have a server-side templating system, but
has a few issues:

 * The code needs to be parsed as many times as there are items.
 * The resulting HTML is bloated.
 * If you add more items to the list dynamically on the client, you need to repeat the code there.

The pattern for resolving this is called <dfn>event delegation</dfn>. Here's
how you might do it in JavaScript:

```javascript
ul.addEventListener('click', e => {
	const li = e.target.closest('li')
	if (!li) return
	li.remove()
})
```

We add a single event listener to the enclosing list, which finds the item
that was clicked and manipulates it.

In _hyperscript, the <code>tell</code> command allows us to manipulate an
element other  than <code>me</code> conveniently, by changing the implicit
target from <code>me</code> to <code>you</code>,  which refers to the "element
being told".
