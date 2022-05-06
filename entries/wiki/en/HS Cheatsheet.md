---
title: _hyperscript Cheatsheet
---

<style>
html {
    overflow: auto;
}

.e-content {
    column-width: calc(var(--line-length) - var(--rhythm));
    column-gap: var(--gap);
    max-width: calc(2 * var(--line-length) + var(--gap));
    padding-inline: var(--gap);

    /* Full bleed */
    width: 100vw;
    margin-left: 50%;
    transform: translateX(-50%);
}

section.missing-card {
    display: table;
    margin-top: 0;
    width: 100%;
}

dl div {
    margin-block: var(--gap);
}
</style>

<section class="missing-card">

## Event listeners

|      | Syntax               | Meaning                                                      |
|------|----------------------|--------------------------------------------------------------|
|      | **`on`**             | add event listener                                           |
|      | `every`              | do not queue events                                          |
|      | **`mousemove`**      | event name                                                   |
|      | `(clientX, clientY)` | expose the event’s properties                                |
|      | `[clientX > 100]`    | filter events                                                |
|      | `3`                  | only respond to 3rd click                                    |
| _or_ | `3 to 10`            | respond to 3rd, 4th … 10th click                             |
| _or_ | `3 and on`           | respond to all clicks except 1st and 2nd                     |
|      | `from #my-form`      | element to attach listeners to, (?? me)                      |
|      | `debounced at 200ms` | trailing debounce (200ms delay, resets on every event)       |
| _or_ | `throttled at 200ms` | every 200ms at most regardless of the number of events       |
|      | `or keyup ...`       | specify many events, each with its own from/debounce/…       |
|      |                      | if events arrive while the listener is already running…      |
|      | `queue all`          | add them to a FIFO queue                                     |
| _or_ | `queue none`         | discard them                                                 |
| _or_ | `queue first`        | enqueue the first one, discard the rest                      |
| _or_ | `queue last`         | enqueue the last one, discard the rest (this is the default) |


</section>
<section class="missing-card">

## Property access

 - `user.data.name`
 - `user’s data’s name`
 - `name of data of user` 
 - `data.name of user`
 - `user’s data.name`

</section>
<section class="missing-card">

## CSS literals

`#my-form`
:   Get element by id

`#{getID()}`
: Dynamic ID

`.active`
: Get elements by class

`.{getClass()}`
: Dynamic class

`<em, i />`
: Query selector all

`<ul:nth-child(${n}) />`
: Dynamic selector

</section>
<section class="missing-card">

## Sigils

`foo`
: local variable by default

`:foo`
: element scoped variable, persisted. can be declared with top-level set. behaviors are isolated from one another

`$foo`
: global variable

`@foo`
: HTML attribute

</section>
<section class="missing-card">

## Array operations

`first in arr` ≡ `first from arr`
≡ `first of arr` ≡ `first arr`

also `random arr`, `last arr`

</section>
<section class="missing-card">

## Finding elements

`closest <section/>`
: nearest enclosing section

`previous <section/> from #sec-2`
: last section that comes before section 2 (?? me)

`next <input, button, a/> from document.activeElement within #dialog with wrapping`
: element to focus when pressing Tab in a modal dialog

</section>
<section class="missing-card">

## Command index

<dl>

<div>
    <dt><code>add <var>.class</var> to <var>elt</var></code>
    <dt><code>add @<var>attribute=value</var> to <var>elt</var></code>
    <dt><code>add { font-size: ${<var>elt</var>}px; } to <var>elt</var></code>
    <dd>add classes/attributes/inline styles to <var>elt</var> (?? me)
</div>

<div>
    <dt><code>append <var>value</var> to <var>target</var></code>
    <dd>append to strings/arrays/elements, sets it = <var>target</var> (?? it)
</div>

<div>
    <dt><code>async <var>command</var></code> | <code>async do <var>command</var>… end</code>
    <dd>run commands in a non-blocking manner
</div>

<div>
    <dt><code>call <var>expr</var> | get <var>expr</var></code>
    <dd>sets it = <var>expr</var>
</div>

<div>
    <dt><code>continue</code>
    <dd>skips to next iteration in a loop
</div>

<div>
    <dt><code>decrement <var>lvalue</var> by <var>amount</var></code>
    <dd>sets <var>lvalue</var> = <var>lvalue</var> - <var>amount</var> (?? 1)
</div>

<div>
    <dt><code>fetch <var>/url</var> with <var>option: value</var>, …</code>
    <dt><code>fetch `/url/${<var>id</var>}/` with <var>option: value</var>, …</code>
    <dd>makes an HTTP request, see Fetch API docs for options
</div>

<div>
    <dt><code>go to url <var>/url</var> in new window</code>
    <dt><code>go to url `/url/${<var>id</var>}/`</code>
    <dd>navigate to a URL in the browser
</div>

<div>
    <dt><code>go to top of <var>elt</var> -- top/middle/bottom </code>
    <dt><code>go to top left of <var>elt</var> -- left/center/right</code>
    <dt><code>go to left of <var>elt</var> smoothly -- /instantly</code>
    <dd>scroll an element into view
</div>

<div>
    <dt><code>halt the event’s default</code>
    <dd>prevent default behavior
</div>

