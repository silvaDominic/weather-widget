// Models
import { IWeatherService } from '../models/weather-service.interface';
import { IGeolocationResponse } from '../models/geo-response.interface';
// Helpers
import axios from 'axios';
import { GeoLocationService } from "./geo-location.service";
import { mapFiveDayHourlyWeatherModel, mapToWeatherModel } from '../weather.mapper';
// Constants
import { API_KEY_OPEN_WEATHER } from "../../shared/constants/environment.const";
import { UNIT } from '../../shared/enums/unit.enum';
import { DailyWeatherModel } from "../models/daily-weather.model";

const API_VERSION = "2.5";
const BASE_URL = `https://api.openweathermap.org/data/${API_VERSION}`;

export const WeatherService: IWeatherService = {
    currGeolocation: undefined,

    async getCurrentWeatherByCurrentLocation(): Promise<DailyWeatherModel> {
        try {
            const geoRes: IGeolocationResponse = await GeoLocationService.getCurrentLocationCoords();
            return await getCurrentWeather(geoRes);
        } catch (err) {
            throw err;
        }
    },

    async getCurrentWeatherByZipcode(zipcode: string): Promise<DailyWeatherModel> {
        try {
            const geoRes: IGeolocationResponse = await GeoLocationService.getGeolocationByZipcode(zipcode);
            return await getCurrentWeather(geoRes);
        } catch (err) {
            throw err;
        }
    },

    async getHourlyFiveDayWeatherByZipcode(zipcode: string): Promise<DailyWeatherModel[]> {
        const geoRes: IGeolocationResponse = await GeoLocationService.getGeolocationByZipcode(zipcode);
        return await getFiveDayForecast(geoRes);
    },

    async getCurrentWeatherByCity(city: string): Promise<DailyWeatherModel> {
        const geoRes: IGeolocationResponse = await GeoLocationService.getGeolocationByCity(city);
        return await getCurrentWeather(geoRes)
    },

    async getHourlyFiveDayWeatherByCity(city: string): Promise<DailyWeatherModel[]> {
        const geoRes: IGeolocationResponse = await GeoLocationService.getGeolocationByZipcode(city);
        return await getFiveDayForecast(geoRes);
    },
}

async function getFiveDayForecast(geoResponse: IGeolocationResponse): Promise<DailyWeatherModel[]> {
    const params = {
        units: UNIT.IMPERIAL,
        lat: geoResponse.latitude,
        lon: geoResponse.longitude,
        exclude: "minutely,alerts",
        appid: API_KEY_OPEN_WEATHER
    }
    try {
        const weatherRes = await axios.get(`${BASE_URL}/forecast`, { params });
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
        const res = await axios.get(`${BASE_URL}/weather`, {params});
        return mapToWeatherModel(res.data, geoResponse.displayLocation);
    } catch (err) {
        throw err;
    }
}
