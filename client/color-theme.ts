
/// <reference lib="dom" />

import m from "https://esm.sh/mithril/mithril.js"


const names = {
    "--fg": "Text",
	"--muted-fg": "Greyed-out text",
	"--faded-fg": "",
	"--info-fg": "Info text",
	"--ok-fg": "Success text",
	"--bad-fg": "Error text",
	"--warn-fg": "Warning text",
	"--bg": "Background",
	"--bg-2": "Card background",
	"--bg-3": "Interactive elements background",
	"--bg-4": "Pressed button background",
	"--info-bg": "Info background",
	"--ok-bg": "Success background",
	"--bad-bg": "Error background",
	"--warn-bg": "Warning background",
	"--accent": "Accent color (contrast)",
	"--muted-accent": "Accent color (low contrast)",
} as const

type ColorProp = keyof typeof names
type ColorTheme = { [key in ColorProp]?: string }

let theme: ColorTheme = {
    "--fg": "",
	"--muted-fg": "",
	"--faded-fg": "",
	"--info-fg": "",
	"--info-bg": "",
	"--ok-fg": "",
	"--ok-bg": "",
	"--bad-fg": "",
	"--bad-bg": "",
	"--warn-fg": "",
	"--warn-bg": "",
	"--bg": "",
	"--bg-2": "",
	"--bg-3": "",
	"--bg-4": "",
	"--accent": "",
	"--muted-accent": "",
}

function updateColors(...keys: (keyof ColorTheme)[]) {
    if (keys.length === 0) keys = Object.keys(theme) as (keyof ColorTheme)[]
    for (const key of keys) {
        document.documentElement.style.setProperty(key, theme[key] ?? null)
    }
}

function updateStorage() {
    localStorage.colorTheme = JSON.stringify(theme)
}

function reset() {
    localStorage.colorTheme = "{}"
    theme = {}
    updateColors()
}

const ColorThemeSettings: m.Component = {
    view() {
        return m("dialog.missing-card[open]", {},
            m("form.table", { action: "dialog" },
                Object.keys(names).map(s => {
                    const key = s as keyof ColorTheme
                    const id = "switcher-input" + key
                    return m("p.row",
                        m("label", { htmlFor: id }, names[key]),
                        m("input[type=color]", {
                            name: id,
                            id,
                            value: theme[key],
                            onchange(this: HTMLInputElement, e: Event) {
                                theme[key] = this.value
                                updateColors(key)
                                updateStorage()
                            }
                        }))
                }),
                m("p.tool-bar",
                    m("button[type=submit]", "Done"),
                    m("button[type=reset]", { onclick: reset }, "Reset"))))
    }
}

export function colorThemeSwitcher(): void {
    let $container = document.getElementById("switcher-dialog-container")
    if ($container === null) {
        $container = document.createElement("div")
        $container.id = "switcher-dialog-container"
        document.body.append($container)
    }

    m.mount($container, ColorThemeSettings)
}

window.addEventListener("open-color-theme-switcher", (e: Event) => colorThemeSwitcher())

if ("colorTheme" in localStorage) {
    theme = JSON.parse(localStorage.colorTheme)
    updateColors()
} else {
    for (const key in theme) {
        theme[key as keyof ColorTheme] = document.documentElement.style.getPropertyValue(key)
        localStorage.colorTheme = localStorage.originalTheme = theme
    }
}
