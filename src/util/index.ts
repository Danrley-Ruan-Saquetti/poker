export type PartialDeep<T> = { [x in keyof T]?: T[x] extends object ? PartialDeep<T[x]> : T[x] }

export function deepClone<T = any>(obj: T, hash = new WeakMap()): T {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    if (hash.has(obj as any)) {
        return hash.get(obj as any)
    }

    const isArray = Array.isArray(obj)
    const clone: T = (isArray ? [] : {}) as T

    hash.set(obj as any, clone)

    if (isArray) {
        obj.forEach((item, index) => {
            clone[index] = deepClone(item, hash)
        })
    } else {
        Object.keys(obj).forEach(key => {
            clone[key] = deepClone(obj[key], hash)
        })
    }

    return clone
}
