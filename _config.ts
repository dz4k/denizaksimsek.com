
import "https://deno.land/x/dotenv@v3.2.0/load.ts"

import lume        from "lume/mod.ts"
import date        from "lume/plugins/date.ts"
import basePath    from "lume/plugins/base_path.ts"
import resolveUrls from "lume/plugins/resolve_urls.ts"
import eta         from "lume/plugins/eta.ts"
import bundler     from "lume/plugins/bundler.ts"

import tr    from "https://deno.land/x/date_fns@v2.22.1/locale/tr/index.js"
import en_US from "https://deno.land/x/date_fns@v2.22.1/locale/en-US/index.js"

import highlighting               from "./_build/highlighting.ts"
import getDatesFromGit            from "./_build/get-dates-from-git.ts"
import backlinks                  from "./_build/backlinks.ts"
import prose, { markdownOptions } from "./_build/prose.ts"
import myFilters                  from "./_build/filters.ts"

export default lume(
    { location: new URL("https://denizaksimsek.com/") },
    { markdown: markdownOptions }
  )
  
  .ignore("README.md")
  .copy("assets")
  .data("lang", "en")

  .use(date({ locales: { tr, en_US } }))
  .use(highlighting())
  .use(basePath())
  .use(resolveUrls())
  .use(eta())
  .use(myFilters())
  .use(getDatesFromGit())
  .use(backlinks())
  .use(prose())
  .use(bundler())
