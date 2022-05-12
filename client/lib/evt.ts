
export default function on<T>(type: string, cb: (detail: T, event: CustomEvent<T>) => void) {
    const handler = e => cb((e as CustomEvent).detail as T, (e as CustomEvent))
    addEventListener(type, handler)
    return {
        off() {
            removeEventListener(type, handler)
        }
    }
}
