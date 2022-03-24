---
tags: blog
title: Intentionally Unscalable
date: 2022-02-06 14:52:45
...:
  Originally published as a <a
  	href="https://gist.github.com/dz4k/c6829e42066a5fba64238a68cf41abd7"
  	>GitHub Gist</a> on <time>2021-11-22</time></p>
---

\_hyperscript is intentionally unscalable. We make decisions that would be
obviously inadvisable to anyone looking to make scalable software, and dismiss
features like reactivity that seem to have proven themselves in this regard. To
understand why, I examine and critique the concept of "scalable".

**Scalability refers to the ability of a system to handle more work given more
resources.** This definition matches both formal definitions and common use in
application development circles. Given this definition, we can see that:

*   Scalability is unidirectional --- it only refers to scaling up, never
	scaling down. In fact, I never hear "scaling down" discussed at all.
	Declaring it out-of-scope to ascribe this to a wider culture of growth, I'll
	just speculate that perhaps scaling down is assumed to be trivial, or not
	necessary as a system that handles a large amount of work can necessarily
	handle a small amount, adequately, without modification.
*   When people talk about the scalability of a tool, they are usually employing
	metonymy. 
	<span><small>metonymy: I was excited when looking up this word on 
	[Tureng][], but "metonymy" doesn't really have the barebones simplicity of 
	the Turkish "ad aktarması" or the weight of the Arabic loan "mecaz-ı 
	mürsel".</small></span>
	They are discussing the impact of the tool on other systems'
	scalability (will _hyperscript hinder us as we get more users/our app gets
	more complex?) and not the scalability of the tool itself (can we get
	hyperscript to run N lines of code in T time with better hardware?)
*   System, work, resources --- a software development team consists of multiple
	systems using multiple kinds of resources to do multiple kinds of work.
	Which system is being discussed is usually clear through context, but we
	should be aware when "scalable" is used without such context.

<figure class="-indent">

| System   | More Work                                       | Resources       |
|----------|-------------------------------------------------|-----------------|
| Software | Serve more users.                               | Computers.      |
| Team     | Add complexity to the software and maintain it. | Time, money.    |

<figcaption>The two main systems in a software organization.</figcaption>
</figure>


## Why is scalability desired?

1.  "As our app gets more complex, X will prevent us from growing and
	maintaining it".

    There is an assumption that your app _will_ get more complex and partly that
    complexity is an environmental factor, as opposed to a consequence of the
    team's choices. Growing a codebase is adding complexity. Lamenting not being
    able to do that seems odd given the amount of lip service we pay to the
    glory of removing complexity.

2.	"As we get more users, the app we built with X will need rewriting".

	There is an assumption that we _will_ get more users. If this is true, and
	the organization containing the team has an actual monetization
	strategy, then it follows that we will also get more money.
	<span><small>**monetization:** The way that the "we'll need rewriting" 
	argument assumes growth, but rejects relying on it reminds me of paying 
	people in shares. If you can't trust it enough to just pay me the money 
	you'll <i class="sarc">definitely</i> make back, why should I?</small></span>
	If we need to build an app that serves N users eventually, does it not make 
	sense to do so when you have F(N-&epsilon;) dollars?
	<span><small>**epsilon:** I originally said this much more pithily: "if you
	are certain you'll grow to 1 billion users, and you need an app that can 
	handle that, why build it now on a startup budget when you're going to have
	the budget of a 1B-user app soon"</small></span>
	My more business-savvy friend [Ben Pate][] informs me that "many 
	million-user budgets have been wasted doing that [building a million-user 
	system before you have any users at all]", and that "You won’t get a billion
	users until you first earn a thousand".

	I don't know shit about running a company, but I reject designing our tools
	for startups that eat some VC money, don't generate profit _or_ any benefit
	for humanity, and get sold for the advertising value of their data.

	And what's so bad about rewriting anyway? I thought programmers liked
	writing code.
	<span><small>**liked writing code:** I'm aware that some people do 
	programming purely as a job. I sometimes envy the indifference I imagine 
	they have towards our petty squabbles.</small></span>
	We again pay lip service to how code is the easy part, and
	how legacy code sucks... Erlang has the famous "let it crash", anticipating
	issues and focusing on recovering from failure instead of preventing it. We
	can apply a similar concept: **"write to rewrite"**.


## Write to rewrite

Expect that you might need to rewrite your code, and be considerate of your
future self who is doing that. _hyperscript helps you do this in two ways:

-	**Readability over writability.** The fact that _hyperscript code examples
	look like plain English is just as much an achievement of the author as it
	is _hyperscript's. We do not do anything smart like Natural Language
	Processing; _hyperscript uses common and normal parsing techniques. C++,
	Perl, perhaps even Ruby have more complex grammars than _hyperscript. We
	give you tools like the `prop of object` and `object's prop` syntax. and the
	`it` variable that might seem magical but is actually little more than the
	accumulator register in an 8-bit processor. It is up to you the programmer
	to use these tools to create readable code. The burden you take upon your
	shoulders can include (but will not be limited to):
    -   Choosing between `rates of the result's data`, `its data.rates`, or
    	`result.data.rates`.
    -	Breaking up long expressions into statements. Besides readability and
    	English-like flow, this is also good for stepping through with a
    	debugger (yet another tool for a rewriter to understand the code).
    -	Reordering statements to make efficient use of `it`. If we do this
    	consistently, code that doesn't do this will stick out as
    	order-dependent and vulnerable to race conditions.

-	**Locality of behavior.** Ever looked through a GitHub repo, not been able
	to find the code you were looking for, eventually clone the repo locally and
	start "Jump to Definition"-ing and "Peek References"-ing your way towards
	your target, only to find out it's a wrapper for yet another function? If it
	is a Java project, I usually give up before reaching any source code files
	at all. Htmx "Carson" Org has written about [Locality of Behavior][]
	previously, so I'll direct you there.


## Conclusion

I recall what I now know to be an urban legend about the great architect Mimar
Sinan. Supposedly, when the keystones of some arches in a mosque he built were
yielding to old age, an engineer working on the restorations found a note in a
bottle signed by Koca Mimar Sinan Ağa himself. It was a step-by-step guide on
how to replace the keystone without disruption to the rest of the structure,
complete with drawings.

Putting aside the implication that our modern architects don't know how stone
arches are built, and that Great Sinan Agha The Architect expected such
architects to restore his works, this fictional Mimar Sinan clearly doesn't know
anything about scalability. If he did, he would predict when the Sultan would
die and make the mosque last exactly that long.

> When asked what their language is good for, many designers would say
> “everything” which really means “nothing”.
> <footer>
>
> -- Robert Nystrom, <cite>[What I Learned at the Emerging Languages Camp](http://journal.stuffwithstuff.com/2010/07/23/what-i-learned-at-the-emerging-languages-camp/)</cite>
> </footer>

Nystrom said this in the context of choosing a niche for your language, but I
believe it applies just as well to choosing a scale.

[Ben Pate]: https://twitter.com/benpate5280

[Locality of Behavior]: https://htmx.org/essays/locality-of-behaviour

[Tureng]: https://tureng.com


