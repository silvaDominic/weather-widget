import { HourlyWeatherModel } from '../application/models/hour-weather.model';
import { HourlyWeatherViewmodel } from './view-models/hourly-weather.viewmodel';
import { TodaysWeatherDetailViewmodel } from './view-models/todays-weather-detail.viewmodel';
import { DailyWeatherModel } from '../application/models/daily-weather.model';
import { TodaysWeatherViewmodel } from './view-models/todays-weather.viewmodel';
import { DailyWeatherViewmodel } from './view-models/daily-weather.viewmodel';
import { unixToDay } from '../shared/utils/general.util';

export function mapToHourlyForecast(model: HourlyWeatherModel[]) {
  return model.map(data => {
    return new HourlyWeatherViewmodel(data.date, data.temp);
  });
}

export function mapToDailyForecast(model: DailyWeatherModel) {
  return new TodaysWeatherDetailViewmodel(
    model.temp,
    model.maxTemp,
    model.minTemp,
    model.description,
    model.windSpeed,
    model.humidity
  );
}

export function mapToTodaysWeatherForecast(model: DailyWeatherModel) {
  return new TodaysWeatherViewmodel(
    model.temp,
    model.windSpeed,
    model.humidity
  );
}

export function mapToWeeklyForecast(model: DailyWeatherModel[]) {
  return model.map(data => {
    return new DailyWeatherViewmodel(unixToDay(data.date, true), data.maxTemp, data.minTemp);
  });
}