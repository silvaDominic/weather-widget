export class DailyWeatherModel {
    date: number;
    description: string;
    temp: number;
    humidity: number;
    maxTemp: number;
    minTemp: number;
    windSpeed: number;

    constructor() {
        this.date = 0;
        this.description = "";
        this.temp = 0;
        this.humidity = 0;
        this.maxTemp = 0;
        this.minTemp = 0;
        this.windSpeed = 0;
    }
}