export class DailyWeatherViewmodel {
  day: string;
  highTemp: number;
  lowTemp: number;

  constructor(day: string, highTemp: number, lowTemp: number) {
    this.day = day;
    this.highTemp = highTemp;
    this.lowTemp = lowTemp;
  }

  getRoundedHighTemp() {
    return Math.round(this.highTemp);
  }

  getRoundedLowTemp() {
    return Math.round(this.lowTemp);
  }
}