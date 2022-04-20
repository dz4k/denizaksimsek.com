
import prismHighlight from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/prism/mod.ts"
import Prism from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/prism/deps.ts"
import prismHyperscript from "https://unpkg.com/prism-hyperscript@1.1.0/prism-hyperscript.mjs"
import type { Site } from "lume/core.ts"

export default () => {
    prismHyperscript(Prism)

    return (site: Site) => {
        site.use(prismHighlight())
    }
}
