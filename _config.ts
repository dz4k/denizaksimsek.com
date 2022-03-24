// @ts-nocheck lume config

import lume from "https://deno.land/x/lume/mod.ts";
import date from "https://deno.land/x/lume/plugins/date.ts";
import postcss from "https://deno.land/x/lume/plugins/postcss.ts";
import basePath from "https://deno.land/x/lume/plugins/base_path.ts";
import resolveUrls from "https://deno.land/x/lume/plugins/resolve_urls.ts";
import eta from "https://deno.land/x/lume/plugins/eta.ts";

import prismHighlight from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/prism/mod.ts"
import Prism from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/prism/deps.ts"
import prismHyperscript from "https://unpkg.com/prism-hyperscript@1.1.0/prism-hyperscript.mjs"

import getDatesFromGit from "./_build/get-dates-from-git.ts"
import prose from "./_build/prose.ts"
import myFilters from "./_build/filters.ts"

prismHyperscript(Prism)

export default lume(
    { location: new URL("https://denizaksimsek.com/") },
    {
      markdown: {
        options: {
          typographer: true,
          linkify: true,
          html: true,
        },
      },
    }
  )
  .ignore("README.md", "_build")
  .copy("assets")
  .use(postcss())
  .use(date({
    formats: {
      "M_DATE": "dd MMM \u2018yy",
      "M_DATETIME": "dd MMM \u2018yy hh:mm",
    },
  }))
  .use(prismHighlight())
  .use(basePath())
  .use(resolveUrls())
  .use(eta())
  .use(myFilters())
  .preprocess("*", getDatesFromGit)
  .process(['.md'], prose)

