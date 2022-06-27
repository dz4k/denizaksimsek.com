
function post(filename, folder, body) {
    open(
        `https://github.com/dz4k/denizaksimsek.com/`+
        `new/master/entries/${folder}/new`+
        `?filename=${filename}`+
        `&value=${body}`
    )
}

function blogPost(body) {
    const date = new Date
    const folder = `blog/${date.getFullYear()}`
    const filename = date.toISOString() + ".md"

    post(filename, folder, body)
}

async function bookmarkPost(url, content) {
    const folder = "interact"
    const filename = new Date().toISOString() + ".json"
    const body = JSON.stringify({
        "bookmark of": {
            name: await getTitle(url),
            url,
        },
        content,
    })
}

addEventListener("blog-post", e => {
    blogPost(e.detail.content)
})
