import type { Page, Site } from "lume/core.ts";
import { Element, HTMLDocument } from "lume/deps/dom.ts";
import figureWithPCaption from "https://jspm.dev/@peaceroad/markdown-it-figure-with-p-caption"

export const markdownOptions = {
  options: {
    typographer: true,
    linkify: true,
    html: true,
    plugins: [figureWithPCaption]
  },
}

export default () => {
  return (site: Site) => {
    site.process([".md"], (page: Page) => {
      if (page.document === undefined) return
      const document = page.document as HTMLDocument
      // Add footers to blockquotes.
    
      document.querySelectorAll("blockquote > p:last-child")
        .forEach(c => {
          const caption = c as Element
          if (!caption.textContent.startsWith("—")) return // em dash
    
          const figure = document.createElement("figure")
          caption.tagName = "figcaption"
          caption.parentElement!.before(figure)
          figure.appendChild(caption.parentElement!)
          figure.appendChild(caption)
        })

        document.getElementsByTagName("p").forEach(p => {
          if (/^\w+(?: \d+)?:/.test(p.textContent)) {
            const figure = document.createElement("figure")
            const c = p.nextElementSibling
            p.tagName = "figcaption"
            p.before(figure)
            figure.appendChild(p)
            figure.appendChild(c!)
          }
        })
    })
  }
}
