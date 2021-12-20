export class TodaysWeatherDetailViewmodel {
  temp: number;
  highTemp: number;
  lowTemp: number;
  description: string;
  windSpeed: number;
  humidity: number;

  constructor(temp: number = 0, highTemp: number = 0, lowTemp: number = 0, description: string = "", windSpeed: number = 0, humidity: number = 0) {
    this.temp = temp;
    this.highTemp = highTemp;
    this.lowTemp = lowTemp;
    this.description = description;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}