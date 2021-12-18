export interface IWeatherService {
  getWeeklyWeather: (city: string, country: string) => Promise<any>
}