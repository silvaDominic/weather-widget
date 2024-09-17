import { DailyWeatherModel } from "./models/daily-weather.model";
import { PlainObject } from '../shared/interfaces/plain-object';

export function mapFiveDayHourlyWeatherModel(dto: PlainObject): DailyWeatherModel[] {
    let fiveDayHourlyWeatherModel: DailyWeatherModel[];

    if (dto) {
        if (!Array.isArray(dto.list)) {
            throw new Error('There is not weather data for the next 5 days.');
        }
        fiveDayHourlyWeatherModel = dto.list.map((weatherDatum: any) => mapToWeatherModel(weatherDatum));
    } else {
        throw new Error("No weather object returned with request");
    }

    return fiveDayHourlyWeatherModel;
}

export function mapToWeatherModel(dto: PlainObject, displayLocation?: string): DailyWeatherModel {
    let weatherModel = new DailyWeatherModel();
    weatherModel.location = displayLocation || "";
    weatherModel.date = dto.dt;
    weatherModel.description = dto.weather[0].description;
    weatherModel.temp = dto?.main?.temp;
    weatherModel.maxTemp = dto?.main?.temp_max;
    weatherModel.minTemp = dto?.main?.temp_min;
    weatherModel.humidity = dto?.main?.humidity;
    weatherModel.windSpeed = dto?.wind?.speed;

    return weatherModel;
}
