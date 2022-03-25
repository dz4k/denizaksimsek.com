// deno-lint-ignore-file no-explicit-any

const token = Deno.env.get("WEBMENTION_IO_TOKEN")

const url = `https://webmention.io/api/mentions.jf2?token=${token}`

function relativeUrl(href: string) {
	return new URL(href).pathname
}

function groupby<T, K>(
	data: Iterable<T>,
	keyFn: (t: T) => K
): Map<K, T[]> {
	const rv = new Map
	for (const t of data) {
		const key = keyFn(t);
		if (!rv.has(key)) rv.set(key, [])
		rv.get(key).push(t)
	}
	return rv
}

export default token
	? await fetch(url).then(res => res.json())
		.then(data => groupby(data.children, (wm: any) => relativeUrl(wm['wm-target'])))
		.then(data => data.forEach((val, key) => data.set(key, val.map(wm => wm["wm-property"]))))
		.catch(e => (console.log(e), {}))
	: {}
