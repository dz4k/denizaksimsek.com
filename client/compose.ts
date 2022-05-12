
/// <reference lib="dom" />

import { URI } from "./lib/uri.ts"

const
    $post = document.getElementById("post") as HTMLFormElement,
    $content = document.getElementById("content") as HTMLTextAreaElement

$post.addEventListener("submit", e => {
    const date = new Date
    const folder = date.getFullYear()
    const filename = `${date.toISOString()}.md`
    const body = $content.value
    const message = "Post: " + body.trim().slice(0, 30)

    window.open(URI`
        https://github.com/dz4k/denizaksimsek.com
        /new/master/entries/blog/${folder}/new
        ?filename=${filename}
        &message=${message}
        &value=${body}`)
})
