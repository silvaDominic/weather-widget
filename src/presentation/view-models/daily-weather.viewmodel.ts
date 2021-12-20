import { DAY } from '../../shared/enums/day.enum';

export class DailyWeatherViewmodel {
  day: string;
  highTemp: number;
  lowTemp: number;

  constructor(day: string, highTemp: number, lowTemp: number) {
    this.day = day;
    this.highTemp = highTemp;
    this.lowTemp = lowTemp;
  }

  getFormattedDate(utcTime: number) {
    return;
  }
}