export class DailyWeatherModel {
    location: string;
    date: number;
    description: string;
    temp: number;
    maxTemp: number;
    minTemp: number;
    windSpeed: number;
    windDirectionDegs: number;
    humidity: number;

    constructor() {
        this.location = "";
        this.date = 0;
        this.description = "";
        this.temp = 0;
        this.maxTemp = 0;
        this.minTemp = 0;
        this.windSpeed = 0;
        this.windDirectionDegs = 0;
        this.humidity = 0;
    }

    getRoundedTemp(): number {
        return Math.round(this.temp);
    }

    getRoundedMaxTemp(): number {
        return Math.round(this.maxTemp);
    }

    getRoundedMinTemp(): number {
        return Math.round(this.minTemp);
    }

    getRoundedWindSpeed(): number {
        return Math.round(this.windSpeed);
    }

    getCardinalDirection(): string {
        const normalizedDegrees = this.windDirectionDegs % 360;

        const directions = [
            'N',   // 0°
            'NE',  // 45°
            'E',   // 90°
            'SE',  // 135°
            'S',   // 180°
            'SW',  // 225°
            'W',   // 270°
            'NW'   // 315°
        ];
        const index = Math.round(normalizedDegrees / 45) % 8;

        return directions[index];
    }

    kelvinToFahrenheit() {
        return (this.temp - 273.15) * (9/5) + 32;
    }

    kelvinToCelsius() {
        return this.temp - 273.15;
    }

}
