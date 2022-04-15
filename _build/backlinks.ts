
import { Page, Site } from "https://deno.land/x/lume@v1.7.1/core.ts";

export default () => {
    return (site: Site) => {
        site.preprocess([".md"], (page: Page) => {
            const [newContent, links] = renderWikilinks(
                page.data.content as string
                )
            page.data.content = newContent
            page.data.internalLinks = links.join(" ")
        })
    }
}

const markdownUrlRE = /^\[[^\]]+\]: (\/[^\s]+)$/
const wikilinkRE = /\[\[([^\]]+)\]\]/g

function renderWikilinks(markdown: string): [string, string[]] {
    const links: string[] = []
    const markdownOut = markdown.replace(wikilinkRE, (match, text) => {
        const url = `/wiki/${encodeURIComponent(text)}/`
        links.push(url)
        return `[${text}](${url})`
    })
    return [markdownOut, links]
}
