import type { Page, Site } from "lume/core.ts";
import { Element, HTMLDocument,  } from "lume/deps/dom.ts";
// import figureWithPCaption from "https://jspm.dev/@peaceroad/markdown-it-figure-with-p-caption"
import directive from "https://esm.sh/markdown-it-directive"
import directiveWebComponents from "https://esm.sh/markdown-it-directive-webcomponents"

export const markdownOptions = {
  options: {
    typographer: true,
    linkify: true,
    html: true,
  },
  plugins: [
    directive,
    [directiveWebComponents, {
      components: [
        { name: "fig",      present: "block",  tag: "x-fig", parseInner: true },
        { name: "sidenote", present: "inline", tag: "x-sidenote", parseInner: true },
      ]
    }]
  ],
  keepDefaultPlugins: true,
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

        document.getElementsByTagName("x-fig").forEach((fig: Element) => {
          const title = fig.getAttribute("title"), href = fig.getAttribute("src")
          if (title) {
            const cap = document.createElement("figcaption")
            if (href) {
              const a = document.createElement("a")
              a.setAttribute("href", href)
              a.textContent = title
              cap.append(a)
            } else {
              cap.textContent = title
            }
            fig.removeAttribute("title")
            fig.removeAttribute("src")
            fig.prepend(cap)
          }
          fig.tagName = "FIGURE"
        })

        document.getElementsByTagName("x-sidenote").forEach((sn: Element) => {
          const small = document.createElement("small")
          small.append(...sn.childNodes)
          sn.append(small)
          sn.tagName = "SPAN"
        })
    })
  }
}
