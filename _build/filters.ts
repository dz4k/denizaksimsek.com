import type { Site } from "https://deno.land/x/lume@v1.7.1/core.ts";

export default () => {
    return (site: Site) => {
        site.filter("peekHtml", html => {
            const text = html.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, " ")
            if (text.length < 50) return text
            else return text.slice(0, 49) + "…"
        })
    }
}
