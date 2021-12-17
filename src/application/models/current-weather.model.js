import { WeatherModel } from "./weather.model";

export class CurrentWeatherModel {
    constructor() {
        this.description = "";
        this.forecast = "";
        this.weather = new WeatherModel();
    }
}