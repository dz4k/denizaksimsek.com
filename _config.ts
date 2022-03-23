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

import { exec } from "./_build/util.ts"

const site = lume({
  location: new URL("https://denizaksimsek.com/"),
}, {
  markdown: {
    options: {
      typographer: true,
    },
  },
})

site
  .ignore("README.md")
  .copy("assets")
  .use(postcss())
  .use(date({
    formats: {
      "M_DATE": "dd MMM ‘yy",
      "M_DATETIME": "dd MMM ‘yy hh:mm",
    },
  }))
  .use(prismHighlight())
  .use(basePath())
  .use(resolveUrls())
  .use(eta())

prismHyperscript(Prism)

site.preprocess("*", async (page) => {
  const gitLog = await exec(["git", "log", "--follow", "--format=%aI", "." + page.src.path + page.src.ext])
  const dates = gitLog.split("\n")
  dates.pop() // remove trailing newline
  if ("last modified" in page.data) return
  if (dates.length > 0) page.data["last modified"] = new Date(dates[0])
  if (page.data.date !== page.src.created) return
  page.data.date ??= new Date(dates[dates.length - 1])
})

site.process(['.md'], page => {
  page.document.querySelectorAll('blockquote > p:last-child')
    .forEach(cap => {
      if (!cap.textContent.startsWith('—')) return // em dash

      const figure = page.document.createElement('figure')
      cap.tagName = 'figcaption'
      cap.parentElement.before(figure)
      figure.appendChild(cap.parentElement)
      figure.appendChild(cap)
    })
  page.document.querySelectorAll('a.cite').forEach(a => {
    a.removeClass('cite')

    const cite = document.createElement('cite');
    a.replaceWith(cite)
    cite.appendChild(a)
  })
})

site.filter("peekHtml", html => {
  const text = html.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, " ")
  if (text.length < 50) return text
  else return text.slice(0, 49) + "…"
})

export default site;
