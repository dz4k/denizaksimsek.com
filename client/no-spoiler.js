

const styles = new CSSStyleSheet
styles.replaceSync(`
:host { display: contents }
.reveal {
    display: inline;
    color: transparent;
    border: none;
    background: black;
}
.reveal > .content {
    color: transparent;
}
.vh {
    display: inline-block;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
}
`)

customElements.define("no-spoiler", class extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = /* html */ `
            <button class="reveal">
                <span class="vh">Reveal spoiler</span>
                <slot aria-hidden="true" class="content">
            </button>
        `
        shadow.adoptedStyleSheets = [styles];

        const
        slot = shadow.querySelector(".content"),
        reveal = shadow.querySelector(".reveal");
        reveal.addEventListener("click", _ => {
            reveal.insertAdjacentElement("beforebegin", slot);
            reveal.remove();
            slot.animate({
                background: ["black", "none"],
                color: ["transparent", "currentcolor"],
            }, {
                duration: 500,
            })
        })
    }
})
