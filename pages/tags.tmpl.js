
export default function* ({ intl, comp, search }) {
    for (const lang of ["tr", "en", "tok"]) {
        for (const tag of ["blog", "project", "bookmark", "wiki"]) {
            yield {
                url: `/${lang}/-/${tag}/`,
                layout: "layouts/collection.eta",
                lang,
                tags: "collection",
                title: intl["Tag"][lang] + ": " + intl[tag + " (tag plural)"][lang],
                content: comp.entryList({ entries: search.pages(`${tag}`, "date=desc"), dates: tag !== "project", lang })
            }
        }
    }
}
