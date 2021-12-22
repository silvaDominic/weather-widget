import { IGeolocationResponse } from './models/geo-response.interface';
import { ForecastModel } from './models/forecast.model';

export interface IWeatherService {
  getForecastByZipcode(zipcode: string): Promise<ForecastModel>,
  getLocalForecast(): Promise<ForecastModel>,
  getForecast(geoResponse: IGeolocationResponse): Promise<ForecastModel>
}