import { Page } from "https://deno.land/x/lume@v1.7.1/core.ts";

const markdownUrlRE = /^\[[^\]]+\]: (\/[^\s]+)$/

export function getInternalLinks(page: Page) {
    const content = page.data.content as string
    page.data.internalLinks = content.split("\n").map(line => {
        const match = markdownUrlRE.exec(line)
        if (!match) return null
        if (!match[1].endsWith("/")) match[1] += "/"
        return match[1]
    }).filter(e => e !== null).join(" ")
}
