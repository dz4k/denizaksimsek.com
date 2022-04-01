import type { Site } from "https://deno.land/x/lume@v1.7.1/core.ts";

export default () => {
    return (site: Site) => {
        site.filter("peekHtml", peekHtml)
        site.filter("repeat", repeat)
    }
}

function peekHtml(html: string) {
    const text = html.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, " ")
    if (text.length < 50) return text
    else return text.slice(0, 49) + "…"
}

interface LoopContext {
    i: number
    first: boolean
    last?: boolean
    sep(s: string): string
}

function repeat<T>(
    root: Iterable<T>,
    cb: (t: T, loop: LoopContext) => void
): void {
    let i = 0
    
    for (const t of root) {
        const ctx: LoopContext = {
            i,
            first: i === 0,
            sep(s) {
                return this.last ? "" : s
            }
        }
    
        if (hasLength(root)) {
            ctx.last = i === root.length - 1
        }
    
        cb(t, ctx)
        i++
    }
}

// deno-lint-ignore no-explicit-any
function hasLength(a: any): a is { length: number } {
    return "length" in a && typeof a.length === "number"
}
