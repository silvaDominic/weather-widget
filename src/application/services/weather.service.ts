import { API_KEY_OPEN_WEATHER } from "../../shared/constants/environment.const";
import { capitalize } from "../../shared/utils/general.util";
import { GeoLocationService } from "./geo-location.service";
import { mapToCoordinates } from "../location.mapper";
import { IWeatherService } from '../IWeatherService';
import axios from 'axios';
import { mapToForecast } from '../weather.mapper';

const API_VERSION = "2.5";
const BASE_URL = `https://api.openweathermap.org/data/${API_VERSION}`;

export const WeatherService: IWeatherService = {
    async getForecast(city, country): Promise<any> {
        try {
            const geoResponse = await GeoLocationService.getCoordsByCityAndCountry(city, country);
            const coordsModel = mapToCoordinates(geoResponse[0]);
            console.log("COORDS: ", coordsModel);
            const weatherResponse = await axios.get(`${BASE_URL}/onecall?lat=${coordsModel.latitude}&lon=${coordsModel.longitude}&appid=${API_KEY_OPEN_WEATHER}`);
            return mapToForecast(weatherResponse.data);
        } catch (err) {
            console.log("WEATHER SERVICE ERR: ", err);
            throw err;
        }
    }
}

async function getCurrentWeatherByCityAndCountry(city: string, country: string) {
    city = formatCity(city);
    country = formatCountry(country);
    try{
        let result = await fetch(`${BASE_URL}?q=${city},${country}&appid=${API_KEY_OPEN_WEATHER}`);
        return result.json();
    } catch(err) {
        console.log(err);
        throw new Error(`Error fetching weather data for ${city} and ${country}.`);
    }
}

async function getCurrentWeatherByCoords(latitude: number, longitude: number) {
    try {
        const result = await fetch(`${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY_OPEN_WEATHER}`);
        return result.json();
    } catch {
        throw new Error(`Error fetching weather data for location at latitude: ${latitude} and longitude ${longitude}.`);
    }
}

function formatCity(city: string) {
    return capitalize(city);
}

function formatCountry(country: string) {
    return country.toLowerCase();
}