export class HourlyWeatherViewmodel {
  hour: string;
  temp: number;

  constructor(hour: string = "", temp: number = 0) {
    this.hour = hour;
    this.temp = temp;
  }

  getFormattedDate(utcTime: number) {
    return;
  }
}