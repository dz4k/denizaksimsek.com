
const assets = [
    ["https://missing.style/missing.min.css", "/assets/css/missing.css"],
    ["https://missing.style/missing-prism.min.css", "/assets/css/missing-prism.css"],
]

export default function* () {
    for (const [fetchHref, outputUrl] of assets) {
        yield {
            url: outputUrl,
            content: fetch(fetchHref).then(res => res.text())
        }
    }
}
