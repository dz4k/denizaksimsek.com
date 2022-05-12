
/// <reference lib="dom" />

import on from "./lib/evt.ts";
import { URI } from "./lib/uri.ts"

on("composeNewPost", ({ body }: { body: string }) => {
    const date = new Date
    const folder = date.getFullYear()
    const filename = `${date.toISOString()}.md`
    const message = "Post: " + body.trim().slice(0, 30)

    window.open(URI`
        https://github.com/dz4k/denizaksimsek.com
        /new/master/entries/blog/${folder}/new
        ?filename=${filename}
        &message=${message}
        &value=${body}`)
})
