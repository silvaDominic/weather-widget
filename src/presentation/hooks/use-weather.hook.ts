import { DailyWeatherModel } from "../../application/models/daily-weather.model";
import { useEffect, useState } from "react";

import { WeatherService } from "../../application/services/weather.service";
import { GeolocationService } from "../../application/services/geolocation.service";

type useWeatherReturnModel = {
  currentWeather: DailyWeatherModel | null,
  currentWeatherError: any,
  setCurrentWeather: (prop: DailyWeatherModel) => void,
  hourlyWeather: DailyWeatherModel[] | null,
  hourlyWeatherError: any,
  setHourlyWeather: (prop: DailyWeatherModel[]) => void,
  getWeatherByCityOrZipcode: (query: string) => Promise<any>,
  isSearching: boolean,
}

export function useWeather(): useWeatherReturnModel {
  const [currentWeather, setCurrentWeather] = useState<DailyWeatherModel | null>(null);
  const [hourlyWeather, setHourlyWeather] = useState<DailyWeatherModel[] | null>(null);
  const [currentWeatherError, setCurrentWeatherError] = useState(null);
  const [hourlyWeatherError, setHourlyWeatherError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    async function getWeather(): Promise<void> {
      setIsSearching(true);
      // Fetch location preemptively to prevent multiple requests during weather fetching flow
      await GeolocationService.getLocation();

      // Requests are batched so search state can be set, but are still able to load their state independently
      const requests = [
        WeatherService.getCurrentWeatherByCurrentLocation()
          .then((model: DailyWeatherModel) => setCurrentWeather(model))
          .catch((err: any) => setCurrentWeatherError(err)),
        WeatherService.getHourlyWeatherByCurrentLocation()
          .then((model: DailyWeatherModel[]) => setHourlyWeather(model))
          .catch((err: any) => setHourlyWeatherError(err))
      ];

      Promise.allSettled(requests)
        .then(() => setIsSearching(false));
    }

    getWeather()
      .catch((err: any) => console.log(err));
  }, []);

  async function getWeatherByCityOrZipcode(query: string) {
    setIsSearching(true);
    // Requests are batched so search state can be set, but are still able to load their state independently
    let requests: Promise<void>[];
    if (/^\d{5}$/.test(query)) { // zipcode check
      requests = [
        WeatherService.getCurrentWeatherByZipcode(query)
          .then((model: DailyWeatherModel) => setCurrentWeather(model))
          .catch((err: any) => setCurrentWeatherError(err)),
        WeatherService.getHourlyWeatherByZipcode(query)
          .then((model: DailyWeatherModel[]) => setHourlyWeather(model))
          .catch((err: any) => setHourlyWeatherError(err))
      ];
    } else {
      requests = [
        WeatherService.getCurrentWeatherByCity(query)
          .then((model: DailyWeatherModel) => setCurrentWeather(model))
          .catch((err: any) => setCurrentWeatherError(err)),
        WeatherService.getHourlyWeatherByCity(query)
          .then((model: DailyWeatherModel[]) => setHourlyWeather(model))
          .catch((err: any) => setHourlyWeatherError(err))
      ];
    }
    Promise.all(requests)
      .then(() => setIsSearching(false));
  }

  return {
    currentWeather,
    currentWeatherError,
    setCurrentWeather,
    hourlyWeather,
    hourlyWeatherError,
    setHourlyWeather,
    getWeatherByCityOrZipcode,
    isSearching,
  }
}



