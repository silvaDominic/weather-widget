export interface IWeatherService {
  getForecast(city: string, country: string): Promise<any>,
  getLocalForecast(): Promise<any>,
}