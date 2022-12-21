---
title: The 
---


<%~ await includeFile("embed.eta", { url: "https://lobste.rs/s/22yudo/kindelia_kind_next_gen_functional" }) %>


this is a new programming language, right?
and the people who made it are also making a blockchain thing for it to run on.
which made some people, including me, sad.
so someone laments this, and someone else comes in: 

<style>
/* TODO: move this to missing.css */
blockquote blockquote { font-size: 1em }
</style>

> The author writes in the Kindelia Readme:
> > There is no native coin. It is not a cryptocurrency. It is a cryptocomputer.
> Which to me says they’re focusing on the decentralized application portion of blockchains instead of the scam coins.

now, i wasn't convinced.
because, i'm no expert but, a blockchain can't work without a currency, right?
it's part of the algorithmic foundation to have some token that the chain itself can reimburse participants with...

so how did they do this? did they finally invent a Good Blockchain?

website takes me to readme, "There is no native coin" ok but how? readme takes me to whitepaper:

<figure class="contents">

> As for block rewards, the same principle holds. Tokens and applications can leave rewards that only the block miner can collect. For example, <mark>Kindelia's Genesis Token</mark>, a no-premine currency which will be deployed by the Kindelia Foundation on the first block, will include a method that mints coins once per block, following Bitcoin's emission curve. This serves as an incentive for miners that keep the network secure. In other words, Kindelia <mark>doesn't need a built-in token to have block rewards and miner fees</mark>. Instead, it flexibly allows users to pay fees in whatever tokens they want, and miners to collect block rewards from <mark>a constellation of user-deployed tokens, rather than a single official one</mark>.

<figcaption>
    <a href="https://github.com/Kindelia/Kindelia-Chain/blob/67f86e1bf580dbf592b3cb80e8da2ec14ce01ea7/WHITEPAPER.md"
    ><cite>Kindelia whitepaper</cite></a>,
    revision 67f86e1
    (highlighting mine)
</figcaption>

</figure>

**It's a marketing trick.**{.allcaps}
"No native coin" just means that the coin is pluggable.

<i>I'm going to commit crimes.</i>
