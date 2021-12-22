import { API_KEY_OPEN_WEATHER } from "../../shared/constants/environment.const";
import { GeoLocationService } from "./geo-location.service";
import { IWeatherService } from '../IWeatherService';
import axios from 'axios';
import { mapToForecastModel } from '../weather.mapper';
import { UNIT } from '../../shared/enums/unit.enum';
import { ForecastModel } from '../models/forecast.model';
import { IGeolocationResponse } from '../models/geo-response.interface';

const API_VERSION = "2.5";
const BASE_URL = `https://api.openweathermap.org/data/${API_VERSION}`;

export const WeatherService: IWeatherService = {
    async getForecastByZipcode(zipcode): Promise<ForecastModel> {
        try {
            const geoResponse: IGeolocationResponse = await GeoLocationService.getGeolocationByZipcode(zipcode);
            return await this.getForecast(geoResponse);
        } catch (err) {
            console.log("WEATHER SERVICE ERR: ", err);
            throw err;
        }
    },

    async getLocalForecast(): Promise<ForecastModel> {
        const geoResponse: IGeolocationResponse = await GeoLocationService.getCurrentLocationCoords();
        return await this.getForecast(geoResponse);
    },

    async getForecast(geoResponse: IGeolocationResponse) {
        const params = {
            units: UNIT.IMPERIAL,
            lat: geoResponse.latitude,
            lon: geoResponse.longitude,
            appid: API_KEY_OPEN_WEATHER
        }
        try {
            const weatherResponse = await axios.get(`${BASE_URL}/onecall`, { params });

            let forecastModel: ForecastModel = mapToForecastModel(weatherResponse.data);
            forecastModel.displayLocation = geoResponse.displayLocation;
            return forecastModel;
        } catch (err) {
            throw err;
        }
    }
}