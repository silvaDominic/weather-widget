export class DailyWeatherModel {
    location: string;
    date: number;
    description: string;
    temp: number;
    maxTemp: number;
    minTemp: number;
    windSpeed: number;
    windDirection: string;
    humidity: number;

    constructor() {
        this.location = "";
        this.date = 0;
        this.description = "";
        this.temp = 0;
        this.maxTemp = 0;
        this.minTemp = 0;
        this.windSpeed = 0;
        this.windDirection = "";
        this.humidity = 0;
    }
}
