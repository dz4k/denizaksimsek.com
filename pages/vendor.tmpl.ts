
export default function* () {
    for (const [fetchHref, outputUrl] of [
        ["https://missing.style/missing.min.css", "/assets/css/missing.css"]
    ]) {
        yield {
            url: outputUrl,
            content: fetch(fetchHref).then(res => res.text())
        }
    }
}
