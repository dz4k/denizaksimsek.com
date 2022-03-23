// deno-lint-ignore-file no-explicit-any

const token = Deno.env.get("WEBMENTION_IO_TOKEN")

const url = `https://webmention.io/api/mentions.jf2?token=${token}`

function relativeUrl(href: string) {
	return new URL(href).pathname
}

function groupByPage(wmData: any) {
	const rv: { [k: string]: any } = {}
	for (const wm of wmData.children) {
		const relUrl = relativeUrl(wm['wm-target'])
		rv[relUrl] || (rv[relUrl] = [])
		rv[relUrl].push(wm)
	}
	return rv
}

function groupByType(wms: any) {
	const rv: { [k: string]: any } = {}
	for (const wm of wms) {
		const type = wm['wm-property']
		rv[type] || (rv[type] = [])
		rv[type].push(wm)
	}
	return rv
}

export default token
	? await fetch(url).then(res => res.json())
		.then(data => groupByPage(data))
		.then(data => Object.fromEntries(
			Object.entries(data).map(([k, v]) => [k, groupByType(v)])
		))
		.catch(e => (console.log(e), {}))
	: {}
