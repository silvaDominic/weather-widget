export class TodaysWeatherViewmodel {
  temp: number;
  windSpeed: number;
  humidity: number;

  constructor(temp: number = 0, windSpeed: number = 0, humidity: number = 0) {
    this.temp = temp;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}