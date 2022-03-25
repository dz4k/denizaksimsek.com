---
title: "The Implementation of HDB, the _hyperscript debugger"
date: 2021-03-17 00:00:00
last modified: 2021-09-02T12:48+0300
syndication:
  Twitter: https://twitter.com/DenizAksimsek/status/1372244813928660993
  Hacker News: https://news.ycombinator.com/item?id=26494553
  DEV: https://dev.to/dz4k/the-implementation-of-hdb-the-hyperscript-debugger-5hf4

templateEngineOverride: njk,md
---

<script src="https://unpkg.com/hyperscript.org@0.9.5"></script>
<script src="https://unpkg.com/hyperscript.org@0.9.5/dist/hdb.min.js"></script>

**Update <time>2021-09-02</time>:** HDB has evolved since this post was written. Though it works mostly the same way, there have been fixes and a UI redesign. Check [the _hyperscript repo][] for the up-to-date code.</ins>

The 0.0.6 release of the [_hyperscript] hypertext UI scripting language introduces HDB, an interactive debugging environment. In this article I discuss how the hyper-flexible hyperscript runtime allowed me to implement the first release of HDB with ease. But first, I will introduce you to what HDB is like:

## The (Un)finished Product

The `breakpoint` statement stops execution and launches the HDB UI.

{% fig "Demo: The breakpoint command" %}
<button type="button" _="
on click
	breakpoint
	-- This is some sample code for you to explore HDB.
	-- Click 'Step Over' to move to the next command.
	-- Click 'Continue' to stop debugging.
	set my.innerHTML to 'You are stepping through!'
	transition 'background-color' to red
	wait for mouseover -- mouse over the button after you step over this
	transition 'background-color' to initial
">Click me to try HDB</button>
{% endfig %}

You can set breakpoints conditionally:

{% fig "Demo: Conditional breakpoints" %}
<label><input type=checkbox id=debugmode checked/> Debug Mode</label>
<button type="button" _="
on click
	if #debugmode.checked breakpoint end
	put 'Nothing to see here, end user' into me
">Debug, maybe</button>
{% endfig %}

## Implementation

HDB lives in a [single JavaScript file][hdb-src].

### Turning the keys

In the hyperscript runtime (which is a tree walking interpreter), each command has an `execute()` method which either returns the next command to be executed, or a `Promise` thereof. The execute method for the breakpoint command creates an HDB environment and assigns it to the global scope (usually `window`):


{% fig "hdb.js ln. 20", "https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L20" %}
~~~js
var hdb = new HDB(ctx, runtime, this);
window.hdb = hdb;
~~~
{% endfig %}

The `HDB` object keeps hold of the current command and context as we step through. (The context is the object holding the local variables for the hyperscript code, and some other things the runtime keeps track of). We call its `break()` method:

{% fig "hdb.js ln. 35", "https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L35" %}
~~~js
HDB.prototype.break = function(ctx) {
	var self = this;
	console.log("%c=== HDB///_hyperscript/debugger ===", headingStyle);
	self.ui();
	return new Promise(function (resolve, reject) {
		self.bus.addEventListener("continue", function () {
			if (self.ctx !== ctx) {
				// Context switch
				for (var attr in ctx) {
					delete ctx[attr];
				}
				Object.assign(ctx, self.ctx);
			}
			delete window.hdb;
			resolve(self.runtime.findNext(self.cmd, self.ctx));
		}, { once: true });
	})
}
~~~
{% endfig %}

There are a few things to unpack here. We call `self.ui()` to start the UI, which we'll get to later. Remember how a command can return the next method to execute as a promise? The break method resolves after the [internal event bus][] receives a `"continue"` event, whether by the user pressing "Continue" or simply reaching the end of the debugged code.

The "context switch" is the dirtiest part of it all. Because we can step out of functions, we might finish debugging session with a different context than before. In this case, we just wipe the old context and copy the current context variables over. Honestly, I thought I'd have to do a lot more of this kind of thing.

Speaking of stepping out of functions...

### Stepping Over and Out

Firstly, if self.cmd is null, then the previous command was the last one, so we just stop the debug process:

