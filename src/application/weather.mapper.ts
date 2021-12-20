import { DailyWeatherModel } from "./models/daily-weather.model";
import { PlainObject } from '../shared/interfaces/plain-object';
import { HourlyWeatherModel } from './models/hour-weather.model';
import { ForecastModel } from './models/forecast.model';

export function mapToForecast(dto: PlainObject): ForecastModel {
    let hourlyWeatherModel: HourlyWeatherModel[];
    let weeklyWeatherModel: DailyWeatherModel[];

    if (dto) {
        hourlyWeatherModel = dto.hourly.map((hourlyWeather: PlainObject) => {
            return mapToHourlyWeatherModel(hourlyWeather);
        }).slice(0, 5); // Only need the first 6 hours of data
        weeklyWeatherModel = dto.daily.map((dailyWeather: PlainObject) => {
            return mapToWeatherModel(dailyWeather);
        }).slice(0,6); // Only need the first 7 days of data
    } else {
        throw new Error("No weather object returned with request");
    }

    return new ForecastModel(hourlyWeatherModel, weeklyWeatherModel);
}

function mapToWeatherModel(dto: PlainObject): DailyWeatherModel {
    let weatherModel = new DailyWeatherModel();
    weatherModel.date = dto.dt;
    weatherModel.description = dto.weather[0].description;
    weatherModel.temp = dto.temp.day;
    weatherModel.maxTemp = dto.temp.max;
    weatherModel.minTemp = dto.temp.min;
    weatherModel.humidity = dto.humidity;
    weatherModel.windSpeed = dto.wind_speed;

    return weatherModel;
}

function mapToHourlyWeatherModel(dto: PlainObject): HourlyWeatherModel {
    return new HourlyWeatherModel(dto.dt, dto.temp);
}