import type { Page, Site } from "lume/core.ts";
import { Element, HTMLDocument } from "lume/deps/dom.ts";
// import figureWithPCaption from "https://jspm.dev/@peaceroad/markdown-it-figure-with-p-caption"
import directive from "https://esm.sh/markdown-it-directive"
import directiveWebComponents from "https://esm.sh/markdown-it-directive-webcomponents"
import tableCaptions from "https://esm.sh/markdown-it-table-captions"

/**
 * Options to pass to markdown-it.
 */
export const markdownOptions = {
  options: {
    typographer: true,
    linkify: true,
    html: true,
  },
  plugins: [
    tableCaptions,
    directive,
    [directiveWebComponents, {
      components: [
        { name: "fig",      present: "block",  tag: "x-fig",      parseInner: true },
        { name: "sidenote", present: "inline", tag: "x-sidenote", parseInner: true },
        { name: "warning",  present: "block",  tag: "x-warning",  parseInner: true },
        { name: "uyarı",    present: "block",  tag: "x-warning",  parseInner: true },
      ]
    }]
  ],
  keepDefaultPlugins: true,
}

/**
 * Process special Markdown syntax and HTML structures.
 */
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
      
      document.getElementsByTagName("table").forEach((t) => {
        const headings = t.querySelectorAll("thead th")
        const rows     = t.querySelectorAll("tbody tr")

        for (const row of rows) {
          const cells = (row as Element).querySelectorAll("th, td")
          for (let i = 0; i < cells.length;) {
            const cell = cells[i] as Element
            cell.setAttribute("data-column", headings[i].textContent)
            i += Number(cell.getAttribute("colspan") ?? 1)
          }
        }

        t.classList.add("responsive-table")
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

        document.getElementsByTagName("x-warning").forEach((sn: Element) => {
          sn.tagName = "missing-card"
          sn.classList.add("warn", "crowded")
        })
    })
  }
}
