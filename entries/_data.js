export const layout = "layouts/entry.eta"
export const lang = "en"
export const templateEngine = "eta,md"
export const url = page => {
    const [, , year, ...rest] = page.src.path.split("/")
    const href = "/" + year + "/" + rest.join("/") + "/"
    return href
}