import { IGeolocationResponse } from './geo-response.interface';
import { ForecastModel } from './forecast.model';

export interface IWeatherService {
  getForecastByZipcode(zipcode: string): Promise<ForecastModel>,
  getLocalForecast(): Promise<ForecastModel>,
}