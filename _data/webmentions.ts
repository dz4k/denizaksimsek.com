// deno-lint-ignore-file no-explicit-any

const token = Deno.env.get("WEBMENTION_IO_TOKEN")

const url = `https://webmention.io/api/mentions.jf2?token=${token}`

function relativeUrl(href: string) {
	return new URL(href).pathname
}

function groupby<T, E>(
	data: Iterable<T>,
	keyFn: (t: T) => E
): Record<E, T[]> {
	const rv: Record<E, T[]> = {}
	for (const t of data) {
		const key = keyFn(t);
		(rv[key] ??= []).push(t)
	}
	return rv
}

function mapObject<K extends keyof any, V1, V2>(obj: Record<K, V1>, fn: (e: V1) => V2): Record<K, V2> {
	const rv: Record<K, V2> = {}

	for (const key in obj) {
		rv[key] = fn(obj[key])
	}

	return rv
}

export default token
	? await fetch(url).then(res => res.json())
		.then(data => groupby(data.children, (wm: any) => relativeUrl(wm['wm-target'])))
		.then(data => mapObject(data, arr => groupby(arr, (wm: any) => wm["wm-property"])))
		.catch(e => (console.log(e), {}))
	: {}
