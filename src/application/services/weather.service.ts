// Models
import { IWeatherService } from '../models/weather-service.interface';
import { IGeolocationResponse } from '../models/geo-response.interface';
import { ForecastModel } from '../models/forecast.model';
// Helpers
import axios from 'axios';
import { GeoLocationService } from "./geo-location.service";
import { mapToForecastModel } from '../weather.mapper';
// Constants
import { API_KEY_OPEN_WEATHER } from "../../shared/constants/environment.const";
import { UNIT } from '../../shared/enums/unit.enum';

const API_VERSION = "2.5";
const BASE_URL = `https://api.openweathermap.org/data/${API_VERSION}`;

export const WeatherService: IWeatherService = {
    async getForecastByZipcode(zipcode): Promise<ForecastModel> {
        try {
            const geoResponse: IGeolocationResponse = await GeoLocationService.getGeolocationByZipcode(zipcode);
            return await getForecast(geoResponse);
        } catch (err) {
            throw err;
        }
    },

    async getLocalForecast(): Promise<ForecastModel> {
        const geoResponse: IGeolocationResponse = await GeoLocationService.getCurrentLocationCoords();
        return await getForecast(geoResponse);
    },
}

async function getForecast(geoResponse: IGeolocationResponse): Promise<ForecastModel> {
    const params = {
        units: UNIT.IMPERIAL,
        lat: geoResponse.latitude,
        lon: geoResponse.longitude,
        exclude: "minutely,alerts",
        appid: API_KEY_OPEN_WEATHER
    }
    try {
        const weatherResponse = await axios.get(`${BASE_URL}/onecall`, { params });
        return mapToForecastModel(weatherResponse.data, geoResponse.displayLocation);
    } catch (err) {
        throw err;
    }
}