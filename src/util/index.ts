export function isInstance(obj: any) {
    return !isObjectLiteral(obj)
}

export function isObjectLiteral(obj: any) {
    return obj !== null && typeof obj === 'object' && obj.constructor === Object
}

export type PartialDeep<T> = {
    [x in keyof T]?: T[x] extends object ? PartialDeep<T[x]> : T[x];
};