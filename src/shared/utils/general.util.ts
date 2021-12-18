export function capitalize(str: string) {
    str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    return str;
}