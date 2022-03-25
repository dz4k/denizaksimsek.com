export const layout = "./index.eta"

export default function* (_) {
    for (const lang of ["tr", "en", "tok"]) {
        yield {
            lang,
            url: "/" + lang + "/",
            content: lang
        }
    }
}
