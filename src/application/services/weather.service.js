import { API_KEY_OPEN_WEATHER } from "../../shared/constants/environment.const";
import { capitalize } from "../../shared/utils";
import { GeoLocationService } from "./geo-location.service";
import { mapToCoordinates } from "../location.mapper";

const API_VERSION = "2.5";
const BASE_URL = `https://api.openweathermap.org/data/${API_VERSION}`;

export const WeatherService = {
    async getWeeklyWeather(city, country) {
        try {
            const coordsData = await GeoLocationService.getCoordsByCityAndCountry(city, country);
            const coordsModel = mapToCoordinates(coordsData[0]);
            const weatherData = await fetch(`${BASE_URL}/onecall?lat=${coordsModel.latitude}&lon=${coordsModel.longitude}&appid=${API_KEY_OPEN_WEATHER}`);
            return weatherData.json();
        } catch (err) {
            return err;
        }
    }
}

async function getCurrentWeatherByCityAndCountry(city, country) {
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

async function getCurrentWeatherByCoords(latitude, longitude) {
    try {
        const result = await fetch(`${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY_OPEN_WEATHER}`);
        return result.json();
    } catch {
        throw new Error(`Error fetching weather data for location at latitude: ${latitude} and longitude ${longitude}.`);
    }
}

function formatCity(city) {
    return capitalize(city);
}

function formatCountry(country) {
    return country.toLowerCase();
}