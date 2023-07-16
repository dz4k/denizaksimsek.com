---
title: Using XPath in 2023
date: 2023-07-16 21:10
---

In the latest release of [htmx],
you can add event listeners to elements with `hx-on`:

```html
<form hx-on::beforeRequest="addCsrfToken(event);">
```

For all the other `hx-` attributes, we use CSS attribute selectors.
However, with `hx-on`, the attribute name is not fixed as it contains the event.
CSS attribute selectors support wildcards on the _value_ of attributes,
but not the name:

```css
[hx-trigger] /* common and normal */
[href^="https://dz4k.com"] /* "starts with" operator */
[^ĥx-on:] /* not a thing */
```

## <ruby>X<rt>XML</rt>Path<rt>Path Language</ruby>

XPath is a query language for extracting information from XML(-like) documents.
Its main use cases are XSLT and parsing API responses.

The XPath language is significantly more expressive than CSS,
making it possible to traverse the XML tree in any direction,
filter nodes based on arbitrary predicates,
and select any kind of node
(including comments, text nodes, and individual attributes).
Our non-existent CSS attribute could be written as follows:

```xpath
//@*[starts-with(name(), "hx-on:")]
```

This post is not supposed to be an XPath tutorial, but I'll break this one down:


`//`
: traverse the document (in CSS, this is the default)

`@*`
: find any attribute (mnemonic: **at**-tribute)

`[ ... ]`
: where...

`starts-with(name(), "hx-on:")`
: its name starts with `"hx-on:"`


CSS selectors don't have these kinds of features,
and it has good reasons not to.
CSS has strict performance requirements
-- to the point that "CSS optimization" is generally not a thing --
and selectors that offer more control could make slow selectors possible.
In addition, CSS has well-defined specificity rules, whereas XPath does not.

However, while these features make CSS great for stylesheets,
CSS selectors are also the most common way to find DOM elements in
JavaScript code and lacking in that regard.
Many libraries which extend HTML do so by traversing the entire document
and finding elements manually.
This is often not needed since, if you didn't know,
**XPath is built into browsers.**

## document.evaluate

The [`document.evaluate` API] is somewhat archaic,
partly because it was designed for talking to XML APIs over `XMLHTTPRequest`.
Here's a DOM-friendly wrapper:

```ts
function* xpath(...args) {
  let path, root = document;
  if (args.length > 1) [root, path] = args;
  else [path] = args;

  const nodeIterator = document.evaluate(
    path,
    root,
    null,
    XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
    null,
  );

  for (
    let node = nodeIterator.iterateNext();
    node != null;
    node = nodeIterator.iterateNext()
  ) {
    yield node;
  }
}

// TypeScript declaration
function xpath(path: string): Iterable<Node>;
function xpath(root: Element, path: string): Iterable<Node>;
```

[htmx]: https://htmx.org
[`document.evaluate` API]: https://developer.mozilla.org/en-US/Web/XPath/Introduction_to_using_XPath_in_JavaScript
