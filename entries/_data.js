export const layout = "layouts/entry.eta"
export const lang = "en"
export const templateEngine = "eta,md"
export const url = page => {
    const [_empty, _entriesDir, ...rest] = page.src.path.split("/")
    const href = "/" + rest.join("/") + "/"
    return href
}