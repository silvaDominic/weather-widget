import { DailyWeatherModel } from "../../application/models/daily-weather.model";
import { useEffect, useState } from "react";

import { WeatherService } from "../../application/services/weather.service";

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
      WeatherService.getHourlyWeatherByCurrentLocation().then(res => {
        console.log("SETTING HOURLY WEATHER");
        setHourlyWeather(res);
      });
      WeatherService.getCurrentWeatherByCurrentLocation().then(res => {
        console.log("SETTING CURRENT WEATHER");
        setCurrentWeather(res);
      });
    }

    getWeather()
      .catch((err: any) => console.log(err));
  }, []);

  async function getWeatherByCityOrZipcode(query: string) {
    if (/^\d{5}$/.test(query)) { // zipcode check
      WeatherService.getWeatherByZipcode(query).then(res => setCurrentWeather(res));
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



