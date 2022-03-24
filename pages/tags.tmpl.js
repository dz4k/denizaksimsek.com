
export default function* ({ intl, comp, search }) {
    for (const lang of ["tr", "en", "tok"]) {
        for (const tag of ["blog", "project", "link"]) {
            yield {
                url: `/tag/${lang}/${tag}/`,
                layout: "layouts/collection.eta",
                lang,
                tags: "collection",
                title: intl["Tag"][lang] + ": " + intl[tag + " (tag plural)"][lang] + " " + intl["(lang specifier)"][lang],
                content: comp.entryList({ entries: search.pages(`${tag} lang=${lang}`, "date=desc"), dates: tag !== "project", lang })
            }
        }
    }
}
