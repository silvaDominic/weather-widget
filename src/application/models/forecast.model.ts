import { HourlyWeatherModel } from './hour-weather.model';
import { DailyWeatherModel } from './daily-weather.model';

export class ForecastModel {
  displayLocation: string;
  dailyWeather: DailyWeatherModel;
  hourlyWeather: HourlyWeatherModel[];
  weeklyWeather: DailyWeatherModel[];

  constructor(hourlyWeather: HourlyWeatherModel[] = [], weeklyWeather: DailyWeatherModel[] = [], displayLocation: string = "") {
    this.displayLocation = displayLocation;
    this.dailyWeather = weeklyWeather[0];
    this.hourlyWeather = hourlyWeather;
    this.weeklyWeather = weeklyWeather;
  }
}