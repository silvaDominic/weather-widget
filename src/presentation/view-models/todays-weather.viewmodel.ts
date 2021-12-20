export class TodaysWeatherViewmodel {
  temp: number;
  windSpeed: string;
  humidity: number;

  constructor() {
    this.temp = 0;
    this.windSpeed = "";
    this.humidity = 0;
  }

  getFormattedWindspeed() {
    return this.windSpeed + " mph";
  }
}