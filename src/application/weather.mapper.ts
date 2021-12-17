import { WeatherModel } from "./models/weather.model";
import { CurrentWeatherModel } from "./models/current-weather.model";
import { PlainObject } from '../shared/interfaces/plain-object';

export function mapToWeatherModel(requestObj: PlainObject) {
    let weatherModel = new WeatherModel();
    weatherModel.temp = requestObj.main.temp;
    weatherModel.humidity = requestObj.main.humidity;
    weatherModel.pressure = requestObj.main.pressure;
    weatherModel.maxTemp = requestObj.main.temp_max;
    weatherModel.minTemp = requestObj.main.temp_min;
    weatherModel.windSpeed = requestObj.wind.speed;

    return weatherModel;
}

export function mapToCurrentWeatherModel(requestObj: PlainObject) {
    let currentWeatherModel = new CurrentWeatherModel();
    currentWeatherModel.description = requestObj.weather[0].main;
    currentWeatherModel.forecast = requestObj.weather[0].description;
    currentWeatherModel.weather = mapToWeatherModel(requestObj);

    return currentWeatherModel;
}