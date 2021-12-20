export function capitalize(str: string) {
    str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    return str;
}

export function kelvinToFahrenheit(temp: number) {
    return Math.round((temp - 273.15) * 9/5 + 32);
}

export function kelvinToCelsius(temp: number) {
    return Math.round(temp - 273.15);
}