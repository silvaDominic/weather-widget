import { unixToDay } from '../../shared/utils/general.util';

export class DailyForecastVM {
  date: number;
  temp: number;
  highTemp: number;
  lowTemp: number;
  description: string;
  windSpeed: number;
  humidity: number;

  constructor(date: number = 0, temp: number = 0, highTemp: number = 0, lowTemp: number = 0, description: string = "", windSpeed: number = 0, humidity: number = 0) {
    this.date = date;
    this.temp = temp;
    this.highTemp = highTemp;
    this.lowTemp = lowTemp;
    this.description = description;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }

  getRoundedTemp() {
    return Math.round(this.temp);
  }

  getRoundedHighTemp() {
    return Math.round(this.highTemp);
  }

  getRoundedLowTemp() {
    return Math.round(this.lowTemp);
  }

  getRoundedWindSpeed() {
    return Math.round(this.windSpeed);
  }

  getDay() {
    return unixToDay(this.date, true);
  }
}