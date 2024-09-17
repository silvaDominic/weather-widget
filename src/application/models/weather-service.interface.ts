import { IGeolocationResponse } from './geo-response.interface';
import { DailyWeatherModel } from "./daily-weather.model";

export interface IWeatherService {
  currGeolocation: IGeolocationResponse | undefined,
  getCurrentWeatherByZipcode(zipcode: string): Promise<DailyWeatherModel>,
  getCurrentWeatherByCurrentLocation(): Promise<DailyWeatherModel>,
  getCurrentWeatherByCity(city: string): Promise<DailyWeatherModel>,
  getHourlyFiveDayWeatherByZipcode(zipcode: string): Promise<DailyWeatherModel[]>,
  getHourlyFiveDayWeatherByCity(city: string): Promise<DailyWeatherModel[]>,
}
