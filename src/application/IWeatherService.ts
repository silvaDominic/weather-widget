export interface IWeatherService {
  getForecast(zipcode: string): Promise<any>,
  getLocalForecast(): Promise<any>,
}