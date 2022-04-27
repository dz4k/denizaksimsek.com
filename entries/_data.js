export const
    layout = "layouts/entry.eta",
    templateEngine = "eta,md",
    renderOrder = -10,
    content = "",
    url = page => {
        const [, _entriesDir, ...rest] = page.src.path.split("/")
        if (rest[0] === "blog") rest.shift()
        const href = "/" + rest.join("/") + "/"
        return href
    }