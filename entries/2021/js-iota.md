---
tags: blog
title: Iota (from Golang) in JavaScript
date: 2021-01-10 17:57:00
syndication:
  DEV: https://dev.to/dz4k/iota-from-golang-in-javascript-b5i
---

([Skip to code](#the-code))

## Enums in Javascript

Currently, the ways we create enums include
-	String literals (see `addEventListener`), which can be typed with TypeScript, but look a bit ugly
	~~~ts
	type Direction = 'north' | 'east' | 'south' | 'west'
	~~~

-	TypeScript enums
	~~~ts
	enum Direction { north, east, south, west }
	~~~

-	Integer constants, IMO your best option if you're not using TypeScript
	~~~js
	const Directions = { north: 0, east: 1, south: 2, west: 3 }
	~~~

## Enums in Go

 <small data-note=1>Initially I wasn't going to bring Go into this at all. However, it turns out `enum` is a reserved word in JS, so I went with `iota` for the name of the function, and felt the need to explain it.</small>

_Go_ doesn't have enums, but an unusual keyword `iota`:

~~~go
type Direction int
const (
	North Direction = iota
	East
	South
	West
)
~~~

There's something subtle going on here. The iota relies on a few Go features:
-	When multiple const declarations are grouped together, the right hand side is implicitly repeated
-	Iota is incremented every time it is evaluated, and reset with each const

My JavaScript shorthand is nowhere near as magical... but it does make use of proxies.

<div id=the-code>

~~~js
function iota(start = 0) {
	let count = start
	return new Proxy({}, {
		get(o, prop) {
			if (prop in o) return o[prop]
			else return o[prop] = count++
		}
	})
}

const { north, east, south, west } = iota()
console.log(north)
~~~

</div>

So, is this function any good?

For one, it lacks some of Go's `iota` capabilities --- you can't create bitmasks with this the way you would in Go with `1 << iota`. We could augment it a bit by accepting a callback:

~~~js
function iota(cb = (i => i)) {
	let count = 0
	return new Proxy({}, {
		get(o, prop) {
			if (prop in o) return o[prop]
			else return o[prop] = cb(count++)
		}
	})
}

// flag bits
const { hasPermissionFlag, userModeFlag, useLegacyProtocolFlag } = iota(i => 1 << i)
const hasPermission = options & hasPermissionFlag
~~~

I don't think bitmasks are very common at all in JavaScript code, though.

A more significant setback is that you can't get a list of all the enum values --- nothing we can't fix:

~~~js
function iota(start = 0) {
	let count = start
	let firstProp = true

	return new Proxy({}, {
		get(o, prop) {
			if (firstProp) {
	  			firstProp = false
	  			return { // Enum descriptor
					get values() { return o }
				}
			}
			if (prop in o) return o[prop]
			else return o[prop] = count++
		}
	})
}

const { Direction, north, east, south, west } = iota()
console.log(Direction)
~~~

This is open for extension --- we could add more methods on the enum description such as converting the integer value of a Direction to its name, or validating a Direction that we parsed from a config file.

I might have a metaprogramming addiction.