{% fig "hdb.js ln. 58", "https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L58" %}
~~~js
HDB.prototype.stepOver = function() {
	var self = this;
	if (!self.cmd) return self.continueExec();
~~~
{% endfig %}

If not, then we do a little dance to execute the current command and get the next one:

{% fig "hdb.js ln. 61", "https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L61" %}
~~~js
var result = self.cmd && self.cmd.type === 'breakpointCommand' ?
	self.runtime.findNext(self.cmd, self.ctx) :
	self.runtime.unifiedEval(self.cmd, self.ctx);
~~~
{% endfig %}

We perform a useless check that I forgot to take out (`self.cmd &&`). Then, we special-case the `breakpoint` command itself and don't execute it (nested debug sessions don't end well...), instead finding the subsequent command ourselves with the `runtime.findNext()` in hyperscript core. Otherwise, we can execute the current command.

Once we have our command result, we can step onto it:

{% fig "hdb.js ln. 64", "https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L61" %}
~~~js
if (result.type === "implicitReturn") return self.stepOut();
if (result && result.then instanceof Function) {
	return result.then(function (next) {
		self.cmd = next;
		self.bus.dispatchEvent(new Event("step"));
		self.logCommand();
	})
} else if (result.halt_flag) {
	this.bus.dispatchEvent(new Event("continue"));
} else {
	self.cmd = result;
	self.bus.dispatchEvent(new Event("step"));
	this.logCommand();
}
~~~
{% endfig %}

If we returned from a function, we step out of it (discussed below). Otherwise, if the command returned a Promise, we await the next command, set `cmd` to it, notify the event bus and log it with some fancy styles. If the result was synchronous and is a [HALT][]; we stop debugging (as I write this, I'm realizing I should've called [`continueExec()`][continue-exec] here). Finally, we commit the kind of code duplication hyperscript is meant to help you avoid, to handle a synchronous result.

To step out, we first get our hands on the context from which we were called:

{% fig "hdb.js ln. 80", "https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L80" %}
~~~js
HDB.prototype.stepOut = function() {
	var self = this;
	if (!self.ctx.meta.caller) return self.continueExec();
	var callingCmd = self.ctx.meta.callingCommand;
	var oldMe = self.ctx.me;
	self.ctx = self.ctx.meta.caller;
~~~
{% endfig %}

Turns out _hyperscript function calls already keep hold of the caller context (`callingCommand` was added by me though). After we change context, we do something a little odd:


{% fig "hdb.js ln. 92	", "https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L92"%}
~~~js
self.cmd = self.runtime.findNext(callingCmd, self.ctx);
self.cmd = self.runtime.findNext(self.cmd, self.ctx);
~~~
{% endfig %}

Why do we call `findNext` twice? Consider the following hyperscript code:

~~~hyperscript
transition 'color' to darkgray
set name to getName()
log the name
~~~

We can't execute the command to set `name` until we have the name, so when `getName()` is called, the current command is still set to the `transition`. We call `findNext` once to find the `set`, and again to find the `log`.

Finally, we're done stepping out:

{% fig "hdb.js ln. 95", "https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L95"%}
~~~js
self.bus.dispatchEvent(new Event('step'))
~~~
{% endfig %}

### HDB UI

What did I use to make the UI for the hyperscript debugger? Hyperscript, of course!

{% fig "hdb.js ln. 107", "https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L107"%}
~~~html
<div class="hdb" _="--
	on load or step from hdb.bus send update to me
	on continue from hdb.bus remove #hyperscript-hdb-ui-wrapper-">
~~~
{% endfig %}

There are a lot of elements listening to `load or step from hdb.bus`, so I consolidated them under `update from .hdb`. `#hyperscript-hdb-ui-wrapper-` is the element whose Shadow DOM this UI lives in --- using shadow DOM to isolate the styling of the panel cost me later on, as you'll see.

-------------

We define some functions.

{% fig "hdb.js ln. 112", "https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L112"%}
~~~hyperscript
def highlightDebugCode
	set start to hdb.cmd.startToken.start
	set end_ to hdb.cmd.endToken.end
	set src to hdb.cmd.programSource
	set beforeCmd to escapeHTML(src.substring(0, start))
	set cmd to escapeHTML(src.substring(start, end_))
	set afterCmd to escapeHTML(src.substring(end_))
	return beforeCmd+"<u class='current'>"+cmd+"</u>"+afterCmd
end
~~~
{% endfig %}

Now, I wasn't aware that we had [template literals][] in hyperscript at this point, so that's for the next release. The `escapeHTML` helper might disappoint some:


{% fig "hdb.js ln. 122", "https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L122"%}
~~~hyperscript
def escapeHTML(unsafe)
	js(unsafe) return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\\x22/g, "&quot;")
		.replace(/\\x27/g, "&#039;") end
	return it
