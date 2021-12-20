export class HourlyWeatherModel {
  date: string;
  temp: number;

  constructor(date: string = "", temp: number = 0) {
    this.date = date;
    this.temp = temp;
  }
}