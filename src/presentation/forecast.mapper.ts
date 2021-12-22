import { HourlyWeatherModel } from '../application/models/hour-weather.model';
import { HourlyForecastVM } from './view-models/hourly-forecast.viewmodel';
import { DailyForecastVM } from './view-models/daily-forecast.viewmodel';
import { DailyWeatherModel } from '../application/models/daily-weather.model';
import { TodaysForecastVM } from './view-models/todays-forecast.viewmodel';

export function mapToHourlyForecast(model: HourlyWeatherModel[]) {
  return model.map(data => {
    return new HourlyForecastVM(data.date, data.temp);
  });
}

export function mapToTodaysWeatherDetailVM(model: DailyWeatherModel) {
  return new DailyForecastVM(
    model.date,
    model.temp,
    model.maxTemp,
    model.minTemp,
    model.description,
    model.windSpeed,
    model.humidity
  );
}

export function mapToTodaysForecastVM(model: DailyWeatherModel) {
  return new TodaysForecastVM(
    model.temp,
    model.windSpeed,
    model.humidity
  );
}

export function mapToWeeklyForecast(model: DailyWeatherModel[]): DailyForecastVM[] {
  return model.map(data =>
    new DailyForecastVM(
      data.date,
      data.temp,
      data.maxTemp,
      data.minTemp,
      data.description,
      data.windSpeed,
      data.humidity
    )
  );
}