// @ts-nocheck lume config

import lume from "https://deno.land/x/lume/mod.ts";
import date from "https://deno.land/x/lume/plugins/date.ts";
import postcss from "https://deno.land/x/lume/plugins/postcss.ts";
import basePath from "https://deno.land/x/lume/plugins/base_path.ts";
import resolveUrls from "https://deno.land/x/lume/plugins/resolve_urls.ts";
import eta from "https://deno.land/x/lume/plugins/eta.ts";
import codeHighlight from "https://deno.land/x/lume/plugins/code_highlight.ts";

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
  // .use(codeHighlight())
  .use(basePath())
  .use(resolveUrls())
  .use(eta())

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
