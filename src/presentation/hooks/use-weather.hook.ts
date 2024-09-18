import { DailyWeatherModel } from "../../application/models/daily-weather.model";
import { useEffect, useState } from "react";

import { WeatherService } from "../../application/services/weather.service";
import { GeolocationService } from "../../application/services/geolocation.service";

type useWeatherReturnModel = {
  currentWeather: DailyWeatherModel,
  setCurrentWeather: (prop: DailyWeatherModel) => void,
  hourlyWeather: DailyWeatherModel[],
  setHourlyWeather: (prop: DailyWeatherModel[]) => void,
  getWeatherByCityOrZipcode: (query: string) => Promise<any>,
}

export function useWeather(): useWeatherReturnModel {
  const [currentWeather, setCurrentWeather] = useState(new DailyWeatherModel());
  const [hourlyWeather, setHourlyWeather] = useState(new Array<DailyWeatherModel>());

  useEffect(() => {
    async function getWeather(): Promise<void> {
      await GeolocationService.getLocation();
      WeatherService.getHourlyWeatherByCurrentLocation().then(res => setHourlyWeather(res));
      WeatherService.getCurrentWeatherByCurrentLocation().then(res => setCurrentWeather(res));
    }

    getWeather()
      .catch((err: any) => console.log(err));
  }, []);

  async function getWeatherByCityOrZipcode(query: string) {
    if (/^\d{5}$/.test(query)) { // zipcode check
      WeatherService.getCurrentWeatherByZipcode(query).then(res => setCurrentWeather(res));
      WeatherService.getHourlyWeatherByZipcode(query).then(res => setHourlyWeather(res));
    } else {
      WeatherService.getCurrentWeatherByCity(query).then(res => setCurrentWeather(res));
      WeatherService.getHourlyWeatherByCity(query).then(res => setHourlyWeather(res));
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



