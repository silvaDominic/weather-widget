export class DailyWeatherModel {
    day: string;
    highTemp: number;
    lowTemp: number;

    constructor() {
        this.day = "";
        this.highTemp = 0;
        this.lowTemp = 0;
    }
}