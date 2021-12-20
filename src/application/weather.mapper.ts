import { DailyWeatherModel } from "./models/daily-weather.model";
import { PlainObject } from '../shared/interfaces/plain-object';
import { HourlyWeatherModel } from './models/hour-weather.model';
import { CompleteWeatherModel } from './models/complete-weather.model';

export function mapToWeeklyWeatherModel(dto: PlainObject): CompleteWeatherModel {
    let description: string;
    let hourlyWeatherModel: HourlyWeatherModel[];
    let weeklyWeatherModel: DailyWeatherModel[];

    console.log(dto);

    if (dto) {
        description = dto.current.weather[0].description;
        hourlyWeatherModel = dto.hourly.map((hourlyWeather: PlainObject) => {
            return mapToHourlyWeatherModel(hourlyWeather);
        })
        weeklyWeatherModel = dto.daily.map((dailyWeather: PlainObject) => {
            return mapToWeatherModel(dailyWeather);
        });
    } else {
        throw new Error("No weather object returned with request");
    }

    return new CompleteWeatherModel(description, hourlyWeatherModel, weeklyWeatherModel);
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