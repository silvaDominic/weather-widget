export class HourlyWeatherViewmodel {
  hour: string;
  temp: number;

  constructor() {
    this.hour = "";
    this.temp = 0;
  }

  getFormattedDate(utcTime: number) {
    return;
  }
}