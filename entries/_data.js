export const layout = "layouts/entry.eta"
export const templateEngine = "eta,md"
export const renderOrder = -10
export const url = page => {
    const [_empty, _entriesDir, ...rest] = page.src.path.split("/")
    if (rest[0] === "blog") rest.shift()
    const href = "/" + rest.join("/") + "/"
    return href
}