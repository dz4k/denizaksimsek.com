#!/usr/bin/env -S deno run --allow-net

import { mf2 } from "https://jspm.dev/microformats-parser@1.4.1"
import { MF2 } from "./mf2.d.ts"

const arg = Deno.args[0]

const res = await fetch(arg)
const data = mf2(await res.text(), {
    baseUrl: res.url,
    experimental: {
        lang: true,
    },
}) as MF2
const entry = data.items.find(item => item.type.includes("h-entry"))
console.log(JSON.stringify(entry))
