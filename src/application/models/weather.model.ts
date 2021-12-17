export class WeatherModel {
    temp: number;
    pressure: number;
    humidity: number;
    maxTemp: number;
    minTemp: number;
    windSpeed: number;

    constructor() {
        this.temp = 0;
        this.pressure = 0;
        this.humidity = 0;
        this.maxTemp = 0;
        this.minTemp = 0;
        this.windSpeed = 0;
    }
}