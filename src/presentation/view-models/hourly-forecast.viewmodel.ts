export interface IHourlyWeatherVM {
  hour: number;
  temp: number;
}

export class HourlyForecastVM implements IHourlyWeatherVM {
  hour: number;
  temp: number;

  constructor(hour: number = 0, temp: number = 0) {
    this.hour = hour;
    this.temp = temp;
  }

  getRoundedTemp() {
    return Math.round(this.temp);
  }
}