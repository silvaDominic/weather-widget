export function capitalize(str: string) {
    str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    return str;
}

export function unixToDay(unixTimestamp: number, isShortHand: boolean = false) {
    const format = isShortHand ? "short" : "long";
    return new Date(unixTimestamp * 1000).toLocaleString("en-US", {weekday: format});
}

export function unixToHour(unixTimestamp: number) {
    return new Date(unixTimestamp * 1000).toLocaleString("en-US", {hour: "numeric"});
}

export function formatWind(windSpeed: number, unit: string, direction: string): string {
    return `${windSpeed}${unit}, ${direction}`;
}
