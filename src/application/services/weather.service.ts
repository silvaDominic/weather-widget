// Models
import { IWeatherService } from '../models/weather-service.interface';
import { IGeolocationResponse } from '../models/geo-response.interface';
// Helpers
import { HttpService } from '../services/http.service';
import { GeolocationService } from "./geolocation.service";
import { mapFiveDayHourlyWeatherModel, mapToWeatherModel } from '../mappers/weather.mapper';
// Constants
import { API_KEY_OPEN_WEATHER } from "@/shared/constants/environment.const";
import { UNIT } from '@/shared/enums/unit.enum';
import { DailyWeatherModel } from "../models/daily-weather.model";

const API_VERSION = "2.5";
const BASE_URL = `https://api.openweathermap.org/data/${API_VERSION}`;

export const WeatherService: IWeatherService = {
  async getCurrentWeatherByCurrentLocation(): Promise<DailyWeatherModel> {
    try {
      const geoRes: IGeolocationResponse = await GeolocationService.getLocation();
      return await getCurrentWeather(geoRes);
    } catch (err) {
      throw err;
    }
  },

  async getHourlyWeatherByCurrentLocation(): Promise<DailyWeatherModel[]> {
    try {
      const geoRes: IGeolocationResponse = await GeolocationService.getLocation();
      return await getHourlyWeather(geoRes);
    } catch (err) {
      throw err;
    }
  },

  async getCurrentWeatherByZipcode(zipcode: string): Promise<DailyWeatherModel> {
    try {
      const geoRes: IGeolocationResponse = await GeolocationService.getGeolocationByZipcode(zipcode);
      return await getCurrentWeather(geoRes);
    } catch (err) {
      throw err;
    }
  },

  async getHourlyWeatherByZipcode(zipcode: string): Promise<DailyWeatherModel[]> {
    try {
      const geoRes: IGeolocationResponse = await GeolocationService.getGeolocationByZipcode(zipcode);
      return await getHourlyWeather(geoRes);
    } catch (err) {
      throw err;
    }
  },

  async getCurrentWeatherByCity(city: string): Promise<DailyWeatherModel> {
    try {
      const geoRes: IGeolocationResponse = await GeolocationService.getGeolocationByCity(city);
      return await getCurrentWeather(geoRes);
    } catch (err) {
      throw err;
    }
  },

  async getHourlyWeatherByCity(city: string): Promise<DailyWeatherModel[]> {
    try {
      const geoRes: IGeolocationResponse = await GeolocationService.getGeolocationByCity(city);
      return await getHourlyWeather(geoRes);
    } catch (err) {
      throw err;
    }
  },
}

async function getHourlyWeather(geoResponse: IGeolocationResponse): Promise<DailyWeatherModel[]> {
  const params = {
    units: UNIT.IMPERIAL,
    lat: geoResponse.latitude,
    lon: geoResponse.longitude,
    exclude: "minutely,alerts",
    appid: API_KEY_OPEN_WEATHER
  }
  try {
    const weatherRes = await HttpService.get(`${BASE_URL}/forecast`, {params});
    return mapFiveDayHourlyWeatherModel(weatherRes.data);
  } catch (err) {
    throw err;
  }
}

async function getCurrentWeather(geoResponse: IGeolocationResponse): Promise<DailyWeatherModel> {
  const params = {
    units: UNIT.IMPERIAL,
    lat: geoResponse.latitude,
    lon: geoResponse.longitude,
    exclude: "minutely,alerts",
    appid: API_KEY_OPEN_WEATHER
  }

  try {
    const res = await HttpService.get(`${BASE_URL}/weather`, {params});
    return mapToWeatherModel(res.data, geoResponse.displayLocation);
  } catch (err) {
    throw err;
  }
}
