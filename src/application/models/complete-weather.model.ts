import { HourlyWeatherModel } from './hour-weather.model';
import { DailyWeatherModel } from './daily-weather.model';

export class CompleteWeatherModel {
  description: string;
  hourlyWeather: HourlyWeatherModel[];
  weeklyWeather: DailyWeatherModel[];

  constructor(description: string, hourlyWeather: HourlyWeatherModel[], weeklyWeather: DailyWeatherModel[]) {
    this.description = description;
    this.hourlyWeather = hourlyWeather;
    this.weeklyWeather = weeklyWeather;
  }
}