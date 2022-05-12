
export function URI(parts: TemplateStringsArray, ...interp: any[]) {
    return new URL(
        String.raw(parts, 
            ...interp.map(val => encodeURIComponent(val))
        ).replace(/\s/g, "")
    )
}