<div>
    <dt><code>halt default</code>
    <dd>same as above, and exits listener
</div>

<div>
    <dt><code>halt the event’s bubbling</code>
    <dd>stop event bubbling
</div>

<div>
    <dt><code>halt bubbling</code>
    <dd>same as above, and exits listener
</div>

<div>
    <dt><code>halt the event</code>
    <dd>stop both default and bubbling
</div>

<div>
    <dt><code>halt</code>
    <dd>all of the above
</div>

<div>
    <dt><code>hide <var>elt</var> with strategy</code>
    <dd>see `show`
</div>

<div>
    <dt><code>if <var>cond</var> then … else … end</code>
    <dd>if statement
</div>

<div>
    <dt><code>increment</code>
    <dd>see decrement
</div>

<div>
    <dt><code>js(<var>var</var>) … end</code>
    <dd>embed JavaScript
</div>

<div>
    <dt><code>log <var>value</var> with <var>func</var></code>
    <dd>logs the <var>value</var> to the console using <var>func</var> (?? console.log)
</div>

<div>
    <dt><code>make a <tag#id.class /> called <var>name</var></code>
    <dd>creates an element with the given tag, id and classes, sets <var>name</var> (?? it) = the created element
</div>

<div>
    <dt><code>make a <var>Class</var> from <var>args</var> called <var>name</var></code>
    <dd>calls the <var>Class</var> constructor with the <var>args</var>, sets <var>name</var> (?? it) = the created object
</div>

<div>
    <dt><code>put <var>rvalue</var> into <var>lvalue</var></code>
    <dd>see set
</div>

<div>
    <dt><code>put <var>content</var> into <var>elt</var> -- into/before/after/at start of/at end of</code>
    <dd>insert content into various parts of the <var>elt</var>
</div>

<div>
    <dt><code>remove .<var>class</var> from <var>elt</var></code>
    <dd>see add
</div>

<div>
    <dt><code>remove @<var>attribute</var> from <var>elt</var></code>
    <dd>see add
</div>

<div>
    <dt><code>remove <var>elt</var></code>
    <dd>removes <var>elt</var> (?? me) from the document
</div>

<div>
    <dt><code>repeat for <var>name</var> in <var>iterable</var> index <var>i</var> … end</code>
    <dt><code>for <var>name</var> in <var>iterable</var> index <var>i</var> … end</code>
    <dd>loop over an iterable, the loop variable is <var>name</var> (?? it)
</div>

<div>
    <dt><code>repeat until event <var>e</var> from <var>elt</var> index <var>i</var> … end</code>
    <dd>Repeat every tick until event <var>e</var> is received from <var>elt</var> (?? me)
</div>

<div>
    <dt><code>repeat while <var>cond</var> | repeat until <var>cond</var> … end</code>
    <dt><code>repeat <var>n</var> times index <var>i</var> … end</code>
    <dt><code>repeat forever … end</code>
    <dd>--
</div>

<div>
    <dt><code>return <var>value</var> | exit</code>
    <dd>return, see also halt
</div>

<div>
    <dt><code>send    <var>evt</var>(<var>args</var>…) to <var>elt</var></code>
    <dt><code>trigger <var>evt</var>(<var>args</var>…) on <var>elt</var></code>
    <dd>dispatch a DOM event on <var>elt</var> (?? me)
</div>

<div>
    <dt><code>set <var>lvalue</var> to <var>rvalue</var></code>
    <dd>--
</div>

<div>
    <dt><code>settle</code>
    <dd>waits for any animations/transitions to end
</div>

<div>
    <dt><code>show <var>elt</var> with <var>strategy</var> when <var>cond</var> -- strategy: display:_/visibility/opacity/…</code>
    <dd>show <var>elt</var> (?? me) using the <var>strategy</var> (?? display:block) if <var>cond</var> (?? true) is true, else hide it
</div>

<div>
    <dt><code>take .<var>class</var> from <var>eltA</var> for <var>eltB</var></code>
    <dd>remove class from <var>eltA</var> (?? .class) and add it to <var>eltB</var> (?? me)
</div>

<div>
    <dt><code>tell <var>elt</var> … end</code>
    <dd>set <var>you</var> = elt, default to <var>you</var> over <var>me</var>
</div>

<div>
    <dt><code>throw <var>exception</var></code>
    <dd>throws an exception
</div>

<div>
    <dt><code>toggle .<var>class</var> on <var>eltA</var> for <var>t</var> s </code>
    <dt><code>toggle [@<var>attr=value</var>] until <var>evt</var> from <var>eltB</var></code>
    <dt><code>toggle between .<var>class1</var> and .<var>class2</var> on <var>eltA</var></code>
    <dd>toggle classes and attributes on <var>eltA</var> (?? me)
</div>

<div>
    <dt><code>transition the <var>elt</var>'s <var>prop</var> to <var>value</var> … over <var>t</var> s</code>
    <dd>Animate style properties
</div>

<div>
    <dt><code>wait <var>t</var> s -- or ms</code>
    <dd>Waits for the given duration
</div>

<div>
    <dt><code>wait for <var>event</var> or <var>event2</var> or <var>t</var> s</code>
    <dd>waits for one of the events to occur, sets it=the event
</div>
</dl>

</section>
