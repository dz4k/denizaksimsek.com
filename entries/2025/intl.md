---
title: How do I internationalize my CMS?
---

## Background

Denizen is a CMS for personal websites.
I want to work on multi-language support --
people should be able to make websites and posts in any language they want.
(My own blog is in English, Turkish, and Toki Pona --
so this is a blocker for eating my dog food).

Every aspect of this feels like something other people must have already solved,
so I wanted to publicly ask if anyone has the secret right answers.


## Language picker

Requirements: Users should be able to set their site to "any language".
I know that's impossible to define, of course.
I'm happy to settle for "every language with an ISO-639 code"
including conlangs like Toki Pona (`tok`), which I want for my own site.
However, I can't find a good list anywhere.
Wikipedia has one that only lists two-letter codes,
and another that's split across 26 pages with quite a bit of missing data.
Ideally, I could just download a big JSON file of every assigned code,
with each language's native and English names,
as well as labels for the macrolanguages and non-language codes like 'zxx'.


## Fallback

In addition to marking up the website and the posts in it,
the language setting would be used for Denizen's UI
including phrases in the public blog like "reply to" or "last updated".
Since Denizen can't possibly be translated to every ISO-639 language,
it needs a fallback mechanism.

There's three tiers of sophistication for language matching, all of which I'd ideally like to support:

- Simple BCP 47 matching, e.g. `en-US` to `en`.

- Sister language matching, e.g. Dutch `nl` and Afrikaans `af`, or Turkish `tr` and Azerbaijani `az`.

- Unrelated language matching. I could swear I saw Wikipedia using Turkish as a fallback for Laz `lzz`,
  but I can't reproduce it. Nevertheless, it would be a desirable feature.
  For context, Laz and Turkish are not related linguistically (beyond loanwords),
  but most Laz speakers are bilingual in Turkish.

Here, [CLDR](https://cldr.unicode.org/) seems to promise a fix, but I couldn't figure out how.


## Selecting language for individual posts

The big social medias use heuristics to detect language.
It's expensive and goes wrong sometimes.

Is there an alternative?
If someone uses denizen to post mixed language articles (e.g. language learning material),
will they annotate it all correctly? Can I somehow do it for them?
Can I help them? Can I encourage them?
