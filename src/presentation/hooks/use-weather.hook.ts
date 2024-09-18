import { IWeatherService } from "../../application/models/weather-service.interface";
import { DailyWeatherModel } from "../../application/models/daily-weather.model";
import { useEffect, useState } from "react";

type useWeatherReturnModel = {
  currentWeather: DailyWeatherModel,
  setCurrentWeather: (prop: DailyWeatherModel) => void,
  hourlyWeather: DailyWeatherModel[],
  setHourlyWeather: (prop: DailyWeatherModel[]) => void,
  getWeatherByCityOrZipcode: (query: string) => Promise<any>,
}

export function useWeather(weatherService: IWeatherService): useWeatherReturnModel {
  const [currentWeather, setCurrentWeather] = useState(new DailyWeatherModel());
  const [hourlyWeather, setHourlyWeather] = useState(new Array<DailyWeatherModel>());

  useEffect(() => {
    weatherService.getHourlyWeatherByCurrentLocation().then(res => {
      console.log("SETTING HOURLY WEATHER");
      setHourlyWeather(res);
    });
    weatherService.getCurrentWeatherByCurrentLocation().then(res => {
      console.log("SETTING CURRENT WEATHER");
      setCurrentWeather(res);
    });
  }, []);

  async function getWeatherByCityOrZipcode(query: string) {
    if (/^\d{5}$/.test(query)) { // zipcode check
      weatherService.getWeatherByZipcode(query).then(res => setCurrentWeather(res));
      weatherService.getHourlyWeatherByZipcode(query).then(res => setHourlyWeather(res));
    } else {
      weatherService.getCurrentWeatherByCity(query).then(res => setCurrentWeather(res));
      weatherService.getHourlyWeatherByCity(query).then(res => setHourlyWeather(res));
    }
  }

  return {
    currentWeather,
    setCurrentWeather,
    hourlyWeather,
    setHourlyWeather,
    getWeatherByCityOrZipcode,
  }
}



