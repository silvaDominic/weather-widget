import { DailyWeatherModel } from "./daily-weather.model";

export interface IWeatherService {
  getCurrentWeatherByCurrentLocation(): Promise<DailyWeatherModel>,
  getHourlyWeatherByCurrentLocation(): Promise<DailyWeatherModel[]>,
  getWeatherByZipcode(zipcode: string): Promise<DailyWeatherModel>,
  getHourlyWeatherByZipcode(zipcode: string): Promise<DailyWeatherModel[]>,
  getCurrentWeatherByCity(city: string): Promise<DailyWeatherModel>,
  getHourlyWeatherByCity(city: string): Promise<DailyWeatherModel[]>,
}
