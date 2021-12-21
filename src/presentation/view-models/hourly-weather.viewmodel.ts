export interface IHourlyWeatherViewmodel {
  hour: number;
  temp: number;
}

export class HourlyWeatherViewmodel implements IHourlyWeatherViewmodel {
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