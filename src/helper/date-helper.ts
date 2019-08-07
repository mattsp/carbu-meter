export function utcToLocale(timestamp:number):Date {
    return new Date(timestamp - new Date(timestamp).getTimezoneOffset() * 60000)
}
export function localToUtc(timestamp:number):Date {
    return new Date(new Date(timestamp).toUTCString())
}