end
~~~
{% endfig %}

Unfortunately, hyperscript's regex syntax isn't decided yet.

------------

And we have the most broken part of HDB, the prettyPrint function. If you know how to do this better, feel free to send a PR.

Having defined our functions we have a simple toolbar and then the **eval panel**:

{% fig "hdb.js ln. 158", "https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L158"%}
~~~html
<form class="eval-form"  _="on submit
	call event.preventDefault()
	get the first <input/> in me
	call _hyperscript(its.value, hdb.ctx)
	call prettyPrint(it)
	put it into the <output/> in me">

		<input type="text" id="eval-expr" placeholder="e.g. target.innerText">
		<button type="submit">Go</button>
		<output id="eval-output"><em>The value will show up here</em></output>
~~~
{% endfig %}

Why do I use weird selectors like `<input/> in me` when these elements have good IDs? Because `#eval-expr` in hyperscript uses `document.querySelector`, which doesn't reach Shadow DOM.

------------

A panel to show the code being debugged:

{% fig "hdb.js ln. 170", "https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L170"%}
~~~html
<h3 _="on update from hdbUI
		put 'Debugging <code>'+hdb.cmd.parent.displayName+'</code>' into me"></h3>
<div class="code-container">
	<pre class="code" _="on update from hdbUI
							if hdb.cmd.programSource
								put highlightDebugCode() into my.innerHTML
								scrollIntoView({ block: 'nearest' }) the
								first .current in me"></pre>
</div>
~~~
{% endfig %}

------------

Finally, a context panel that shows the local variables.

{% fig "hdb.js ln. 106", "https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L186"%}
~~~html
<dl class="context" _="--
	on update from hdbUI
		set my.innerHTML to ''
		repeat for var in Object.keys(hdb.ctx) if var != 'meta'
			get '<dt>'+var+'<dd>'+prettyPrint(hdb.ctx[var])
			put it at end of me
		end
	on click
		get closest <dt/> to target
		log hdb.ctx[its.innerText]"></dl>
~~~
{% endfig %}

That loop could definitely be cleaner. You can see the hidden feature where you can click a variable name to log it to the console (useful if you don't want to rely on my super-buggy pretty printer).

Some CSS later, we're done with the UI! To avoid CSS interference from the host page, we create a wrapper and put our UI in its shadow DOM:

{% fig "hdb.js ln. 350", "https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L350"%}
~~~js
HDB.prototype.ui = function () {
	var node = document.createElement('div');
	var shadow = node.attachShadow({ mode: 'open' });
	node.style = 'all: initial';
	node.id = 'hyperscript-hdb-ui-wrapper-';
	shadow.innerHTML = ui;
	document.body.appendChild(node);
	window.hdbUI = shadow.querySelector('.hdb');
	_hyperscript.processNode(hdbUI);
}
~~~
{% endfig %}

## The End

In just 360 lines, we have a basic debugger. This speaks volumes to the flexibility of the hyperscript runtime, and I hope HDB serves as an example of what's possible with the hyperscript extension API. Like the rest of hyperscript, it's in early stages of development --- feedback and contributors are always welcome!

[_hyperscript]: https://hyperscript.org
[the _hyperscript repo]: https://github.com/bigskysoftware/_hyperscript
[hdb-src]: https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js
[continue-exec]: https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L54
[HALT]: https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/core.js#L1221
[template literals]: https://hyperscript.org/expressions/string/
[internal event bus]: https://github.com/bigskysoftware/_hyperscript/blob/7740c7eccfe3fe4f09443ec0adb961c72eb27a7b/src/lib/hdb.js#L10
