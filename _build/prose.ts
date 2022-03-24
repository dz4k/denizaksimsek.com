import type { Page } from "https://deno.land/x/lume@v1.7.1/core.ts";
import { Element, HTMLDocument } from "https://deno.land/x/lume@v1.7.1/deps/dom.ts";

export default (page: Page) => {
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
    });
};
