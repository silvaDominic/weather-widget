import { DAY } from '../../shared/enums/day.enum';

export class DailyWeatherViewmodel {
  day: DAY;
  highTemp: number;
  lowTemp: number;

  constructor() {
    this.day = DAY.SUN;
    this.highTemp = 0;
    this.lowTemp = 0;
  }

  getFormattedDate(utcTime: number) {
    return;
  }
}