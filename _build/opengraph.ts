
import { DOMParser, DOMParserMimeType } from "lume/deps/dom.ts"

export async function parse(href: string) {
    const res = await fetch(href, { headers: { "Expect": "text/html" } })
    const html = await res.text()
    
    const contentType = res.headers.get("Content-Type")?.split(";")[0] as DOMParserMimeType ?? "text/html"
    const document = new DOMParser().parseFromString(html, contentType)!

    const title = (
        document.querySelector("meta[property='og:title']")?.getAttribute("content")
        ?? document.querySelector("title")?.textContent
    )

    const description = (
        document.querySelector("meta[property='og:description']")?.getAttribute("content")
        ?? document.querySelector("meta[name='description']")?.getAttribute("content")
    )

    const content = (
        document.querySelector(".e-content")
        ?? document.querySelector(".content")
        ?? document.querySelector("p")
    )?.textContent

    return { title, description, content }
}
