export function convertToKebabCase(str) {
    return `userboard__${str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase()}`
}