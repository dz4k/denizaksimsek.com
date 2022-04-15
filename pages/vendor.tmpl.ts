
const assets = [
    ["https://missing.style/missing.min.css", "/assets/css/missing.css"]
]

export default function* () {
    for (const [fetchHref, outputUrl] of assets) {
        yield {
            url: outputUrl,
            content: fetch(fetchHref).then(res => res.text())
        }
    }
}
