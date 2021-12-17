import { WeatherModel } from "./weather.model";

export class CurrentWeatherModel {
    description: string;
    forecast: string;
    weather: WeatherModel;

    constructor() {
        this.description = "";
        this.forecast = "";
        this.weather = new WeatherModel();
    }
}