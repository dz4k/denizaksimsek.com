---
title: A versioning scheme for end-user software
---

The title is wrong. It should be more like "versioning scheme for software that suffers from the [spacebar heating] problem, i.e. software for which a "breaking change" cannot reasonably be distinguished from a non-breaking one.


## Background (feel free to skip)

I was planning on publishing the first ever alpha release of Denizen. I typed `git tag` into my terminal and paused.

I get these long pauses a lot. It usually happens when I'm starting a new project and want a good name, always a challenge having already used up Denizen.

I _was_ going to type `v0.0.0` and push. Then I thought, "hm, should it be 0.0.0 or 0.0.1?" Then I asked myself the real question, "how and why am I planning to use semver for a project with no public API beyond its user interface?" Denizen does interact with nonhuman systems via APIs, but these are things like Webmentions that are governed by external standards -- and besides, the target sites who these APIs target can't choose which version of Denizen is contacting them, so a semantic version is no use.

I started looking around online for alternative versioning systems. My conclusion was that SemVer was the worst system, except for all the others.

I was thinking of using a single increasing version number, but it didn't sit right with me. This post came from my attempt to figure out why.


## Concepts

A software package under CoolVer has three kinds of published version: release, pre-release and hotfix.

- Releases add, remove or alter features. They may or may not break your workflow based on your use case, environment, personality and vibes.

- Hotfixes fix bugs in previous regular releases (and do nothing else). The existence of a hotfix declares that the preceding version is broken and this one should be used instead. Hotfixes "shouldn't" break your workflow, if they do, it's because they had to.

- Prereleases are unstable testing releases in preparation for a regular release. Each prerelease may fix bugs or add/remove/alter features.


## Scheme

<figure>
<div style="text-align:center;padding-block:1em">

REGULAR.HOTFIX[-PRERELEASE]

where REGULAR = VANITY.RELEASE

and PRERELEASE = CHANNEL.NUMBER

</div>
<figcaption>The CoolVer versioning scheme.</figcaption>
</figure>

REGULAR is the regular-release identifier, either of this release (if it is a regular release) or the associated release (if it is a hotfix or prerelease).

VANITY is exactly what it sounds like. Increment it when you've made changes you're excited about, or you want other people to be excited about. Incrementing VANITY resets RELEASE, which otherwise increments with each regular release.

HOTFIX is the hotfix identifier. If the release is not a hotfix, it is 0. Otherwise, it is a number that monotonically increases **across the whole release history**. If a hotfix H to a release R has been backported to an older release B, the hotfix ID can be reused: V.B.H is the backporting of V.R.H to V.B.0.

PRERELEASE is for prereleases -- it consists of a CHANNEL like "alpha", "beta" or "rc", and a numerical identifier.

METADATA is build metadata as defined in SemVer.


## Example

- `0.0.0-alpha.0` starting a new project
- `0.0.0-alpha.1` still working on it
- `0.0.0-beta.0` anyone want to try it out?
- `0.1.0` it's stable
- `1.0.0-rc.1` i think i'm ready to start promoting this, let me know if you spot any bugs
- `1.0.0` hey everyone look at my production-ready, blazing-fast, webscale project!
- `1.0.1` oops, i broke the build
- `1.1.0` added frobinator
- `1.1.2` the frobinator had a bug
- `1.2.0-rc.1` sneak preview of barbinator
- `1.2.0` add barbinator
- `1.2.3` another frobinator bug we didn't catch until now
- `1.1.3` backport the frobinator fix for the people who hate the barbinator


## Rationale

CoolVer is syntactically compatible with SemVer and matches its sorting order. This means it can be used with most tools that expect SemVer.

Using the SemVer patch field for hotfixes, but tags for prereleases ensures that releases are sorted sensibly, and is arguably more SemVer than the `-hotfix.1` convention many projects use.

[spacebar heating]: https://xkcd.com/1172/
