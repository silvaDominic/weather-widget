import { DailyWeatherModel } from "./models/daily-weather.model";
import { PlainObject } from '@/shared/interfaces/plain-object';

export function mapFiveDayHourlyWeatherModel(dto: PlainObject): DailyWeatherModel[] {
    let model: DailyWeatherModel[] = new Array<DailyWeatherModel>();

    if (dto) {
        if (!Array.isArray(dto.list)) {
            throw new Error('There is no hourly weather data available');
        }
        for (let i = 0; i < 8; i++) {
            model.push(mapToWeatherModel(dto.list[i]));
        }
    } else {
        throw new Error("No weather object returned with request");
    }
    return model;
}

export function mapToWeatherModel(dto: PlainObject, displayLocation?: string): DailyWeatherModel {
    let model = new DailyWeatherModel();
    model.location = displayLocation || "";
    model.date = dto.dt;
    model.description = dto.weather[0].description;
    model.temp = dto?.main?.temp;
    model.maxTemp = dto?.main?.temp_max;
    model.minTemp = dto?.main?.temp_min;
    model.humidity = dto?.main?.humidity;
    model.windSpeed = dto?.wind?.speed;
    model.windDirectionDegs = dto?.wind?.deg;

    return model;
}
