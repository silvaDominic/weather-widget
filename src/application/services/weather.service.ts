import { API_KEY_OPEN_WEATHER } from "../../shared/constants/environment.const";
import { capitalize } from "../../shared/utils/general.util";
import { GeoLocationService } from "./geo-location.service";
import { mapToCoordinates } from "../location.mapper";
import { IWeatherService } from '../IWeatherService';
import axios from 'axios';
import { mapToForecastModel } from '../weather.mapper';
import { UNIT } from '../../shared/enums/unit.enum';
import { CoordinatesModel } from '../models/coordinates.model';

const API_VERSION = "2.5";
const BASE_URL = `https://api.openweathermap.org/data/${API_VERSION}`;

export const WeatherService: IWeatherService = {
    async getForecast(city, country): Promise<any> {
        try {
            const geoResponse = await GeoLocationService.getCoordsByCityAndCountry(city, country);
            const coordsModel = mapToCoordinates(geoResponse[0]);

            const params = {
                units: UNIT.IMPERIAL,
                lat: coordsModel.latitude,
                lon: coordsModel.longitude,
                appid: API_KEY_OPEN_WEATHER
            }
            const weatherResponse = await axios.get(`${BASE_URL}/onecall`, { params });
            return mapToForecastModel(weatherResponse.data);
        } catch (err) {
            console.log("WEATHER SERVICE ERR: ", err);
            throw err;
        }
    },

    async getLocalForecast() {
        const coordsModel: CoordinatesModel = await GeoLocationService.getCurrentLocationCoords();
        const params = {
            units: UNIT.IMPERIAL,
            lat: coordsModel.latitude,
            lon: coordsModel.longitude,
            appid: API_KEY_OPEN_WEATHER
        }
        const weatherResponse = await axios.get(`${BASE_URL}/onecall`, { params });
        return mapToForecastModel(weatherResponse.data);
    }
}