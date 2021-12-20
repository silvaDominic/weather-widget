export class HourlyWeatherModel {
  date: number;
  temp: number;

  constructor(date: number = 0, temp: number = 0) {
    this.date = date;
    this.temp = temp;
  }
}