export const getThreadID = function(url: string) {
    const regex = /\?thread-(\d+)-?\d*\.htm/
    return url.match(regex)[1]
}