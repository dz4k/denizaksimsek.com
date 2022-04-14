// @ts-nocheck lume config

import "https://deno.land/x/dotenv@v3.2.0/load.ts"

import lume from "https://deno.land/x/lume@v1.7.1/mod.ts";
import date from "https://deno.land/x/lume@v1.7.1/plugins/date.ts";
import tr    from "https://deno.land/x/date_fns@v2.22.1/locale/tr/index.js"
import en_US from "https://deno.land/x/date_fns@v2.22.1/locale/en-US/index.js"
import basePath from "https://deno.land/x/lume@v1.7.1/plugins/base_path.ts";
import resolveUrls from "https://deno.land/x/lume@v1.7.1/plugins/resolve_urls.ts";
import eta from "https://deno.land/x/lume@v1.7.1/plugins/eta.ts";

import highlighting from "./_build/highlighting.ts"
import getDatesFromGit from "./_build/get-dates-from-git.ts"
import backlinks from "./_build/backlinks.ts"
import prose, { markdownOptions } from "./_build/prose.ts"
import myFilters from "./_build/filters.ts"

export default lume(
    { location: new URL("https://denizaksimsek.com/") },
    { markdown: markdownOptions }
  )
  
  .ignore("README.md", "_build")
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

