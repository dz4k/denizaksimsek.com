---
tags: presentation
url: /2022/missingcss-meeting/
layout: false
hidden: true
---

<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,900;1,400&display=swap" rel="stylesheet">

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
	font-family: 'Fira Sans', sans-serif;
	font-size: 120%;
	line-height: 2rem;

	scroll-behavior: smooth;
}

.slide {
	min-height: 100vh;
	padding: 10vh;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

body > header {
	font-size: 1.6em;
}

ul, ol {
	padding: 0;
}
	ul ul, ul ol, ol ul, ol ol {
		padding-inline-start: 2em;
		list-style: disc;
	}

p, li, pre, blockquote {
	max-width: 70ch;
}

h1, h2, h3, h4, h5 {
	text-align: center;
	line-height: 1.1xem;
}

h1 {
	padding: 1em;
	font-size: 3em;
	font-style: italic;
	transform: rotate(-.17rad);
}

pre, code, samp, kbd {
	font-family: 'Iosevka Term SS08', monospace, monospace;
}

blockquote {
	font-style: italic;
	text-align: center;
	color: #444;
	font-size: 1.1em;
}

<title>missing.css proposals</title>
</style>

<header class="slide">
	<h1>missing.css</h1>
	<p><i>proposals</i>
</header>

<section>

	<header class="slide">
	<h2>Plain HTML</h2>
	<ul>
	<li>normal classless stuff
	<li>Avoid applying correct styling to incorrect HTML
		<ul>
		<li>Where can <code>&lt;main></code> elements go?
		</ul>
	<li><b>TODO</b> Go through HTML spec &sect;4, and make a demo page
		with all the elements.
	<li><b>TODO</b> Find markup conventions and add them to the demo page
	</ul>
	</header>

	<section class="slide">
	<h3>Plain HTML Patterns</h3>

	<h4>Sidenotes</h4>
	<ul>
	<li><code>aside</code> has unwanted semantics:</a>
		<blockquote>The aside element represents a section [...] which <mark>could be
		considered separate from that content.</mark></blockquote>
	<li>There's a sidenote component here, but the HTML is far too complex to write
		inline: <a href="https://www.kooslooijesteijn.net/blog/sidenotes-without-js">
		Koos Looijesteijn, <cite>Making semantic sidenotes withoutJavaScript</cite></a>

	<li>
	<code>small</code> is close enough:
		<blockquote>The small element represents side comments such as small
		print.</blockquote>
	</ul>
	</section>

	<section class="slide">
		Sidenotes in usage:
		<pre class="language-html"><code
>&lt;p>The system features logicless templating, <mark><b>&lt;span>&lt;small></b>
(Great unless you need to make an HTML monthly calendar,
ever)<b>&lt;/small>&lt;/span></b></mark> layouts and partials.&lt;/p></code></pre>
	</section>

</section>

<section>

	<header class="slide">
	<h2>ARIA-based Components</h2>
	<ul>
	<li>The WAI-ARIA Authoring Guidelines provide recommendations on how common
		widgets should be implemented
	<li>If a page uses these, style accordingly
	<li><a href="https://adrianroselli.com/2021/06/using-css-to-enforce-accessibility.html">
			Adrian Roselli, <cite>Using CSS to Enforce Accessibility</cite>
		</a>
	<li><b>TODO</b> Go through the example implementations and add
		them to the demo page
	</ul>
	</header>

	<section class="slide">
	<h3>Example: Tabs</h3>
	<ul>
		<li><a href="https://benpate.github.io/hyperscript-widgets/tabs/tabs">https://benpate.github.io/hyperscript-widgets/tabs/tabs</a>

	</ul>
	</section>

</section>

<section>

	<header class="slide">
	<h2>Non-HTML components</h2>
	<ul>
	<li>Not eveything has unique markup convention
	<li>Multiple possible notations:
		<ul>
		<li>Class: <code>&lt;div class="warning">...&lt;/div></code>
		<li>Attribute: <code>&lt;div ms-warning>...&lt;/div></code>
		<li>Custom element: <code>&lt;missing-warning>...&lt;/missing-warning></code>
		</ul>
	<li>I personally prefer the custom element, but we could provide all of them
	</ul>
	</header>

	<section class="slide">
	<ul>
	<li>Components may alter descendants
	<li>When <code>@scope</code> gets browser support, we can restrict this
	<li>For now, use <code>></code> etc.
	</ul>
	</section>

</section>

<section>
	<header class="slide">
	<h2>Utility classes</h2>
	<ul>
	<li>I don't have experience with utility class frameworks
	<li>Everything in this section is preference
	</ul>
	</header>

	<section class="slide">
	<ul>
	<li>Two kinds of utilities:
		<ul>
		<li>"Semantic" utilities (e.g. <code>full-bleed</code>,
			<code>clearfix</code>, <code>jumbotron</code>)
		<li>CSS property utilities (e.g. <code>m-3</code>, <code>sm-flex-column</code>)
		</ul>
	</section>

	<section class="slide">
	<ul>
	<li>For semantic utilities, start with a hyphen:
		<pre><code>&lt;div class="-full-height -centered"></code></pre>
		<small>(This is a convention from RSJS)</small>
		</ul>
	</section>

	<section class="slide">
	<ul>
	<li>For CSS utilities, use a CSS-like syntax (?)
		<pre><code>&lt;div class="margin:1 :hover{margin:.5} :hover{font-size:2}"></code></pre>
		<ul>
		<li>Compared to a fully utility-based framework like Tailwind, missing.css
		users will use fewer utility classes
	</ul>
	</section>
</section>

<script>
const slides = Array.from(document.querySelectorAll('.slide'))
let currentSlide = 0

// ---

function goToSlide(n) {
	if (n < 0 || n >= slides.length) return
	currentSlide = n
	slides[currentSlide].scrollIntoView(true)
}

// ---

addEventListener('keydown', e => {
	if (e.key === 'ArrowDown') {
		e.preventDefault()
		goToSlide(currentSlide + 1)
	}
	else if (e.key === 'ArrowUp') {
		e.preventDefault()
		goToSlide(currentSlide - 1)
	}
})

addEventListener('wheel', e => {
	e.preventDefault()
	if (e.deltaY > 0) {
		goToSlide(currentSlide + 1)
	}
	else {
		goToSlide(currentSlide - 1)
	}
})
</script>

